const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function send(options = {}) {
  let transporter = nodemailer.createTransport({
    host: "smtp.test.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "i@test.com", // generated ethereal user
      pass: 'test', // generated ethereal password 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"test" <i@test.com>', // sender address
    to: "test@test.com", // list of receivers
    subject: "V2EX通知", // Subject line
    text: "V2EX通知", // plain text body
    html: "V2EX通知", // html body
    ...options
  });
}
module.exports = {
  send
}