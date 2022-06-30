const {Patient, Prescripteur, Pharmacien, Mutuelle} =  require("./createAccounts");
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
let bcrypt = require('bcrypt');
const {PORT, USER, PASSWORD} = require("./const");
let cors = require('cors')
const {checkCode} = require("./createAccounts");
const {suppClient} = require("./fonctionsMutuelle");
const {selectOrdo, updateDate, useSoin, selectListOrdo, Ordonnance, Categorie, Soin} = require("./fonctionsOrdonnance");
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
  console.log(access)
  res.send(access);
})

//PROFIL
app.get('/profil', (req, res) => {
  request = "SELECT NomUtilisateur, PrenomUtilisateur, Mail, Sexe, Taille, Poids from opheli.utilisateur NATURAL JOIN opheli.patient where IdUtilisateur  = ?";
  db.query(request, [id], (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    res.send(array)
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
  //Vérification secu
  request = "SELECT IdPatient from patient WHERE IdPatient = ?;";
  db.query(request, [req.body.secu], (err, verif)=> {
    if (verif.length != 0) {
      return res.end("Un compte avec ces identifiants existe déjà.")
    }
    //Création compte
    bcrypt.hash(req.body.mdp, 8, (err, hash) => {
      const patient = new Patient(req.body.secu,req.body.nom,req.body.prenom,req.body.mail,hash)
      const message = patient.addToDatabase(db)
      if (message != 'error') {
        code = req.body.secu
        id = message
        role = 'client'
        nom = req.body.prenom+" "+req.body.nom
        return res.end('success')
      } else {
        return res.end("Une erreur est survenue durant la création de votre profil.")
      }
    });
  });
});

app.post('/medecin', (req,res) => {
  //Vérification rpps
  let request = "SELECT IdPrescripteur from prescripteur WHERE IdPrescripteur = ?;";
  db.query(request, [req.body.rpps], (err, verif)=> {
    if (verif.length != 0) {
      return res.end("Un compte avec ces identifiants existe déjà.")
    }
    //Vérification code
    request = "SELECT * FROM opheli.code WHERE Code = ?"
    db.query(request, [req.body.codepro], (err, rep)=> {
      if (rep.length != 0) {
        const request = "UPDATE `opheli`.`code` SET `Utilisation` = '1' WHERE `Code` = ?"
        db.query(request, [req.body.codepro],(err,rep)=>{
          //Création compte
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
              return res.end("Une erreur est survenue durant la création de votre profil.")
            }
          });
        });
      } else {
        res.end("Code incorrect.")
      }
    });
  });
});

app.post('/pharma', (req,res) => {
  //Vérification rpps
  let request = "SELECT IdPharmacien from pharmacien WHERE IdPharmacien = ?;";
  db.query(request, [req.body.rpps], (err, verif)=> {
    if (verif != null) {
      return res.end("Un compte avec ces identifiants existe déjà.")
    }
    //Vérification code
    request = "SELECT * FROM opheli.code WHERE Code = ?"
    db.query(request, [req.body.codepro], (err, rep)=> {
      if (rep.length != 0) {
        const request = "UPDATE `opheli`.`code` SET `Utilisation` = '1' WHERE `Code` = ?"
        db.query(request, [req.body.codepro]);
        //Création compte
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
            return res.end("Une erreur est survenue durant la création de votre profil.")
          }
        });
      } else {
        res.end("Code incorrect.")
      }
    });
  });
});

app.post('/mutuelle', (req,res) => {
  //Vérification mutelle
  let request = "SELECT IdMutuelle from pharmacien WHERE IdMutuelle = ?;";
  db.query(request, [req.body.identifiant], (err, verif)=> {
    if (verif != null) {
      return res.end("Un compte avec ces identifiants existe déjà.")
    }
    //Vérification code
    request = "SELECT * FROM opheli.code WHERE Code = ?"
    db.query(request, [req.body.codepro], (err, rep)=> {
      if (rep.length != 0) {
        const request = "UPDATE `opheli`.`code` SET `Utilisation` = '1' WHERE `Code` = ?"
        db.query(request, [req.body.codepro]);
        //Création compte
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
            return res.end("Une erreur est survenue durant la création de votre profil.")
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
  db.query(request,[req.body.mutuelle,code], (err, array)=> {
    res.send('success')
  });
})
//ORDONNANCES


//créer une ordonnance
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
  const dateExp = new Date (newDate.setMonth(newDate.getMonth() + 3));

  const dateCreation = "" + newDate.getFullYear() + "-" + newDate.getMonth() + "-" + newDate.getDay();
  const dateExpiration = "" + dateExp.getFullYear() + "-" + dateExp.getMonth() + "-" + dateExp.getDay();

  const ordonnance = new Ordonnance(type, dateCreation, dateExpiration, notes, idPrescripteur, idPatient);

  const categorieSimple = new Categorie('simple', nbRenouvTotal);
  soinsSimples.forEach((s) => {
    const soin = new Soin(s.name, s.desc, nbRenouvTotal);
    categorieSimple.addSoin(soin);
  })
  ordonnance.addCategorie(categorieSimple);

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

//get les infos de l'ordonnance selon le rôle
app.post('/getOrdonnance', (req, res) => {
  const idOrdo = req.body.idOrdo;
  const role = req.body.role;
  const select = selectOrdo(role, idOrdo);
  db.query(select, [idOrdo], (err, result) => {
    res.send(result);
  })
})

//get la liste des ordos selon le rôle
app.post('/getListeOrdonnances', (req, res) => {
  const role = req.body.role;
  const id = req.body.id;
  const select = selectListOrdo(role);
  db.query(select, [id], (err, result) => {
    res.send(result);
  })
})

//prolonger l'ordonnance de nbMois mois
app.post('/prolongerOrdonnance', (req, res) => {
  const idOrdo = req.body.idOrdo;
  const nbMois = req.body.nbMois;
  updateDate(db, idOrdo, nbMois);
})

//réduit le nombre d'utilisations restantes de tous les soins de la liste idSoins en entrée
app.post('/updateSoins', (req, res) => {
  //TODO voir comment recevoir les strings des génériques pour update les soins
  const idSoins = req.body.idSoins;
  idSoins.forEach((idSoin) => {
    useSoin(db, idSoin);
  })
})

app.listen(8080, () => {
  console.log("Le serveur est bien lancé");
});