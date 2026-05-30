<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'db.php';

$status = $_GET['status'] ?? '';
$search = $_GET['search'] ?? '';

$sql    = "SELECT * FROM complaints WHERE 1=1";
$params = [];

if (!empty($status)) {
    $sql     .= " AND status = ?";
    $params[] = $status;
}

if (!empty($search)) {
    $sql     .= " AND (title LIKE ? OR complaint_id LIKE ? OR complaint_type LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

$sql .= " ORDER BY created_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$complaints = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'data' => $complaints]);
?>