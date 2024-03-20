-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: recruitingrh
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dni` varchar(8) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `birthday` date NOT NULL,
  `gender` varchar(20) NOT NULL,
  `image` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (43,'43791568','Alejandro Marcelo','Yufra','aleyufra@gmail.com','3884967507','2001-11-28','Hombre','https://firebasestorage.googleapis.com/v0/b/practica-profesional-dh.appspot.com/o/candidates-images%2Ffoto1.jpg?alt=media&token=455055f2-5683-46cd-9838-1108953f500f'),(44,'43526758','Guadalupe Virginia','Véliz','luveliz@gmail.com','38854437777','2001-08-11','Mujer','https://firebasestorage.googleapis.com/v0/b/practica-profesional-dh.appspot.com/o/candidates-images%2Ffoto8.jpg?alt=media&token=36129b28-e47b-4afe-a4ac-3ea8d8168382'),(45,'41876394','Jeremias Jose','Gomez','jgomez@gmail.com',NULL,'1999-04-21','Hombre','https://firebasestorage.googleapis.com/v0/b/practica-profesional-dh.appspot.com/o/candidates-images%2Ffoto2.jpg?alt=media&token=e15d713b-e811-453f-9631-831b3735fb0f'),(46,'42876456','Matias Ricardo','Ponce','matiasponce@gmail.com',NULL,'2000-01-12','Hombre','https://firebasestorage.googleapis.com/v0/b/practica-profesional-dh.appspot.com/o/candidates-images%2Ffoto3.jpg?alt=media&token=63b6aa00-5e6e-476f-83ef-e3b4bdc251b9'),(47,'38762986','José Miguel','Ramirez','jmramirez@gmail.com',NULL,'1995-05-11','Hombre','https://firebasestorage.googleapis.com/v0/b/practica-profesional-dh.appspot.com/o/candidates-images%2Ffoto4.jpg?alt=media&token=ac8ce263-9242-4e96-80a3-79924c5ab2ce'),(48,'24563567','Gonzalo Angel','Aguierrez','gaguierrez69@gmail.com','388385697','1950-07-23','Hombre','https://firebasestorage.googleapis.com/v0/b/practica-profesional-dh.appspot.com/o/candidates-images%2Ffoto5.webp?alt=media&token=2bc59022-80bf-45c7-89b1-c9ff9a7691e3'),(49,'43876293','Exequiel Rodolfo','Ayarde','exeayarde@gmail.com',NULL,'2001-12-22','Hombre','https://firebasestorage.googleapis.com/v0/b/practica-profesional-dh.appspot.com/o/candidates-images%2Ffoto6.jpg?alt=media&token=4b26e861-ee4e-4d09-8997-88a000c3e7fd'),(50,'44586734','Lucas Maximiliano','Camacho','lucasmaxi@gmail.com','38843456122','2002-05-24','Hombre','https://firebasestorage.googleapis.com/v0/b/practica-profesional-dh.appspot.com/o/candidates-images%2Ffoto7.jpg?alt=media&token=b19bdbc1-39e9-49d4-a9b9-ea562bf3db2c'),(51,'43875567','Agustin Elias','Rodriguez','agusrodriguez12@gmail.com',NULL,'2001-04-14','Hombre','https://firebasestorage.googleapis.com/v0/b/practica-profesional-dh.appspot.com/o/candidates-images%2Ffoto10.webp?alt=media&token=f7e27530-0c12-45c6-8c3f-6dc397cf0782'),(52,'31453150','Norma Irma','Cañizares','normacanizarez@gmail.com','3885823424','1972-04-17','Mujer','https://firebasestorage.googleapis.com/v0/b/practica-profesional-dh.appspot.com/o/candidates-images%2Ffoto9.jpg?alt=media&token=ba15d146-cd5f-4411-9923-7da02fde74b5');
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professions`
--

DROP TABLE IF EXISTS `professions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `profession` varchar(100) NOT NULL,
  `candidate_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_id` (`candidate_id`),
  CONSTRAINT `professions_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professions`
--

LOCK TABLES `professions` WRITE;
/*!40000 ALTER TABLE `professions` DISABLE KEYS */;
INSERT INTO `professions` VALUES (61,'Programador',43),(68,'Profesor',44),(72,'Médico',45),(73,'Policía',46),(74,'Economista',47),(75,'Computista',48),(76,'Policía',49),(77,'Policía',50),(78,'Computista',51),(79,'Profesor',52),(100,'Desarrollador',43);
/*!40000 ALTER TABLE `professions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_networks`
--

DROP TABLE IF EXISTS `social_networks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_networks` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `linkedin` varchar(100) DEFAULT NULL,
  `candidate_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `linkedin` (`linkedin`),
  KEY `candidate_id` (`candidate_id`),
  CONSTRAINT `social_networks_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_networks`
--

LOCK TABLES `social_networks` WRITE;
/*!40000 ALTER TABLE `social_networks` DISABLE KEYS */;
INSERT INTO `social_networks` VALUES (28,'@aleyufra82',43),(29,'@luveliz',44),(30,'@jerebaca',45),(31,'@matteran',46),(32,'@jmperez',47),(33,'@tiogonzalo',48),(34,'@exeayarde',49),(35,'@camachox',50),(36,'@agustin99',51),(37,'@normacanizares',52);
/*!40000 ALTER TABLE `social_networks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-20 17:45:31
