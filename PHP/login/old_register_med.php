<!doctype html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="../css/login.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

<body>
<?php session_start(); ?>
<div class="container">
    <div class="row vh-100 justify-content-center align-items-center">
        <div class="col-auto bg-dark p-5 rounded">
            <div class="text-center text-light h1 my-2">S'inscrire en tant que professionnel</div>
            <form action="register_med.php" method="post">
                <div class="row my-2 g-2">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="prenom" name="prenom" required value="<?php if (isset($_POST['prenom'])) {echo $_POST['prenom'];} ?>">
                            <label for="prenom">Prénom</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="nom" name="nom" required value="<?php if (isset($_POST['nom'])) {echo $_POST['nom'];} ?>">
                            <label for="nom">Nom</label>
                        </div>
                    </div>
                </div>

                <!-- pwd & pwd2 -->
                <div class="row my-2 g-2">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="password" class="form-control" id="pwd" name="pwd" required>
                            <label for="pwd">Mot de passe</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="password" class="form-control" name="pwd2" id="pwd2" required>
                            <label for="pwd2">Répétez votre mot de passe</label>
                        </div>
                    </div>
                </div>

                <div class="row my-2 g-2">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="email" class="form-control" id="mail" name="mail" required value="<?php if (isset($_POST['mail'])) {echo $_POST['mail'];} ?>">
                            <label for="mail">Adresse mail</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="num" name="num" required value="<?php if (isset($_POST['num'])) {echo $_POST['num'];} ?>">
                            <label for="num">Numéro RPPS</label>
                        </div>
                    </div>
                </div>

                <div class="text-center text-light h3 my-2">Adresse</div>

                <?php
                //A TRADUIRE EN REACT
                $bdd = mysqli_connect("localhost", "root", "", "ordonnance", "3307");
                if (isset($_SESSION["spe"]) && $_SESSION["spe"] == 4) {
                    echo "<div class=\"form-floating\">
                        <select id=\"pharm\" name=\"pharm\" class=\"form-control\">";
                    $t = $bdd -> query("SELECT * FROM pharmacie, adresse WHERE pharmacie.IdAdresse = adresse.IdAdresse");
                    while ($pharmacie = mysqli_fetch_row($t)) {
                        echo "<option value='".$pharmacie[0]."'>".$pharmacie[1]." (".$pharmacie[4]." ".$pharmacie[5]." ".$pharmacie[6].")  </option>";
                    }
                    echo "</select><label for=\"code\">Pharmacie</label></div> <div class=\"text-center text-light h5 my-2\">ou</div>";
                    echo "<div class=\"row my-2 g-2\">
                              <div class=\"col-md\">
                                  <div class=\"form-floating\">
                                        <input type=\"text\" class=\"form-control\" id=\"nomp\" name=\"nomp\">
                                        <label for=\"nomp\">Nom de la pharmacie</label>
                             </div>
                        </div>
                    </div>";
                }
                ?>

                <div class="row my-2 g-2">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="rue" name="rue" value="<?php if (isset($_POST['rue'])) {echo $_POST['rue'];} ?>">
                            <label for="rue">Rue</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="code" name="code" value="<?php if (isset($_POST['code'])) {echo $_POST['code'];} ?>">
                            <label for="code">Code postal</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="ville" name="ville" value="<?php if (isset($_POST['ville'])) {echo $_POST['ville'];} ?>">
                            <label for="ville">Ville</label>
                        </div>
                    </div>
                </div>


                <!-- reset & S'inscrire -->
                <div class="row my-2 g-2 justify-content-center">
                    <div class="col-md-auto">
                        <button class="btn btn-primary" type="submit">S'inscrire</button>
                    </div>
                    <div class="col-md-auto">
                        <button class="btn btn-danger" type="reset">Annuler</button>
                    </div>
                </div>
            </form>
            <?php
            //NE PAS TOUCHER
            include("functions.php");
            if (isset($_POST['mail']) && isset($_POST['pwd']) && isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['num'])) {
                if ($_POST['pwd'] == $_POST['pwd2']) {
                    if ($_SESSION["spe"] == 4) {
                        if (isset($_POST['rue']) && strlen($_POST['rue'])!=0 && isset($_POST['code']) && strlen($_POST['code'])!=0 && isset($_POST['ville']) && strlen($_POST['ville'])!=0) {
                            createPharm1($bdd,$_POST['mail'],$_POST['pwd'],$_POST['nom'],$_POST['prenom'],$_POST['num'],$_POST['nomp'],$_POST['rue'],$_POST['code'],$_POST['ville']);
                        } else {
                            createPharm2($bdd,$_POST['mail'],$_POST['pwd'],$_POST['nom'],$_POST['prenom'],$_POST['num'],$_POST['pharm']);
                        }
                    } else {
                        createMedic($bdd,$_POST['mail'],$_POST['pwd'],$_POST['nom'],$_POST['prenom'],$_POST['num'],$_POST['rue'],$_POST['code'],$_POST['ville']);
                    }
                    $_SESSION['mail'] = $_POST['mail'];
                    $_SESSION['role'] = isUser($bdd, $_POST['mail'], $_POST['pwd']);
                } else {
                    echo "<div>Mots de passe différents.</div>";
                }
            }
            ?>
        </div>
    </div>
</div>


<!-- Bootstrap scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>

</html>
