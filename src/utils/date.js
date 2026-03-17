export const postedAt = (date) => {
  const postedDate = new Date(date);
  const now = new Date();

  const time = now - postedDate;

  const second = Math.floor(time / 1000);
  const minute = Math.floor(second / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  switch (true) {
    case second < 60:
      return 'Baru saja';
    case minute < 60:
      return `${minute} menit yang lalu`;
    case hour < 24:
      return `${hour} jam yang lalu`;
    default:
      return `${day} beberapa hari yag lalu`;
  }
};
