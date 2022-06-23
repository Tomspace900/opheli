<?php
session_start();
$_SESSION['role'] = 3;
echo $_SESSION['role'];