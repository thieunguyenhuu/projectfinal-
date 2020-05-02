const filterStatus = (value) => {
  let color;
  switch (value) {
    case 1:
      color = "secondary";
      break;
    case 2:
      color = "warning";
      break;
    case 3:
      color = "primary";
      break;
    case 4:
      color = "success";
      break;
    case 5:
      color = "danger";
      break;
  }

  return color;
};

module.exports = { filterStatus };
