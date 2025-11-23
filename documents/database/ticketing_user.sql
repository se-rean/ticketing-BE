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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `mname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `regcode` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2024-02-14 19:50:16','2024-02-28 16:37:13',8,'asd123','202cb962ac59075b964b07152d234b70','dsadasdassd','asd','dsad','dsadasd@gmail.com','asdasdasd','87cedcd4840d447fb1514a12e8684a8b','admin','active'),('2024-02-20 02:09:00','2024-02-20 02:09:00',9,'asda1sd','a3dcb4d229de6fde0db5686dee47145d','asd','asd','dsad','dsadasd','asdasdasd','f1946474503249c4b7bf1080fd41ff9a',NULL,'active'),('2024-02-20 04:32:49','2024-02-28 16:55:16',10,'3331','310dcbbf4cce62f762a2aaa148d556bd','123asd','123asd','123','123@mail.com','123','04914f2b8cca411ca7efe7b55a278b84',NULL,'active'),('2024-02-22 05:11:30','2024-02-22 05:11:30',11,'asdas1sd','a3dcb4d229de6fde0db5686dee47145d','asd','asd','dsad','dsadasd','asdasdasd','40cd35ecfec04ca6831b9fc3f5c51e27',NULL,'active'),('2024-02-22 05:13:46','2024-02-22 05:13:46',12,'as1das1sd','a3dcb4d229de6fde0db5686dee47145d','asd','asd','dsad','dsadasd','asdasdasd','9edfa1d7e5fd49c0b36fb49869741738',NULL,'active'),('2024-02-27 14:38:57','2024-02-28 03:26:48',17,'1234','7815696ecbf1c96e6894b779456d330e','dsadasdassd','123','123','123@gmail.com','123','7c00697f6faf4ef0b54015494664844d',NULL,'active'),('2024-02-28 08:52:30','2024-02-28 16:23:02',19,'rasd','7815696ecbf1c96e6894b779456d330e','r','r','r','andoyandoy5@gmail.com','09201772484','9ba5af84203f48ec837b40ad1544a324',NULL,'active'),('2024-02-28 16:08:04','2024-02-28 16:56:29',20,'1233','202cb962ac59075b964b07152d234b70','123','123123','123123','123123@gamiasd.com','123123','d57ebd88989542b48018ddb988fba176',NULL,'active');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-01 13:32:01
