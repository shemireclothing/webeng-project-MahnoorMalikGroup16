<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'db.php';

$id = intval($_GET['id'] ?? 0);

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Invalid ID']);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM complaints WHERE id = ?");
$stmt->execute([$id]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true, 'message' => 'Complaint deleted']);
} else {
    echo json_encode(['success' => false, 'message' => 'Complaint not found']);
}
?>