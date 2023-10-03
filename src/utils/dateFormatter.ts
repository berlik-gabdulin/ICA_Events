const dateFormatter = (date: string): string => {
  if (!date.includes('.')) return date;

  if (date.includes('.')) {
    const splitDate = date.split('.');
    const rightDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    return rightDate;
  }

  return date;
};

export default dateFormatter;
