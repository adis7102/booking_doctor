import React from 'react';

const TimePicker = (props) => {
  const { name, title, onChange, value } = props;

  return (
    <div className="datepicker">
      <p className="title">{title}</p>
      <div className="input-wrap">
        <input
          type="time"
          name={name}
          onChange={(e) => onChange(e)}
          value={value}
          required
        />
      </div>
    </div>
  )
}

export default TimePicker