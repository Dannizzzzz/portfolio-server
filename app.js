const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');

// server used to send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.get('/', (req, res) => {
  res.send('Hello World');
});
// var port = process.env.PORT || 5001;
app.listen(5001, () => console.log('Server Running'));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'oliviazhang096@gmail.com',
    pass: 'nowpwypeqkaeyutm',
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Ready to Send');
  }
});

router.post('/contact', (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: 'oliviazhang096@gmail.com',
    subject: 'Contact Form Submission - Portfolio',
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: 'Message Sent' });
    }
  });
});
