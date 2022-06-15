<!doctype html>
<html>
<head>
    <!-- Meta declarations -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap Implementation -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <!-- Custom css -->

    <link rel="stylesheet" type="text/css" href="../css/login.css">

    <title>Login | AssosActions</title>
</head>
<body >
<div class="container">
    <div class="row vh-100 justify-content-center align-items-center">
        <div class="col-auto bg-dark p-5 rounded">
            <div class="text-center text-light h1 my-2">Se connecter</div>
            <form action="login.php" method="post">


                <!-- email & pwd -->
                <div class="row my-2 g-2">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="email" class="form-control" id="login" name="login" required>
                            <label for="login">Adresse mail</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="password" class="form-control" id="pwd" name="pwd" required>
                            <label for="pwd">Mot de passe</label>
                        </div>
                    </div>
                </div>


                <!-- reset & S'inscrire -->
                <div class="row my-2 g-2 justify-content-center">
                    <div class="col-md-auto">
                        <button class="btn btn-primary" type="submit">Se connecter</button>
                    </div>
                    <div class="col-md-auto">
                        <button class="btn btn-danger" type="reset">Annuler</button>
                    </div>
                </div>
                <div class="text-center text-white"><a style="color:white" href="register.php">Créer un compte</a></div>
            </form>
        </div>
        </form>
    </div>
</div>




<div class="login">
    <?php
    session_start();
    session_destroy();
    if (isset($_POST['login']) && isset($_POST['pwd'])) {
        $bdd = mysqli_connect("localhost","root","", "ordonnance","3307");
        include("functions.php");
        if (isUser($bdd, $_POST['login'], $_POST['pwd']) > 0) {
            session_start();
            $_SESSION['mail'] = $_POST['login'];
            $_SESSION['role'] = isUser($bdd, $_POST['login'], $_POST['pwd']);
            header("Location: ../accueil.php");
        } else {
            echo "Identifiant/mot de passe incorrect";
        }
    }
    ?>
</div>
<!-- Bootstrap scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>
</html>
