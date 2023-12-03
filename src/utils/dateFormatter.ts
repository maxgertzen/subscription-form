export const formatDate = (date: Date | null): string => {
  if (!date) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  return `${year}${dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth}${
    month < 10 ? `0${month}` : month
  }`;
};

export const convertToDate = (dateString?: string): Date | null => {
  if (!dateString) return null;
  // Extract year, day, and month components
  const year = dateString.substring(0, 4);
  const day = dateString.substring(4, 6);
  const month = dateString.substring(6, 8);

  // Rearrange to "YYYY-MM-DD" format
  const formattedDate = year + '-' + month + '-' + day;

  // Create a new Date object
  return new Date(formattedDate);
};
