const usernameFormatter = (username) => {
  return `@${username}`
}

const dateFormatter = (date) => {
  const formatedDate = new Date(date);

  const day = formatedDate.getDate() < 10
    ? `0${formatedDate.getDate()}`
    : formatedDate.getDate();

  const month = formatedDate.getMonth() + 1 < 10
    ? `0${formatedDate.getMonth() + 1}`
    : formatedDate.getMonth() + 1;

  const year = formatedDate.getFullYear();

  return `${day}-${month}-${year}`;
};

const datePostFormatter = (date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const formatedDate = new Date(date);

  const day = formatedDate.getDate() < 10
    ? `0${formatedDate.getDate()}`
    : formatedDate.getDate();

  const month = monthNames[formatedDate.getMonth()]

  const year = formatedDate.getFullYear().toString().substr(-2)

  return `${month} ${day} '${year}`
}

export { usernameFormatter, dateFormatter, datePostFormatter }
