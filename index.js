const express = require('express');
const app  = express();
const bodyParser = require('body-parser');
const cors = require ('cors');
const port = 3000;
const mail = require('nodemailer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.post('/send-mail', async (req, res) => {
   
    const abrarUser = await req.body

    res.send(abrarUser)
  


    var transporter = mail.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'houssemm09@gmail.com',
            pass: 'mjgpomjvykjmyahe'
        }
    });
    var mailOptions = {
        to: 'houssemchaouachi09@gmail.com',
        from: 'houssemm09@gmail.com',
        subject: 'Abrar One',
        text: 'Bonjour Mr Houssem, vous avez recu un mail de Mr/Mme' + abrarUser.nom  +' :' + '\n\n'
         + abrarUser.message + '\n\n'+ 'voici les coordonnées de l utilisateur' + abrarUser.email 
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

app.listen(port,()=>{
    console.log(`listen to http://localhost:${port}`);
})