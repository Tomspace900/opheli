<!doctype html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="../css/login.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

<?php
session_start();
session_destroy();
?>

<body>
<div class="container">
    <div class="row vh-100 justify-content-center align-items-center">
        <div class="col-auto bg-dark p-5 rounded">
            <div class="text-center text-light h1 my-2">S'inscrire en tant que patient</div>
            <form action="register.php" method="post">
                <!-- Prenom & Nom -->
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

                <!-- email & date naissance -->
                <div class="row my-2 g-2">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="email" class="form-control" id="mail" name="mail" required value="<?php if (isset($_POST['mail'])) {echo $_POST['mail'];} ?>">
                            <label for="mail">Adresse mail</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="date" class="form-control" id="date" name="date" value="<?php if (isset($_POST['date'])) {echo $_POST['date'];} ?>">
                            <label for="date">Date de naissance</label>
                        </div>

                    </div>
                </div>

                <div class="form-floating">
                    <input type="text" class="form-control" id="num" name="num" required value="<?php if (isset($_POST['num'])) {echo $_POST['num'];} ?>">
                    <label for="num">Numéro de Sécurité Sociale</label>
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
                <div class="text-center text-white"><a style="color:white" href="login.php">J'ai déjà une compte</a></div>
                <div class="text-center text-white"><a style="color:white" href="register_pro.php">S'inscrire en tant que professionnel</a></div>
            </form>
            <?php
            include("functions.php");
            $bdd = mysqli_connect("localhost", "root", "", "ordonnance", "3307");
            if (isset($_POST['mail']) && isset($_POST['pwd']) && isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['date']) && isset($_POST['num'])) {
                if ($_POST['pwd'] == $_POST['pwd2']) {
                    $test = createUser($bdd, $_POST['mail'], $_POST['pwd'], $_POST['nom'], $_POST['prenom'], $_POST['date'], $_POST['num']);
                    if ($test == false) {
                        echo "<div>Cette adresse email est déjà utilisée.</div>";
                    } else {
                        session_start();
                        $_SESSION['mail'] = $_POST['mail'];
                        $_SESSION['role'] = isUser($bdd, $_POST['mail'], $_POST['pwd']);
                    }
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