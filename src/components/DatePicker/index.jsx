import React from 'react';

const DatePicker = (props) => {
  const { name, title, onChange, value } = props;

  return (
    <div className="datepicker">
      <p className="title">{title}</p>
      <div className="input-wrap">
        <input
          type="date"
          name={name}
          onChange={(e) => onChange(e)}
          value={value}
          required
        />
      </div>
    </div>
  )
}

export default DatePicker