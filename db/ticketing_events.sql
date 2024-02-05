-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: ticketing
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `performanceCode` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` text,
  `status` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `startDate` varchar(45) DEFAULT NULL,
  `endDate` varchar(45) DEFAULT NULL,
  `webSaleStartDate` varchar(45) DEFAULT NULL,
  `showCode` varchar(45) DEFAULT NULL,
  `webSaleEndDate` varchar(45) DEFAULT NULL,
  `venueCode` text,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (34,'PDUB01DEC2023B','asd','asd','200','Batch 3 API upgrade','2023-12-01T19:30:00','2028-12-01T23:00:00','2023-12-01T19:30:00','SBAT23C','2028-12-01T23:00:00','DUBAI WORLD TRADE CENTRE L.L.C[DED-229599],DUBAI WORLD TRADE CENTRE L.L.C[DED-229599]','2024-02-01 08:52:18','2024-02-02 02:38:31'),(35,'PDUB01DEC2023Bs','asdfasdf','asdf','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 10:09:51','2024-02-01 10:09:51'),(36,'PDUB0','asd','asdasd','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 10:10:38','2024-02-01 10:10:38'),(37,'asdasdfasdfas','asdf','asdf','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 10:13:47','2024-02-01 10:13:47'),(38,'asdasd','asd','asd','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 10:19:58','2024-02-01 10:19:58'),(39,'title','title sample','description sample','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 14:15:21','2024-02-01 14:15:21'),(40,'test','asd','asd','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 14:24:53','2024-02-01 14:24:53'),(41,'fasdfasd','asd','asd','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 14:28:23','2024-02-01 14:28:23'),(42,'sample','sample','sample','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 14:29:34','2024-02-01 14:29:34'),(43,'asdasdasd','asd','asd','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 14:32:03','2024-02-01 14:32:03'),(44,'asd','asdas','asd','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 14:35:22','2024-02-01 14:35:22'),(45,'test1','test','test','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 14:39:37','2024-02-01 14:39:37'),(46,'test2','test','test','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 15:02:45','2024-02-01 15:02:45'),(47,'test123','test','123','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 15:03:21','2024-02-01 15:03:21'),(48,'123','123','123','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 15:03:49','2024-02-01 15:03:49'),(49,'1234','1234','1234','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 15:04:45','2024-02-01 15:04:45'),(50,'12345','1234','1234','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 15:18:36','2024-02-01 15:18:36'),(51,'123123','123132','123123','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 15:20:21','2024-02-01 15:20:21'),(52,'qweqwe','qweqw','qweqwe','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 15:23:27','2024-02-01 15:23:27'),(53,'asdfasd','asdfas','asdf','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 15:26:30','2024-02-01 15:26:30'),(54,'asdsad','asdas','asdasd','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 15:33:53','2024-02-01 15:33:53'),(55,'asdasd123','asdas','asdasd','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 15:46:05','2024-02-01 15:46:05'),(56,'asdqweasdzxc','asdad','asdasd','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 16:40:06','2024-02-01 16:40:06'),(57,'asdfasdfasdf','asdfasdf','asdfasdf','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-01 18:17:42','2024-02-01 18:17:42'),(58,'asdf','asdf','asdf','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-05 11:26:50','2024-02-05 11:26:50'),(59,'asdasdasd123123','asdasd1231231','asdasd','Pending For Barcode Generation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-05 11:37:56','2024-02-05 11:37:56');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-05 19:51:06
