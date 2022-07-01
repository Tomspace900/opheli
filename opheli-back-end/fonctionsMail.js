const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

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

let templateFile = fs.readFileSync("../opheli-back-end/mailTemplate.html", "utf8");
let templateCompiled = handlebars.compile(templateFile);

var data = {
    nom : "",
    prenom : "",
    sexe : ""
}

const createDataNewOrdo = (db, ID) => {
    const queryNom = "SELECT NomUtilisateur FROM utilisateur,patient WHERE utilisateur.IdUtilisateur=patient.IdUtilisateur AND utilisateur.IdUtilisateur=?;";
    const queryPrenom = "SELECT PrenomUtilisateur FROM utilisateur,patient WHERE utilisateur.IdUtilisateur=patient.IdUtilisateur AND utilisateur.IdUtilisateur=?;";
    const querySexe = "SELECT Sexe FROM utilisateur,patient WHERE utilisateur.IdUtilisateur=patient.IdUtilisateur AND utilisateur.IdUtilisateur=?;";

    db.query(queryNom, [ID], (err, result) => {
        data.nom = result[0].NomUtilisateur;
        db.query(queryPrenom, [ID], (err, result) => {
            data.prenom = result[0].PrenomUtilisateur;
            db.query(querySexe, [ID], (err, result) => {
                if ((result[0].Sexe)===0) {
                    data.sexe=" M. ";
                }
                else if ((result[0].Sexe)===1) {
                    data.sexe=" Mme ";
                }

                var htmlToSend = templateCompiled(data);
                sendMail(htmlToSend);
            });
        });
    });

}

const createDataUsedOrdo = (db, ID) => {
}

const sendMail = (htmlToSend, mailAddress, mailSubject)  => {
    const mailOptions = {
        from: "Mehdi DEMILE d'Opheli <no-reply.opheli@outlook.fr>",
        to: mailAddress,
        subject: mailSubject,
        html: htmlToSend
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {createDataNewOrdo, createDataUsedOrdo, sendMail}
