<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'db.php';

$id = strtoupper(trim($_GET['id'] ?? ''));

if (empty($id)) {
    echo json_encode(['success' => false, 'message' => 'Complaint ID is required']);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM complaints WHERE complaint_id = ?");
$stmt->execute([$id]);
$complaint = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$complaint) {
    echo json_encode(['success' => false, 'message' => 'Complaint not found']);
    exit;
}

echo json_encode(['success' => true, 'data' => $complaint]);
?>