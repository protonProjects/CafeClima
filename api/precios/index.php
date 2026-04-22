<?php
require_once '../config/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$db     = DB::connect();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $stmt = $db->query(
            'SELECT * FROM precios_cafe ORDER BY registrado_en DESC LIMIT 30'
        );
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        try {
            $stmt = $db->prepare(
                'INSERT INTO precios_cafe (precio_usd, precio_cop, tasa_cambio)
                 VALUES (:precio_usd, :precio_cop, :tasa_cambio)'
            );
            $stmt->execute([
                ':precio_usd'  => $body['precio_usd'],
                ':precio_cop'  => $body['precio_cop'],
                ':tasa_cambio' => $body['tasa_cambio'],
            ]);
            http_response_code(201);
            echo json_encode(['id' => $db->lastInsertId(), 'mensaje' => 'Precio registrado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
}
