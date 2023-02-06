var express = require("express");
const serverless = require("serverless-http");
var nodemailer = require("nodemailer");
const app = express();
const router = express.Router();
app.listen(process.env.PORT || 3000);

const client = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "iitgn.me@gmail.com",
    pass: "ssvcyprewayztovv",
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
  res.send("Success");
});

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
app.use("./netlify/functions/api", router);
module.exports.handler = serverless(app);
