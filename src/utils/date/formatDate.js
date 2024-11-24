const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatEventDate = date => {
  const [year, month, day] = date?.split("-");
  const monthName = monthNames[parseInt(month) - 1];

  return `${monthName} ${day}, ${year}`;
};
