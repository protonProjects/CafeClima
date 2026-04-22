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
            'SELECT c.*, m.nombre AS municipio
             FROM consultas_clima c
             JOIN municipios m ON m.id = c.id_municipio
             ORDER BY c.consultado_en DESC
             LIMIT 50'
        );
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        try {
            $stmt = $db->prepare(
                'INSERT INTO consultas_clima (id_municipio, probabilidad_lluvia, descripcion, temperatura)
                 VALUES (:id_municipio, :probabilidad_lluvia, :descripcion, :temperatura)'
            );
            $stmt->execute([
                ':id_municipio'        => $body['id_municipio'],
                ':probabilidad_lluvia' => $body['probabilidad_lluvia'],
                ':descripcion'         => $body['descripcion'],
                ':temperatura'         => $body['temperatura'],
            ]);
            http_response_code(201);
            echo json_encode(['id' => $db->lastInsertId(), 'mensaje' => 'Consulta registrada']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
}
