var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      type: 'OAuth2',
    user: 'piyushgupta310820@gmail.com',
    pass: 'Piyush@1234',
    clientId: '927465179953-kmev12n0t14t6khum90rpnedh9vcs7e4.apps.googleusercontent.com',
        clientSecret: '9Jlnm0GmQOcb9_pXCNrClpil',
        refreshToken: '1//042FKaHRQVLHLCgYIARAAGAQSNwF-L9IrcnSLiLHWfOvOQ_0A7Bh01ZuKuoDwGVU9muUro28jmsV2ntsJGKWUjnWVMUrOLBBb5n4'
  }
});

var mailOptions = {
  from: 'piyushgupta310820@gmail.com',
  to: 'nityadtt@gmail.com',
  subject: 'Sending Email using Node.js',
  html: `<h1>Hello Nitya !!!!</h1>
  <div>How are u?</div>
  `
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
