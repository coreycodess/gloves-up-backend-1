const randomCode = () => {
  return Math.floor(Math.floor(100000 + Math.random() * 900000));
};

export default randomCode;