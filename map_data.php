<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'db.php';

try {

    // Detect PDO or mysqli automatically
    if (isset($pdo)) {

        $stmt = $pdo->query("SELECT * FROM complaints");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    } else if (isset($conn)) {

        $result = mysqli_query($conn, "SELECT * FROM complaints");

        $data = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }

    } else {

        throw new Exception("No database connection found");
    }

    echo json_encode([
        "success" => true,
        "data" => $data
    ]);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage(),
        "data" => []
    ]);
}
?>