module.exports = {
  env: {
    backendURL:
      process.env.NODE_ENV === 'production'
        ? 'https://stormy-bastion-27700.herokuapp.com'
        : 'http://localhost:4000',
    frontendURL:
      process.env.NODE_ENV === 'production'
        ? 'https://send-nine.vercel.app'
        : 'http://localhost:3000',
  },
};
