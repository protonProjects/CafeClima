<?php
class DB {
    private static ?PDO $conn = null;

    public static function connect(): PDO {
        if (self::$conn === null) {
            $dsn = 'mysql:host=localhost;dbname=cafeclima;charset=utf8mb4';
            self::$conn = new PDO($dsn, 'root', 'admin123', [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        }
        return self::$conn;
    }
}
