-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 11, 2025 at 09:53 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `swimmania`
--

-- --------------------------------------------------------

--
-- Table structure for table `entity`
--

CREATE TABLE `entity` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `type` enum('swimmer','school','pool','team','event','coach') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `insertTime` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entity`
--

INSERT INTO `entity` (`id`, `name`, `type`, `description`, `location`, `insertTime`) VALUES
(1, 'entityName', 'swimmer', 'xxx description', 'xxx location', '2024-10-25 15:35:10'),
(2, 'swimmer 1t', 'swimmer', 'description swimmer 1', 'location 1', '2024-10-25 15:35:10'),
(3, 'name 1', 'team', 'description 1', '', '2024-10-25 15:35:10'),
(4, 'name 2', 'event', 'description 2', '', '2024-10-25 15:35:10'),
(6, 'favorite pool', 'pool', 'event more coherent description ', 'kiambu town', '2024-10-25 15:35:10'),
(7, 'pool 0', 'pool', 'description pool 0', '', '2024-10-25 15:35:10'),
(8, 'pool 1', 'pool', 'description pool 1', '', '2024-10-25 15:35:10'),
(9, 'pool 0', 'pool', 'description pool 0', '', '2024-10-25 15:35:10'),
(12, 'coach 2', 'coach', 'coach 2 description', 'coach 2 location', '2025-01-29 20:07:41'),
(13, 'coach 3', 'coach', 'coach 3 description', 'coach 3 location', '2025-01-29 20:11:39'),
(14, 'coach 4', 'coach', 'coach 4 description', 'coach 2 location', '2025-01-29 20:13:36'),
(15, 'coach7', 'coach', 'iu', 'kjk', '2025-01-29 20:39:55'),
(16, 'coach8', 'coach', 'iuou', 'hbg', '2025-01-29 20:41:08'),
(17, 'coache9', 'coach', 'thei', 'ldhei', '2025-01-29 20:49:11'),
(18, 'coach100', 'coach', 'kehwiod', NULL, '2025-01-29 21:17:28'),
(19, 'coach101', 'coach', 'descrpt', 'loc', '2025-01-29 21:20:21'),
(21, 'poolwe ', 'pool', 'dasdf', 'dads', '2025-03-05 10:45:55'),
(22, 'another pool', 'pool', 'fsf fsdf fs', 'fds', '2025-03-05 11:18:21'),
(23, 'pool 6904', 'pool', 'descript sker', 'dker', '2025-03-06 00:55:52'),
(25, 'dogs', 'pool', 'dogo', 'dwler', '2025-03-06 01:00:55'),
(26, 'amazing pool ', 'pool', 'this is an amazing pool', 'in a great location', '2025-03-25 20:33:52'),
(27, 'amazing pool ', 'pool', 'this is an amazing pool', 'in a great location', '2025-03-25 20:36:21'),
(28, 'amazing pool ', 'pool', 'this is an amazing pool', 'in a great location', '2025-03-25 20:39:13'),
(29, 'amazing pool ', 'pool', 'this is an amazing pool', 'in a great location', '2025-03-25 20:40:58'),
(30, 'amazing pool ', 'pool', 'this is an amazing pool', 'in a great location', '2025-03-25 20:41:57'),
(31, 'amazing pool ', 'pool', 'this is an amazing pool', 'in a great location', '2025-03-25 20:43:17'),
(32, 'amazing pool ', 'pool', 'this is an amazing pool', 'in a great location', '2025-03-25 20:43:46'),
(33, 'amazing pool ', 'pool', 'this is an amazing pool', 'in a great location', '2025-03-25 20:44:27'),
(34, 'amazing pool ', 'pool', 'this is an amazing pool', 'in a great location', '2025-03-25 20:51:27'),
(35, 'another amazing pool', 'pool', 'best pool ever', 'in location', '2025-03-25 20:53:53'),
(36, 'another amazing pool', 'pool', 'best pool ever', 'in location', '2025-03-25 20:56:17'),
(37, 'anothers amazing pool', 'pool', 'best pool ever', 'in location', '2025-03-25 20:56:48'),
(38, 'great pool again agaim', 'pool', 'another great pool', 'location of great pool', '2025-03-25 21:03:51');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `filepath` varchar(255) NOT NULL,
  `isDefault` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `entityId`, `alt`, `filepath`, `isDefault`) VALUES
(1, 6, 'image1 descrpt', '/images/pool-1249.jpg', 0),
(2, 6, 'better image2 description', '/images/pool-453.jpg', 0),
(3, 6, 'desc', '/images/pool-2650.jpg', 0),
(4, 6, 'image 4 description againsted', '/images/pool-5358.jpg', 0),
(5, 6, 'desc', '/images/pool-3867287.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `metadata`
--

CREATE TABLE `metadata` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `entityType` enum('swimmer','school','pool','team','event','coach') DEFAULT NULL,
  `name` varchar(254) NOT NULL,
  `value` varchar(254) DEFAULT NULL,
  `itemIndex` int(11) DEFAULT 0,
  `isHidden` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata`
--

INSERT INTO `metadata` (`id`, `entityId`, `entityType`, `name`, `value`, `itemIndex`, `isHidden`) VALUES
(2, 2, 'pool', 'dog', 'dogz', 0, 0),
(3, 2, 'pool', 'hasLaneRopes', 'true', 0, 0),
(6, 7, 'pool', 'hasLaneRopes', 'true', 0, 0),
(12, 8, 'pool', 'hasLaneRopes', 'true', 0, 0),
(13, 6, 'pool', 'poolDimensions.length', '25', 0, 0),
(14, 6, 'pool', 'location.lat', '-1.2611664809506706', 0, 0),
(15, 6, 'pool', 'location.lng', '36.80447787409544', 0, 0),
(17, 2, 'pool', 'openToChildren', 'true', 0, 0),
(18, 2, 'pool', 'hello', 'kitty1', 0, 0),
(19, 2, 'pool', 'hello', 'kittye', 0, 0),
(20, 7, 'pool', 'openToChildren', 'true', 0, 0),
(21, 22, 'pool', 'openToChildren', 'true', 0, 0),
(22, 2, 'pool', 'cat', 'cats dog', 0, 0),
(23, 2, 'pool', 'speaker', 'speakers dogs', 0, 0),
(24, 6, 'pool', 'operatingHours.closing', '24480000', 0, 0),
(25, 6, 'pool', 'hasLaneRopes', 'false', 0, 0),
(26, 6, 'pool', 'isHeated', 'true', 0, 0),
(28, 6, 'pool', 'cleanliness', '4', 0, 0),
(29, 6, 'pool', 'hasOnDutyLifeguard', 'false', 0, 0),
(30, 38, 'pool', 'poolDimensions.width', '343', 0, 0),
(31, 38, 'pool', 'poolDimensions.length', '323', 0, 0),
(32, 38, 'pool', 'poolDimensions.length', '326', 0, 0),
(33, 38, 'pool', 'openToChildren', '334', 0, 0),
(34, 38, 'pool', 'crowdinessRating', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `relations`
--

CREATE TABLE `relations` (
  `id` int(11) NOT NULL,
  `entityId1` int(11) NOT NULL,
  `entityId2` int(11) NOT NULL,
  `relationship` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relations`
--

INSERT INTO `relations` (`id`, `entityId1`, `entityId2`, `relationship`) VALUES
(19, 12, 6, 'coach-pool'),
(14, 13, 6, 'coach-pool'),
(15, 13, 6, 'coach-pool'),
(17, 13, 6, 'coach-pool'),
(12, 17, 6, 'coach-pool'),
(16, 19, 6, 'coach-pool'),
(18, 19, 6, 'coach-pool');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entity`
--
ALTER TABLE `entity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD UNIQUE KEY `id_3` (`id`);

--
-- Indexes for table `metadata`
--
ALTER TABLE `metadata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entityIdKey` (`entityId`),
  ADD KEY `metadataKey` (`name`);

--
-- Indexes for table `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `entityId1` (`entityId1`,`entityId2`,`relationship`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entity`
--
ALTER TABLE `entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `metadata`
--
ALTER TABLE `metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `relations`
--
ALTER TABLE `relations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
