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
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `performance_code` varchar(45) DEFAULT NULL,
  `area` varchar(45) DEFAULT NULL,
  `pricetype_code` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `nationality` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `dateofbirth` varchar(45) DEFAULT NULL,
  `internationalcode` varchar(45) DEFAULT NULL,
  `areacode` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(45) DEFAULT NULL,
  `address_line_1` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `countrycode` varchar(45) DEFAULT NULL,
  `createdAt` varchar(45) DEFAULT NULL,
  `updatedAt` varchar(45) DEFAULT NULL,
  `barcode` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `participantsCode` varchar(45) DEFAULT NULL,
  `basketId` varchar(45) DEFAULT NULL,
  `generate_barcode_api_respose` longtext,
  `amount` varchar(45) DEFAULT NULL,
  `orderId` varchar(45) DEFAULT NULL,
  `totalAmount` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13820 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (13817,'PDUB01DEC2023B','SGOLDA','D','1','rene','andoy','filiplino','andynaody5@gmail.com','feb 11, 1996','PH','AE','0909090','as','surigao','philippines','QA','2024-02-02 11:35:49','2024-02-02 11:45:56','dd6491bc-9692-4a37-a7a3-87f22f8540a6','sold','112837','1092088','OK',NULL,NULL,'35000'),(13818,'PDUB01DEC2023B','SGOLDA','D','1','rene','andoy','fil','andoyandoy5@gmail.com','feb 11, 1996','PH','AE','909090','address','surigao','philippines','QA','2024-02-05 19:38:47','2024-02-05 19:38:47',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'35000'),(13819,'PDUB01DEC2023B','SGOLDA','D','1','rene2','andoy','fil','andoyandoy5@gmail.com','feb 11, 1996','PH','AE','909090','address','surigao','philippines','QA','2024-02-05 19:38:47','2024-02-05 19:38:47',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'35000');
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
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
