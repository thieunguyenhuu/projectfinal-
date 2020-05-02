const dateFilter = (value) => {
  const date = new Date(value);
  return date.toLocaleString(["vi-VI"], {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const dateTimeFilter = (value) => {
  const date = new Date(value);
  return date.toLocaleString(["vi-VI"], {
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

module.exports = { dateFilter, dateTimeFilter };
