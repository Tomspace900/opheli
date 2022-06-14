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

function checkCode($bdd, $code) {
    $t = $bdd -> query("SELECT * FROM code WHERE Code = \"".$code."\"");
    $test = mysqli_fetch_row($t);
    if ($test != null) {
        return true;
    }
    return false;
}
?>