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

  const formatedDate = new Date(date);

  const day = formatedDate.getDate() < 10
    ? `0${formatedDate.getDate()}`
    : formatedDate.getDate();

  const month = formatedDate.toLocaleString('default', { month: 'short' });

  const year = formatedDate.getFullYear().toString().slice(-2);

  return `${month} ${day} '${year}`
}

const profileDateFormatter = (date) => {
  const formatedDate = new Date(date);
  const month = formatedDate.toLocaleString('default', { month: 'long' });
  const year = formatedDate.getFullYear().toString().slice(-2)

  return `${month} ${year}`
}

export { usernameFormatter, dateFormatter, datePostFormatter, profileDateFormatter }
