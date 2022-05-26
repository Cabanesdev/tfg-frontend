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

const dateTimeFormatter = (date) => {
  const formatedDate = new Date(date);

  const day = formatedDate.getDate() < 10
    ? `0${formatedDate.getDate()}`
    : formatedDate.getDate();

  const month = formatedDate.getMonth() + 1 < 10
    ? `0${formatedDate.getMonth() + 1}`
    : formatedDate.getMonth() + 1;

  const year = formatedDate.getFullYear();

  const hours = formatedDate.getHours() < 10
    ? `0${formatedDate.getHours()}`
    : formatedDate.getHours();

  const minutes = formatedDate.getMinutes() < 10
    ? `0${formatedDate.getMinutes()}`
    : formatedDate.getMinutes();

  const seconds = formatedDate.getSeconds() < 10
    ? `0${formatedDate.getSeconds()}`
    : formatedDate.getSeconds();

  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

}

const profileDateFormatter = (date) => {
  const formatedDate = new Date(date);
  const month = formatedDate.toLocaleString('default', { month: 'long' });
  const year = formatedDate.getFullYear().toString().slice(-2)

  return `${month} ${year}`
}

const urlFormatter = (url) => {
  return url.replace(/(?:https?|ftp):\/\//, '');
}

export { usernameFormatter, dateFormatter, datePostFormatter, profileDateFormatter, urlFormatter, dateTimeFormatter }
