module.exports = {
  env: {
    backendURL: 'http://localhost:4000',
    frontendURL:
      process.env.NODE_ENV === 'production'
        ? 'https://send-nine.vercel.app'
        : 'http://localhost:3000',
  },
};
