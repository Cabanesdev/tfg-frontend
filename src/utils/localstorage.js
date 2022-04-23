const saveSession = (token) => localStorage.setItem('token', token);

const getSession = () => localStorage.getItem('token');

const deleteSession = () => localStorage.removeItem('token');

export { saveSession, getSession, deleteSession };
