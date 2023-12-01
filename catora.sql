-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table catora.artworks
CREATE TABLE IF NOT EXISTS `artworks` (
  `artwork_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `tags` text,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`artwork_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `artworks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `catora_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table catora.artworks: ~0 rows (approximately)

-- Dumping structure for table catora.catora_users
CREATE TABLE IF NOT EXISTS `catora_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table catora.catora_users: ~2 rows (approximately)
INSERT INTO `catora_users` (`user_id`, `username`, `password_hash`, `created_at`) VALUES
	(1, 'this', 'nameme', '2023-11-30 05:28:23'),
	(3, 'hallo', 'nameme', '2023-11-30 06:13:23'),
	(5, 'dapit', 'disini', '2023-11-30 07:30:28');

-- Dumping structure for table catora.catora_user_profiles
CREATE TABLE IF NOT EXISTS `catora_user_profiles` (
  `profile_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `artist_name` varchar(100) DEFAULT NULL,
  `description` text,
  `profile_image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `background_image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`profile_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `catora_user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `catora_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table catora.catora_user_profiles: ~0 rows (approximately)
INSERT INTO `catora_user_profiles` (`profile_id`, `user_id`, `artist_name`, `description`, `profile_image_url`, `background_image_url`) VALUES
	(3, 5, 'John Doe', 'Lorem ipsum description', 'url_to_profile_image', 'url_to_background_image');

-- Dumping structure for table catora.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `message_text` text,
  `file_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `catora_users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `catora_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table catora.messages: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
