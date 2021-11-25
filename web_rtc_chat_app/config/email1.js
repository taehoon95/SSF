const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    auth: {
        user: "rppr001@naver.com",
        pass: "ghtlf12!@"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports = { smtpTransport }