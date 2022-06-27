const {Utilisateur, Patient, Prescripteur} =  require("./createAccounts");
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
const {PORT, USER, PASSWORD} = require("./const");
var cors = require('cors')
//variables
var code = "";
var id = "";

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

app.post('/login',(req,res) => {
  const secu = req.body.id;
  let password = req.body.password;
  const role = req.body.role;
  let request ="";
  switch (role) {
    case 'medecin':
      request = "SELECT IdUtilisateur from prescripteur WHERE IdPrescripteur = ?;";
      break;
    case 'pharma':
      request = "SELECT IdUtilisateur from pharmacien WHERE IdPharmacien = ?;";
      break;
    default:
      request = "SELECT IdUtilisateur from patient WHERE SecuriteSociale = ?;";
      break;
  }
  db.query(request, [secu], (err, iduser)=> {
    if (iduser == null || iduser.length == 0) {
      return res.end("Les données entrées ne correspondent pas à celles d'un compte.")
    }
    console.log(iduser)
    request = "SELECT MotDePasse from utilisateur WHERE IdUtilisateur = ?;";
    db.query(request, [iduser[0].IdUtilisateur], (err, mdp)=> {
      bcrypt.compare(password, mdp[0].MotDePasse, function(err, bonmdp) {
        if (bonmdp == true) {
          code = iduser[0].IdUtilisateur;
          id = secu;
          return res.redirect('http://localhost:3000/list');
        } else {
          return res.end("Les données entrées ne correspondent pas à celles d'un compte.")
        }
      });
    });
  });
})

app.post('/getOrdo',(req, res) => {
  const idOrdo = req.body.idOrdo;
  const sqlRequest = 'SELECT * FROM ordonnance WHERE IdOrdonnance = ?';
  db.query(sqlRequest, [idOrdo], (err, result) => {
    res.send(result);
  })
})

app.post('')

app.listen(8080, () => {
  console.log("Le serveur est bien lancé");
});

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/

app.post('/getOrdonnance', (req, res) => {
  const idOrdo = req.body.idOrdo;
  //const request = "INSERT INTO ordonnance(IdOrdonnance, DatePrescription, Type, SecuriteSociale, IdPrescripteur) VALUES (12345, '2020-12-23', 'simple', 12345, 12345)";
  const request = "SELECT * FROM ordonnance WHERE IdOrdonnance = ?";
  db.query(request, [idOrdo], (err, result) => {
    res.send(result);
    //res.send("success");
  })
})