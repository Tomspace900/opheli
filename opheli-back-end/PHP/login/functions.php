<?php
function isUser($bdd, $mail, $pwd) {
    $t = $bdd -> query("SELECT * FROM utilisateur WHERE Mail = \"".$mail."\";");
    if ($t == false) {
        return 0; //si ce n'est pas un utilisateur
    } else {
        $test = mysqli_fetch_row($t);
        if (password_verify($pwd, $test[4])) {
            $medecin = $bdd -> query("SELECT * FROM medecin WHERE IdUtilisateur = \"".$test[0]."\";");
            if ($medecin == true) {
                return 4; //utilisateur medecin
            } else {
                $pharmacien = $bdd -> query("SELECT * FROM pharmacien WHERE IdUtilisateur = \"".$test[0]."\";");
                if ($pharmacien == true) {
                    return 3; //utilisateur pharmacien
                } else {
                    $admin = $bdd -> query("SELECT * FROM admin WHERE IdUtilisateur = \"".$test[0]."\";");
                    if ($admin == true) {
                        return 2; //utilisateur admin
                    }
                }
            }
            return 1;
        }
        return 0; //si ce n'est pas un utilisateur
    }
}

function isPatient($bdd, $secu, $pwd) {
    $t = $bdd -> query("SELECT IdUtilisateur FROM patient WHERE SecuriteSociale = \"".$secu."\";");
    if ($t == false) {
        return 0; //si ce n'est pas un utilisateur
    } else {
        $test = mysqli_fetch_row($t);
        $t = $bdd -> query("SELECT MotDePasse FROM utilisateur WHERE IdUtilisateur = \"".$test[0]."\";");
        $test = mysqli_fetch_row($t);
        if (password_verify($pwd, $test[0])) {
            $medecin = $bdd -> query("SELECT * FROM medecin WHERE IdUtilisateur = \"".$test[0]."\";");
            if ($medecin == true) {
                return 4; //utilisateur medecin
            } else {
                $pharmacien = $bdd -> query("SELECT * FROM pharmacien WHERE IdUtilisateur = \"".$test[0]."\";");
                if ($pharmacien == true) {
                    return 3; //utilisateur pharmacien
                } else {
                    $admin = $bdd -> query("SELECT * FROM admin WHERE IdUtilisateur = \"".$test[0]."\";");
                    if ($admin == true) {
                        return 2; //utilisateur admin
                    }
                }
            }
            return 1;
        }
        return 0; //si ce n'est pas un utilisateur
    }
}

function isPro($bdd, $code, $pwd) {
    $t = $bdd -> query("SELECT IdUtilisateur FROM prescripteur WHERE IdPrescripteur = \"".$code."\";");
    $t2 = $bdd -> query("SELECT IdUtilisateur FROM pharmacien WHERE IdPharmacien = \"".$code."\";");
    if ($t == false || $t2 == false) {
        return 0; //si ce n'est pas un utilisateur
    } else {
        if ($t == false) {
            $test = mysqli_fetch_row($t2);
        } else {
            $test = mysqli_fetch_row($t);
        }
        $t = $bdd -> query("SELECT MotDePasse FROM utilisateur WHERE IdUtilisateur = \"".$test[0]."\";");
        $test = mysqli_fetch_row($t);
        if (password_verify($pwd, $test[0])) {
            $medecin = $bdd -> query("SELECT * FROM medecin WHERE IdUtilisateur = \"".$test[0]."\";");
            if ($medecin == true) {
                return 4; //utilisateur medecin
            } else {
                $pharmacien = $bdd -> query("SELECT * FROM pharmacien WHERE IdUtilisateur = \"".$test[0]."\";");
                if ($pharmacien == true) {
                    return 3; //utilisateur pharmacien
                }
            }
        }
        return 0; //si ce n'est pas un utilisateur
    }
}

function createUser($bdd, $mail,$mdp,$nom,$prenom,$date,$num) {
    $t = $bdd -> query("SELECT * FROM utilisateur WHERE Mail = \"".$mail."\"");
    $test = mysqli_fetch_row($t);
    if ($test != null) {
        return false;
    } else {
        $bdd -> query("INSERT INTO `utilisateur` (`IdUtilisateur`, `Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (NULL, '".$nom."', '".$prenom."', '".$mail."', '".password_hash($mdp,PASSWORD_DEFAULT)."');");
        $t = $bdd -> query("SELECT * FROM utilisateur WHERE Mail = \"".$mail."\"");
        $id = mysqli_fetch_row($t);
        $bdd -> query("INSERT INTO `patient` (`SecuriteSociale`, `Date_de_naissance`, `Sexe`, `Taille`, `Poids`, `IdUtilisateur`) VALUES ('".$num."', '".$date."', NULL, NULL, NULL, '".$id[0]."');");
        return true;
    }
}

function createPharm1($bdd,$mail,$mdp,$nom,$prenom,$num,$nomp,$rue,$code,$ville) {
    $t = $bdd -> query("SELECT * FROM utilisateur WHERE Mail = \"".$mail."\"");
    $test = mysqli_fetch_row($t);
    if ($test != null) {
        return false;
    } else {
        $bdd -> query("INSERT INTO `utilisateur` (`IdUtilisateur`, `Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (NULL, '".$nom."', '".$prenom."', '".$mail."', '".password_hash($mdp,PASSWORD_DEFAULT)."');");
        $t = $bdd -> query("SELECT * FROM utilisateur WHERE Mail = \"".$mail."\"");
        $id = mysqli_fetch_row($t);
        $adresse = createAdress($bdd,$rue,$code,$ville);
        $pharm = createPharmacy($bdd,$nomp,$adresse);
        $bdd -> query("INSERT INTO `pharmacien` (`IdPharmacien`, `IdPharmacie`, `IdUtilisateur`) VALUES ('".$num."', '".$pharm."', '".$id[0]."');");
        return true;
    }
}
function createPharm2($bdd,$mail,$mdp,$nom,$prenom,$num,$pharm) {
    $t = $bdd -> query("SELECT * FROM utilisateur WHERE Mail = \"".$mail."\"");
    $test = mysqli_fetch_row($t);
    if ($test != null) {
        return false;
    } else {
        $bdd -> query("INSERT INTO `utilisateur` (`IdUtilisateur`, `Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (NULL, '".$nom."', '".$prenom."', '".$mail."', '".password_hash($mdp,PASSWORD_DEFAULT)."');");
        $t = $bdd -> query("SELECT * FROM utilisateur WHERE Mail = \"".$mail."\"");
        $id = mysqli_fetch_row($t);
        $bdd -> query("INSERT INTO `pharmacien` (`IdPharmacien`, `IdPharmacie`, `IdUtilisateur`) VALUES ('".$num."', '".$pharm."', '".$id[0]."');");
        return true;
    }
}

function createPharmacy($bdd, $nom, $adresse) {
    $t = $bdd -> query("SELECT * FROM pharmacie WHERE Nom = \"".$nom."\" AND IdAdresse = ".$adresse."");
    if ($t != false) {
        $pharm = mysqli_fetch_row($t);
        if ($pharm != null) {
            return $pharm[0];
        }
    }
    $bdd -> query("INSERT INTO `pharmacie` (`IdPharmacie`, `Nom`, `IdAdresse`) VALUES (NULL, '".$nom."', '".$adresse."');");
    $t = $bdd -> query("SELECT * FROM pharmacie WHERE Nom = \"".$nom."\" AND IdAdresse = '".$adresse."'");
    $pharm = mysqli_fetch_row($t);
    return $pharm[0];
}

function createAdress($bdd,$rue,$code,$ville) {
    $t = $bdd -> query("SELECT * FROM adresse WHERE Rue = \"".$rue."\" AND Code = \"".$code."\" AND Ville = \"".$ville."\";");
    $adresse = mysqli_fetch_row($t);
    if ($adresse != null) {
        return $adresse[0];
    }
    $bdd -> query("INSERT INTO `adresse` (`IdAdresse`, `Rue`, `Code`, `Ville`) VALUES (NULL, '".$rue."', '".$code."', '".$ville."');");
    $t = $bdd -> query("SELECT * FROM adresse WHERE Rue = \"".$rue."\" AND Code = \"".$code."\" AND Ville = \"".$ville."\";");
    $adresse = mysqli_fetch_row($t);
    return $adresse[0];
}

function createMedic($bdd, $mail,$mdp,$nom,$prenom,$num,$rue,$code,$ville) {
    $t = $bdd -> query("SELECT * FROM utilisateur WHERE Mail = \"".$mail."\"");
    $test = mysqli_fetch_row($t);
    if ($test != null) {
        return false;
    } else {
        $bdd -> query("INSERT INTO `utilisateur` (`IdUtilisateur`, `Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (NULL, '".$nom."', '".$prenom."', '".$mail."', '".password_hash($mdp,PASSWORD_DEFAULT)."');");
        $t = $bdd -> query("SELECT * FROM utilisateur WHERE Mail = \"".$mail."\"");
        $id = mysqli_fetch_row($t);
        $adresse = createAdress($bdd,$rue,$code,$ville);
        $bdd -> query("INSERT INTO `prescripteur` (`IdPrescripteur`, `Signature`, `IdAdresse`, `IdSpecialite`, `IdUtilisateur`) VALUES ('".$num."', NULL, '".$adresse."', '".$_SESSION['spe']."', '".$id[0]."');");
        return true;
    }
}

function checkCode($bdd, $code) {
    $t = $bdd -> query("SELECT * FROM code WHERE Code = \"".$code."\"");
    $test = mysqli_fetch_row($t);
    if ($test != null) {
        return true;
    }
    return false;
}
?>