<?php
/*
$hostName = $_POST['HOSTNAME'];
$username = $_POST['USER'];
$password = $_POST['PASSWORD'];
$database_name = $_POST['DATABASE'];
*/
$hostName = "localhost";
$username = "root";
$password = "root";
$database_name = "php_test";
$port = "3306";

$conn = mysqli_connect($hostName, $username, $password, $database_name, $port);

print_r($_POST);

//echo $_POST['text'];

//$recText = $_POST['text'];

//$query = "INSERT INTO php_test (text) VALUES('$recText')";

$query = "INSERT INTO text (Nom) VALUES('nique ta mère Quentin')";

//$query = "SELECT * FROM text";

//$res = mysqli_query($conn, $query);

//echo mysqli_fetch_assoc($res)['Nom'];

if(mysqli_query($conn, $query)){
    echo "Data has been inserted successfully";
}
else{
    echo "nique sa mère bordel j'en peux plus";
}
