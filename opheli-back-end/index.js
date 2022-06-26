const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
const {PORT, USER, PASSWORD} = require("./const");
//variables

const db = mysql.createPool({
  host: "localhost",
  port:PORT,
  user: USER,
  password: PASSWORD,
  database: "opheli"
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.post('/login',(req,res) => {
  const id = req.body.id;
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
  db.query(request, [id], (err, result)=> {
    console.log(result)
    request = "SELECT MotDePasse from utilisateur WHERE IdUtilisateur = ?;";
    db.query(request, [result[0].IdUtilisateur], (err, result)=> {
      bcrypt.compare(password, result[0].MotDePasse, function(err, result) {
        if (result != true) {
          result.end()
        }
      });
    });
  });
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(8080, () => {
  console.log("work");
});

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/
