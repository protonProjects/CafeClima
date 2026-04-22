CREATE DATABASE IF NOT EXISTS cafeclima
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cafeclima;

CREATE TABLE municipios (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(100) NOT NULL,
  departamento  VARCHAR(100) NOT NULL,
  activo        TINYINT(1)   NOT NULL DEFAULT 1,
  creado_en     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE consultas_clima (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  id_municipio        INT          NOT NULL,
  probabilidad_lluvia INT          NOT NULL,
  descripcion         VARCHAR(255) NOT NULL,
  temperatura         DECIMAL(5,2) NOT NULL,
  consultado_en       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_municipio) REFERENCES municipios(id) ON DELETE CASCADE
);

CREATE TABLE precios_cafe (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  precio_usd    DECIMAL(10,4) NOT NULL,
  precio_cop    DECIMAL(15,2) NOT NULL,
  tasa_cambio   DECIMAL(10,4) NOT NULL,
  registrado_en TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO municipios (nombre, departamento) VALUES
  ('Manizales', 'Caldas'),
  ('Pereira',   'Risaralda'),
  ('Armenia',   'Quindío');
