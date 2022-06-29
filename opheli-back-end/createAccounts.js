class Utilisateur {
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
        const user = "INSERT INTO `opheli`.`utilisateur` (`Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (?, ?, ?, ?);";
        db.query(user, [this.nom,this.prenom,this.mail,this.mdp], (err, res)=> {
            const verif = "SELECT IdUtilisateur FROM utilisateur WHERE Nom = ? AND Prenom = ? AND Mail = ?";
            db.query(verif, [this.nom,this.prenom,this.mail,this.mdp], (err, res)=> {
                const request = "INSERT INTO `opheli`.`patient` (`IdPatient`, `IdUtilisateur`) VALUES (?, ?);";
                db.query(request, [this.secu,res[0].IdUtilisateur], (err, res)=> {
                    const request = "SELECT IdUtilisateur from utilisateur NATURAL JOIN patient WHERE IdPatient = ?"
                    db.query(request, [this.secu], (err, verif)=> {
                        if (verif != []) {
                            return verif[0].IdUtilisateur
                        } else {
                            return 'error'
                        }
                    });
                });
            });
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

    addToDatabase(db) {
        const user = "INSERT INTO `opheli`.`utilisateur` (`Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (?, ?, ?, ?);";
        db.query(user, [this.nom,this.prenom,this.mail,this.mdp], (err, id)=> {
            //Récuperation ID utilisateur
            const verifUser = "SELECT IdUtilisateur FROM utilisateur WHERE Nom = ? AND Prenom = ? AND Mail = ?";
            db.query(verifUser, [this.nom,this.prenom,this.mail,this.mdp], (err, id)=> {
                //Verification Adresse
                const verifAdresse = "SELECT IdAdresse FROM adresse WHERE Rue = ? AND CodePostal = ? AND Ville = ?";
                db.query(verifAdresse, [this.rue,this.code,this.ville], (err, add)=> {
                    if (add.length == 0) {
                        //Création adresse
                        const adresse = "INSERT INTO adresse (`Rue`, `CodePostal`, `Ville`) VALUES (?, ?, ?);";
                        db.query(adresse, [this.rue,this.code,this.ville], (err, add)=> {
                            //Récuperation ID adresse
                            db.query(verifAdresse, [this.rue,this.code,this.ville], (err, add)=> {
                                //Création prescripteur
                                const prescripteur = "INSERT INTO `opheli`.`prescripteur` (`IdPrescripteur`, `IdAdresse`, `IdSpecialite`, `IdUtilisateur`) VALUES (?, ?, ?, ?);"
                                db.query(prescripteur, [this.rpps,add[0].IdAdresse,1,id[0].IdUtilisateur],(err, add)=> {
                                    //Vérification de la création du compte
                                    const request = "SELECT IdUtilisateur from opheli.prescripteur NATURAL JOIN opheli.utilisateur WHERE IdPrescripteur = ?"
                                    db.query(request, [this.rpps], (err, ver)=> {
                                        if (ver.length != 0) {
                                            return ver[0].IdUtilisateur
                                        } else {
                                            return ('error')
                                        }
                                    });
                                });
                            });
                        });
                    } else {
                        db.query(verifAdresse, [this.rue,this.code,this.ville], (err, add)=> {
                            //Création prescripteur
                            const prescripteur = "INSERT INTO `opheli`.`prescripteur` (`IdPrescripteur`, `IdAdresse`, `IdSpecialite`, `IdUtilisateur`) VALUES (?, ?, ?, ?);"
                            db.query(prescripteur, [this.rpps,add[0].IdAdresse,1,id[0].IdUtilisateur], (err,add) => {
                                //Vérification de la création du compte
                                const request = "SELECT IdUtilisateur from opheli.prescripteur NATURAL JOIN opheli.utilisateur WHERE IdPrescripteur = ?"
                                db.query(request, [this.rpps], (err, ver)=> {
                                    if (ver.length != 0) {
                                        return ver[0].IdUtilisateur
                                    } else {
                                        return ('error')
                                    }
                                });
                            });
                        });
                    }
                });
            });
        });
    }
}

class Pharmacien extends Utilisateur {
    constructor(rpps, idp, nomp, rue, code, ville, nom, prenom, mail, mdp) {
        super(nom, prenom, mail, mdp);
        this.rpps = rpps
        this.idp = idp
        this.nomp = nomp
        this.rue = rue
        this.code = code
        this.ville = ville
    }

    addToDatabase(db) {
        const user = "INSERT INTO `opheli`.`utilisateur` (`Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (?, ?, ?, ?);";
        db.query(user, [this.nom,this.prenom,this.mail,this.mdp]);
        //Récuperation ID utilisateur
        const verifUser = "SELECT IdUtilisateur FROM utilisateur WHERE Nom = ? AND Prenom = ? AND Mail = ?";
        db.query(verifUser, [this.nom,this.prenom,this.mail,this.mdp], (err, id)=> {
            //Verification pharmacie
            if(this.nomp == '') {
                //Creation pharmacien
                const pharmacien = "INSERT INTO `opheli`.`pharmacien` (`IdPharmacien`, `IdPharmacie`, `IdUtilisateur`) VALUES (?, ?, ?);"
                db.query(pharmacien, [this.rpps,this.idp,id[0].IdUtilisateur], (err, add)=> {
                    //Vérification de la création du compte
                    const request = "SELECT IdUtilisateur from opheli.pharmacien NATURAL JOIN opheli.utilisateur WHERE IdPharmacien = ?"
                    db.query(request, [this.rpps], (err, ver)=> {
                        if (ver.length != 0) {
                            return ver[0].IdUtilisateur
                        } else {
                            return ('error')
                        }
                    });
                });
            } else {
                //Verification Adresse
                const verifAdresse = "SELECT IdAdresse FROM adresse WHERE Rue = ? AND CodePostal = ? AND Ville = ?";
                db.query(verifAdresse, [this.rue,this.code,this.ville], (err, add)=> {
                    if (add.length == 0) {
                        //Création adresse
                        const adresse = "INSERT INTO `opheli`.`adresse` (`Rue`, `CodePostal`, `Ville`) VALUES (?, ?, ?);";
                        db.query(adresse, [this.rue,this.code,this.ville], (err, add)=> {
                            console.log(err)
                            return this.createPharmacie(db,id[0].IdUtilisateur)
                        });
                    } else {
                        return this.createPharmacie(db,id[0].IdUtilisateur)
                    }
                });
            }
        });
    }

    createPharmacie(db,id) {
        //Récuperation ID adresse
        const verifAdresse = "SELECT IdAdresse FROM adresse WHERE Rue = ? AND CodePostal = ? AND Ville = ?";
        db.query(verifAdresse, [this.rue,this.code,this.ville], (err, add)=> {
            //Création pharmacie
            const pharmacie = "INSERT INTO `opheli`.`pharmacie` (`NomPharmacie`, `IdAdresse`) VALUES (?, ?);"
            db.query(pharmacie, [this.nomp, add[0].IdAdresse], (err, pharm)=> {
                //Récuperation ID pharmacie
                const verifAdresse = "SELECT IdPharmacie FROM pharmacie WHERE NomPharmacie = ? AND IdAdresse = ?;"
                db.query(verifAdresse, [this.nomp, add[0].IdAdresse], (err, phar) => {
                    const pharmacien = "INSERT INTO `opheli`.`pharmacien` (`IdPharmacien`, `IdPharmacie`, `IdUtilisateur`) VALUES (?, ?, ?);"
                    db.query(pharmacien, [this.rpps, phar[0].IdPharmacie, id], (err, add) => {
                        //Vérification de la création du compte
                        const request = "SELECT IdUtilisateur from opheli.pharmacien NATURAL JOIN opheli.utilisateur WHERE IdPharmacien = ?"
                        db.query(request, [this.rpps], (err, ver) => {
                            if (ver.length != 0) {
                                return ver[0].IdUtilisateur
                            } else {
                                return ('error')
                            }
                        });
                    });
                });
            });
        });
    }
}

class Mutuelle {
    constructor(id,mail,nom,mdp) {
        this.id = id
        this.mail = mail
        this.nom = nom
        this.mdp = mdp
    }

    addToDatabase(db) {
        const user = "INSERT INTO `opheli`.`mutuelle` (`IdMutuelle`, `Mail`, `Nom`, `MotDePasse`) VALUES (?, ?, ?, ?);";
        db.query(user, [this.id,this.mail,this.nom,this.mdp], (err, add)=> {
            //Vérification de la création du compte
            const request = "SELECT IdMutuelle from opheli.mutuelle WHERE IdMutuelle = ?"
            db.query(request, [this.id], (err, ver) => {
                if (ver.length != 0) {
                    return ver[0].IdMutuelle
                } else {
                    return ('error')
                }
            });
        });
    }
}

module.exports = {Utilisateur, Patient, Prescripteur, Pharmacien, Mutuelle}