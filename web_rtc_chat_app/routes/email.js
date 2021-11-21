// 11 19 강동하 api/email라우터 구현
// 11 19 강동하 email 전송 api 구현
var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const { smtpTransport } = require("../config/email");

router.post("/", (req, res, next) => {

    var generateRandom = function (min, max) {
        var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return ranNum;
    };
      
    const number = generateRandom(111111, 999999);

    console.log(req.body.u_email);
    const sendEmail = req.body.u_email;
    const mailOptions = {
        from: "dhk970703@naver.com",
        to: sendEmail,
        subject: "[SSF]인증 관련 이메일 입니다",
        text: "안뇽 오른쪽 숫자 6자리를 입력해주세요 : " + number,
    };

    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status = 400;
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status = 200;
            res.body = {
                "email" : number
            };
        } 
    });
    // dhk970703@naver.com
    res.send({ number });
});

module.exports = router;
