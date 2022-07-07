const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply.opheli@gmail.com',
        pass: 'xrunwakdjfhjdklf'
    },
    logger: true,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
});

let templateFile = fs.readFileSync("../opheli-back-end/mailTemplate.html", "utf8");
let templateCompiled = handlebars.compile(templateFile);
const queryNom = "SELECT NomUtilisateur FROM utilisateur,patient WHERE utilisateur.IdUtilisateur=patient.IdUtilisateur AND patient.IdPatient=?;";
const queryPrenom = "SELECT PrenomUtilisateur FROM utilisateur,patient WHERE utilisateur.IdUtilisateur=patient.IdUtilisateur AND patient.IdPatient=?;";
const querySexe = "SELECT Sexe FROM utilisateur,patient WHERE utilisateur.IdUtilisateur=patient.IdUtilisateur AND patient.IdPatient=?;";
const queryMail = "SELECT Mail FROM utilisateur,patient WHERE utilisateur.IdUtilisateur=patient.IdUtilisateur AND patient.IdPatient=?;";

var data = {
    nom : "",
    prenom : "",
    sexe : "",
    sujet : "",
    texte : ""
}

const createDataMailClient = (db, ID, usage) => {

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
                db.query(queryMail, [ID], (err, result) => {
                    if (usage==="new") {
                        data.sujet="Nouvelle ordonnance disponible";
                        data.texte="Une nouvelle ordonnance est disponible sur votre compte Opheli."
                    }
                    else if (usage==="used") {
                        data.sujet="Ordonnance utilisée";
                        data.texte="Une ordonnance a été utilisée sur votre compte Opheli."
                    }
                    var htmlToSend = templateCompiled(data);
                    sendMail(htmlToSend, result[0].Mail, data.sujet);
                });
            });
        });
    });

}

const createDataMailCode = () => {

}

const sendMail = (htmlToSend, mailAddress, mailSubject)  => {
    const mailOptions = {
        from: "Mehdi DEMILE d'Opheli <no-reply.opheli@test.com>",
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

module.exports = {createDataMailClient, sendMail}
