const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const {Utilisateur} = require("./createAccounts");

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
    },
    auth: {
        user: 'no-reply.opheli@outlook.fr',
        pass: 'Mehdi2000!'
    }
})

const sendMail = (db, ID, usage)  => {

    switch (usage) {
        case "new":
            var data = [];
            const queryNom = "SELECT NomUtilisateur FROM utilisateur,patient WHERE utilisateur.IdUtilisateur=patient.IdUtilisateur AND utilisateur.IdUtilisateur=?;";
            const queryPrenom = "SELECT PrenomUtilisateur FROM utilisateur,patient WHERE utilisateur.IdUtilisateur=patient.IdUtilisateur AND utilisateur.IdUtilisateur=?;";
            const querySexe = "SELECT Sexe FROM utilisateur,patient WHERE utilisateur.IdUtilisateur=patient.IdUtilisateur AND utilisateur.IdUtilisateur=?;";

            db.query(queryNom, [ID], (err, result) => {
                    var newItem = {
                        'nom': "test"
                    };
                    data.push(newItem);
                }, () => {
                console.log(data);
            });


            break;
        case "used":

            break;
        case "send":

            break;
    }

    let templateFile = fs.readFileSync("../opheli-back-end/mailTemplate.html", "utf8");
    let templateCompiled = handlebars.compile(templateFile);
    let htmlToSend = templateCompiled(data);

    var mailOptions = {
        from: "Mehdi DEMILE d'Opheli <no-reply.opheli@outlook.fr>",
        to: 'maximilien.bildstein@gmail.com',
        subject: 'Sending Email using Node.js',
        html: htmlToSend
    }

    /* transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });*/
}

module.exports = {sendMail}
