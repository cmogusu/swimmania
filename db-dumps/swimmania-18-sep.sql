-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 18, 2025 at 01:00 AM
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
(38, 'great pool again agaim', 'pool', 'another great pool', 'location of great pool', '2025-03-25 21:03:51'),
(39, 'cow', 'pool', 'very fat cow', 'kisumu', '2025-09-12 18:48:29');

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
(5, 6, 'desc', '/images/pool-3867287.jpg', 0),
(6, 39, 'best descrp', '/images/pool-1.jpg', 1);

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
  `value_bool` tinyint(1) DEFAULT NULL,
  `value_time` bigint(20) DEFAULT NULL,
  `value_num` int(11) DEFAULT NULL,
  `value_text` varchar(255) DEFAULT NULL,
  `value_lat` double DEFAULT NULL,
  `value_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata`
--

INSERT INTO `metadata` (`id`, `entityId`, `entityType`, `name`, `value`, `itemIndex`, `value_bool`, `value_time`, `value_num`, `value_text`, `value_lat`, `value_lng`) VALUES
(3, 2, 'pool', 'hasLaneRopes', 'true', 0, 1, NULL, NULL, NULL, NULL, NULL),
(6, 7, 'pool', 'hasLaneRopes', 'true', 0, 1, NULL, NULL, NULL, NULL, NULL),
(12, 8, 'pool', 'hasLaneRopes', 'true', 0, 1, NULL, NULL, NULL, NULL, NULL),
(13, 6, 'pool', 'poolDimensions.length', '25', 0, NULL, NULL, 25, NULL, NULL, NULL),
(14, 6, 'pool', 'location.lat', '-1.2611664809506706', 0, NULL, NULL, NULL, NULL, -1.2611664809506706, NULL),
(15, 6, 'pool', 'location.lng', '36.80447787409544', 0, NULL, NULL, NULL, NULL, 36.80447787409544, NULL),
(17, 2, 'pool', 'openToChildren', 'true', 0, 1, NULL, NULL, NULL, NULL, NULL),
(20, 7, 'pool', 'openToChildren', 'true', 0, 1, NULL, NULL, NULL, NULL, NULL),
(21, 22, 'pool', 'openToChildren', 'true', 0, 1, NULL, NULL, NULL, NULL, NULL),
(24, 6, 'pool', 'operatingHours.closing', '29100000', 0, NULL, 32700000, NULL, NULL, NULL, NULL),
(25, 6, 'pool', 'hasLaneRopes', '1', 0, 0, NULL, NULL, NULL, NULL, NULL),
(26, 6, 'pool', 'isHeated', 'true', 0, 0, NULL, NULL, NULL, NULL, NULL),
(28, 6, 'pool', 'cleanliness', '2', 0, 5, NULL, NULL, NULL, NULL, NULL),
(29, 6, 'pool', 'hasOnDutyLifeguard', '0', 0, 0, NULL, NULL, NULL, NULL, NULL),
(30, 38, 'pool', 'poolDimensions.width', '343', 0, NULL, NULL, 78, NULL, NULL, NULL),
(31, 38, 'pool', 'poolDimensions.length', '323', 0, NULL, NULL, 645, NULL, NULL, NULL),
(33, 38, 'pool', 'openToChildren', 'true', 0, 1, NULL, NULL, NULL, NULL, NULL),
(34, 38, 'pool', 'crowdinessRating', '', 0, 2, NULL, NULL, NULL, NULL, NULL),
(35, 6, 'pool', 'hostInstitutionType', 'gym', 0, NULL, NULL, NULL, 'school', NULL, NULL),
(36, 6, 'pool', 'poolShape', 'square', 0, NULL, NULL, NULL, 'round', NULL, NULL),
(37, 6, 'pool', 'poolDimensions.length', '12', 0, NULL, NULL, 125, NULL, NULL, NULL),
(40, 6, 'pool', 'poolDimensions.width', '23', 0, NULL, NULL, 26, NULL, NULL, NULL),
(41, 6, 'pool', 'crowdiness', '2', 0, 4, NULL, NULL, NULL, NULL, NULL),
(42, 6, 'pool', 'openToPublic', 'true', 0, 0, NULL, NULL, NULL, NULL, NULL),
(43, 6, 'pool', 'entryFeeIn.ksh', '54', 0, NULL, NULL, 57, NULL, NULL, NULL),
(44, 6, 'pool', 'changingRoomCleanliness', '4', 0, 5, NULL, NULL, NULL, NULL, NULL),
(45, 6, 'pool', 'operatingHours.opening', '14820000', 0, NULL, 22020000, NULL, NULL, NULL, NULL),
(46, 6, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 47, NULL, NULL, NULL);

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
  ADD UNIQUE KEY `id-entityId-entityType` (`id`,`entityId`,`entityType`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `metadata`
--
ALTER TABLE `metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `relations`
--
ALTER TABLE `relations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
