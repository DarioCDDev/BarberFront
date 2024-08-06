// convertToISO8601.js
function convertToISO8601(dateString, timeString) {
  const date = new Date(dateString);
  const [hours, minutes] = timeString.split(":");
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const isoString = `${year}-${month}-${day}T${hours}:${minutes}:00`;

  return isoString;
}

export default convertToISO8601;
