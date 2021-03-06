const {Patient, Prescripteur, Pharmacien, Mutuelle} =  require("./createAccounts");
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
let bcrypt = require('bcrypt');
const {PORT, USER, PASSWORD} = require("./const");
let cors = require('cors')
const {suppClient} = require("./fonctionsMutuelle");
const {selectOrdo, updateDate, useSoin, selectListOrdo, Ordonnance, Categorie, Soin, addGenerique, getNomMedecin, getNomPatient, addPrix, deleteAllOrdonnancesAndPatientAndUtilisateur} = require("./fonctionsOrdonnance");
const {createDataMailClient} = require("./fonctionsMail");
const crypto = require('crypto');

//variables
let code = ""; //Id en fonction du role
let id = ""; //IdUtilisateur
let role = "";
let nom = "";


app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: "opheli"
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.post('/check', (req,res) => {
  let access = false
  switch (req.body.code) {
    case 'liste': //liste des ordonnances
      access = (role !== "")
      break;
    case 'listeClients': //liste des ordonnances
      access = (role === "mutuelle")
      break;
    case 'profil': //page de profil
      access = (role !== "")
      break;
    case 'ordonnance': //page ordonnance
      access = (role !== "")
      break;
    case 'creer': //page de profil
      access = (role !== "")
      break;
    case 'modifier': //page modifier ordonnance
      access = (role === "medecin")
      break;
    case 'valider': //page valider ordonnance
      access = (role === "pharma")
      break;

  }
  res.send(access);
})

//ADMIN
app.get('/listePatients',(req,res) => {
  request = "SELECT IdUtilisateur, NomUtilisateur, PrenomUtilisateur, Mail, IdPatient from opheli.patient NATURAL JOIN opheli.utilisateur";
  db.query(request, (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    res.send(array);
  });
})

app.get('/listePresc',(req,res) => {
  request = "SELECT IdUtilisateur, NomUtilisateur, PrenomUtilisateur, Mail, IdPrescripteur from opheli.prescripteur NATURAL JOIN opheli.utilisateur";
  db.query(request, (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    res.send(array);
  });
})

app.get('/listePharma',(req,res) => {
  request = "SELECT IdUtilisateur, NomUtilisateur, PrenomUtilisateur, Mail, IdPharmacien from opheli.pharmacien NATURAL JOIN opheli.utilisateur";
  db.query(request, (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    res.send(array);
  });
})

app.get('/listeMutuelle',(req,res) => {
  request = "SELECT IdMutuelle, NomMutuelle, Mail, IdMutuelle from opheli.mutuelle";
  db.query(request, (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    res.send(array);
  });
})

app.post('/suppPatient',(req,res) => {
  deleteSoins = "DELETE FROM soin WHERE IdCategorie IN (SELECT IdCategorie FROM categorie WHERE IdOrdonnance IN (SELECT IdOrdonnance FROM ordonnance WHERE IdPatient = ?))"
  db.query(deleteSoins, [req.body.code], (err, rep)=> {
    deleteCat = "DELETE FROM categorie WHERE IdOrdonnance IN (SELECT IdOrdonnance FROM ordonnance WHERE IdPatient = ?)"
    db.query(deleteCat, [req.body.code], ()=> {
      deleteOrdo = "DELETE FROM ordonnance WHERE IdPatient = ?"
      db.query(deleteOrdo, [req.body.code], ()=> {
        deleteSouscrire = "DELETE FROM `opheli`.`souscrire` WHERE `IdPatient` = ?;";
        db.query(deleteSouscrire, [req.body.code], ()=> {
          deletePatient = "DELETE FROM patient WHERE IdUtilisateur = ?"
          db.query(deletePatient, [req.body.id], ()=> {
            deleteUser = "DELETE FROM utilisateur WHERE IdUtilisateur = ?"
            db.query(deleteUser, [req.body.id], ()=> {
              return res.send("success")
            });
          });
        });
      });
    });
  });
})

app.post('/suppPharmacien',(req,res) => {
  deletePharma = "DELETE FROM `opheli`.`pharmacien` WHERE `IdUtilisateur` = ?;";
  db.query(deletePharma, [req.body.id], ()=> {
    deleteUser = "DELETE FROM `opheli`.`utilisateur` WHERE `IdUtilisateur` = ?;";
    db.query(deletePharma, [req.body.id], ()=> {
      return res.send("success");
    });
  });
})

app.post('/suppMutuelle',(req,res) => {
  deleteSouscrire = "DELETE FROM `opheli`.`souscrire` WHERE `IdMutuelle` = ?;";
  db.query(deleteSouscrire, [req.body.id], ()=> {
    deleteMutuelle = "DELETE FROM `opheli`.`mutuelle` WHERE `IdMutuelle` = ?;";
    db.query(deleteMutuelle, [req.body.id], ()=> {
      return res.send("success");
    });
  });

})

app.post('/createCode',(req,res) => {
  const date = new Date(req.body.date);
  const code = crypto.randomBytes(5).toString('hex');
  const request = "INSERT INTO `opheli`.`code` (`Code`, `DateCreation`, `Utilisation`) VALUES (?, ?, '0');"
  db.query(request, [code,date.toLocaleDateString("en-ZA")], (err, array)=> {
    return res.send(code)
  });
})

//PROFIL
app.get('/profil', (req, res) => {
  if (role == 'client') {
    request = "SELECT NomUtilisateur, PrenomUtilisateur, Mail, Sexe, Taille, Poids from opheli.utilisateur NATURAL JOIN opheli.patient where IdUtilisateur  = ?";
  } else if (role == 'pharmacien' || role == 'medecin') {
    request = "SELECT NomUtilisateur, PrenomUtilisateur, Mail from opheli.utilisateur where IdUtilisateur  = ?";
  } else {
    request = "SELECT IdMutuelle, Mail, NomMutuelle from opheli.mutuelle where IdMutuelle = ?"
  }
  db.query(request, [id], (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    res.send(array)
  });
})

app.post('/taille', (req,res) => {
  request = "UPDATE `opheli`.`patient` SET `Taille` = ? WHERE (`IdPatient` = ?) and (`IdUtilisateur` = ?);"
  db.query(request, [req.body.taille, code, id], (err, array)=> {
    return res.end("success")
  });
})

app.post('/poids', (req,res) => {
  request = "UPDATE `opheli`.`patient` SET `Poids` = ? WHERE (`IdPatient` = ?) and (`IdUtilisateur` = ?);"
  db.query(request, [req.body.poids, code, id], (err, array)=> {
    return res.end("success")
  });
})

app.post('/email', (req,res) => {
  if (role == 'mutuelle') {
    request = "UPDATE `opheli`.`mutuelle` SET `Mail` = ? WHERE `IdMutuelle` = ?;"
  } else {
    request = "UPDATE `opheli`.`utilisateur` SET `Mail` = ? WHERE `IdUtilisateur` = ?;"
  }
  db.query(request, [req.body.mail, id], (err, array)=> {
    return res.end("success")
  });
})

app.post('/mdp', (req,res) => {
  if (role == 'mutuelle') {
    request = "SELECT MotDePasse from mutuelle WHERE IdMutuelle = ?"
  } else {
    request = "SELECT MotDePasse from utilisateur WHERE IdUtilisateur = ?"
  }
  db.query(request, [id], (err, mdp)=> {
    bcrypt.compare(req.body.oldPw, mdp[0].MotDePasse, function(err, bonmdp) {
      if (bonmdp == true) {
        if (role == 'mutuelle') {
          request = "UPDATE `opheli`.`mutuelle` SET `MotDePasse` = ? WHERE `IDMutuelle` = ?;"
        } else {
          request = "UPDATE `opheli`.`utilisateur` SET `MotDePasse` = ? WHERE `IdUtilisateur` = ?;"
        }
        bcrypt.hash(req.body.newPw, 8, (err, hash) => {
          db.query(request, [hash, id], (err, mdp)=> {
            return res.end("success");
          });
        });
      } else {
        return res.end("Mauvais mot de passe")
      }
    });
  });

  request = "UPDATE `opheli`.`utilisateur` SET `Mail` = ? WHERE `IdUtilisateur` = ?;"
  db.query(request, [req.body.mail, id], (err, array)=> {
    return res.end("success")
  });
})

//HEADER
app.get('/infos', (req,res) => {
  const array = {
    code: code,
    id: id,
    role: role,
    nom: nom
  }
  res.send(array);
})

app.get('/deconnexion', (req,res) => {
  code = "";
  id = "";
  role = "";
  nom = "";
});

//LOGIN + REGISTER
app.get('/liste_pharmacies', (req,res) => {
  request = "SELECT * from opheli.pharmacie NATURAL JOIN opheli.adresse";
  db.query(request, (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    res.send(array)
  });
});

app.get('/liste_specialites', (req,res) => {
  request = "SELECT * from opheli.specialite";
  db.query(request, (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    res.send(array)
  });
});

app.post('/client', (req,res) => {
  //V??rification secu
  request = "SELECT IdPatient from patient WHERE IdPatient = ?;";
  db.query(request, [req.body.secu], (err, verif)=> {
    if (verif.length != 0) {
      return res.end("Un compte avec ces identifiants existe d??j??.")
    }
    //Cr??ation compte
    bcrypt.hash(req.body.mdp, 8, (err, hash) => {
      const patient = new Patient(req.body.secu, req.body.nom, req.body.prenom, req.body.mail,hash, req.body.date);
      const message = patient.addToDatabase(db)
      if (message !== 'error') {
        code = req.body.secu
        id = message
        role = 'client'
        nom = req.body.prenom+" "+req.body.nom
        return res.end('success')
      } else {
        return res.end("Une erreur est survenue durant la cr??ation de votre profil.")
      }
    });
  });
});

app.post('/medecin', (req,res) => {
  //V??rification rpps
  let request = "SELECT IdPrescripteur from prescripteur WHERE IdPrescripteur = ?;";
  db.query(request, [req.body.rpps], (err, verif)=> {
    if (verif.length != 0) {
      return res.end("Un compte avec ces identifiants existe d??j??.")
    }
    //V??rification code
    request = "SELECT * FROM opheli.code WHERE Code = ?"
    db.query(request, [req.body.codepro], (err, rep)=> {
      if (rep.length != 0) {
        const request = "UPDATE `opheli`.`code` SET `Utilisation` = '1' WHERE `Code` = ?"
        db.query(request, [req.body.codepro],(err,rep)=>{
          //Cr??ation compte
          bcrypt.hash(req.body.mdp, 8, (err, hash) => {
            const prescripteur = new Prescripteur(req.body.rpps, req.body.specialite, req.body.rue, req.body.code, req.body.ville, req.body.nom, req.body.prenom, req.body.mail, req.body.spe, hash)
            const message = prescripteur.addToDatabase(db,req.body.rpps)
            if (message != 'error') {
              code = req.body.rpps
              id = message
              role = 'medecin'
              nom = req.body.prenom+" "+req.body.nom
              return res.end('success')
            } else {
              return res.end("Une erreur est survenue durant la cr??ation de votre profil.")
            }
          });
        });
      } else {
        res.end("Code incorrect.")
      }
    });
  });
});

app.post('/pharmacien', (req,res) => {
  //V??rification rpps
  let request = "SELECT IdPharmacien from pharmacien WHERE IdPharmacien = ?;";
  db.query(request, [req.body.rpps], (err, verif)=> {
    if (verif.length != 0) {
      return res.end("Un compte avec ces identifiants existe d??j??.")
    }
    //V??rification code
    request = "SELECT * FROM opheli.code WHERE Code = ?"
    db.query(request, [req.body.codepro], (err, rep)=> {
      if (rep.length != 0) {
        const request = "UPDATE `opheli`.`code` SET `Utilisation` = '1' WHERE `Code` = ?"
        db.query(request, [req.body.codepro]);
        //Cr??ation compte
        bcrypt.hash(req.body.mdp, 8, (err, hash) => {
          const pharmacien = new Pharmacien(req.body.rpps, req.body.idp, req.body.nomp, req.body.rue, req.body.code, req.body.ville, req.body.nom, req.body.prenom, req.body.mail, hash)
          const message = pharmacien.addToDatabase(db)
          if (message != 'error') {
            code = req.body.rpps
            id = message
            role = 'pharma'
            nom = req.body.prenom+" "+req.body.nom
            return res.end('success')
          } else {
            return res.end("Une erreur est survenue durant la cr??ation de votre profil.")
          }
        });
      } else {
        res.end("Code incorrect.")
      }
    });
  });
});

app.post('/mutuelle', (req,res) => {
  //V??rification mutelle
  let request = "SELECT IdMutuelle from pharmacien WHERE IdMutuelle = ?;";
  db.query(request, [req.body.identifiant], (err, verif)=> {
    if (verif != null) {
      return res.end("Un compte avec ces identifiants existe d??j??.")
    }
    //V??rification code
    request = "SELECT * FROM opheli.code WHERE Code = ?"
    db.query(request, [req.body.codepro], (err, rep)=> {
      if (rep.length != 0) {
        const request = "UPDATE `opheli`.`code` SET `Utilisation` = '1' WHERE `Code` = ?"
        db.query(request, [req.body.codepro]);
        //Cr??ation compte
        bcrypt.hash(req.body.mdp, 8, (err, hash) => {
          const mutuelle = new Mutuelle(req.body.identifiant, req.body.mail, req.body.nom, hash)
          const message = mutuelle.addToDatabase(db)
          if (message != 'error') {
            code = req.body.identifiant
            id = message
            role = 'mutuelle'
            nom = req.body.nom
            return res.end('success')
          } else {
            return res.end("Une erreur est survenue durant la cr??ation de votre profil.")
          }
        });
      } else {
        res.end("Code incorrect.")
      }
    });
  });
});

app.post('/login',(req,res) => {
  const secu = req.body.id;
  let password = req.body.password;
  const roleUser = req.body.role;
  let request ="";
  switch (roleUser) {
    case 'medecin':
      request = "SELECT IdUtilisateur from prescripteur WHERE IdPrescripteur = ?;";
      break;
    case 'pharma':
      request = "SELECT IdUtilisateur from pharmacien WHERE IdPharmacien = ?;";
      break;
    case 'mutuelle':
      request = "SELECT IdMutuelle from mutuelle WHERE IdMutuelle = ?;";
      break;
    default:
      request = "SELECT IdUtilisateur from patient WHERE IdPatient = ?;";
      break;
  }
  db.query(request, [req.body.id], (err, iduser)=> {
    if (iduser == null || iduser.length == 0) {
      return res.end('error')
    }
    let idGlobal = ""
    let nomGlobal = ""
    if (roleUser == 'mutuelle') {
      request = "SELECT MotDePasse, NomMutuelle from mutuelle WHERE IdMutuelle = ?;";
      idGlobal = req.body.id
    } else {
      request = "SELECT MotDePasse, NomUtilisateur, PrenomUtilisateur from utilisateur WHERE IdUtilisateur = ?;";
      idGlobal = iduser[0].IdUtilisateur
    }
    db.query(request, [idGlobal], (err, mdp)=> {
      bcrypt.compare(password, mdp[0].MotDePasse, function(err, bonmdp) {

        if (bonmdp == true) {
          if (roleUser == 'mutuelle') {
            nomGlobal = mdp[0].NomMutuelle
          } else {
            nomGlobal = mdp[0].PrenomUtilisateur+" "+mdp[0].NomUtilisateur
          }
          code = secu
          id = idGlobal
          role = roleUser
          nom = nomGlobal
          return res.end('success');
        } else {
          return res.end('error')
        }
      });
    });
  });
})

app.post('/loginAdmin', (req,res) => {
  const secu = req.body.id;
  let password = req.body.password;
  const roleUser = req.body.role;
  let request = "SELECT IdUtilisateur from admin WHERE IdUtilisateur = ?;";
  db.query(request, [req.body.id], (err, iduser)=> {
    if (iduser == null || iduser.length == 0) {
      return res.end('error')
    }
    request = "SELECT MotDePasse, NomUtilisateur, PrenomUtilisateur from utilisateur WHERE IdUtilisateur = ?;";
    db.query(request, [iduser[0].IdUtilisateur], (err, mdp)=> {
      bcrypt.compare(password, mdp[0].MotDePasse, function(err, bonmdp) {
        if (bonmdp == true) {
          const nomGlobal = mdp[0].PrenomUtilisateur+" "+mdp[0].NomUtilisateur
          code = secu
          id = iduser[0].IdUtilisateur
          role = roleUser
          nom = nomGlobal
          return res.end('success');
        } else {
          return res.end('error')
        }
      });
    });
  });
})

//MUTUELLE
app.get('/listeClients',(req,res) => {
  request = "SELECT NomUtilisateur, PrenomUtilisateur, Mail, opheli.patient.IdPatient  from opheli.souscrire, opheli.patient NATURAL JOIN opheli.utilisateur WHERE opheli.souscrire.IdPatient = opheli.patient.IdPatient AND opheli.souscrire.IdMutuelle = ?";
  db.query(request,[id], (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    res.send(array)
  });
})

app.post('/suppClient', (req, res) => {
  suppClient(db,id,req.body.idClient)
})

app.get('/listeMutuelles', (req,res) => {
  request = "SELECT NomMutuelle from opheli.mutuelle NATURAL JOIN opheli.souscrire WHERE IdPatient  = ?";
  db.query(request,[code], (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    res.send(array)
  });
})

app.post('/ajoutMutuelle',(req,res) => {
  request = "INSERT INTO `opheli`.`souscrire` (`IdMutuelle`, `IdPatient`) VALUES (?, ?);";
  db.query(request,[req.body.mutuelle,code], ()=> {
    res.send('success')
  });
})


//ORDONNANCES
//cr??er une ordonnance
app.post('/createOrdonnance', (req, res) => {

  const idPatient = req.body.idPatient,
      idPrescripteur = req.body.idPrescripteur,
      date = req.body.dateCreation,
      type = req.body.type,
      nbRenouvTotal = req.body.nbRenouvTotal,
      soinsSimples = req.body.soinsSimples,
      notes = req.body.notes;

  //formattage de la date
  const newDate = new Date(date);
  const dateExp = new Date (newDate);
  dateExp.setMonth(dateExp.getMonth() + 3)

  //const dateCreation = "" + newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDay();
  const dateCreation = newDate.toLocaleDateString("en-ZA");
  //const dateExpiration = "" + dateExp.getFullYear() + "-" + (dateExp.getMonth() + 1) + "-" + dateExp.getDay();
  const dateExpiration = dateExp.toLocaleDateString("en-ZA");

  const ordonnance = new Ordonnance(type, dateCreation, dateExpiration, notes, idPrescripteur, idPatient);

  const categorieSimple = new Categorie('simple', nbRenouvTotal);
  soinsSimples.forEach((s) => {
    const soin = new Soin(s.name, s.desc, nbRenouvTotal);
    categorieSimple.addSoin(soin);
  })
  ordonnance.addCategorie(categorieSimple);
  createDataMailClient(db, ordonnance.idPatient, "new");

  if(type === 'bizone'){
    const nbRenouvTotalALD = req.body.nbRenouvTotalALD,
        soinsALD = req.body.soinsALD;
    const categorieALD = new Categorie('bizone', nbRenouvTotalALD);
    soinsALD.forEach((s) => {
      const soin = new Soin(s.name, s.desc, nbRenouvTotalALD);
      categorieALD.addSoin(soin);
    })
    ordonnance.addCategorie(categorieALD);
  }

  ordonnance.addToDatabase(db);
})

//get les infos de l'ordonnance selon le r??le
app.post('/getOrdonnance', (req, res) => {
  const idOrdo = req.body.idOrdo;
  const role = req.body.role;
  const select = selectOrdo(role, idOrdo);
  db.query(select, [idOrdo], (err, result) => {
    res.send(result);
  })
})

//get la liste des ordos selon le r??le
app.get('/getListeOrdonnances', (req, res) => {
  const select = selectListOrdo(role);
  db.query(select, [code], (err, result) => {
    res.send(result);
  })
})

//prolonger l'ordonnance de nbMois mois
app.post('/prolongerOrdonnance', (req, res) => {
  const idOrdo = req.body.idOrdo;
  const nbMois = req.body.nbMois;
  updateDate(db, idOrdo, nbMois);
})

//r??duit le nombre d'utilisations restantes de tous les soins de la liste Soins en entr??e et add le g??n??rique (sauf s'il est nul)
app.post('/updateSoins', (req, res) => {
  const Soins = req.body.soinsDelivres;
  Soins.forEach((Soin) => {
    useSoin(db, Soin.id);
    if(Soin.generique !== null){
      addGenerique(db, Soin.id, Soin.generique);
    }
    if(Soin.price !== null){
      addPrix(db, Soin.id, Soin.price);
    }
  })
  const idPatientQuery = "SELECT o.IdPatient FROM ordonnance o INNER JOIN categorie c on c.IdOrdonnance = o.IdOrdonnance INNER JOIN soin s on s.IdCategorie = c.IdCategorie WHERE s.IdSoin = ?;";
  db.query(idPatientQuery, [Soins[0].id], (err, result) => {
    createDataMailClient(db, result[0].IdPatient, "used");
  });
});

app.post('/getNomMedecin', (req, res) => {
  if(id !== null){
    const selectNom = "SELECT u.NomUtilisateur, u.PrenomUtilisateur FROM prescripteur p INNER JOIN utilisateur u on u.IdUtilisateur = p.IdUtilisateur WHERE IdPrescripteur = ?;";
    db.query(selectNom, [id], (err, result) => {
      res.send(result);
    })
  }
})

app.post('/getNomPatient', (req, res) => {
  if(id !== null){
    const selectNom = "SELECT u.NomUtilisateur, u.PrenomUtilisateur, p.Sexe FROM patient p INNER JOIN utilisateur u on u.IdUtilisateur = p.IdUtilisateur WHERE IdPatient = ?;";
    db.query(selectNom, [id], (err, result) => {
      res.send(result);
    })
  }
})

app.post('/TestQRcode', (req, res) => {
})

app.listen(8080, () => {
  console.log("Le serveur est bien lanc??");
});
