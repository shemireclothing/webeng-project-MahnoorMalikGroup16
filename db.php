<?php
$host     = 'sql202.infinityfree.com';
$dbname   = 'if0_41989956_utility_db';
$username = 'if0_41989956';
$password = 'Babar56azam';   // XAMPP default has no password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>