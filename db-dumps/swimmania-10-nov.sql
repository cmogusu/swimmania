-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 11, 2025 at 02:41 PM
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
  `type` enum('swimmer','school','pool','team','swimMeet','coach','lifeguard','swimResult','swimEvent','parent','user','comment','rating') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `insertTime` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entity`
--

INSERT INTO `entity` (`id`, `name`, `type`, `description`, `insertTime`) VALUES
(6, 'favorite pool for play', 'pool', 'event more coherent description ', '2024-10-25 09:35:10'),
(41, 'Magdalen Garden', 'pool', 'out how now althoug worriedly miserably habit drat oh monumental until interestingly tentacle recklessly', '2025-09-18 12:24:24'),
(43, 'North Streets', 'pool', 'flawless minor proliferate publicize usually whether wheel for lonely scorn effector when carelessly despite gown despite egg corporatio', '2025-09-18 12:48:58'),
(44, 'N Railroad Street', 'coach', 'but for although inside trick ack uh-huh uniform interestingly at', '2025-09-18 13:20:25'),
(45, 'Andreane Track', 'coach', 'hence gruesome who home incidentally pfft haunting out till why yahoo ouch blue versus micromanage tag', '2025-09-19 13:17:23'),
(46, 'S College Street', 'coach', 'moral sorrowful stealthily out afore with pants apud long lively sunny cricket stool regarding vulgarise mmm louse even honorable phew', '2025-09-19 13:17:23'),
(47, 'Post Road', 'coach', 'writhing sizzling blah impure intensely grim opposite viability hovercraft with valuable exalt', '2025-09-19 13:17:23'),
(48, 'Goodwin Falls', 'pool', 'including although throughout promptly hydrolyse shrilly in foolish supposing incidentally provided blight lock beside an reassuringly so rebuild unless step-mother', '2025-09-19 13:17:23'),
(49, 'Justus Haven', 'pool', 'lampoon relieve ick er when than yowza reborn than summer discrete pro since underplay uselessly duh exempt not', '2025-09-19 13:17:23'),
(50, 'Willow Road', 'swimmer', 'electrify whether unexpectedly swerve yum agreement but indeed charlatan swill meanwhile whose scented uh-huh gladly among along an celsius gasp', '2025-09-19 13:17:23'),
(51, 'Caitlyn Dale', 'pool', 'above of demob boldly so jiggle colorize sympathetically going outside buttery duh late overheard', '2025-09-19 13:17:23'),
(52, 'Kings Highway', 'pool', 'provided nor dental upon fashion pro if governance ponder finally friendly questionable tinted', '2025-09-19 13:17:23'),
(53, 'Cedar Street', 'school', 'efface er searchingly huzzah reassuringly distant provided wearily ack cruelty override patiently supposing earth until hygienic whenever pace', '2025-09-19 13:17:23'),
(54, 'Dooley Lake', 'coach', 'geez finally taut cow quit when slight ah tray pfft nervous knavishly gah topsail onto experienced toward loyally up', '2025-09-19 13:17:23'),
(55, 'N 9th Streets', 'comment', 'dim whenever between once ah however scrutinise recount scorpion how', '2025-09-19 13:24:54'),
(56, 'Pine Close', 'rating', 'plain whoa rear mozzarella grimy from circa inspect eyebrow fond abnormally far but bathhouse', '2025-09-19 13:24:54'),
(57, 'Victoria Place', 'coach', 'uh-huh incidentally bug as anguished till ick likewise king truly despite hmph detective never thoughtfully alongside adaptation incidentally webbed eyeglasses', '2025-09-19 13:24:54'),
(58, 'Manor Way', 'pool', 'cycle boohoo until willow those brush hence trusting likewise fragrant pace awareness midst huzzah lest bonfire', '2025-09-19 13:24:54'),
(59, 'Matteo Forge', 'team', 'bus wallaby mountain spring formula instead swim clamour mainstream after bookcase ridge massage redesign yet politely a restfully', '2025-09-19 13:24:54'),
(60, 'Gloucester Road', 'coach', 'readies unless um underneath necklace glossy mmm around institute hence king dispose sun yowza biodegradable provided successfully meanwhile', '2025-09-19 13:24:54'),
(61, 'Cassin Falls', 'pool', 'motivate why knowledgeably aha quip oh dish countess account loftily yippee sock folklore political underneath brave aha but amid lest', '2025-09-19 13:24:54'),
(62, 'Alvena Hill', 'pool', 'if busy lazy so mmm supposing authentic cutlet fooey whose however yum yippee', '2025-09-19 13:24:54'),
(63, 'S Broad Street', 'pool', 'absent besmirch rapid righteously gee mobility gifted toward hunt yippee early yahoo verbally neatly horse unnaturally terraform willow swiftly with', '2025-09-19 13:24:54'),
(64, 'S Monroe Street', 'pool', 'object boohoo merrily pants mouser moralise yet in unexpectedly terribly guard blah upliftingly over reluctantly athwart amidst litter', '2025-09-19 13:24:54'),
(65, 'Inter Clubs Swimming Championships', 'swimMeet', 'NCSA Inter-Clubs Swimming Championships April 11-13 2025', '2025-09-22 11:22:59'),
(66, 'Beech Road', 'swimmer', 'community oof since midwife tut hm posh after planula excluding until', '2025-10-24 11:49:55'),
(67, 'Beaulah Land', 'swimmer', 'tedious fen up scope nor honestly because boo fast irresponsible the curly', '2025-10-24 11:51:21'),
(68, 'N 7th Street', 'swimmer', 'functional circa friendly yahoo ouch meanwhile er monstrous following nor', '2025-10-24 12:45:47'),
(69, 'Peter Mews', 'swimmer', 'as via weighty contrail times rapidly sticky lashes the scale coaxingly friendly step-mother boohoo folklore foodstuffs at courageously near oof', '2025-10-24 12:48:15'),
(70, 'Cassin Burgs', 'swimmer', 'but within readjust scrape coin faint even self-assured recount uselessly rubbery modulo enormously boss ouch', '2025-10-24 12:48:48'),
(71, 'Alisa Streets', 'swimmer', 'frantically inspect cutover arraign king growing hm via conceal community blushing psst fooey upbeat nectarine reboot stupendous dearly lady', '2025-10-24 12:55:41'),
(72, 'West Street', 'school', 'hmph barring wherever wholly neatly versus now hornet separately rekindle essence between bootleg which sleepily', '2025-10-24 12:58:39'),
(73, 'Turner Locks', 'school', 'in bravely whose hm beautifully utilized aha upon why within mooch fidget horn unbearably', '2025-10-24 13:03:28'),
(74, 'Wintheiser Shores', 'school', 'worth redesign retool but lack numb than enormously stable pfft yowza plus', '2025-10-24 13:03:46'),
(75, 'Georgette Freeway', 'school', 'since above hm scrape inject dash pfft yahoo spark sure-footed super signature jaggedly um monstrous usefully realistic any', '2025-10-24 13:04:04'),
(76, 'Becker Ways', 'school', 'coaxingly resort blah insist meanwhile but innovate worth mmm fiddle writ joshingly boo yahoo helpfully however', '2025-10-24 13:04:04'),
(77, 'First Street', 'school', 'scarily ouch miserably profuse verbally fragrant fearless as outside gum confute aboard geez duh oval immediately', '2025-10-24 13:04:04'),
(78, 'Connell Tunnel', 'school', 'indeed meh oh degenerate grass and engender shampoo loyally gosh excited freely outlying across collaborate jovially however distant', '2025-10-24 13:04:04'),
(79, 'Kozey Valleys', 'school', 'an yum modulo softly before but beautifully what within underplay forecast shiny regularly story alert hence once', '2025-10-24 13:04:04'),
(80, 'Karianne Glen', 'school', 'out against proofread accountability light throughout oh terrible information reporter bah curry weatherize disposer what oxidise on bah yowza', '2025-10-24 13:04:47'),
(81, 'Abbott Lights', 'lifeguard', 'lava gosh institute pile amidst for whenever soap sequester while brr whether cinema deeply live ah warming quixotic flood', '2025-10-24 13:34:05'),
(82, 'The Coppice', 'lifeguard', 'joyously even place shout when mortally gladly digit fooey roughly or mid near dusk thoroughly via', '2025-10-24 13:37:32'),
(83, 'Meadow Lane', 'swimEvent', 'per psst eggplant paltry partridge meanwhile over live hoot deliberately spirit pro remorseful forenenst', '2025-10-24 13:40:52'),
(84, 'The Laurels', 'swimEvent', 'though bah small modulo solemnly than until second inasmuch yet', '2025-10-24 14:00:45'),
(85, 'Miller Oval', 'swimEvent', 'towards however before gee ham finding urban minus bakeware punctually kissingly lest', '2025-10-24 14:03:48'),
(86, 'Imogene Loop', 'swimEvent', 'pro uncover vanish elegant likewise atop unwritten which because shyly mid', '2025-10-24 14:07:21'),
(87, 'Well Lane', 'swimEvent', 'remark out custom shakily grandpa prohibition nor yahoo um bowler ouch nor hm sleepily as', '2025-10-24 14:08:10'),
(88, 'Ezra Rapid', 'swimEvent', 'optimal incidentally for fine repossess developing someplace too abaft excluding blah crumble gosh hmph bemuse', '2025-10-24 14:09:24'),
(89, 'Kelton Garden', 'swimEvent', 'without plus drug pro reasoning innocently yahoo that snow premium far since fooey cruelly retool humiliating fooey', '2025-10-24 14:09:24'),
(90, 'Connelly Ford', 'swimEvent', 'ferociously ethyl turret chairperson ah digestive querulous ha inasmuch creator boohoo phooey yet overfeed wasteful furthermore lanky', '2025-10-24 14:09:24'),
(91, 'Predovic Common', 'swimEvent', 'yet ew forage nice aha innocently excepting via that where worse ouch before vivaciously provided pro fooey likely treble', '2025-10-24 14:09:24'),
(92, 'S Broadway Street', 'swimEvent', 'qua tooth genuine meanwhile fairly train mmm design what sometimes stabilise underplay rout', '2025-10-24 14:09:24'),
(93, 'Adrian Ranch', 'swimEvent', 'huzzah hamburger CD delightfully kissingly strictly deduce oh nearly ashamed fair tensely cavernous huzzah spew abaft mmm treble angelic fortunately', '2025-10-24 14:10:25'),
(94, 'Roob Run', 'swimEvent', 'pfft hoarse inasmuch than flickering athwart meh igloo descent pfft meaningfully', '2025-10-24 14:10:51'),
(95, 'Walsh Springs', 'swimEvent', 'toward swiftly pasta shameless upliftingly without phooey gadzooks fen compromise next entomb intensely unbalance', '2025-10-24 14:10:51'),
(96, 'Cedar Close', 'swimEvent', 'gah worldly uh-huh table physically whoever oddly excluding revere limp endow ramp versus where bah meh inasmuch outdo even unearth', '2025-10-24 14:10:51'),
(97, 'Bruen Brook', 'swimEvent', 'angelic censor fussy gruesome sup pretend quiet voluntarily sunbeam gosh er till frivolous', '2025-10-24 14:10:51'),
(98, 'Jaycee Corners', 'swimEvent', 'except hm opposite ugh consequently croon hello stale pip even', '2025-10-24 14:10:51'),
(99, 'Hawthorn Avenue', 'swimEvent', 'finally fall familiar through eyebrow beneath revitalise junior circa pro meh boohoo profitable digit instead aside', '2025-10-24 14:11:40'),
(100, 'Block Cape', 'swimEvent', 'smoothly tame openly old incidentally speedily unless colon huzzah yum', '2025-10-24 14:13:14'),
(101, 'Albin Meadows', 'lifeguard', 'broadside pecan ah celebrate goose guilty graft oh mmm beautifully lieu except bob right thoughtfully ouch', '2025-10-24 14:19:43'),
(102, 'W Washington Avenue', 'lifeguard', 'noteworthy since plump solder briefly readily geez ownership degrease antelope of mountain valiantly meanwhile woot below frenetically majestic who', '2025-10-24 14:20:23'),
(103, 'Reva Corner', 'pool', 'beside minus ew consequently igloo drat acclaimed or monthly as obnoxiously', '2025-10-24 14:22:44'),
(104, 'Phyllis Ville', 'pool', 'pish ride quicker excited what certainly homeschool yahoo commonly goose failing profane but joshingly', '2025-10-24 14:23:13'),
(105, 'Little Drive', 'school', 'violently phew char failing until loyally inside amongst yahoo clonk sad ack continually grade', '2025-10-24 14:43:19'),
(106, 'Schimmel Extensions', 'team', 'while when adumbrate healthily prejudge mid railway service snoopy respectful dwell blink minty before', '2025-10-24 14:43:47'),
(107, 'N Jefferson Street', 'swimMeet', 'loyally sticky academics in last joyously unnaturally direct into emphasise dependable failing cinema for', '2025-10-24 14:43:56'),
(108, 'Kaylin Corner', 'coach', 'gratefully incidentally brr given embossing um lovingly collaboration hmph via responsible properly madly unto charter exactly', '2025-10-24 15:10:22'),
(109, 'Auer Crossing', 'team', 'lounge aw athwart aware aha internationalize or notwithstanding deafening enfold zowie awful accompany until since capsize crossly bony consequently hmph', '2025-10-24 15:10:45'),
(110, 'Woodlands', 'pool', 'greedily political wilt underneath true whoever where unearth poorly vice confusion times vista yippee gosh wherever bide joyful too unhappy', '2025-10-24 15:11:24'),
(111, 'N Washington Street', 'school', 'scare acidic hmph omelet supposing although shred if that unused', '2025-10-24 15:11:34'),
(112, 'Old State Road', 'swimmer', 'baptise mid bitterly decryption pluck fictionalize content geez impact edible mid clamour zowie minty see wear', '2025-10-24 15:12:27'),
(113, 'Alaina Curve', 'parent', 'upliftingly notwithstanding gee dependent daily closed eyeliner reopen yawningly grumpy limp indeed since last allocation viability', '2025-10-24 15:15:02'),
(114, 'Chestnut Street', 'parent', 'uniform which developing not task fooey yearn steel asset hence graft nor inasmuch uh-huh worth finally phooey cook', '2025-10-24 15:15:31'),
(115, 'Herminia Burgs', 'swimEvent', 'back furthermore unless thoroughly judgementally gosh but peter watery out covenant aha dapper grubby rejigger ambitious psst consequently quickly', '2025-10-24 15:15:58'),
(116, 'Funk Pine', 'swimEvent', 'beneath produce annex spectate neck psst celebrate puny into whereas dwell', '2025-10-24 15:16:13'),
(117, 'Vanessa Prairie', 'lifeguard', 'repentant nervously commonly almost leading towards uh-huh next nor elevation screw almost throughout where yahoo thrifty', '2025-10-24 15:16:29'),
(118, 'Dietrich Islands', 'coach', 'closed well-documented for dally remand embarrassment considering coliseum incidentally toward why through unimpressively joshingly opposite and gnaw neatly morbidity rosemary', '2025-10-24 15:16:48'),
(119, 'Yasmine Estates', 'swimMeet', 'closely oh video whoa plus however pish floodlight drug pricey flustered edible zowie bidet throughout anesthetize privilege gosh', '2025-10-24 15:17:07'),
(120, 'Effertz Falls', 'team', 'finer via through round ravage co-producer and aboard meager rigidly bogus careless ah following without', '2025-10-24 15:17:30'),
(121, 'Witting Walk', 'swimMeet', 'pfft sweet twine joshingly useless cornet now less coarse live chairperson epic bruised punctual amongst meh spanish', '2025-10-24 15:21:32'),
(122, 'Clive', 'user', 'this is a good thing', '2025-10-31 13:22:59'),
(123, 'Strange', 'user', 'doctor strange', '2025-10-31 13:43:38'),
(124, 'another pool', 'pool', 'yet a cool pool', '2025-11-06 14:39:57'),
(125, 'another pool again', 'pool', 'yet a cool pool', '2025-11-06 14:44:58'),
(126, 'amazing pool', 'pool', 'this is a great pool', '2025-11-06 14:55:25'),
(127, 'heyllo', 'pool', 'hey', '2025-11-06 14:58:40'),
(128, 'spanking new', 'pool', 'very new pool', '2025-11-06 15:03:50'),
(129, 'spanking new again', 'pool', 'very new pool again', '2025-11-06 15:08:11'),
(130, 'this is sooo coool', 'pool', 'I would like to do it', '2025-11-06 18:45:04'),
(131, 'pool in school', 'pool', 'school has amazing pool', '2025-11-06 19:27:29'),
(146, 'Masters Swimming Tanzania', 'swimMeet', 'Arusha International Masters SC Swim Champion', '2025-11-10 14:38:11'),
(147, 'Event 101', 'swimEvent', '100 Meter Free Women 25-29', '2025-11-10 14:38:11'),
(148, 'Event 102', 'swimEvent', '100 Meter Free Men 30-34', '2025-11-10 14:38:11'),
(149, 'Event 102', 'swimEvent', '100 Meter Free Men 35-39', '2025-11-10 14:38:11'),
(150, 'Event 102', 'swimEvent', '100 Meter Free Men 40-44', '2025-11-10 14:38:11'),
(151, 'Event 102', 'swimEvent', '100 Meter Free Men 45-49', '2025-11-10 14:38:11'),
(152, 'Event 102', 'swimEvent', '100 Meter Free Men 50-54', '2025-11-10 14:38:11'),
(153, 'Event 101', 'swimEvent', '100 Meter Free Women 35-39', '2025-11-10 14:38:11'),
(154, 'Event 101', 'swimEvent', '100 Meter Free Women 30-34', '2025-11-10 14:38:11'),
(155, 'Event 101', 'swimEvent', '100 Meter Free Women 40-44', '2025-11-10 14:38:11'),
(156, 'Event 101', 'swimEvent', '100 Meter Free Women 45-49', '2025-11-10 14:38:11'),
(157, 'Event 101', 'swimEvent', '100 Meter Free Women 50-54', '2025-11-10 14:38:11'),
(158, 'Event 101', 'swimEvent', '100 Meter Free Women 55-59', '2025-11-10 14:38:11'),
(159, 'Event 101', 'swimEvent', '100 Meter Free Women 60-64', '2025-11-10 14:38:11'),
(160, 'Event 102', 'swimEvent', '100 Meter Free Men 55-59', '2025-11-10 14:38:11'),
(161, 'Event 102', 'swimEvent', '100 Meter Free Men 65-69', '2025-11-10 14:38:11'),
(162, 'Event 103', 'swimEvent', '25 Meter Fly Women 25-29', '2025-11-10 14:38:11'),
(163, 'Event 103', 'swimEvent', '25 Meter Fly Women 30-34', '2025-11-10 14:38:11'),
(164, 'Event 103', 'swimEvent', '25 Meter Fly Women 35-39', '2025-11-10 14:38:11'),
(165, 'Event 103', 'swimEvent', '25 Meter Fly Women 40-44', '2025-11-10 14:38:11'),
(166, 'Event 103', 'swimEvent', '25 Meter Fly Women 45-49', '2025-11-10 14:38:11'),
(167, 'Event 101', 'swimEvent', '100 Meter Free Women 70-74', '2025-11-10 14:38:11'),
(168, 'Event 102', 'swimEvent', '100 Meter Free Men 25-29', '2025-11-10 14:38:11'),
(169, 'Event 104', 'swimEvent', '25 Meter Fly Men 25-29', '2025-11-10 14:38:11'),
(170, 'Event 104', 'swimEvent', '25 Meter Fly Men 30-34', '2025-11-10 14:38:11'),
(171, 'Event 104', 'swimEvent', '25 Meter Fly Men 35-39', '2025-11-10 14:38:11'),
(172, 'Event 104', 'swimEvent', '25 Meter Fly Men 40-44', '2025-11-10 14:38:11'),
(173, 'Event 104', 'swimEvent', '25 Meter Fly Men 45-49', '2025-11-10 14:38:11'),
(174, 'Event 104', 'swimEvent', '25 Meter Fly Men 50-54', '2025-11-10 14:38:11'),
(175, 'Event 104', 'swimEvent', '25 Meter Fly Men 55-59', '2025-11-10 14:38:11'),
(176, '1 Adam Kitururu', 'swimResult', '1 Adam Kitururu 32', '2025-11-10 14:38:11'),
(177, '2 Gichuru Wachira', 'swimResult', '2 Gichuru Wachira 31', '2025-11-10 14:38:11'),
(178, '3 Martin Mungai', 'swimResult', '3 Martin Mungai 31', '2025-11-10 14:38:11'),
(179, '4 Isaac T Thiong, Jo', 'swimResult', '4 Isaac T Thiong, Jo 32', '2025-11-10 14:38:11'),
(180, '1 Alex Kutesa', 'swimResult', '1 Alex Kutesa 43', '2025-11-10 14:38:11'),
(181, '2 Samwel Shepa', 'swimResult', '2 Samwel Shepa 40', '2025-11-10 14:38:11'),
(182, '1 Anne Waburi', 'swimResult', '1 Anne Waburi 29', '2025-11-10 14:38:11'),
(183, '2 Beyu Anjichi', 'swimResult', '2 Beyu Anjichi 26', '2025-11-10 14:38:11'),
(184, '3 Victoria Mutheu', 'swimResult', '3 Victoria Mutheu 27', '2025-11-10 14:38:12'),
(185, '1 Douglas Kimiti', 'swimResult', '1 Douglas Kimiti 35', '2025-11-10 14:38:12'),
(186, '2 Elvis Wanja', 'swimResult', '2 Elvis Wanja 35', '2025-11-10 14:38:12'),
(187, '3 Omar Omari', 'swimResult', '3 Omar Omari 36', '2025-11-10 14:38:12'),
(188, '4 Clement W Ngeci', 'swimResult', '4 Clement W Ngeci 37', '2025-11-10 14:38:12'),
(189, '5 Grishon Onyango', 'swimResult', '5 Grishon Onyango 35', '2025-11-10 14:38:12'),
(190, '6 Gitonga Joseph', 'swimResult', '6 Gitonga Joseph 39', '2025-11-10 14:38:12'),
(191, '7 Remmy Yego', 'swimResult', '7 Remmy Yego 39', '2025-11-10 14:38:12'),
(192, '8 Seif Mohammed', 'swimResult', '8 Seif Mohammed 39', '2025-11-10 14:38:12'),
(193, '1 Carolynn Fischer', 'swimResult', '1 Carolynn Fischer 50', '2025-11-10 14:38:12'),
(194, '2 Amanda Bowen', 'swimResult', '2 Amanda Bowen 50', '2025-11-10 14:38:12'),
(195, '1 Catharine Joynson-Hicks', 'swimResult', '1 Catharine Joynson-Hicks 56', '2025-11-10 14:38:12'),
(196, '2 Lucy Kavila', 'swimResult', '2 Lucy Kavila 55', '2025-11-10 14:38:12'),
(197, '1 Sheila W Kioi', 'swimResult', '1 Sheila W Kioi 43', '2025-11-10 14:38:12'),
(198, '2 Katherine Hill', 'swimResult', '2 Katherine Hill 40', '2025-11-10 14:38:12'),
(199, '3 Lorna Chidoba', 'swimResult', '3 Lorna Chidoba 40', '2025-11-10 14:38:12'),
(200, '3 Christopher Jobita', 'swimResult', '3 Christopher Jobita 47', '2025-11-10 14:38:12'),
(201, '1 Khalid Rushaka Oly', 'swimResult', '1 Khalid Rushaka Oly 45', '2025-11-10 14:38:12'),
(202, '2 Robert Darden Swain', 'swimResult', '2 Robert Darden Swain 47', '2025-11-10 14:38:12'),
(203, '4 Segeni O Ngethe', 'swimResult', '4 Segeni O Ngethe 48', '2025-11-10 14:38:12'),
(204, '5 Joshua Muthoka', 'swimResult', '5 Joshua Muthoka 48', '2025-11-10 14:38:12'),
(205, '6 Everest Exavery', 'swimResult', '6 Everest Exavery 48', '2025-11-10 14:38:12'),
(206, '7 Peter Nduati', 'swimResult', '7 Peter Nduati 45', '2025-11-10 14:38:12'),
(207, '1 Nasser Morla', 'swimResult', '1 Nasser Morla 55', '2025-11-10 14:38:12'),
(208, '1 Anthony K Ng\'eno', 'swimResult', '1 Anthony K Ng\'eno 52', '2025-11-10 14:38:12'),
(209, '2 Peter Maina', 'swimResult', '2 Peter Maina 53', '2025-11-10 14:38:12'),
(210, '3 Atek Gerald', 'swimResult', '3 Atek Gerald 51', '2025-11-10 14:38:12'),
(211, '4 Bernard K Mutaki', 'swimResult', '4 Bernard K Mutaki 52', '2025-11-10 14:38:12'),
(212, '1 Mandy Stein', 'swimResult', '1 Mandy Stein 33', '2025-11-10 14:38:12'),
(213, '3 Victoria Gakti', 'swimResult', '3 Victoria Gakti 31', '2025-11-10 14:38:12'),
(214, '2 Jacqueline W Macharia', 'swimResult', '2 Jacqueline W Macharia 34', '2025-11-10 14:38:12'),
(215, '4 Olive W Njuguna', 'swimResult', '4 Olive W Njuguna 33', '2025-11-10 14:38:12'),
(216, '5 Jacqueline Ngilori', 'swimResult', '5 Jacqueline Ngilori 32', '2025-11-10 14:38:12'),
(217, '2 Judith Ombuor', 'swimResult', '2 Judith Ombuor 35', '2025-11-10 14:38:12'),
(218, '1 Sylvia W Kimani', 'swimResult', '1 Sylvia W Kimani 39', '2025-11-10 14:38:12'),
(219, '3 Sharon Chebli', 'swimResult', '3 Sharon Chebli 38', '2025-11-10 14:38:12'),
(220, '4 Grace W Mugoh', 'swimResult', '4 Grace W Mugoh 38', '2025-11-10 14:38:12'),
(221, '5 Rita Gichern', 'swimResult', '5 Rita Gichern 37', '2025-11-10 14:38:12'),
(222, '1 Anne Waburi', 'swimResult', '1 Anne Waburi 29', '2025-11-10 14:38:12'),
(223, '2 Anita Kahumba', 'swimResult', '2 Anita Kahumba 26', '2025-11-10 14:38:12'),
(224, '3 Beyu Anjichi', 'swimResult', '3 Beyu Anjichi 26', '2025-11-10 14:38:12'),
(225, '4 Victoria Mutheu', 'swimResult', '4 Victoria Mutheu 27', '2025-11-10 14:38:12'),
(226, '2 Jacqueline Ngilori', 'swimResult', '2 Jacqueline Ngilori 32', '2025-11-10 14:38:12'),
(227, '1 Victoria Gakti', 'swimResult', '1 Victoria Gakti 31', '2025-11-10 14:38:12'),
(228, '2 Olive W Njuguna', 'swimResult', '2 Olive W Njuguna 33', '2025-11-10 14:38:12'),
(229, '4 Elizabeth C Anjichi', 'swimResult', '4 Elizabeth C Anjichi 30', '2025-11-10 14:38:12'),
(230, '5 Annabel Ndiada', 'swimResult', '5 Annabel Ndiada 30', '2025-11-10 14:38:12'),
(231, '1 Natasha M Mogere', 'swimResult', '1 Natasha M Mogere 37', '2025-11-10 14:38:12'),
(232, '2 Lina Akoth', 'swimResult', '2 Lina Akoth 35', '2025-11-10 14:38:12'),
(233, '4 Grace W Mugoh', 'swimResult', '4 Grace W Mugoh 38', '2025-11-10 14:38:12'),
(234, '3 Judith Ombuor', 'swimResult', '3 Judith Ombuor 35', '2025-11-10 14:38:12'),
(235, '1 Katy Ray', 'swimResult', '1 Katy Ray 41', '2025-11-10 14:38:12'),
(236, '2 Sheila W Kioi', 'swimResult', '2 Sheila W Kioi 43', '2025-11-10 14:38:12'),
(237, '3 Daisy Namayi', 'swimResult', '3 Daisy Namayi 43', '2025-11-10 14:38:12'),
(238, '1 Waitinut Gathecha', 'swimResult', '1 Waitinut Gathecha 48', '2025-11-10 14:38:12'),
(239, '1 Francis Kiumbi', 'swimResult', '1 Francis Kiumbi 65', '2025-11-10 14:38:12'),
(240, '1 Melinda Wulf', 'swimResult', '1 Melinda Wulf 46', '2025-11-10 14:38:12'),
(241, '2 Sarah Rejamin', 'swimResult', '2 Sarah Rejamin 49', '2025-11-10 14:38:12'),
(242, '3 Wanjiku Gitagia', 'swimResult', '3 Wanjiku Gitagia 46', '2025-11-10 14:38:12'),
(243, '4 Katie Taylor', 'swimResult', '4 Katie Taylor 46', '2025-11-10 14:38:12'),
(244, '5 Fay Weston', 'swimResult', '5 Fay Weston 47', '2025-11-10 14:38:12'),
(245, '1 Susan Kahumbu', 'swimResult', '1 Susan Kahumbu 61', '2025-11-10 14:38:12'),
(246, '2 Sally N Ndiri', 'swimResult', '2 Sally N Ndiri 63', '2025-11-10 14:38:12'),
(247, '3 Kassie McIlvaine', 'swimResult', '3 Kassie McIlvaine 60', '2025-11-10 14:38:12'),
(248, '1 Michal Novotny', 'swimResult', '1 Michal Novotny 26', '2025-11-10 14:38:12'),
(249, '2 Isaac Mdali', 'swimResult', '2 Isaac Mdali 25', '2025-11-10 14:38:12'),
(250, '3 Jeremy Ndung\'u', 'swimResult', '3 Jeremy Ndung\'u 28', '2025-11-10 14:38:12'),
(251, '1 Adam Kitururu', 'swimResult', '1 Adam Kitururu 32', '2025-11-10 14:38:12'),
(252, '2 Edwin Karungu', 'swimResult', '2 Edwin Karungu 33', '2025-11-10 14:38:12'),
(253, '3 Martin Mungai', 'swimResult', '3 Martin Mungai 31', '2025-11-10 14:38:12'),
(254, '1 Douglas Kimiti', 'swimResult', '1 Douglas Kimiti 35', '2025-11-10 14:38:12'),
(255, '2 Clement W Ngeci', 'swimResult', '2 Clement W Ngeci 37', '2025-11-10 14:38:12'),
(256, '3 Mathangani Wachira', 'swimResult', '3 Mathangani Wachira 39', '2025-11-10 14:38:12'),
(257, '4 Grishon Onyango', 'swimResult', '4 Grishon Onyango 35', '2025-11-10 14:38:12'),
(258, '5 George Mwa MACHARIA', 'swimResult', '5 George Mwa MACHARIA 36', '2025-11-10 14:38:12'),
(259, '6 Remmy Yego', 'swimResult', '6 Remmy Yego 39', '2025-11-10 14:38:12'),
(260, '7 Gitonga Joseph', 'swimResult', '7 Gitonga Joseph 39', '2025-11-10 14:38:12'),
(261, '8 John Magya', 'swimResult', '8 John Magya 38', '2025-11-10 14:38:12'),
(262, '1 Alex Kutesa', 'swimResult', '1 Alex Kutesa 43', '2025-11-10 14:38:12'),
(263, '2 Jonson Mwangi', 'swimResult', '2 Jonson Mwangi 44', '2025-11-10 14:38:12'),
(264, '3 Gideon Nzioka', 'swimResult', '3 Gideon Nzioka 43', '2025-11-10 14:38:12'),
(265, '4 Alvin Chebli', 'swimResult', '4 Alvin Chebli 44', '2025-11-10 14:38:12'),
(266, '5 Daniel M Gilsonyo', 'swimResult', '5 Daniel M Gilsonyo 40', '2025-11-10 14:38:12'),
(267, '6 Samwel Shepa', 'swimResult', '6 Samwel Shepa 40', '2025-11-10 14:38:12'),
(268, '1 Christopher Jobita', 'swimResult', '1 Christopher Jobita 47', '2025-11-10 14:38:12'),
(269, '2 Joshua Muthoka', 'swimResult', '2 Joshua Muthoka 48', '2025-11-10 14:38:12'),
(270, '3 John Kihato', 'swimResult', '3 John Kihato 49', '2025-11-10 14:38:12'),
(271, '4 Segeni O Ngethe', 'swimResult', '4 Segeni O Ngethe 48', '2025-11-10 14:38:12'),
(272, '5 Lameck Borega', 'swimResult', '5 Lameck Borega 46', '2025-11-10 14:38:12'),
(273, '6 Kevin Asilinwe', 'swimResult', '6 Kevin Asilinwe 45', '2025-11-10 14:38:12'),
(274, '1 Esther Karituki', 'swimResult', '1 Esther Karituki 72', '2025-11-10 14:38:12'),
(275, '1 Michal Novotny', 'swimResult', '1 Michal Novotny 26', '2025-11-10 14:38:12'),
(276, '2 Adil Abdulrahim Hussein', 'swimResult', '2 Adil Abdulrahim Hussein 25', '2025-11-10 14:38:12'),
(277, '3 Jabu Ibrahim Ali', 'swimResult', '3 Jabu Ibrahim Ali 28', '2025-11-10 14:38:12'),
(278, '4 Jeremy Ndung', 'swimResult', '4 Jeremy Ndung 28', '2025-11-10 14:38:12'),
(279, '5 Pius Karituki', 'swimResult', '5 Pius Karituki 26', '2025-11-10 14:38:12'),
(280, '6 Joshua Clement Muzze', 'swimResult', '6 Joshua Clement Muzze 25', '2025-11-10 14:38:12'),
(281, '7 Elisha Mwakila', 'swimResult', '7 Elisha Mwakila 27', '2025-11-10 14:38:12'),
(282, '1 Anthony K Ng\'eno', 'swimResult', '1 Anthony K Ng\'eno 52', '2025-11-10 14:38:12'),
(283, '2 Samson Maker', 'swimResult', '2 Samson Maker 50', '2025-11-10 14:38:12'),
(284, '3 Peter Maina', 'swimResult', '3 Peter Maina 53', '2025-11-10 14:38:12'),
(285, '4 Emmanuel K Ndosi', 'swimResult', '4 Emmanuel K Ndosi 50', '2025-11-10 14:38:12'),
(286, '1 Nasser Morla', 'swimResult', '1 Nasser Morla 55', '2025-11-10 14:38:12');

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
(31, 64, 'hammock unusual monster ack excepting joshingly swill', '/images/pool-4.jpg', 1),
(32, 6, 'swiftly bah cuddly oil wearily or baptise', '/images/pool-7.jpg', 0),
(34, 6, 'furthermore pinion terribly anxiously defenseless', '/images/pool-5.jpg', 0),
(35, 66, 'trench woot symbolise quickly by', '/images/pool-7.jpg', 1),
(36, 67, 'of solution generally', '/images/pool-3.jpg', 1),
(37, 68, 'excepting likewise hope', '/images/pool-1.jpg', 1),
(38, 69, 'nor thankfully elderly huzzah', '/images/pool-3.jpg', 1),
(39, 70, 'sometimes hastily whoever dilate', '/images/pool-7.jpg', 1),
(40, 71, 'woefully ew phew bravely edge rue', '/images/pool-2.jpg', 1),
(41, 72, 'hence unnaturally past obedience', '/images/pool-5.jpg', 1),
(42, 73, 'hope carefully brr redound', '/images/pool-3.jpg', 1),
(43, 74, 'between kinase limply than brandish', '/images/pool-5.jpg', 1),
(44, 75, 'drat while gadzooks', '/images/pool-3.jpg', 1),
(45, 76, 'though practical greatly', '/images/pool-3.jpg', 1),
(46, 77, 'dream produce reluctantly sadly smoggy huzzah flight', '/images/pool-6.jpg', 1),
(47, 78, 'like forearm harp wealthy massage light', '/images/pool-4.jpg', 1),
(48, 79, 'archaeology mob indeed tightly', '/images/pool-6.jpg', 1),
(49, 80, 'voluminous fooey times', '/images/pool-2.jpg', 1),
(50, 81, 'oddly unbalance ultimate valley as stage lest considering', '/images/pool-5.jpg', 1),
(51, 82, 'how plus circulate gee pro atop how gigantic', '/images/pool-5.jpg', 1),
(52, 83, 'apropos whenever weekly where oh absolve', '/images/pool-3.jpg', 1),
(53, 84, 'untried yum wallaby fast', '/images/pool-5.jpg', 1),
(54, 85, 'amidst willing er before yahoo why perspire', '/images/pool-7.jpg', 1),
(55, 86, 'in whoever satirise', '/images/pool-4.jpg', 1),
(56, 87, 'lest absentmindedly supposing whereas if during oh', '/images/pool-1.jpg', 1),
(57, 88, 'elementary amid faint sesame recompense instead yahoo cemetery', '/images/pool-3.jpg', 1),
(58, 89, 'tense ick pliers loyalty', '/images/pool-7.jpg', 1),
(59, 90, 'crossly hollow sidetrack ligate precedent oh frantically gosh', '/images/pool-7.jpg', 1),
(60, 91, 'woot hearten politely because mealy', '/images/pool-4.jpg', 1),
(61, 92, 'however ham till up controvert', '/images/pool-2.jpg', 1),
(62, 93, 'unnecessarily opposite proselytise on', '/images/pool-2.jpg', 1),
(63, 94, 'so bleakly grok optimistically', '/images/pool-2.jpg', 1),
(64, 95, 'famously challenge phooey for oof speedily as', '/images/pool-7.jpg', 1),
(65, 97, 'frankly times haircut qua printer beside', '/images/pool-7.jpg', 1),
(66, 96, 'clinking that lampoon yuck fleck thunderbolt if ha', '/images/pool-6.jpg', 1),
(67, 98, 'zowie lest while loaf pip cone ha sandy', '/images/pool-1.jpg', 1),
(68, 99, 'knowingly segregate jealous formula limp quadruple boo engage', '/images/pool-7.jpg', 1),
(69, 100, 'where down swanling down wherever that till tuber', '/images/pool-7.jpg', 1),
(70, 101, 'instead ignorance as duster honestly bouncy', '/images/pool-1.jpg', 1),
(71, 102, 'er cheerfully accidentally obedience corner vibration between promise', '/images/pool-2.jpg', 1),
(72, 103, 'inside following sweetly likewise', '/images/pool-7.jpg', 1),
(73, 104, 'widow anneal joyful that eyeliner uselessly phew tarragon', '/images/pool-5.jpg', 1),
(74, 105, 'married necessary willow mid fit underneath', '/images/pool-4.jpg', 1),
(75, 106, 'ah accompany pile how although suffice', '/images/pool-3.jpg', 1),
(76, 107, 'upward unethically phew times adrenalin', '/images/pool-7.jpg', 1),
(77, 108, 'boiling thankfully oof celebrated peony sleepily lively', '/images/pool-2.jpg', 1),
(78, 109, 'properly accomplished chainstay fax augment', '/images/pool-1.jpg', 1),
(79, 110, 'daughter validity criminal since shrill recede boohoo', '/images/pool-5.jpg', 1),
(80, 111, 'atop before when', '/images/pool-5.jpg', 1),
(81, 112, 'trusting whose incidentally', '/images/pool-2.jpg', 1),
(82, 113, 'knowledgeable traduce gee for unabashedly', '/images/pool-1.jpg', 1),
(83, 114, 'supposing tag demobilise versus', '/images/pool-6.jpg', 1),
(84, 115, 'hence unless astride late always', '/images/pool-6.jpg', 1),
(85, 116, 'underneath phew scarily infamous', '/images/pool-7.jpg', 1),
(86, 117, 'who whose subsidy whether ack fishery pulverize', '/images/pool-4.jpg', 1),
(87, 118, 'next instead now gah pish but poppy', '/images/pool-5.jpg', 1),
(88, 119, 'consequently row gently fiercely book moor inasmuch eternity', '/images/pool-6.jpg', 1),
(90, 121, 'garage dish capsize who', '/images/pool-7.jpg', 1),
(92, 6, 'hhj', '/images/camel.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `metadata_coach`
--

CREATE TABLE `metadata_coach` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `performance` tinyint(4) DEFAULT NULL,
  `friendliness` tinyint(4) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `ratePerHour_ksh` int(11) DEFAULT NULL,
  `ratePerHour_usd` int(11) DEFAULT NULL,
  `workingHours_opening` time DEFAULT NULL,
  `workingHours_closing` time DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_coach`
--

INSERT INTO `metadata_coach` (`id`, `entityId`, `performance`, `friendliness`, `experience`, `ratePerHour_ksh`, `ratePerHour_usd`, `workingHours_opening`, `workingHours_closing`, `location_lat`, `location_lng`) VALUES
(1, 57, 2, 2, 57188, -749840, -457283, '19:29:19', '09:50:29', -1.23201824951693, 36.74166987282876),
(2, 81, 1, 5, 918900, 960121, -464315, '21:43:34', '08:07:51', -1.15408591001772, 36.82770075335528),
(4, 108, 2, 3, 594860, 166891, 321256, '15:47:05', '19:28:46', -1.17570614390815, 36.80378748888529),
(5, 118, 3, 2, 908529, 2261, 878508, '13:36:04', '05:34:19', -1.12331345830633, 36.76906475630724),
(6, 46, NULL, NULL, NULL, NULL, 1, NULL, '20:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `metadata_comment`
--

CREATE TABLE `metadata_comment` (
  `entityId` int(11) NOT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_comment`
--

INSERT INTO `metadata_comment` (`entityId`, `time`) VALUES
(55, '2025-11-14 22:28:03');

-- --------------------------------------------------------

--
-- Table structure for table `metadata_lifeguard`
--

CREATE TABLE `metadata_lifeguard` (
  `entityId` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `thirdName` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_lifeguard`
--

INSERT INTO `metadata_lifeguard` (`entityId`, `firstName`, `surname`, `thirdName`, `dob`, `location_lat`, `location_lng`) VALUES
(81, 'ack', 'excluding', 'encouragement', 'aha', -1.27483214278864, 36.89327138010387),
(82, 'excluding', 'after', 'warmly', 'finally', -1.11194633393434, 36.882762634334824),
(101, 'hairy', 'liberalize atrium', 'whereas beside', 'despite through', -1.27496890905312, 36.75626246372862),
(102, 'optimistically whether', 'crank times', 'laughter mechanically', 'uselessly', -1.27091691406872, 36.722366341884744),
(117, 'plain', 'partially', 'rightfully up', 'yippee mathematics', -1.16263002994382, 36.80121492186542);

-- --------------------------------------------------------

--
-- Table structure for table `metadata_parent`
--

CREATE TABLE `metadata_parent` (
  `entityId` int(11) NOT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_parent`
--

INSERT INTO `metadata_parent` (`entityId`, `location_lat`, `location_lng`) VALUES
(113, -1.22796878955042, 36.76733630773894),
(114, -1.28943227926395, 36.84911065350581);

-- --------------------------------------------------------

--
-- Table structure for table `metadata_pool`
--

CREATE TABLE `metadata_pool` (
  `entityId` int(11) NOT NULL,
  `poolDimensions_length` int(11) DEFAULT NULL,
  `poolDimensions_width` int(11) DEFAULT NULL,
  `operatingHours_opening` time DEFAULT NULL,
  `crowdiness` tinyint(4) DEFAULT NULL,
  `openToPublic` tinyint(4) DEFAULT NULL,
  `entryFeeIn_ksh` int(11) DEFAULT NULL,
  `entryFeeIn_usd` int(11) DEFAULT NULL,
  `isIndoor` tinyint(4) DEFAULT NULL,
  `cleanliness` tinyint(4) DEFAULT NULL,
  `changingRoomCleanliness` tinyint(4) DEFAULT NULL,
  `hasOnDutyLifeguard` tinyint(4) DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL,
  `openToChildren` tinyint(4) DEFAULT NULL,
  `hasLaneRopes` tinyint(4) DEFAULT NULL,
  `isHeated` tinyint(4) DEFAULT NULL,
  `operatingHours_closing` time DEFAULT NULL,
  `hostInstitutionType` enum('hotel','school','gym') DEFAULT NULL,
  `poolShape` enum('round','rectangle','square','curvy') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_pool`
--

INSERT INTO `metadata_pool` (`entityId`, `poolDimensions_length`, `poolDimensions_width`, `operatingHours_opening`, `crowdiness`, `openToPublic`, `entryFeeIn_ksh`, `entryFeeIn_usd`, `isIndoor`, `cleanliness`, `changingRoomCleanliness`, `hasOnDutyLifeguard`, `location_lat`, `location_lng`, `openToChildren`, `hasLaneRopes`, `isHeated`, `operatingHours_closing`, `hostInstitutionType`, `poolShape`) VALUES
(6, 10, 199, '01:33:20', 4, 1, 2, 9996, 1, 5, 5, 1, -1.25489104578669, 36.87588352399299, 1, 1, 1, '01:10:52', 'school', 'curvy'),
(41, NULL, 6, '17:12:35', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '17:30:48', 'school', 'square'),
(103, 41901, 385669, '23:12:49', 1, 1, 215193, 186253, 0, 4, 4, 0, -1.22384322957105, 36.81805509325541, 0, 0, 1, '04:49:14', 'school', 'rectangle'),
(104, 827367, 81400, '03:55:17', 5, 1, 984579, 914248, 0, 4, 4, 1, -1.11661684837771, 36.797572091112045, 1, 1, 1, '03:44:42', 'school', 'curvy'),
(110, 653677, 49994, '07:02:43', 3, 1, 788668, 386717, 0, 3, 4, 0, -1.28767622488849, 36.71729918908408, 1, 1, 1, '01:56:52', 'school', 'square'),
(130, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'rectangle'),
(131, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `metadata_rating`
--

CREATE TABLE `metadata_rating` (
  `entityId` int(11) NOT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_rating`
--

INSERT INTO `metadata_rating` (`entityId`, `time`) VALUES
(55, '2025-11-02 18:27:38');

-- --------------------------------------------------------

--
-- Table structure for table `metadata_school`
--

CREATE TABLE `metadata_school` (
  `entityId` int(11) NOT NULL,
  `averageSchoolFees_ksh` int(11) DEFAULT NULL,
  `averageSchoolFees_usd` int(11) DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_school`
--

INSERT INTO `metadata_school` (`entityId`, `averageSchoolFees_ksh`, `averageSchoolFees_usd`, `location_lat`, `location_lng`) VALUES
(72, -401848, -836373, -1.27996997728995, 36.723871457908245),
(73, 720242, 662308, -1.13589105602977, 36.82529539825214),
(74, -477244, -505827, -1.15762029338794, 36.87569740801951),
(75, -460486, 930078, -1.20646313415519, 36.790611139961186),
(76, -664887, -999816, -1.28641510969292, 36.79036022312516),
(77, 406569, -30953, -1.12411454546256, 36.8939381044727),
(78, -387028, 592201, -1.16601561962901, 36.808162235567586),
(79, 39554, -610125, -1.22082013096565, 36.80502940844136),
(80, 576881, -645377, -1.20467828965119, 36.88421683511817),
(105, 139969, 842684, -1.11751028771765, 36.81689922871688),
(111, 805381, 398999, -1.12303190135988, 36.7493910640722);

-- --------------------------------------------------------

--
-- Table structure for table `metadata_swmmer`
--

CREATE TABLE `metadata_swmmer` (
  `entityId` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `thirdName` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_swmmer`
--

INSERT INTO `metadata_swmmer` (`entityId`, `firstName`, `surname`, `thirdName`, `dob`) VALUES
(66, 'meanwhile husky', 'vivacious inscribe', 'instead until', '2025-07-23'),
(71, 'lined notwithstanding', 'instead oil', 'incidentally', '2025-12-02'),
(112, 'whose', 'along', 'considering moralise', '2025-03-20');

-- --------------------------------------------------------

--
-- Table structure for table `metadata_swm_event`
--

CREATE TABLE `metadata_swm_event` (
  `entityId` int(11) NOT NULL,
  `eventNumber` int(11) DEFAULT NULL,
  `swimStroke` varchar(255) DEFAULT NULL,
  `swimDistance` varchar(255) DEFAULT NULL,
  `swimDistanceUnit` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `ageGroup` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_swm_event`
--

INSERT INTO `metadata_swm_event` (`entityId`, `eventNumber`, `swimStroke`, `swimDistance`, `swimDistanceUnit`, `gender`, `ageGroup`) VALUES
(87, 43406, 'individual_medley', '4x25', 'yard', 'male', 'generously'),
(88, 94416, 'backstroke', '25', 'meter', 'male', 'apricot'),
(89, 688851, 'medley_relay', '400', 'meter', 'female', 'the overfeed'),
(90, 466655, 'breaststroke', '25', 'yard', 'male', 'while'),
(91, 931866, 'freestyle_relay', '1500', 'meter', 'male', 'hmph'),
(92, 558541, 'medley_relay', '4x50', 'yard', 'female', 'custody account'),
(93, 285955, 'freestyle_relay', '50', 'yard', 'female', 'object now'),
(94, 815752, 'individual_medley', '1500', 'yard', 'female', 'via'),
(95, 124108, 'butterfly', '1500', 'yard', 'male', 'tectonics gee'),
(96, 57176, 'butterfly', '25', 'meter', 'male', 'cash'),
(97, 907648, 'butterfly', '25', 'meter', 'female', 'bah mouser'),
(98, 194155, 'medley_relay', '25', 'meter', 'female', 'sympathetically word'),
(99, 471683, 'freestyle', '1500', 'meter', 'male', 'seagull enthusiastically'),
(100, 362092, 'backstroke', '4x50', 'meter', 'female', 'perfectly'),
(115, 446232, 'freestyle', '100', 'yard', 'male', 'zowie what'),
(139, 101, NULL, NULL, NULL, NULL, NULL),
(141, 101, NULL, NULL, NULL, NULL, NULL),
(144, 101, NULL, NULL, NULL, NULL, NULL),
(147, 101, NULL, NULL, NULL, NULL, NULL),
(148, 102, NULL, NULL, NULL, NULL, NULL),
(149, 102, NULL, NULL, NULL, NULL, NULL),
(150, 102, NULL, NULL, NULL, NULL, NULL),
(151, 102, NULL, NULL, NULL, NULL, NULL),
(152, 102, NULL, NULL, NULL, NULL, NULL),
(153, 101, NULL, NULL, NULL, NULL, NULL),
(154, 101, NULL, NULL, NULL, NULL, NULL),
(155, 101, NULL, NULL, NULL, NULL, NULL),
(156, 101, NULL, NULL, NULL, NULL, NULL),
(157, 101, NULL, NULL, NULL, NULL, NULL),
(158, 101, NULL, NULL, NULL, NULL, NULL),
(159, 101, NULL, NULL, NULL, NULL, NULL),
(160, 102, NULL, NULL, NULL, NULL, NULL),
(161, 102, NULL, NULL, NULL, NULL, NULL),
(162, 103, NULL, NULL, NULL, NULL, NULL),
(163, 103, NULL, NULL, NULL, NULL, NULL),
(164, 103, NULL, NULL, NULL, NULL, NULL),
(165, 103, NULL, NULL, NULL, NULL, NULL),
(166, 103, NULL, NULL, NULL, NULL, NULL),
(167, 101, NULL, NULL, NULL, NULL, NULL),
(168, 102, NULL, NULL, NULL, NULL, NULL),
(169, 104, NULL, NULL, NULL, NULL, NULL),
(170, 104, NULL, NULL, NULL, NULL, NULL),
(171, 104, NULL, NULL, NULL, NULL, NULL),
(172, 104, NULL, NULL, NULL, NULL, NULL),
(173, 104, NULL, NULL, NULL, NULL, NULL),
(174, 104, NULL, NULL, NULL, NULL, NULL),
(175, 104, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `metadata_swm_meet`
--

CREATE TABLE `metadata_swm_meet` (
  `entityId` int(11) NOT NULL,
  `course` varchar(255) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL,
  `startEndDates_startDate` date DEFAULT NULL,
  `startEndDates_endDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_swm_meet`
--

INSERT INTO `metadata_swm_meet` (`entityId`, `course`, `time`, `location_lat`, `location_lng`, `startEndDates_startDate`, `startEndDates_endDate`) VALUES
(107, 'short', '07:26:12', -1.24825922172442, 36.70133951956484, '2026-04-27', '2026-10-23'),
(119, 'long', '10:12:47', -1.26467241559693, 36.82894175302987, '2026-10-11', '2025-09-20'),
(121, 'short', '21:27:57', -1.26011013776285, 36.77109689515262, '2025-07-01', '2026-04-12'),
(136, NULL, NULL, NULL, NULL, '2025-10-05', NULL),
(138, NULL, NULL, NULL, NULL, '2025-10-05', NULL),
(140, NULL, NULL, NULL, NULL, '2025-10-05', NULL),
(143, NULL, NULL, NULL, NULL, '2025-10-05', NULL),
(146, NULL, NULL, NULL, NULL, '2025-10-05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `metadata_swm_result`
--

CREATE TABLE `metadata_swm_result` (
  `entityId` int(11) NOT NULL,
  `rank` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `thirdName` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_swm_result`
--

INSERT INTO `metadata_swm_result` (`entityId`, `rank`, `firstName`, `time`, `surname`, `thirdName`, `age`) VALUES
(85, -831123, 'valuable', '00:39:21', 'undergo mysteriously', 'relaunch aw', 'plus spook'),
(116, 120298, 'decongestant ack', '07:50:17', 'arid', 'yearn wonderfully', 'hypothesise vibration'),
(176, 1, NULL, NULL, 'Adam Kitururu', NULL, '32'),
(177, 2, NULL, NULL, 'Gichuru Wachira', NULL, '31'),
(178, 3, NULL, NULL, 'Martin Mungai', NULL, '31'),
(179, 4, NULL, NULL, 'Isaac T Thiong, Jo', NULL, '32'),
(180, 1, NULL, NULL, 'Alex Kutesa', NULL, '43'),
(181, 2, NULL, NULL, 'Samwel Shepa', NULL, '40'),
(182, 1, NULL, NULL, 'Anne Waburi', NULL, '29'),
(183, 2, NULL, NULL, 'Beyu Anjichi', NULL, '26'),
(184, 3, NULL, NULL, 'Victoria Mutheu', NULL, '27'),
(185, 1, NULL, NULL, 'Douglas Kimiti', NULL, '35'),
(186, 2, NULL, NULL, 'Elvis Wanja', NULL, '35'),
(187, 3, NULL, NULL, 'Omar Omari', NULL, '36'),
(188, 4, NULL, NULL, 'Clement W Ngeci', NULL, '37'),
(189, 5, NULL, NULL, 'Grishon Onyango', NULL, '35'),
(190, 6, NULL, NULL, 'Gitonga Joseph', NULL, '39'),
(191, 7, NULL, NULL, 'Remmy Yego', NULL, '39'),
(192, 8, NULL, NULL, 'Seif Mohammed', NULL, '39'),
(193, 1, NULL, NULL, 'Carolynn Fischer', NULL, '50'),
(194, 2, NULL, NULL, 'Amanda Bowen', NULL, '50'),
(195, 1, NULL, NULL, 'Catharine Joynson-Hicks', NULL, '56'),
(196, 2, NULL, NULL, 'Lucy Kavila', NULL, '55'),
(197, 1, NULL, NULL, 'Sheila W Kioi', NULL, '43'),
(198, 2, NULL, NULL, 'Katherine Hill', NULL, '40'),
(199, 3, NULL, NULL, 'Lorna Chidoba', NULL, '40'),
(200, 3, NULL, NULL, 'Christopher Jobita', NULL, '47'),
(201, 1, NULL, NULL, 'Khalid Rushaka Oly', NULL, '45'),
(202, 2, NULL, NULL, 'Robert Darden Swain', NULL, '47'),
(203, 4, NULL, NULL, 'Segeni O Ngethe', NULL, '48'),
(204, 5, NULL, NULL, 'Joshua Muthoka', NULL, '48'),
(205, 6, NULL, NULL, 'Everest Exavery', NULL, '48'),
(206, 7, NULL, NULL, 'Peter Nduati', NULL, '45'),
(207, 1, NULL, NULL, 'Nasser Morla', NULL, '55'),
(208, 1, NULL, NULL, 'Anthony K Ng\'eno', NULL, '52'),
(209, 2, NULL, NULL, 'Peter Maina', NULL, '53'),
(210, 3, NULL, NULL, 'Atek Gerald', NULL, '51'),
(211, 4, NULL, NULL, 'Bernard K Mutaki', NULL, '52'),
(212, 1, NULL, NULL, 'Mandy Stein', NULL, '33'),
(213, 3, NULL, NULL, 'Victoria Gakti', NULL, '31'),
(214, 2, NULL, NULL, 'Jacqueline W Macharia', NULL, '34'),
(215, 4, NULL, NULL, 'Olive W Njuguna', NULL, '33'),
(216, 5, NULL, NULL, 'Jacqueline Ngilori', NULL, '32'),
(217, 2, NULL, NULL, 'Judith Ombuor', NULL, '35'),
(218, 1, NULL, NULL, 'Sylvia W Kimani', NULL, '39'),
(219, 3, NULL, NULL, 'Sharon Chebli', NULL, '38'),
(220, 4, NULL, NULL, 'Grace W Mugoh', NULL, '38'),
(221, 5, NULL, NULL, 'Rita Gichern', NULL, '37'),
(222, 1, NULL, NULL, 'Anne Waburi', NULL, '29'),
(223, 2, NULL, NULL, 'Anita Kahumba', NULL, '26'),
(224, 3, NULL, NULL, 'Beyu Anjichi', NULL, '26'),
(225, 4, NULL, NULL, 'Victoria Mutheu', NULL, '27'),
(226, 2, NULL, NULL, 'Jacqueline Ngilori', NULL, '32'),
(227, 1, NULL, NULL, 'Victoria Gakti', NULL, '31'),
(228, 2, NULL, NULL, 'Olive W Njuguna', NULL, '33'),
(229, 4, NULL, NULL, 'Elizabeth C Anjichi', NULL, '30'),
(230, 5, NULL, NULL, 'Annabel Ndiada', NULL, '30'),
(231, 1, NULL, NULL, 'Natasha M Mogere', NULL, '37'),
(232, 2, NULL, NULL, 'Lina Akoth', NULL, '35'),
(233, 4, NULL, NULL, 'Grace W Mugoh', NULL, '38'),
(234, 3, NULL, NULL, 'Judith Ombuor', NULL, '35'),
(235, 1, NULL, NULL, 'Katy Ray', NULL, '41'),
(236, 2, NULL, NULL, 'Sheila W Kioi', NULL, '43'),
(237, 3, NULL, NULL, 'Daisy Namayi', NULL, '43'),
(238, 1, NULL, NULL, 'Waitinut Gathecha', NULL, '48'),
(239, 1, NULL, NULL, 'Francis Kiumbi', NULL, '65'),
(240, 1, NULL, NULL, 'Melinda Wulf', NULL, '46'),
(241, 2, NULL, NULL, 'Sarah Rejamin', NULL, '49'),
(242, 3, NULL, NULL, 'Wanjiku Gitagia', NULL, '46'),
(243, 4, NULL, NULL, 'Katie Taylor', NULL, '46'),
(244, 5, NULL, NULL, 'Fay Weston', NULL, '47'),
(245, 1, NULL, NULL, 'Susan Kahumbu', NULL, '61'),
(246, 2, NULL, NULL, 'Sally N Ndiri', NULL, '63'),
(247, 3, NULL, NULL, 'Kassie McIlvaine', NULL, '60'),
(248, 1, NULL, NULL, 'Michal Novotny', NULL, '26'),
(249, 2, NULL, NULL, 'Isaac Mdali', NULL, '25'),
(250, 3, NULL, NULL, 'Jeremy Ndung\'u', NULL, '28'),
(251, 1, NULL, NULL, 'Adam Kitururu', NULL, '32'),
(252, 2, NULL, NULL, 'Edwin Karungu', NULL, '33'),
(253, 3, NULL, NULL, 'Martin Mungai', NULL, '31'),
(254, 1, NULL, NULL, 'Douglas Kimiti', NULL, '35'),
(255, 2, NULL, NULL, 'Clement W Ngeci', NULL, '37'),
(256, 3, NULL, NULL, 'Mathangani Wachira', NULL, '39'),
(257, 4, NULL, NULL, 'Grishon Onyango', NULL, '35'),
(258, 5, NULL, NULL, 'George Mwa MACHARIA', NULL, '36'),
(259, 6, NULL, NULL, 'Remmy Yego', NULL, '39'),
(260, 7, NULL, NULL, 'Gitonga Joseph', NULL, '39'),
(261, 8, NULL, NULL, 'John Magya', NULL, '38'),
(262, 1, NULL, NULL, 'Alex Kutesa', NULL, '43'),
(263, 2, NULL, NULL, 'Jonson Mwangi', NULL, '44'),
(264, 3, NULL, NULL, 'Gideon Nzioka', NULL, '43'),
(265, 4, NULL, NULL, 'Alvin Chebli', NULL, '44'),
(266, 5, NULL, NULL, 'Daniel M Gilsonyo', NULL, '40'),
(267, 6, NULL, NULL, 'Samwel Shepa', NULL, '40'),
(268, 1, NULL, NULL, 'Christopher Jobita', NULL, '47'),
(269, 2, NULL, NULL, 'Joshua Muthoka', NULL, '48'),
(270, 3, NULL, NULL, 'John Kihato', NULL, '49'),
(271, 4, NULL, NULL, 'Segeni O Ngethe', NULL, '48'),
(272, 5, NULL, NULL, 'Lameck Borega', NULL, '46'),
(273, 6, NULL, NULL, 'Kevin Asilinwe', NULL, '45'),
(274, 1, NULL, NULL, 'Esther Karituki', NULL, '72'),
(275, 1, NULL, NULL, 'Michal Novotny', NULL, '26'),
(276, 2, NULL, NULL, 'Adil Abdulrahim Hussein', NULL, '25'),
(277, 3, NULL, NULL, 'Jabu Ibrahim Ali', NULL, '28'),
(278, 4, NULL, NULL, 'Jeremy Ndung', NULL, '28'),
(279, 5, NULL, NULL, 'Pius Karituki', NULL, '26'),
(280, 6, NULL, NULL, 'Joshua Clement Muzze', NULL, '25'),
(281, 7, NULL, NULL, 'Elisha Mwakila', NULL, '27'),
(282, 1, NULL, NULL, 'Anthony K Ng\'eno', NULL, '52'),
(283, 2, NULL, NULL, 'Samson Maker', NULL, '50'),
(284, 3, NULL, NULL, 'Peter Maina', NULL, '53'),
(285, 4, NULL, NULL, 'Emmanuel K Ndosi', NULL, '50'),
(286, 1, NULL, NULL, 'Nasser Morla', NULL, '55');

-- --------------------------------------------------------

--
-- Table structure for table `metadata_team`
--

CREATE TABLE `metadata_team` (
  `entityId` int(11) NOT NULL,
  `openToPublic` int(11) DEFAULT NULL,
  `membershipFee_ksh` int(11) DEFAULT NULL,
  `membershipFee_usd` int(11) DEFAULT NULL,
  `location_lat` double DEFAULT NULL,
  `location_lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metadata_team`
--

INSERT INTO `metadata_team` (`entityId`, `openToPublic`, `membershipFee_ksh`, `membershipFee_usd`, `location_lat`, `location_lng`) VALUES
(106, 946590, 585073, 211747, -1.2378010912707, 36.711778790221025),
(109, 317778, 931600, 959828, -1.16462554907698, 36.74836872876976),
(120, 259514, 955832, 269762, -1.29562875121114, 36.886285906736354);

-- --------------------------------------------------------

--
-- Table structure for table `metadata_user`
--

CREATE TABLE `metadata_user` (
  `entityId` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `country` enum('kenya','uganda','tanzania','usa') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `relations`
--

CREATE TABLE `relations` (
  `id` int(11) NOT NULL,
  `entityId1` int(11) NOT NULL,
  `entityId2` int(11) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `relationshipType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relations`
--

INSERT INTO `relations` (`id`, `entityId1`, `entityId2`, `relationship`, `relationshipType`) VALUES
(19, 12, 6, 'coach-pool', 'worksAt'),
(25, 46, 6, 'coach-pool', 'worksAt'),
(26, 44, 6, 'coach-pool', 'worksAt'),
(27, 54, 6, 'coach-pool', 'worksAt'),
(30, 45, 43, 'coach-pool', 'worksAt'),
(31, 45, 50, 'coach-swimmer', 'isAlso'),
(32, 6, 59, 'pool-team', 'trainsAt'),
(33, 6, 53, 'pool-school', 'canBeFoundAt'),
(34, 6, 50, 'pool-swimmer', 'trainsAt');

-- --------------------------------------------------------

--
-- Table structure for table `relationships_swimEvent`
--

CREATE TABLE `relationships_swimEvent` (
  `id` int(11) NOT NULL,
  `entityId1` varchar(250) NOT NULL,
  `entityId2` varchar(250) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `relationshipType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relationships_swimEvent`
--

INSERT INTO `relationships_swimEvent` (`id`, `entityId1`, `entityId2`, `relationship`, `relationshipType`) VALUES
(1, '142', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(2, '145', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(3, '177', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(4, '178', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(5, '180', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(6, '181', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(7, '182', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(8, '179', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(9, '176', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(10, '183', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(11, '185', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(12, '186', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(13, '187', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(14, '188', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(15, '193', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(16, '190', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(17, '199', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(18, '191', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(19, '201', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(20, '184', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(21, '202', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(22, '200', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(23, '192', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(24, '194', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(25, '195', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(26, '189', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(27, '197', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(28, '198', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(29, '223', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(30, '216', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(31, '217', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(32, '218', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(33, '220', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(34, '219', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(35, '196', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(36, '213', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(37, '222', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(38, '214', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(39, '215', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(40, '212', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(41, '221', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(42, '203', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(43, '204', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(44, '211', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(45, '206', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(46, '207', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(47, '208', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(48, '209', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(49, '224', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(50, '210', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(51, '230', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(52, '232', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(53, '205', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(54, '229', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(55, '227', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(56, '226', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(57, '228', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(58, '231', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(59, '233', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(60, '237', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(61, '238', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(62, '225', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(63, '240', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(64, '241', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(65, '242', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(66, '243', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(67, '234', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(68, '235', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(69, '236', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(70, '244', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(71, '245', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(72, '239', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(73, '246', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(74, '247', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(75, '248', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(76, '249', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(77, '250', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(78, '251', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(79, '252', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(80, '253', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(81, '254', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(82, '256', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(83, '257', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(84, '258', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(85, '259', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(86, '260', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(87, '261', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(88, '262', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(89, '263', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(90, '255', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(91, '264', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(92, '265', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(93, '267', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(94, '268', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(95, '266', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(96, '269', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(97, '270', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(98, '271', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(99, '272', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(100, '273', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(101, '274', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(102, '275', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(103, '276', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(104, '277', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(105, '278', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(106, '279', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(107, '280', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(108, '281', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(109, '282', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(110, '284', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(111, '285', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(112, '283', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns'),
(113, '286', 'cmhkpa90f0000sydtu86fbldo', 'swimResult-user', 'owns');

-- --------------------------------------------------------

--
-- Table structure for table `relationships_swimResult`
--

CREATE TABLE `relationships_swimResult` (
  `id` int(11) NOT NULL,
  `entityId1` varchar(250) NOT NULL,
  `entityId2` varchar(250) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `relationshipType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relationships_swimResult`
--

INSERT INTO `relationships_swimResult` (`id`, `entityId1`, `entityId2`, `relationship`, `relationshipType`) VALUES
(1, '137', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(2, '137', '136', 'swimEvent-swimMeet', 'contains'),
(3, '139', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(4, '139', '138', 'swimEvent-swimMeet', 'contains'),
(5, '141', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(6, '141', '140', 'swimEvent-swimMeet', 'contains'),
(7, '144', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(8, '144', '143', 'swimEvent-swimMeet', 'contains'),
(9, '144', '145', 'swimEvent-swimResult', 'contains'),
(10, '147', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(11, '148', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(12, '149', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(13, '150', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(14, '157', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(15, '158', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(16, '160', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(17, '154', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(18, '152', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(19, '153', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(20, '155', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(21, '151', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(22, '161', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(23, '162', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(24, '163', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(25, '164', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(26, '165', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(27, '166', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(28, '156', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(29, '169', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(30, '159', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(31, '170', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(32, '171', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(33, '172', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(34, '173', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(35, '174', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(36, '167', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(37, '168', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(38, '148', '146', 'swimEvent-swimMeet', 'contains'),
(39, '175', 'cmhkpa90f0000sydtu86fbldo', 'swimEvent-user', 'owns'),
(40, '150', '146', 'swimEvent-swimMeet', 'contains'),
(41, '147', '146', 'swimEvent-swimMeet', 'contains'),
(42, '149', '146', 'swimEvent-swimMeet', 'contains'),
(43, '157', '146', 'swimEvent-swimMeet', 'contains'),
(44, '158', '146', 'swimEvent-swimMeet', 'contains'),
(45, '155', '146', 'swimEvent-swimMeet', 'contains'),
(46, '151', '146', 'swimEvent-swimMeet', 'contains'),
(47, '160', '146', 'swimEvent-swimMeet', 'contains'),
(48, '152', '146', 'swimEvent-swimMeet', 'contains'),
(49, '154', '146', 'swimEvent-swimMeet', 'contains'),
(50, '153', '146', 'swimEvent-swimMeet', 'contains'),
(51, '162', '146', 'swimEvent-swimMeet', 'contains'),
(52, '163', '146', 'swimEvent-swimMeet', 'contains'),
(53, '165', '146', 'swimEvent-swimMeet', 'contains'),
(54, '164', '146', 'swimEvent-swimMeet', 'contains'),
(55, '166', '146', 'swimEvent-swimMeet', 'contains'),
(56, '161', '146', 'swimEvent-swimMeet', 'contains'),
(57, '156', '146', 'swimEvent-swimMeet', 'contains'),
(58, '159', '146', 'swimEvent-swimMeet', 'contains'),
(59, '169', '146', 'swimEvent-swimMeet', 'contains'),
(60, '170', '146', 'swimEvent-swimMeet', 'contains'),
(61, '171', '146', 'swimEvent-swimMeet', 'contains'),
(62, '172', '146', 'swimEvent-swimMeet', 'contains'),
(63, '173', '146', 'swimEvent-swimMeet', 'contains'),
(64, '167', '146', 'swimEvent-swimMeet', 'contains'),
(65, '168', '146', 'swimEvent-swimMeet', 'contains'),
(66, '174', '146', 'swimEvent-swimMeet', 'contains'),
(67, '175', '146', 'swimEvent-swimMeet', 'contains'),
(68, '148', '177', 'swimEvent-swimResult', 'contains'),
(69, '148', '178', 'swimEvent-swimResult', 'contains'),
(70, '148', '179', 'swimEvent-swimResult', 'contains'),
(71, '150', '180', 'swimEvent-swimResult', 'contains'),
(72, '150', '181', 'swimEvent-swimResult', 'contains'),
(73, '147', '182', 'swimEvent-swimResult', 'contains'),
(74, '147', '183', 'swimEvent-swimResult', 'contains'),
(75, '148', '176', 'swimEvent-swimResult', 'contains'),
(76, '149', '185', 'swimEvent-swimResult', 'contains'),
(77, '149', '186', 'swimEvent-swimResult', 'contains'),
(78, '149', '187', 'swimEvent-swimResult', 'contains'),
(79, '149', '188', 'swimEvent-swimResult', 'contains'),
(80, '157', '193', 'swimEvent-swimResult', 'contains'),
(81, '149', '191', 'swimEvent-swimResult', 'contains'),
(82, '151', '202', 'swimEvent-swimResult', 'contains'),
(83, '151', '200', 'swimEvent-swimResult', 'contains'),
(84, '149', '192', 'swimEvent-swimResult', 'contains'),
(85, '157', '194', 'swimEvent-swimResult', 'contains'),
(86, '158', '195', 'swimEvent-swimResult', 'contains'),
(87, '155', '199', 'swimEvent-swimResult', 'contains'),
(88, '149', '190', 'swimEvent-swimResult', 'contains'),
(89, '151', '201', 'swimEvent-swimResult', 'contains'),
(90, '147', '184', 'swimEvent-swimResult', 'contains'),
(91, '155', '197', 'swimEvent-swimResult', 'contains'),
(92, '155', '198', 'swimEvent-swimResult', 'contains'),
(93, '149', '189', 'swimEvent-swimResult', 'contains'),
(94, '162', '223', 'swimEvent-swimResult', 'contains'),
(95, '154', '216', 'swimEvent-swimResult', 'contains'),
(96, '153', '218', 'swimEvent-swimResult', 'contains'),
(97, '153', '220', 'swimEvent-swimResult', 'contains'),
(98, '153', '219', 'swimEvent-swimResult', 'contains'),
(99, '158', '196', 'swimEvent-swimResult', 'contains'),
(100, '154', '213', 'swimEvent-swimResult', 'contains'),
(101, '162', '222', 'swimEvent-swimResult', 'contains'),
(102, '154', '214', 'swimEvent-swimResult', 'contains'),
(103, '153', '217', 'swimEvent-swimResult', 'contains'),
(104, '154', '212', 'swimEvent-swimResult', 'contains'),
(105, '153', '221', 'swimEvent-swimResult', 'contains'),
(106, '151', '203', 'swimEvent-swimResult', 'contains'),
(107, '151', '204', 'swimEvent-swimResult', 'contains'),
(108, '151', '206', 'swimEvent-swimResult', 'contains'),
(109, '160', '207', 'swimEvent-swimResult', 'contains'),
(110, '152', '208', 'swimEvent-swimResult', 'contains'),
(111, '152', '209', 'swimEvent-swimResult', 'contains'),
(112, '154', '215', 'swimEvent-swimResult', 'contains'),
(113, '162', '224', 'swimEvent-swimResult', 'contains'),
(114, '163', '230', 'swimEvent-swimResult', 'contains'),
(115, '164', '232', 'swimEvent-swimResult', 'contains'),
(116, '151', '205', 'swimEvent-swimResult', 'contains'),
(117, '152', '211', 'swimEvent-swimResult', 'contains'),
(118, '163', '229', 'swimEvent-swimResult', 'contains'),
(119, '163', '227', 'swimEvent-swimResult', 'contains'),
(120, '163', '226', 'swimEvent-swimResult', 'contains'),
(121, '152', '210', 'swimEvent-swimResult', 'contains'),
(122, '164', '231', 'swimEvent-swimResult', 'contains'),
(123, '164', '233', 'swimEvent-swimResult', 'contains'),
(124, '165', '237', 'swimEvent-swimResult', 'contains'),
(125, '166', '238', 'swimEvent-swimResult', 'contains'),
(126, '162', '225', 'swimEvent-swimResult', 'contains'),
(127, '156', '240', 'swimEvent-swimResult', 'contains'),
(128, '156', '241', 'swimEvent-swimResult', 'contains'),
(129, '156', '242', 'swimEvent-swimResult', 'contains'),
(130, '156', '243', 'swimEvent-swimResult', 'contains'),
(131, '163', '228', 'swimEvent-swimResult', 'contains'),
(132, '164', '234', 'swimEvent-swimResult', 'contains'),
(133, '165', '235', 'swimEvent-swimResult', 'contains'),
(134, '165', '236', 'swimEvent-swimResult', 'contains'),
(135, '156', '244', 'swimEvent-swimResult', 'contains'),
(136, '159', '245', 'swimEvent-swimResult', 'contains'),
(137, '161', '239', 'swimEvent-swimResult', 'contains'),
(138, '159', '246', 'swimEvent-swimResult', 'contains'),
(139, '159', '247', 'swimEvent-swimResult', 'contains'),
(140, '169', '248', 'swimEvent-swimResult', 'contains'),
(141, '169', '250', 'swimEvent-swimResult', 'contains'),
(142, '170', '251', 'swimEvent-swimResult', 'contains'),
(143, '170', '252', 'swimEvent-swimResult', 'contains'),
(144, '170', '253', 'swimEvent-swimResult', 'contains'),
(145, '171', '254', 'swimEvent-swimResult', 'contains'),
(146, '171', '256', 'swimEvent-swimResult', 'contains'),
(147, '171', '258', 'swimEvent-swimResult', 'contains'),
(148, '171', '259', 'swimEvent-swimResult', 'contains'),
(149, '169', '249', 'swimEvent-swimResult', 'contains'),
(150, '171', '261', 'swimEvent-swimResult', 'contains'),
(151, '172', '262', 'swimEvent-swimResult', 'contains'),
(152, '172', '263', 'swimEvent-swimResult', 'contains'),
(153, '171', '255', 'swimEvent-swimResult', 'contains'),
(154, '172', '264', 'swimEvent-swimResult', 'contains'),
(155, '172', '265', 'swimEvent-swimResult', 'contains'),
(156, '171', '257', 'swimEvent-swimResult', 'contains'),
(157, '172', '267', 'swimEvent-swimResult', 'contains'),
(158, '171', '260', 'swimEvent-swimResult', 'contains'),
(159, '172', '266', 'swimEvent-swimResult', 'contains'),
(160, '173', '269', 'swimEvent-swimResult', 'contains'),
(161, '173', '268', 'swimEvent-swimResult', 'contains'),
(162, '173', '271', 'swimEvent-swimResult', 'contains'),
(163, '173', '272', 'swimEvent-swimResult', 'contains'),
(164, '173', '273', 'swimEvent-swimResult', 'contains'),
(165, '173', '270', 'swimEvent-swimResult', 'contains'),
(166, '167', '274', 'swimEvent-swimResult', 'contains'),
(167, '168', '275', 'swimEvent-swimResult', 'contains'),
(168, '168', '276', 'swimEvent-swimResult', 'contains'),
(169, '168', '277', 'swimEvent-swimResult', 'contains'),
(170, '168', '278', 'swimEvent-swimResult', 'contains'),
(171, '168', '279', 'swimEvent-swimResult', 'contains'),
(172, '168', '280', 'swimEvent-swimResult', 'contains'),
(173, '168', '281', 'swimEvent-swimResult', 'contains'),
(174, '174', '282', 'swimEvent-swimResult', 'contains'),
(175, '174', '285', 'swimEvent-swimResult', 'contains'),
(176, '174', '283', 'swimEvent-swimResult', 'contains'),
(177, '174', '284', 'swimEvent-swimResult', 'contains'),
(178, '175', '286', 'swimEvent-swimResult', 'contains');

-- --------------------------------------------------------

--
-- Table structure for table `relationships_user`
--

CREATE TABLE `relationships_user` (
  `id` int(11) NOT NULL,
  `entityId1` varchar(250) NOT NULL,
  `entityId2` varchar(250) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `relationshipType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relationships_user`
--

INSERT INTO `relationships_user` (`id`, `entityId1`, `entityId2`, `relationship`, `relationshipType`) VALUES
(1, '129', 'cmhkpa90f0000sydtu86fbldo', 'pool-user', 'owns'),
(2, '130', 'cmhkpa90f0000sydtu86fbldo', 'pool-user', 'owns'),
(3, '131', 'cmhkpa90f0000sydtu86fbldo', 'pool-user', 'owns'),
(4, '132', 'cmhkpa90f0000sydtu86fbldo', 'school-user', 'owns'),
(5, '120', 'cmhkpa90f0000sydtu86fbldo', 'pool-user', 'owns'),
(6, '6', 'cmhkpa90f0000sydtu86fbldo', 'pool-user', 'owns'),
(7, '48', 'cmhkpa90f0000sydtu86fbldo', 'pool-user', 'owns'),
(8, '78', 'cmhkpa90f0000sydtu86fbldo', 'school-user', 'owns'),
(9, '133', 'cmhkpa90f0000sydtu86fbldo', 'swimMeet-user', 'owns'),
(10, '134', 'cmhkpa90f0000sydtu86fbldo', 'swimMeet-user', 'owns'),
(11, '135', 'cmhkpa90f0000sydtu86fbldo', 'swimMeet-user', 'owns'),
(12, '136', 'cmhkpa90f0000sydtu86fbldo', 'swimMeet-user', 'owns'),
(13, '138', 'cmhkpa90f0000sydtu86fbldo', 'swimMeet-user', 'owns'),
(14, '140', 'cmhkpa90f0000sydtu86fbldo', 'swimMeet-user', 'owns'),
(15, '143', 'cmhkpa90f0000sydtu86fbldo', 'swimMeet-user', 'owns'),
(16, '146', 'cmhkpa90f0000sydtu86fbldo', 'swimMeet-user', 'owns');

-- --------------------------------------------------------

--
-- Table structure for table `unprocessed_swim_results`
--

CREATE TABLE `unprocessed_swim_results` (
  `id` int(11) NOT NULL,
  `eventNumber` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `team` varchar(200) NOT NULL,
  `distance` varchar(10) NOT NULL,
  `distanceUnit` varchar(10) NOT NULL,
  `stroke` varchar(20) NOT NULL,
  `rank` int(11) NOT NULL,
  `firstName` varchar(120) NOT NULL,
  `surname` varchar(120) NOT NULL,
  `thirdName` varchar(120) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `ageGroup` varchar(50) NOT NULL,
  `time` varchar(20) NOT NULL,
  `isProcessed` tinyint(4) NOT NULL DEFAULT 0,
  `created-at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unprocessed_swim_results`
--

INSERT INTO `unprocessed_swim_results` (`id`, `eventNumber`, `gender`, `team`, `distance`, `distanceUnit`, `stroke`, `rank`, `firstName`, `surname`, `thirdName`, `age`, `ageGroup`, `time`, `isProcessed`, `created-at`) VALUES
(1, 101, 'female', 'KE', '100', 'meter', 'freestyle', 1, 'Waburi', 'Anne', '', 29, '25-29', '1:36.13', 0, '2025-09-26 20:03:01'),
(2, 101, 'female', 'KE', '100', 'meter', 'freestyle', 2, 'Beyu', 'Anjichi', '', 26, '25-29', '1:42.00', 0, '2025-09-26 20:04:53'),
(3, 101, 'female', 'KE', '100', 'meter', 'freestyle', 3, 'Victoria', 'Mutheu', '', 27, '25-29', '2:19.69', 0, '2025-09-26 20:05:40');

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
-- Indexes for table `metadata_coach`
--
ALTER TABLE `metadata_coach`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `metadata_comment`
--
ALTER TABLE `metadata_comment`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `metadata_lifeguard`
--
ALTER TABLE `metadata_lifeguard`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `metadata_parent`
--
ALTER TABLE `metadata_parent`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `metadata_pool`
--
ALTER TABLE `metadata_pool`
  ADD PRIMARY KEY (`entityId`) USING BTREE;

--
-- Indexes for table `metadata_rating`
--
ALTER TABLE `metadata_rating`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `metadata_school`
--
ALTER TABLE `metadata_school`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `metadata_swmmer`
--
ALTER TABLE `metadata_swmmer`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `metadata_swm_event`
--
ALTER TABLE `metadata_swm_event`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `metadata_swm_meet`
--
ALTER TABLE `metadata_swm_meet`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `metadata_swm_result`
--
ALTER TABLE `metadata_swm_result`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `metadata_team`
--
ALTER TABLE `metadata_team`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `metadata_user`
--
ALTER TABLE `metadata_user`
  ADD PRIMARY KEY (`entityId`);

--
-- Indexes for table `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `entityId1` (`entityId1`,`entityId2`,`relationship`);

--
-- Indexes for table `relationships_swimEvent`
--
ALTER TABLE `relationships_swimEvent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `relationships_swimResult`
--
ALTER TABLE `relationships_swimResult`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `relationships_user`
--
ALTER TABLE `relationships_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unprocessed_swim_results`
--
ALTER TABLE `unprocessed_swim_results`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entity`
--
ALTER TABLE `entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=287;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `metadata_coach`
--
ALTER TABLE `metadata_coach`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `relations`
--
ALTER TABLE `relations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `relationships_swimEvent`
--
ALTER TABLE `relationships_swimEvent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `relationships_swimResult`
--
ALTER TABLE `relationships_swimResult`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT for table `relationships_user`
--
ALTER TABLE `relationships_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `unprocessed_swim_results`
--
ALTER TABLE `unprocessed_swim_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
