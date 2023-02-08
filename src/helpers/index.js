export const TimeToFloat = (time) => {
  const timeSplit = time.split(':');

  const floatTime = timeSplit.map(item => {
    return item[0] === '0' ? item.replace('0', '') : item
  });

  return Number(floatTime.join('.'));
}