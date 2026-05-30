<?php  
header('Content-Type: application/json');  
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: POST');  
header('Access-Control-Allow-Headers: Content-Type');  
  
require_once 'db.php';  
  
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {  
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);  
    exit;  
}  
  
$data = json_decode(file_get_contents('php://input'), true);  
  
// Validate required fields  
$required = ['full_name', 'email', 'complaint_type', 'location', 'title', 'description'];  
foreach ($required as $field) {  
    if (empty($data[$field])) {  
        echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);  
        exit;  
    }  
}  

// ⭐ ADD THIS (GPS DATA SAFE FETCH)
$latitude  = $data['latitude'] ?? null;
$longitude = $data['longitude'] ?? null;

// Generate unique complaint ID like CMP-007  
$stmt = $pdo->query("SELECT COUNT(*) FROM complaints");  
$count = $stmt->fetchColumn();  
$complaint_id = 'CMP-' . str_pad($count + 1, 3, '0', STR_PAD_LEFT);  
  
try {  
    $stmt = $pdo->prepare("  
        INSERT INTO complaints   
        (complaint_id, full_name, email, phone, complaint_type, location, title, description, priority, status, latitude, longitude)  
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted', ?, ?)  
    ");  

    $stmt->execute([  
        $complaint_id,  
        htmlspecialchars($data['full_name']),  
        filter_var($data['email'], FILTER_SANITIZE_EMAIL),  
        htmlspecialchars($data['phone'] ?? ''),  
        htmlspecialchars($data['complaint_type']),  
        htmlspecialchars($data['location']),  
        htmlspecialchars($data['title']),  
        htmlspecialchars($data['description']),  
        htmlspecialchars($data['priority'] ?? 'Medium'),  
        $latitude,  
        $longitude  
    ]);  
  
    echo json_encode([  
        'success'      => true,  
        'message'      => 'Complaint submitted successfully!',  
        'complaint_id' => $complaint_id  
    ]);  

} catch (PDOException $e) {  
    echo json_encode(['success' => false, 'message' => 'Failed to save: ' . $e->getMessage()]);  
}  
?>  