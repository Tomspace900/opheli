const express = require('express');
//var router = express.Router();
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");

const db = mysql.createPool({
  host: "localhost",
  port:3306,
  user: "root",
  password: "Bqyagooc45",
  database: "opheli"
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.post('/login',(req,res) => {
  const id = req.body.id;
  const password = req.body.password;
  const role = req.body.role;
  console.log(role);
  let request ="";
  switch (role) {
    case 'medecin':
      request = "SELECT IdUtilisateur from prescripteur WHERE IdPrescripteur = '?';";
      break;
    case 'pharma':
      request = "SELECT IdUtilisateur from pharmacien WHERE IdPharmacien = '?';";
      break;
    default:
      request = "SELECT IdUtilisateur from patient WHERE SecuriteSociale = '?';";
      break;
  }
  db.query(request, (err, result)=> {
    console.log(result)
  });
  /*
  db.query(request, (err, result)=> {
    console.log(result)
    console.log(err)
  });*/
})

app.post('/api/insert', (req,res) => {
  const id = req.body.id;
  console.log(id);
});

app.get("/",(req,res) => {
  const sqlInsert = "SELECT * FROM utilisateur"
  //const sqlInsert = "INSERT INTO `utilisateur` (`IdUtilisateur`, `Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (NULL, 'Test', 'test', 'mail', 'a');"
  db.query(sqlInsert, (err, result)=> {
    res.send("hello pedro");
    console.log(result)
    console.log(err)
  });
});

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
