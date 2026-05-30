<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['email']) || empty($data['password']) || empty($data['first_name'])) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing']);
    exit;
}

// Check if email already exists
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$data['email']]);
if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    exit;
}

$hashed = password_hash($data['password'], PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?,?,?,?,?)");
$stmt->execute([
    htmlspecialchars($data['first_name']),
    htmlspecialchars($data['last_name'] ?? ''),
    filter_var($data['email'], FILTER_SANITIZE_EMAIL),
    htmlspecialchars($data['phone'] ?? ''),
    $hashed
]);

echo json_encode(['success' => true, 'message' => 'Account created successfully!']);
?>