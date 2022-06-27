class Utilisateur {
    id = 0
    constructor(nom, prenom, mail, mdp) {
        this.nom = nom
        this.prenom = prenom
        this.mail = mail
        this.mdp = mdp
    }
}

class Patient extends Utilisateur {
    constructor(secu, nom, prenom, mail, mdp) {
        super(nom, prenom, mail, mdp);
        this.secu = secu
    }

    addToDatabase(db) {
        const user = "INSERT INTO `opheli`.`utilisateur` (`Nom`, `Prénom`, `Mail`, `MotDePasse`) VALUES (?, ?, ?, ?);";
        db.query(user, [this.nom,this.prenom,this.mail,this.mdp]);
        const verif = "SELECT IdUtilisateur FROM utilisateur WHERE Nom = ? AND Prénom = ? AND Mail = ?";
        db.query(verif, [this.nom,this.prenom,this.mail,this.mdp], (err, res)=> {
            const request = "INSERT INTO `opheli`.`patient` (`IdPatient`, `IdUtilisateur`) VALUES (?, ?);";
            db.query(request, [this.secu,res[0].IdUtilisateur]);
        });
    }
}

class Prescripteur extends Utilisateur {
    constructor(rpps, specialite, rue, code, ville, nom, prenom, mail, mdp) {
        super(nom, prenom, mail, mdp);
        this.rpps = rpps
        this.specialite = specialite
        this.rue = rue
        this.code = code
        this.ville = ville
    }


    addtoDatabase(db) {
        const user = "INSERT INTO `opheli`.`utilisateur` (`Nom`, `Prénom`, `Mail`, `MotDePasse`) VALUES (?, ?, ?, ?);";
        db.query(user, [this.nom,this.prenom,this.mail,this.mdp]);
        //Récuperation ID utilisateur
        const verifUser = "SELECT IdUtilisateur FROM utilisateur WHERE Nom = ? AND Prénom = ? AND Mail = ?";
        db.query(verifUser, [this.nom,this.prenom,this.mail,this.mdp], (err, id)=> {
            //Verification Adresse
            const verifAdresse = "SELECT IdAdresse FROM adresse WHERE Rue = ? AND CodePostal = ? AND Ville = ?";
            db.query(verifAdresse, [this.rue,this.code,this.ville], (err, add)=> {
                if (add[0].IdAdresse == null) {
                    //Création adresse
                    const adresse = "INSERT INTO `opheli`.`adresse` (`Rue`, `CodePostal`, `Ville`) VALUES (?, ?, ?);";
                    db.query(adresse, [this.rue,this.code,this.ville]);
                }
                //Récuperation ID adresse
                const verifAdresse = "SELECT IdAdresse FROM adresse WHERE Rue = ? AND CodePostal = ? AND Ville = ?";
                db.query(verifAdresse, [this.rue,this.code,this.ville], (err, add)=> {
                    //Création prescripteur
                    const prescripteur = "INSERT INTO `opheli`.`prescripteur` (`IdPrescripteur`, `IdAdresse`, `IdSpécialité`, `IdUtilisateur`) VALUES (?, ?, ?, ?);"
                    db.query(prescripteur, [this.rpps,add[0].IdAdresse,this.specialite,id[0].IdUtilisateur], (err, add)=> {
                        console.log(err)
                    });
                });
            });
        });
    }
}


module.exports = {Utilisateur, Patient, Prescripteur}