import Head from "next/head";
import Link from "next/link";

import { DOCTOR_URL, API_KEY } from "../constants/index";

import Navbar from '@/components/Navbar'

import fetcher from "../fetch/index.js";

export default function Home({ doctorList }) {
  return (
    <>
      <Head>
        <title>Doctor List</title>
        <meta
          name="description"
          content="Get your appointment with doctor here in Doctor List"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="circle-back middle-right" />
      <div className="circle-back bottom-left" />
      <div className="doctor-list">
        <Navbar title="Doctor List" subtitle="Find doctor that fit with your schedule." />
        <div className="doctor-list-card-wrap">
          {(doctorList || []).map((doctor, index) => {
            const { id, address, name, opening_hours } = doctor || {};
            const { district, line_1, line_2 } = address || {};

            return (
              <Link key={index} href={`${id}`}>
                <div className="doctor-profile-card">
                  <div className="doctor-profile-card-name">{name}</div>
                  <div className="doctor-profile-card-address">
                    {district} <span className="circle-divider" /> {line_1}
                    <span className="circle-divider" /> {line_2}
                  </div>
                  <div className="doctor-profile-card-text">Schedule:</div>
                  {(opening_hours || []).map((schedule, indexSchedule) => {
                    const { day, end, isClosed, start } = schedule || {};

                    return (
                      <div
                        className="doctor-profile-card-schedule"
                        key={indexSchedule}
                      >
                        <div className="doctor-profile-card-schedule-text day">
                          {day}
                        </div>
                        <div className="doctor-profile-card-schedule-text">
                          {start}
                        </div>
                        <div className="doctor-profile-card-schedule-text">
                          -
                        </div>
                        <div className="doctor-profile-card-schedule-text">
                          {end}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const doctorList = await fetcher(DOCTOR_URL, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
      },
    });

    if (doctorList) {
      return {
        props: {
          doctorList,
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
