import { useState } from "react";

import Head from "next/head";
import dynamic from 'next/dynamic'

import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";

import {
  DOCTOR_URL,
  API_KEY,
  FORM_DATA_DEFAULT,
  BOOKING_URL,
  STATUS_DEFAULT,
} from "../../constants/index";
import { TimeToFloat } from "@/helpers";

import fetcher from "../../fetch/index.js";

const Navbar = dynamic(() => import('../../components/Navbar'), {
  loading: () => 'Loading...',
  ssr: false
});
const Button = dynamic(() => import('../../components/Button'), {
  loading: () => 'Loading...',
  ssr: false
});
const Input = dynamic(() => import('../../components/Input'), {
  loading: () => 'Loading...',
  ssr: false
});
const DatePicker = dynamic(() => import('../../components/DatePicker'), {
  loading: () => 'Loading...',
  ssr: false
});
const TimePicker = dynamic(() => import('../../components/TimePicker'), {
  loading: () => 'Loading...',
  ssr: false
});

const DoctorDetail = ({ doctorDetail }) => {
  const { id, name, address, description, opening_hours } = doctorDetail || {};
  const { district, line_1, line_2 } = address || {};

  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(STATUS_DEFAULT);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA_DEFAULT);

  const handleInput = (e) => {
    const { name, value } = e?.target;

    const cloneFormData = JSON.parse(JSON.stringify(formData));

    cloneFormData[name] = name !== "start" ? value : TimeToFloat(value);

    setFormData(cloneFormData);
  };

  const handleSubmit = async () => {
    try {
      formData.doctorId = id;
      setLoading(!loading);

      const bookAppointment = await fetcher(BOOKING_URL, {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (bookAppointment) {
        setStatus({
          status: "success",
          message: "Success to book an appointment!",
        });
        setFormData(FORM_DATA_DEFAULT)
        setShow(!show);
      } else {
        setStatus({
          status: "error",
          message: "Failed to book an appointment!",
        });
      }

      setLoading(false);
    } catch (e) {
      console.log(`Failed to book: ${e}`);
      setLoading(false);
      setShow(!show);
    }
  };

  return (
    <>
      <Head>
        <title>Doctor List | Detail</title>
        <meta name="description" content="Doctor Detail" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="doctor-detail-back" />
      <Navbar withBackButton={true} />
      <div className="doctor-detail">
        <div className="doctor-detail-header">
          <div className="doctor-detail-header-text">Doctor</div>
          <div className="doctor-detail-header-name">{name}</div>
          <div className="doctor-detail-header-address">
            {district} <span className="circle-divider" /> {line_1}
            <span className="circle-divider" /> {line_2}
          </div>
          <div className="doctor-detail-header-description">{description}</div>
        </div>
        <div className="doctor-detail-schedule">
          <div className="doctor-detail-schedule-title">Schedule:</div>
          {(opening_hours || []).map((schedule, indexSchedule) => {
            const { day, end, isClosed, start } = schedule || {};

            return (
              <div className="doctor-detail-schedule-list" key={indexSchedule}>
                <div className="doctor-detail-schedule-list-text day">
                  {day}
                </div>
                <div className="doctor-detail-schedule-list-text">{start}</div>
                <div className="doctor-detail-schedule-list-text">-</div>
                <div className="doctor-detail-schedule-list-text">{end}</div>
              </div>
            );
          })}
        </div>
        <div className="doctor-detail-book-button">
          <Button
            onClick={() => (loading ? {} : setShow(!show))}
            variant="primary"
            padding="15px 20px"
          >
            <div className="doctor-detail-book-button-title">
              {loading ? (
                <Spinner size="md" animation="border" variant="light" />
              ) : (
                "Book Appointment"
              )}
            </div>
          </Button>
        </div>
      </div>
      <Modal size="sm" show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-appointment">
            {status?.status === "error" && (
              <Alert
                variant="danger"
                onClose={() => setStatus(STATUS_DEFAULT)}
                dismissible
              >
                <div className="alert-message">{status?.message}</div>
              </Alert>
            )}
            <div className="form-appointment-input">
              <Input
                name="name"
                title="Name"
                onChange={handleInput}
                value={formData?.name || ""}
              />
            </div>
            <div className="form-appointment-input">
              <DatePicker
                name="date"
                title="Appointment Date"
                onChange={handleInput}
                value={formData?.date || ""}
              />
            </div>
            <div className="form-appointment-input">
              <TimePicker
                name="start"
                title="Appointment Time"
                onChange={handleInput}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            padding="10px 15px"
            variant="secondary"
            onClick={() => setShow(!show)}
          >
            Close
          </Button>
          <Button
            padding="10px 15px"
            variant="primary"
            onClick={() => (loading ? {} : handleSubmit())}
          >
            {loading ? (
              <Spinner size="sm" animation="border" variant="light" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast
        show={status?.status === "success"}
        onClose={() => setStatus(STATUS_DEFAULT)}
        delay={3000}
        autohide
      >
        <Toast.Body>{status?.message}</Toast.Body>
      </Toast>
    </>
  );
};

export default DoctorDetail;

export async function getServerSideProps(context) {
  try {
    const doctorDetail = await fetcher(`${DOCTOR_URL}/${context?.query?.id}`, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
      },
    });

    if (doctorDetail) {
      return {
        props: {
          doctorDetail,
        },
      };
    }
  } catch (e) {
    console.log(`Failed to fetch data: ${JSON.stringify(e)}`);
  }

  return {
    props: {},
  };
}
