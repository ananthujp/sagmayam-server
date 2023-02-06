var express = require("express");
const serverless = require("serverless-http");
var nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
app.listen(process.env.PORT || 3000);

const client = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "iitgn.me@gmail.com",
    pass: process.env.GMPASS,
  },
});

const sendMail = (email, code) => {
  client.sendMail({
    from: "iitgn.me@gmail.com",
    to: email,
    subject: "Verification code",
    text: "Your verification code is :" + code,
  });
};

app.get("/send", (req, res) => {
  sendMail(req.query.email, req.query.code);
  //localhost:3000/send?code=2605&email=ananthujp@gmail.com
  res.send(process.env.GMPASS);
});

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
//module.exports = app;
module.exports.handler = serverless(app);
