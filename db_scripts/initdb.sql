-- Drop database
DROP DATABASE IF EXISTS basic_laundromat;

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS basic_laundromat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Grant Privileges
GRANT ALL PRIVILEGES ON basic_laundromat.* TO 'admin'@'%';
FLUSH PRIVILEGES;

USE basic_laundromat;

-- Create table
CREATE TABLE IF NOT EXISTS machine (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  image VARCHAR(255) NULL,
  min_price INT NULL DEFAULT 0, -- Default value set to 0
  process_time_sec INT NULL DEFAULT 0, -- Default value set to 0
  status VARCHAR(10) NOT NULL DEFAULT 'IDLE'
);

-- Insert sample data
INSERT INTO machine (image, min_price, process_time_sec, status) VALUES
  ('https://drive.google.com/uc?export=view&id=1XaLwHVRT6GdRSlyKqzgjwTpARcz2H5UG', 50, 90, 'IDLE'),
  ('https://drive.google.com/uc?export=view&id=1mqvt5GuoO15vOcSmgA_k6IZg9Sc_JBbr', 100, 150, 'IDLE'),
  ('https://drive.google.com/uc?export=view&id=1P9vUx61KAoNh6H8XHim6bp4aEBcNNyqk', 50, 90, 'IDLE'),
  ('https://drive.google.com/uc?export=view&id=1oU_wOcc3-YxtliJTJFbkvmDpcoTQDLS3', 60, 70, 'IDLE'),
  ('https://drive.google.com/uc?export=view&id=1F3mHAEQisKBIwFeHMS5QEoE2haTxHOQs', 35, 65, 'IDLE');