var express = require("express");
const serverless = require("serverless-http");
var nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
app.listen(process.env.PORT || 3000);

const client = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sagmayam@gmail.com",
    pass: process.env.GMPASS,
  },
});

const sendMail = (email, code) => {
  client.sendMail({
    from: '"Sagmayam | IIT Gandhinagar" <sagmayam@gmail.com>',
    to: email,
    subject: "[Onam Food Coupon]",
    html: "<b>Hello world?</b>",
  });
};

app.get("/send", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  sendMail(req.query.email, req.query.code);
  //localhost:3000/send?code=2605&email=ananthujp@gmail.com
  res.send("Done");
});

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
//module.exports = app;
module.exports.handler = serverless(app);
