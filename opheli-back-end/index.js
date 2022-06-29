const {Patient, Prescripteur, Pharmacien, Mutuelle} =  require("./createAccounts");
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
const {PORT, USER, PASSWORD} = require("./const");
var cors = require('cors')
const {suppClient} = require("./fonctionsMutuelle");
//variables
var code = ""; //Id en fonction du role
var id = ""; //IdUtilisateur
var role = "";
var nom = "";


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
      access = (role != "")
      break;
    case 'listeClients': //liste des ordonnances
      access = (role == "mutuelle")
      break;
    case 'profil': //page de profil
      access = (role != "")
      break;
    case 'ordonnance': //page ordonnance
      access = (role != "")
      break;
    case 'creer': //page de profil
      access = (role != "")
      break;
    case 'modifier': //page modifier ordonnance
      access = (role == "prescripteur")
      break;
    case 'valider': //page valider ordonnance
      access = (role == "pharmacien")
      break;

  }
  console.log(access)
  res.send(access);
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

app.post('/patient', (req,res) => {
  //Vérification secu
  request = "SELECT IdPatient from patient WHERE IdPatient = ?;";
  db.query(request, [req.body.secu], (err, verif)=> {
    if (verif != null) {
      return res.end("Un compte avec ces identifiants existe déjà.")
    }
  });
  //Création compte
  bcrypt.hash(req.body.mdp, 8, (err, hash) => {
    const patient = new Patient(req.body.secu,req.body.nom,req.body.prenom,req.body.mail,hash)
    const message = patient.addToDatabase(db)
    if (message != 'error') {
      code = req.body.secu
      id = message
      role = 'patient'
      nom = req.body.prenom+" "+req.body.nom
      return res.end('success')
    } else {
      return res.end("Une erreur est survenue durant la création de votre profil.")
    }
  });
});

app.post('/prescripteur', (req,res) => {
  //Vérification rpps
  request = "SELECT IdPrescripteur from prescripteur WHERE IdPrescripteur = ?;";
  db.query(request, [req.body.rpps], (err, verif)=> {
    if (verif.length != 0) {
      return res.end("Un compte avec ces identifiants existe déjà.")
    }
  });
  //Création compte
  bcrypt.hash(req.body.mdp, 8, (err, hash) => {
    const prescripteur = new Prescripteur(req.body.rpps, req.body.specialite, req.body.rue, req.body.code, req.body.ville, req.body.nom, req.body.prenom, req.body.mail, hash)
    const message = prescripteur.addToDatabase(db,req.body.rpps)
    if (message != 'error') {
      code = req.body.rpps
      id = message
      role = 'prescripteur'
      nom = req.body.prenom+" "+req.body.nom
      return res.end('success')
    } else {
      return res.end("Une erreur est survenue durant la création de votre profil.")
    }
  });
});

app.post('/pharmacien', (req,res) => {
  //Vérification rpps
  request = "SELECT IdPharmacien from pharmacien WHERE IdPharmacien = ?;";
  db.query(request, [req.body.rpps], (err, verif)=> {
    if (verif != null) {
      return res.end("Un compte avec ces identifiants existe déjà.")
    }
  });
  //Création compte
  bcrypt.hash(req.body.mdp, 8, (err, hash) => {
    const pharmacien = new Pharmacien(req.body.rpps, req.body.idp, req.body.nomp, req.body.rue, req.body.code, req.body.ville, req.body.nom, req.body.prenom, req.body.mail, hash)
    const message = pharmacien.addToDatabase(db)
    if (message != 'error') {
      code = req.body.rpps
      id = message
      role = 'pharmacien'
      nom = req.body.prenom+" "+req.body.nom
      return res.end('success')
    } else {
      return res.end("Une erreur est survenue durant la création de votre profil.")
    }
  });
});

app.post('/mutuelle', (req,res) => {
  //Vérification mutelle
  request = "SELECT IdMutuelle from pharmacien WHERE IdMutuelle = ?;";
  db.query(request, [req.body.identifiant], (err, verif)=> {
    if (verif != null) {
      return res.end("Un compte avec ces identifiants existe déjà.")
    }
  });
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
      request = "SELECT MotDePasse, Nom from mutuelle WHERE IdMutuelle = ?;";
      idGlobal = req.body.id
    } else {
      request = "SELECT MotDePasse, Nom, Prenom from utilisateur WHERE IdUtilisateur = ?;";
      idGlobal = iduser[0].IdUtilisateur
    }
    db.query(request, [idGlobal], (err, mdp)=> {
      bcrypt.compare(password, mdp[0].MotDePasse, function(err, bonmdp) {
        console.log(bonmdp)
        if (bonmdp == true) {
          if (roleUser == 'mutuelle') {
            nomGlobal = mdp[0].Nom
          } else {
            nomGlobal = mdp[0].Prenom+" "+mdp[0].Nom
          }
          code = idGlobal
          id = secu
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
  request = "SELECT Nom, Prenom, Mail, opheli.patient.IdPatient  from opheli.souscrire, opheli.patient NATURAL JOIN opheli.utilisateur WHERE opheli.souscrire.IdPatient = opheli.patient.IdPatient AND opheli.souscrire.IdMutuelle = ?";
  db.query(request,[id], (err, array)=> {
    array = JSON.parse(JSON.stringify(array));
    console.log(array)
    res.send(array)
  });
})

app.post('/suppClient', (req, res) => {
  suppClient(db,id,req.body.idClient)
})

//ORDONNANCES
app.post('/getOrdo',(req, res) => {
  const idOrdo = req.body.idOrdo;
  const sqlRequest = 'SELECT * FROM ordonnance WHERE IdOrdonnance = ?';
  db.query(sqlRequest, [idOrdo], (err, result) => {
    res.send(result);
  })
})

app.post('/getOrdonnance', (req, res) => {
  const idOrdo = req.body.idOrdo;
  //const request = "INSERT INTO ordonnance(IdOrdonnance, DatePrescription, Type, SecuriteSociale, IdPrescripteur) VALUES (12345, '2020-12-23', 'simple', 12345, 12345)";
  const request = "SELECT * FROM ordonnance WHERE IdOrdonnance = ?";
  db.query(request, [idOrdo], (err, result) => {
    res.send(result);
    //res.send("success");
  })
})

app.listen(8080, () => {
  console.log("Le serveur est bien lancé");
});