export const getTime = (date) => {
  const now = Date.now();
  const diff = now - new Date(date).getTime();

  if (diff < 0) return `a l'instant`;

  const second = Math.floor(diff / 1000);
  if (second < 1000) return `${second} secondes`;

  const minutes = Math.floor(second / 60);
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h`;

  const days = Math.floor(hours / 24);
  if (days < 24) return `${days > 1 ? days + " jours" : days + " jour"}`;
};
