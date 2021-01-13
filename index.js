const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mail = require('nodemailer');
require('dotenv').config() 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/send-mail', async (req, res) => {
    
    const abrarUser = await req.body
    
    res.send(abrarUser)
    
    
    
    var transporter = mail.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    var mailOptions = {
        to: 'houssemchaouachi09@gmail.com',
        from: process.env.EMAIL,
        subject: 'Abrar One',
        text: 'Bonjour Mr Houssem, vous avez recu un mail de Mr/Mme ' + abrarUser.nom + ' :' + '\n\n'
        + abrarUser.msg + '\n\n' + "Voici les coordonnées de l'utilisateur:" + '\n\n' + abrarUser.email + '\n\n'
        + abrarUser.tel,
    }
    
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.send({ message: "email error" })
            
        } else {
            res.send({ message: "email send succesfully" })
            
        };
    });
});
const port = 3000  ;


app.listen(port, () => {
    console.log(`listen to http://localhost:${port}`);
})