// formatDateInSpanish.js
const formatDateInSpanish = (dateInput) => {
  // Convertir la entrada a un objeto Date si es una cadena
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  // Validar que date sea un objeto Date válido
  if (!(date instanceof Date) || isNaN(date.getTime())) return "";

  // Definir los nombres de los días y meses en español
  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek}, ${day} de ${month} de ${year}`;
};

export default formatDateInSpanish;
