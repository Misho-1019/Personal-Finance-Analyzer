export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const turnDateFormat = (dateIso) => {
  return dateIso.split('T')[0] 
}
