const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const emailConfig = require('./.config.js');
const xoauth2 = require('xoauth2');
const transporter = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2: {
      user: emailConfig.user,
      clientId: emailConfig.clientId,
      clientSecret: emailConfig.clientSecret,
      refreshToken: emailConfig.refreshToken
    }

  }
});

app.set('port', 8082);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




app.get('/', function(req, res) {
    console.log("hola soy un loco");
    res.sendFile(__dirname+'/view/email-form.html');
});

app.post('/', function(req,res){
  console.log("Receives post request");
  console.log(req.body);
  var mailOptions = {
    to: req.body.to,
    from: "ergufe91@gmail.com",
    subject: req.body.subject,
    html: req.body.message
  };
  transporter.sendMail(mailOptions, function(err, info){
    if(err) {
      console.log(err.toString());
      return res.status(500).send("te jodiste");
    }
    res.send("Email sent: "+info);
  });
});


app.listen(app.get('port'), function() {
    console.log("server listening at " + app.get('port'));
});
