const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    auth: {
        user: "dhk970703@naver.com",
        pass: "dhktld6931@"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports = { smtpTransport }