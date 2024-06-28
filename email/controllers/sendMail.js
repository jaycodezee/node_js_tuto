const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  // let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter  = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "brenna.hills@ethereal.email",
      pass: "UfH7DvDcKX1mjXfWXS",
    },
  });

  let info = await transporter.sendMail({
    from: '"Vinod Thapa 👻" <brenna.hills@ethereal.email>', // sender address
    to: "jaykyada3700@gmail.com", // list of receivers
    subject: "Hello Thapa", // Subject line
    text: "Hello YT Thapa", // plain text body
    html: "<b>Hello YT Thapa</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);
};

module.exports = sendMail;
