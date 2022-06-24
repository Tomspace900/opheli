<?php
include '../utiles/connexion.php';
header('Access-Control-Allow-Origin: http://localhost:3000');
include("../utiles/connexion.php");

//récupération des données générales
$secu = $_POST['secu'];
$dateDebut = $_POST['date'];
$type = $_POST['type'];
$RPPS = null; //TODO numéro de médecin avec session ?
$nbRenouv = $_POST['nbRenouv'];

$idOrdo = createOrdo($bdd, $type, $dateDebut, $secu, $RPPS);

if($type == "simple") {
    $idCategorie = createCategorie($bdd, 'simple', $nbRenouv, $idOrdo);
    $soins = getSoins("Soin");
    createSoins($bdd, $soins, $idCategorie);
}
else if($type == "bizone") {
    $nbRenouvALD = $_POST['nbRenouvALD'];

    //récupération des soins depuis le form
    $soins = getSoins("Soin");
    $soinsALD = getSoins("SoinALD");

    //création des catégories
    $idCategorie = createCategorie($bdd, 'simple', $nbRenouv, $idOrdo);
    $idCategorieALD = createCategorie($bdd, 'ALD', $nbRenouvALD, $idOrdo);

    //création des soins
    createSoins($bdd, $soins, $idCategorie);
    createSoins($bdd, $soinsALD, $idCategorieALD);
}

//returns a list of soins (from the form)
function getSoins($nom) {
    $i = 1;
    $soins = array();
    while($_POST[$nom + $i] != null) {
        $soin = array($_POST['nom' + $nom + $i], $_POST['desc' + $nom + $i]);
        $soins.array_push($soin);
        $i++;
    }
    return $soins;
}

function createSoins($bdd, $soins, $idCategorie){
    foreach($soins as $soin) {
        createSoin($bdd, $soin[0], $soin[1], $idCategorie);
    }
}

//creates soin
function createSoin($bdd, $nom, $desc, $idCategorie) {
    $bdd -> query("INSERT INTO `soin` (`idSoin`, `nom`, `description`, `idCategorie`) VALUES (NULL, `$nom`, `$desc`, `$idCategorie`)");
}

//creates categorie and returns its id
function createCategorie($bdd, $type, $nbRenouv, $idOrdonnance) {
    $bdd -> query("INSERT INTO `categorie` (`idCategorie`, `type`, `nbRenouv`, `idOrdonnance`) VALUES (NULL, `$type`, `$nbRenouv`, `$idOrdonnance`)");
    return bdd -> query("SELECT idCategorie FROM `ordonnance` WHERE `idOrdonnance` = `$idOrdonnance` AND idCategorie = (SELECT MAX(idCategorie) FROM `ordonnance` WHERE ididOrdonnance = `$idOrdonnance`)");
}

//creates ordonnance and returns its id
function createOrdo($bdd, $type, $date, $idPatient, $idPrescripteur) {
    $bdd -> query("INSERT INTO `ordonnance` (`idOrdonnance`, `type`, `date`, `idPatient`, `idPrescripteur`) VALUES (NULL, `$type`, `$date`, `$idPatient`, `$idPrescripteur`)");
    return $bdd -> query("SELECT idOrdonnance FROM `ordonnance` WHERE idPatient = `$idPatient` AND idOrdonnance = (SELECT MAX(idOrdonnance) FROM `ordonnance` WHERE idPatient = `$idPatient`)");
}