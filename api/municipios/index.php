<?php
require_once '../config/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$db     = DB::connect();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $stmt = $db->query('SELECT * FROM municipios WHERE activo = 1 ORDER BY nombre');
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        if (empty($body['nombre']) || empty($body['departamento'])) {
            http_response_code(400);
            echo json_encode(['error' => 'nombre y departamento son requeridos']);
            break;
        }
        try {
            $stmt = $db->prepare(
                'INSERT INTO municipios (nombre, departamento) VALUES (:nombre, :departamento)'
            );
            $stmt->execute([':nombre' => $body['nombre'], ':departamento' => $body['departamento']]);
            http_response_code(201);
            echo json_encode(['id' => $db->lastInsertId(), 'mensaje' => 'Municipio creado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'PUT':
        $id   = intval($_GET['id'] ?? 0);
        $body = json_decode(file_get_contents('php://input'), true);
        $check = $db->prepare('SELECT id FROM municipios WHERE id = :id');
        $check->execute([':id' => $id]);
        if (!$check->fetch()) {
            http_response_code(404);
            echo json_encode(['error' => 'No encontrado']);
            break;
        }
        try {
            $stmt = $db->prepare('UPDATE municipios SET nombre = :nombre WHERE id = :id');
            $stmt->execute([':nombre' => $body['nombre'], ':id' => $id]);
            echo json_encode(['mensaje' => 'Actualizado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        $id    = intval($_GET['id'] ?? 0);
        $check = $db->prepare('SELECT id FROM municipios WHERE id = :id');
        $check->execute([':id' => $id]);
        if (!$check->fetch()) {
            http_response_code(404);
            echo json_encode(['error' => 'No encontrado']);
            break;
        }
        try {
            $stmt = $db->prepare('DELETE FROM municipios WHERE id = :id');
            $stmt->execute([':id' => $id]);
            echo json_encode(['mensaje' => 'Eliminado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
}
