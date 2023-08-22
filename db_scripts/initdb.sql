-- Drop database
DROP DATABASE IF EXISTS basic_laundromat;

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS basic_laundromat
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Grant Privileges
GRANT ALL PRIVILEGES ON basic_laundromat.* TO 'admin'@'%';
FLUSH PRIVILEGES;

USE basic_laundromat;