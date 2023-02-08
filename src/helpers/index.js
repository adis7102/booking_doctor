export const ValidateForm  = (data) => {
  let error = null;

  for (const key in data) {
    if(data[key] === null || data[key] === "") {
      error = {
        errorField: key
      }

      break;
    } else if(data[key] === "duration") {
      if(data[key]["duration"]["minute"] === null && data[key]["duration"]["hour"] === null) {
        error = {
          errorField: key
        }
  
        break;
      }
    }
  }

  return error
}

export const TimeToFloat = (time) => {
  const timeSplit = time.split(':');

  const floatTime = timeSplit.map(item => {
    return item[0] === '0' ? item.replace('0', '') : item
  });

  return Number(floatTime.join('.'));
}