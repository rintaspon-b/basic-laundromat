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
  ('https://iili.io/Hp8jR3P.png', 50, 90, 'IDLE'),
  ('https://iili.io/Hp8jTGV.png', 100, 150, 'IDLE'),
  ('https://iili.io/Hp8ju6B.png', 50, 90, 'IDLE'),
  ('https://iili.io/Hp8j5a1.png', 60, 70, 'IDLE'),
  ('https://iili.io/Hp8j78F.png', 35, 65, 'IDLE');