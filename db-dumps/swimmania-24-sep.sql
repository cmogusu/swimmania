-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 25, 2025 at 03:16 PM
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
(6, 'favorite pool', 'pool', 'event more coherent description ', 'kiambu town', '2024-10-25 15:35:10'),
(41, 'Magdalen Garden', 'pool', 'out how now although worriedly miserably habit drat oh monumental until interestingly tentacle recklessly', 'Clay Korea County', '2025-09-18 18:24:24'),
(43, 'North Street', 'pool', 'flawless minor proliferate publicize usually whether wheel for lonely scorn effector when carelessly despite gown despite egg corporation', 'Essex Timor-Leste', '2025-09-18 18:48:58'),
(44, 'N Railroad Street', 'pool', 'but for although inside trick ack uh-huh uniform interestingly at', 'County Armagh Indonesia', '2025-09-18 19:20:25'),
(45, 'Andreane Track', 'pool', 'hence gruesome who home incidentally pfft haunting out till why yahoo ouch blue versus micromanage tag', 'Clay County Taiwan', '2025-09-19 19:17:23'),
(46, 'S College Street', 'pool', 'moral sorrowful stealthily out afore with pants apud long lively sunny cricket stool regarding vulgarise mmm louse even honorable phew', 'Scott County French Southern Territories', '2025-09-19 19:17:23'),
(47, 'Post Road', 'pool', 'writhing sizzling blah impure intensely grim opposite viability hovercraft with valuable exalt', 'Clark County Somalia', '2025-09-19 19:17:23'),
(48, 'Goodwin Falls', 'pool', 'including although throughout promptly hydrolyse shrilly in foolish supposing incidentally provided blight lock beside an reassuringly so rebuild unless step-mother', 'Wiltshire Lebanon', '2025-09-19 19:17:23'),
(49, 'Justus Haven', 'pool', 'lampoon relieve ick er when than yowza reborn than summer discrete pro since underplay uselessly duh exempt not', 'Devon South Africa', '2025-09-19 19:17:23'),
(50, 'Willow Road', 'pool', 'electrify whether unexpectedly swerve yum agreement but indeed charlatan swill meanwhile whose scented uh-huh gladly among along an celsius gasp', 'Warren County Wallis and Futuna', '2025-09-19 19:17:23'),
(51, 'Caitlyn Dale', 'pool', 'above of demob boldly so jiggle colorize sympathetically going outside buttery duh late overheard', 'County Antrim Falkland Islands (Malvinas)', '2025-09-19 19:17:23'),
(52, 'Kings Highway', 'pool', 'provided nor dental upon fashion pro if governance ponder finally friendly questionable tinted', 'Wiltshire Holy See (Vatican City State)', '2025-09-19 19:17:23'),
(53, 'Cedar Street', 'pool', 'efface er searchingly huzzah reassuringly distant provided wearily ack cruelty override patiently supposing earth until hygienic whenever pace', 'Clark County Aruba', '2025-09-19 19:17:23'),
(54, 'Dooley Lake', 'pool', 'geez finally taut cow quit when slight ah tray pfft nervous knavishly gah topsail onto experienced toward loyally up', 'Warren County Trinidad and Tobago', '2025-09-19 19:17:23'),
(55, 'N 9th Street', 'pool', 'dim whenever between once ah however scrutinise recount scorpion how', 'Pike County Honduras', '2025-09-19 19:24:54'),
(56, 'Pine Close', 'pool', 'plain whoa rear mozzarella grimy from circa inspect eyebrow fond abnormally far but bathhouse', 'Strathclyde Rwanda', '2025-09-19 19:24:54'),
(57, 'Victoria Place', 'pool', 'uh-huh incidentally bug as anguished till ick likewise king truly despite hmph detective never thoughtfully alongside adaptation incidentally webbed eyeglasses', 'Grant County Ecuador', '2025-09-19 19:24:54'),
(58, 'Manor Way', 'pool', 'cycle boohoo until willow those brush hence trusting likewise fragrant pace awareness midst huzzah lest bonfire', 'Jackson County Singapore', '2025-09-19 19:24:54'),
(59, 'Matteo Forge', 'pool', 'bus wallaby mountain spring formula instead swim clamour mainstream after bookcase ridge massage redesign yet politely a restfully', 'Worcestershire Greenland', '2025-09-19 19:24:54'),
(60, 'Gloucester Road', 'pool', 'readies unless um underneath necklace glossy mmm around institute hence king dispose sun yowza biodegradable provided successfully meanwhile', 'Carroll County Chad', '2025-09-19 19:24:54'),
(61, 'Cassin Falls', 'pool', 'motivate why knowledgeably aha quip oh dish countess account loftily yippee sock folklore political underneath brave aha but amid lest', 'Warren County Andorra', '2025-09-19 19:24:54'),
(62, 'Alvena Hill', 'pool', 'if busy lazy so mmm supposing authentic cutlet fooey whose however yum yippee', 'Greene County Saudi Arabia', '2025-09-19 19:24:54'),
(63, 'S Broad Street', 'pool', 'absent besmirch rapid righteously gee mobility gifted toward hunt yippee early yahoo verbally neatly horse unnaturally terraform willow swiftly with', 'Logan County Guyana', '2025-09-19 19:24:54'),
(64, 'S Monroe Street', 'pool', 'object boohoo merrily pants mouser moralise yet in unexpectedly terribly guard blah upliftingly over reluctantly athwart amidst litter', 'Tayside Iran', '2025-09-19 19:24:54'),
(65, 'Inter Clubs Swimming Championships', 'event', 'NCSA Inter-Clubs Swimming Championships April 11-13 2025', 'Kiota School, Dennis Pritt Road, Nairobi', '2025-09-22 17:22:59');

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
(1, 6, 'image1 descrpt', '/images/pool-1.jpg', 0),
(2, 6, 'better image2 description', '/images/pool-4.jpg', 1),
(3, 6, 'desc', '/images/pool-3.jpg', 0),
(4, 6, 'image 4 description againsted', '/images/pool-5.jpg', 0),
(5, 6, 'desc', '/images/pool-2.jpg', 0),
(8, 41, 'interesting hence requirement', '/images/pool-1.jpg', 1),
(10, 43, 'scratch gratefully when best-seller excitedly aw', '/images/pool-3.jpg', 1),
(11, 44, 'pale denitrify schedule cannon um', '/images/pool-6.jpg', 1),
(12, 50, 'down quantify now truly uniform angelic throughout', '/images/pool-7.jpg', 1),
(13, 45, 'unexpectedly but pretend hence address extra-large beyond', '/images/pool-2.jpg', 1),
(14, 51, 'apud unless far excepting till event', '/images/pool-5.jpg', 1),
(15, 46, 'overcoat zowie after bleakly if ceramic stealthily', '/images/pool-7.jpg', 1),
(16, 49, 'to capsize bouncy justly federate aha', '/images/pool-3.jpg', 1),
(17, 52, 'punctually atop during recklessly gadzooks until unlike cricket', '/images/pool-3.jpg', 1),
(18, 48, 'bolster sans metabolite yum adolescent tasty before distinction', '/images/pool-2.jpg', 1),
(19, 47, 'now ew toward chip likewise', '/images/pool-6.jpg', 1),
(20, 53, 'ignorant gah celebrated ouch yowza courteous classic', '/images/pool-1.jpg', 1),
(21, 54, 'absent meh freckle', '/images/pool-3.jpg', 1),
(22, 55, 'once throughout clear', '/images/pool-2.jpg', 1),
(23, 56, 'yahoo enormously psst trust under', '/images/pool-2.jpg', 1),
(24, 57, 'serene horn pertain minus yippee bravely', '/images/pool-7.jpg', 1),
(25, 62, 'before early recommendation quiet strange', '/images/pool-2.jpg', 1),
(26, 61, 'playfully colon moor aw throughout till culminate', '/images/pool-5.jpg', 1),
(27, 63, 'faithfully savour meaningfully yahoo', '/images/pool-1.jpg', 1),
(28, 58, 'off now scorpion sleepily tune-up newsprint kissingly', '/images/pool-3.jpg', 1),
(29, 59, 'although designation oh beyond colour brandish incidentally solemnly', '/images/pool-1.jpg', 1),
(30, 60, 'dreamily heartbeat whoever insist', '/images/pool-3.jpg', 1),
(31, 64, 'hammock unusual monster ack excepting joshingly swill', '/images/pool-4.jpg', 1);

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
  `value_tiny` tinyint(1) DEFAULT NULL,
  `value_time` bigint(20) DEFAULT NULL,
  `value_num` int(11) DEFAULT NULL,
  `value_text` varchar(255) DEFAULT NULL,
  `value_lat` double DEFAULT NULL,
  `value_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata`
--

INSERT INTO `metadata` (`id`, `entityId`, `entityType`, `name`, `value`, `itemIndex`, `value_tiny`, `value_time`, `value_num`, `value_text`, `value_lat`, `value_lng`) VALUES
(13, 6, 'pool', 'poolDimensions.length', '25', 0, NULL, NULL, 25, NULL, NULL, NULL),
(14, 6, 'pool', 'location.lat', '-1.2611664809506706', 0, NULL, NULL, NULL, NULL, -1.2611664809506706, NULL),
(15, 6, 'pool', 'location.lng', '36.80447787409544', 0, NULL, NULL, NULL, NULL, 36.80447787409544, NULL),
(24, 6, 'pool', 'operatingHours.closing', '29100000', 0, NULL, 32700000, NULL, NULL, NULL, NULL),
(25, 6, 'pool', 'hasLaneRopes', '1', 0, 0, NULL, NULL, NULL, NULL, NULL),
(26, 6, 'pool', 'isHeated', 'true', 0, 0, NULL, NULL, NULL, NULL, NULL),
(28, 6, 'pool', 'cleanliness', '2', 0, 5, NULL, NULL, NULL, NULL, NULL),
(29, 6, 'pool', 'hasOnDutyLifeguard', '0', 0, 0, NULL, NULL, NULL, NULL, NULL),
(35, 6, 'pool', 'hostInstitutionType', 'gym', 0, NULL, NULL, NULL, 'school', NULL, NULL),
(36, 6, 'pool', 'poolShape', 'square', 0, NULL, NULL, NULL, 'round', NULL, NULL),
(37, 6, 'pool', 'poolDimensions.length', '12', 0, NULL, NULL, 125, NULL, NULL, NULL),
(40, 6, 'pool', 'poolDimensions.width', '23', 0, NULL, NULL, 26, NULL, NULL, NULL),
(41, 6, 'pool', 'crowdiness', '2', 0, 4, NULL, NULL, NULL, NULL, NULL),
(42, 6, 'pool', 'openToPublic', 'true', 0, 0, NULL, NULL, NULL, NULL, NULL),
(43, 6, 'pool', 'entryFeeIn.ksh', '54', 0, NULL, NULL, 57, NULL, NULL, NULL),
(44, 6, 'pool', 'changingRoomCleanliness', '4', 0, 5, NULL, NULL, NULL, NULL, NULL),
(45, 6, 'pool', 'operatingHours.opening', '14820000', 0, NULL, 22020000, NULL, NULL, NULL, NULL),
(46, 6, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 47, NULL, NULL, NULL),
(57, 43, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 7, NULL, NULL, NULL),
(58, 43, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(59, 43, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(60, 43, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 97, NULL, NULL, NULL),
(61, 43, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 19, NULL, NULL, NULL),
(62, 43, 'pool', 'crowdiness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(63, 43, 'pool', 'operatingHours.closing', NULL, 0, NULL, 76800000, NULL, NULL, NULL, NULL),
(64, 43, 'pool', 'operatingHours.opening', NULL, 0, NULL, 29340000, NULL, NULL, NULL, NULL),
(65, 43, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 43, NULL, NULL, NULL),
(66, 43, 'pool', 'cleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(67, 43, 'pool', 'changingRoomCleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(68, 43, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.18135756673602, NULL),
(69, 43, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.886576888271335),
(141, 41, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(142, 41, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 20, NULL, NULL, NULL),
(143, 41, 'pool', 'operatingHours.opening', NULL, 0, NULL, 63000000, NULL, NULL, NULL, NULL),
(144, 41, 'pool', 'operatingHours.closing', NULL, 0, NULL, 51600000, NULL, NULL, NULL, NULL),
(145, 41, 'pool', 'crowdiness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(146, 41, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(147, 41, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(148, 41, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(149, 41, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(150, 41, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 59, NULL, NULL, NULL),
(151, 41, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 39, NULL, NULL, NULL),
(152, 41, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(153, 41, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(154, 41, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(155, 41, 'pool', 'changingRoomCleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(156, 41, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(157, 41, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.1288782556062, NULL),
(158, 41, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 79, NULL, NULL, NULL),
(159, 41, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.83443749542126),
(160, 44, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(161, 44, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(162, 44, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 69, NULL, NULL, NULL),
(163, 44, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Curvy', NULL, NULL),
(164, 44, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(165, 44, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 13, NULL, NULL, NULL),
(166, 44, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 34, NULL, NULL, NULL),
(167, 44, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(168, 44, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(169, 44, 'pool', 'cleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(170, 44, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.21124353908365, NULL),
(171, 44, 'pool', 'operatingHours.opening', NULL, 0, NULL, 64140000, NULL, NULL, NULL, NULL),
(172, 44, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(173, 44, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.856021292099534),
(174, 44, 'pool', 'operatingHours.closing', NULL, 0, NULL, 58320000, NULL, NULL, NULL, NULL),
(175, 44, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 71, NULL, NULL, NULL),
(176, 44, 'pool', 'crowdiness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(177, 44, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(178, 44, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(179, 50, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(180, 50, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(181, 50, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 22, NULL, NULL, NULL),
(182, 50, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 60, NULL, NULL, NULL),
(183, 50, 'pool', 'operatingHours.opening', NULL, 0, NULL, 35820000, NULL, NULL, NULL, NULL),
(184, 50, 'pool', 'operatingHours.closing', NULL, 0, NULL, 64980000, NULL, NULL, NULL, NULL),
(185, 50, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(186, 50, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(187, 50, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(188, 50, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(189, 50, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(190, 50, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 99, NULL, NULL, NULL),
(191, 50, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 4, NULL, NULL, NULL),
(192, 50, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(193, 50, 'pool', 'cleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(194, 50, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(195, 50, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(196, 50, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.27179516377543, NULL),
(197, 50, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.70611645650471),
(198, 45, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(199, 45, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(200, 45, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 96, NULL, NULL, NULL),
(201, 45, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 68, NULL, NULL, NULL),
(202, 45, 'pool', 'operatingHours.opening', NULL, 0, NULL, 11160000, NULL, NULL, NULL, NULL),
(203, 45, 'pool', 'operatingHours.closing', NULL, 0, NULL, 58740000, NULL, NULL, NULL, NULL),
(204, 45, 'pool', 'crowdiness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(205, 45, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(206, 45, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(207, 45, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(208, 45, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(209, 45, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 36, NULL, NULL, NULL),
(210, 45, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 92, NULL, NULL, NULL),
(211, 45, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(212, 45, 'pool', 'cleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(213, 45, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(214, 45, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(215, 45, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.12048181449622, NULL),
(216, 45, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.77437370829553),
(217, 51, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(218, 51, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(219, 51, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 53, NULL, NULL, NULL),
(220, 51, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 19, NULL, NULL, NULL),
(221, 51, 'pool', 'operatingHours.opening', NULL, 0, NULL, 13320000, NULL, NULL, NULL, NULL),
(222, 51, 'pool', 'operatingHours.closing', NULL, 0, NULL, 38220000, NULL, NULL, NULL, NULL),
(223, 51, 'pool', 'crowdiness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(224, 51, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(225, 51, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(226, 51, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(227, 51, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 78, NULL, NULL, NULL),
(228, 51, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(229, 51, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 8, NULL, NULL, NULL),
(230, 51, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(231, 51, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(232, 51, 'pool', 'changingRoomCleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(233, 51, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(234, 51, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.28791680222649, NULL),
(235, 51, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.871897805687176),
(236, 46, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(237, 46, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(238, 46, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 51, NULL, NULL, NULL),
(239, 46, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 24, NULL, NULL, NULL),
(240, 46, 'pool', 'operatingHours.opening', NULL, 0, NULL, 37080000, NULL, NULL, NULL, NULL),
(241, 46, 'pool', 'operatingHours.closing', NULL, 0, NULL, 27060000, NULL, NULL, NULL, NULL),
(242, 46, 'pool', 'crowdiness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(243, 46, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(244, 46, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(245, 46, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(246, 46, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(247, 46, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 37, NULL, NULL, NULL),
(248, 46, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 23, NULL, NULL, NULL),
(249, 46, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(250, 46, 'pool', 'cleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(251, 46, 'pool', 'changingRoomCleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(252, 46, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(253, 46, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.2975009101683, NULL),
(254, 46, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.80892847395416),
(255, 49, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(256, 49, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(257, 49, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 66, NULL, NULL, NULL),
(258, 49, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 54, NULL, NULL, NULL),
(259, 49, 'pool', 'operatingHours.opening', NULL, 0, NULL, 37320000, NULL, NULL, NULL, NULL),
(260, 49, 'pool', 'operatingHours.closing', NULL, 0, NULL, 25740000, NULL, NULL, NULL, NULL),
(261, 49, 'pool', 'crowdiness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(262, 49, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(263, 49, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(264, 49, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(265, 49, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(266, 49, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 98, NULL, NULL, NULL),
(267, 49, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 20, NULL, NULL, NULL),
(268, 49, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(269, 49, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(270, 49, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(271, 49, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(272, 49, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.28480893220072, NULL),
(273, 49, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.74295430424679),
(274, 52, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(275, 52, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(276, 52, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 36, NULL, NULL, NULL),
(277, 52, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 37, NULL, NULL, NULL),
(278, 52, 'pool', 'operatingHours.opening', NULL, 0, NULL, 53400000, NULL, NULL, NULL, NULL),
(279, 52, 'pool', 'operatingHours.closing', NULL, 0, NULL, 17520000, NULL, NULL, NULL, NULL),
(280, 52, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(281, 52, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(282, 52, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(283, 52, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(284, 52, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(285, 52, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 39, NULL, NULL, NULL),
(286, 52, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 79, NULL, NULL, NULL),
(287, 52, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(288, 52, 'pool', 'changingRoomCleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(289, 52, 'pool', 'cleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(290, 52, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(291, 52, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.22578206793024, NULL),
(292, 52, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.7419881447182),
(293, 48, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(294, 48, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 58, NULL, NULL, NULL),
(295, 48, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 49, NULL, NULL, NULL),
(296, 48, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(297, 48, 'pool', 'operatingHours.opening', NULL, 0, NULL, 71640000, NULL, NULL, NULL, NULL),
(298, 48, 'pool', 'operatingHours.closing', NULL, 0, NULL, 54000000, NULL, NULL, NULL, NULL),
(299, 48, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(300, 48, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(301, 48, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(302, 48, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(303, 48, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(304, 48, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 72, NULL, NULL, NULL),
(305, 48, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 29, NULL, NULL, NULL),
(306, 48, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(307, 48, 'pool', 'cleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(308, 48, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(309, 48, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(310, 48, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.16608495456819, NULL),
(311, 48, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.87584130013584),
(312, 47, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(313, 47, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(314, 47, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 61, NULL, NULL, NULL),
(315, 47, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 84, NULL, NULL, NULL),
(316, 47, 'pool', 'operatingHours.opening', NULL, 0, NULL, 29820000, NULL, NULL, NULL, NULL),
(317, 47, 'pool', 'operatingHours.closing', NULL, 0, NULL, 56520000, NULL, NULL, NULL, NULL),
(318, 47, 'pool', 'crowdiness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(319, 47, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(320, 47, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(321, 47, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(322, 47, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(323, 47, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 13, NULL, NULL, NULL),
(324, 47, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 8, NULL, NULL, NULL),
(325, 47, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(326, 47, 'pool', 'cleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(327, 47, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(328, 47, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(329, 47, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.26903112209799, NULL),
(330, 47, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.72514520802755),
(331, 53, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(332, 53, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(333, 53, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 100, NULL, NULL, NULL),
(334, 53, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 3, NULL, NULL, NULL),
(335, 53, 'pool', 'operatingHours.opening', NULL, 0, NULL, 15300000, NULL, NULL, NULL, NULL),
(336, 53, 'pool', 'operatingHours.closing', NULL, 0, NULL, 45000000, NULL, NULL, NULL, NULL),
(337, 53, 'pool', 'crowdiness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(338, 53, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(339, 53, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(340, 53, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(341, 53, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(342, 53, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 7, NULL, NULL, NULL),
(343, 53, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 86, NULL, NULL, NULL),
(344, 53, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(345, 53, 'pool', 'cleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(346, 53, 'pool', 'changingRoomCleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(347, 53, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(348, 53, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.12143006731014, NULL),
(349, 53, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.771492148665715),
(350, 54, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(351, 54, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(352, 54, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 76, NULL, NULL, NULL),
(353, 54, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 63, NULL, NULL, NULL),
(354, 54, 'pool', 'operatingHours.opening', NULL, 0, NULL, 15240000, NULL, NULL, NULL, NULL),
(355, 54, 'pool', 'operatingHours.closing', NULL, 0, NULL, 67860000, NULL, NULL, NULL, NULL),
(356, 54, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(357, 54, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(358, 54, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(359, 54, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(360, 54, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(361, 54, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 74, NULL, NULL, NULL),
(362, 54, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 86, NULL, NULL, NULL),
(363, 54, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(364, 54, 'pool', 'cleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(365, 54, 'pool', 'changingRoomCleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(366, 54, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(367, 54, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.23299291012833, NULL),
(368, 54, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.81301589053815),
(369, 55, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(370, 55, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(371, 55, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 61, NULL, NULL, NULL),
(372, 55, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 81, NULL, NULL, NULL),
(373, 55, 'pool', 'operatingHours.opening', NULL, 0, NULL, 29520000, NULL, NULL, NULL, NULL),
(374, 55, 'pool', 'operatingHours.closing', NULL, 0, NULL, 74100000, NULL, NULL, NULL, NULL),
(375, 55, 'pool', 'crowdiness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(376, 55, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(377, 55, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(378, 55, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(379, 55, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(380, 55, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 98, NULL, NULL, NULL),
(381, 55, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 37, NULL, NULL, NULL),
(382, 55, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(383, 55, 'pool', 'cleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(384, 55, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(385, 55, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(386, 55, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.18349738419893, NULL),
(387, 55, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.88247584077504),
(388, 56, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(389, 56, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(390, 56, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 60, NULL, NULL, NULL),
(391, 56, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 75, NULL, NULL, NULL),
(392, 56, 'pool', 'operatingHours.opening', NULL, 0, NULL, 75720000, NULL, NULL, NULL, NULL),
(393, 56, 'pool', 'operatingHours.closing', NULL, 0, NULL, 52140000, NULL, NULL, NULL, NULL),
(394, 56, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(395, 56, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(396, 56, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(397, 56, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(398, 56, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(399, 56, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 86, NULL, NULL, NULL),
(400, 56, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(401, 56, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 16, NULL, NULL, NULL),
(402, 56, 'pool', 'cleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(403, 56, 'pool', 'changingRoomCleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(404, 56, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(405, 56, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.29191550122956, NULL),
(406, 56, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.817430112948216),
(407, 57, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(408, 57, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Curvy', NULL, NULL),
(409, 57, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 58, NULL, NULL, NULL),
(410, 57, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 59, NULL, NULL, NULL),
(411, 57, 'pool', 'operatingHours.opening', NULL, 0, NULL, 30240000, NULL, NULL, NULL, NULL),
(412, 57, 'pool', 'operatingHours.closing', NULL, 0, NULL, 56160000, NULL, NULL, NULL, NULL),
(413, 57, 'pool', 'crowdiness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(414, 57, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(415, 57, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(416, 57, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(417, 57, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(418, 57, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 93, NULL, NULL, NULL),
(419, 57, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 55, NULL, NULL, NULL),
(420, 57, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(421, 57, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(422, 57, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(423, 57, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(424, 57, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.21766173423782, NULL),
(425, 57, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.8852572459341),
(426, 62, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(427, 62, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Round', NULL, NULL),
(428, 62, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 51, NULL, NULL, NULL),
(429, 62, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 63, NULL, NULL, NULL),
(430, 62, 'pool', 'operatingHours.opening', NULL, 0, NULL, 44640000, NULL, NULL, NULL, NULL),
(431, 62, 'pool', 'operatingHours.closing', NULL, 0, NULL, 72240000, NULL, NULL, NULL, NULL),
(432, 62, 'pool', 'crowdiness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(433, 62, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(434, 62, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(435, 62, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(436, 62, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(437, 62, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 38, NULL, NULL, NULL),
(438, 62, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 92, NULL, NULL, NULL),
(439, 62, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(440, 62, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(441, 62, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(442, 62, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(443, 62, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.18015425793895, NULL),
(444, 62, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.71433225870354),
(445, 61, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(446, 61, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Curvy', NULL, NULL),
(447, 61, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 27, NULL, NULL, NULL),
(448, 61, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 73, NULL, NULL, NULL),
(449, 61, 'pool', 'operatingHours.opening', NULL, 0, NULL, 51300000, NULL, NULL, NULL, NULL),
(450, 61, 'pool', 'operatingHours.closing', NULL, 0, NULL, 77820000, NULL, NULL, NULL, NULL),
(451, 61, 'pool', 'crowdiness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(452, 61, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(453, 61, 'pool', 'openToChildren', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(454, 61, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(455, 61, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(456, 61, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 84, NULL, NULL, NULL),
(457, 61, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 100, NULL, NULL, NULL),
(458, 61, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(459, 61, 'pool', 'cleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(460, 61, 'pool', 'changingRoomCleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(461, 61, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(462, 61, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.19650691197597, NULL),
(463, 61, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.863445343717224),
(464, 63, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(465, 63, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(466, 63, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 42, NULL, NULL, NULL),
(467, 63, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 20, NULL, NULL, NULL),
(468, 63, 'pool', 'operatingHours.opening', NULL, 0, NULL, 77220000, NULL, NULL, NULL, NULL),
(469, 63, 'pool', 'crowdiness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(470, 63, 'pool', 'operatingHours.closing', NULL, 0, NULL, 16620000, NULL, NULL, NULL, NULL),
(471, 63, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(472, 63, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(473, 63, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(474, 63, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(475, 63, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 85, NULL, NULL, NULL),
(476, 63, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 26, NULL, NULL, NULL),
(477, 63, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(478, 63, 'pool', 'cleanliness', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL),
(479, 63, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(480, 63, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(481, 63, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.14040462109087, NULL),
(482, 63, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.85747910827525),
(483, 58, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(484, 58, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Rectangle', NULL, NULL),
(485, 58, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 4, NULL, NULL, NULL),
(486, 58, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 58, NULL, NULL, NULL),
(487, 58, 'pool', 'operatingHours.opening', NULL, 0, NULL, 28800000, NULL, NULL, NULL, NULL),
(488, 58, 'pool', 'operatingHours.closing', NULL, 0, NULL, 79920000, NULL, NULL, NULL, NULL),
(489, 58, 'pool', 'crowdiness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(490, 58, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(491, 58, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(492, 58, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(493, 58, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(494, 58, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 49, NULL, NULL, NULL),
(495, 58, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 38, NULL, NULL, NULL),
(496, 58, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(497, 58, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(498, 58, 'pool', 'changingRoomCleanliness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(499, 58, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(500, 58, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.16156634177412, NULL),
(501, 58, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.86398483221031),
(502, 59, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Gym', NULL, NULL),
(503, 59, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(504, 59, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 16, NULL, NULL, NULL),
(505, 59, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 65, NULL, NULL, NULL),
(506, 59, 'pool', 'operatingHours.opening', NULL, 0, NULL, 80700000, NULL, NULL, NULL, NULL),
(507, 59, 'pool', 'crowdiness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(508, 59, 'pool', 'operatingHours.closing', NULL, 0, NULL, 66780000, NULL, NULL, NULL, NULL),
(509, 59, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(510, 59, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(511, 59, 'pool', 'hasLaneRopes', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(512, 59, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(513, 59, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 22, NULL, NULL, NULL),
(514, 59, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 85, NULL, NULL, NULL),
(515, 59, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(516, 59, 'pool', 'cleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(517, 59, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(518, 59, 'pool', 'changingRoomCleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(519, 59, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.11792042963823, NULL),
(520, 59, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.75559689026559),
(521, 60, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'School', NULL, NULL),
(522, 60, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Square', NULL, NULL),
(523, 60, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 68, NULL, NULL, NULL),
(524, 60, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 88, NULL, NULL, NULL),
(525, 60, 'pool', 'operatingHours.opening', NULL, 0, NULL, 37260000, NULL, NULL, NULL, NULL),
(526, 60, 'pool', 'operatingHours.closing', NULL, 0, NULL, 20640000, NULL, NULL, NULL, NULL),
(527, 60, 'pool', 'crowdiness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(528, 60, 'pool', 'openToPublic', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(529, 60, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(530, 60, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(531, 60, 'pool', 'isHeated', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(532, 60, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 26, NULL, NULL, NULL),
(533, 60, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 50, NULL, NULL, NULL),
(534, 60, 'pool', 'isIndoor', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(535, 60, 'pool', 'cleanliness', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL),
(536, 60, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(537, 60, 'pool', 'hasOnDutyLifeguard', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(538, 60, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.21236700142554, NULL),
(539, 60, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.892189803214755),
(540, 64, 'pool', 'hostInstitutionType', NULL, 0, NULL, NULL, NULL, 'Hotel', NULL, NULL),
(541, 64, 'pool', 'poolShape', NULL, 0, NULL, NULL, NULL, 'Curvy', NULL, NULL),
(542, 64, 'pool', 'poolDimensions.length', NULL, 0, NULL, NULL, 98, NULL, NULL, NULL),
(543, 64, 'pool', 'poolDimensions.width', NULL, 0, NULL, NULL, 72, NULL, NULL, NULL),
(544, 64, 'pool', 'operatingHours.opening', NULL, 0, NULL, 57300000, NULL, NULL, NULL, NULL),
(545, 64, 'pool', 'operatingHours.closing', NULL, 0, NULL, 78120000, NULL, NULL, NULL, NULL),
(546, 64, 'pool', 'crowdiness', NULL, 0, 4, NULL, NULL, NULL, NULL, NULL),
(547, 64, 'pool', 'openToPublic', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(548, 64, 'pool', 'openToChildren', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(549, 64, 'pool', 'hasLaneRopes', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL),
(550, 64, 'pool', 'isHeated', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(551, 64, 'pool', 'entryFeeIn.ksh', NULL, 0, NULL, NULL, 21, NULL, NULL, NULL),
(552, 64, 'pool', 'isIndoor', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(553, 64, 'pool', 'entryFeeIn.usd', NULL, 0, NULL, NULL, 85, NULL, NULL, NULL),
(554, 64, 'pool', 'cleanliness', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(555, 64, 'pool', 'changingRoomCleanliness', NULL, 0, 2, NULL, NULL, NULL, NULL, NULL),
(556, 64, 'pool', 'hasOnDutyLifeguard', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL),
(557, 64, 'pool', 'location.lat', NULL, 0, NULL, NULL, NULL, NULL, -1.27910478579362, NULL),
(558, 64, 'pool', 'location.lng', NULL, 0, NULL, NULL, NULL, NULL, NULL, 36.827863523995696);

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
(19, 12, 6, 'coach-pool');

-- --------------------------------------------------------

--
-- Table structure for table `unprocessed-swim-results`
--

CREATE TABLE `unprocessed-swim-results` (
  `id` int(11) NOT NULL,
  `rank` int(11) NOT NULL,
  `firstName` varchar(120) NOT NULL,
  `surname` varchar(120) NOT NULL,
  `thirdName` varchar(120) NOT NULL,
  `age` int(11) NOT NULL,
  `ageGroup` varchar(50) NOT NULL,
  `time` double NOT NULL,
  `isProcessed` tinyint(4) NOT NULL DEFAULT 0,
  `created-at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD KEY `id-entityId-default` (`id`,`entityId`,`alt`);

--
-- Indexes for table `metadata`
--
ALTER TABLE `metadata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id-entityId-type` (`id`,`entityId`,`entityType`) USING BTREE,
  ADD UNIQUE KEY `number-values` (`id`,`name`,`value_num`),
  ADD KEY `time-values` (`id`,`name`,`value_time`),
  ADD KEY `text-values` (`id`,`name`,`value_text`),
  ADD KEY `lat-lng-values` (`id`,`name`,`value_lat`,`value_lng`),
  ADD KEY `tinyInt-values` (`id`,`name`,`value_tiny`) USING BTREE;

--
-- Indexes for table `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `entityId1` (`entityId1`,`entityId2`,`relationship`);

--
-- Indexes for table `unprocessed-swim-results`
--
ALTER TABLE `unprocessed-swim-results`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entity`
--
ALTER TABLE `entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `metadata`
--
ALTER TABLE `metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=559;

--
-- AUTO_INCREMENT for table `relations`
--
ALTER TABLE `relations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `unprocessed-swim-results`
--
ALTER TABLE `unprocessed-swim-results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
