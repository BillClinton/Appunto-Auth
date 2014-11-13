--
-- Tables for Appunto Auth
--

-- --------------------------------------------------------

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
-- --------------------------------------------------------

--
-- Table structure for table `appa_path`
--

CREATE TABLE IF NOT EXISTS `appa_path` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dir` varchar(256) NOT NULL,
  `filename` varchar(120) NOT NULL,
  `full_path` varchar(256) NOT NULL,
  `ci_controller` varchar(256) NOT NULL,
  `ci_method` varchar(256) NOT NULL,
  `found` tinyint(1) NOT NULL,
  `public_flag` tinyint(1) NOT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `note` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `permission_id` (`permission_id`),
  KEY `dir` (`dir`(255)),
  KEY `ci_controller` (`ci_controller`(255)),
  KEY `ci_method` (`ci_method`(255))
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `appa_permission`
--

CREATE TABLE IF NOT EXISTS `appa_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_bin NOT NULL,
  `internal_name` varchar(60) COLLATE utf8_bin NOT NULL,
  `description` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `internal_name` (`internal_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `appa_role`
--

CREATE TABLE IF NOT EXISTS `appa_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `appa_role_permission`
--

CREATE TABLE IF NOT EXISTS `appa_role_permission` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  KEY `role_id` (`role_id`),
  KEY `permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `appa_user`
--

CREATE TABLE IF NOT EXISTS `appa_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(120) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `name` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `surname` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `last_ip` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `last_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `email` (`email`),
  KEY `name` (`name`),
  KEY `surname` (`surname`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `appa_user_login_attempt`
--

CREATE TABLE IF NOT EXISTS `appa_user_login_attempt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attempt_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(120) DEFAULT NULL,
  `ip_address` varchar(120) NOT NULL,
  `success` tinyint(1) NOT NULL,
  `user_agent` varchar(180) DEFAULT NULL,
  `note` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attempt_time` (`attempt_time`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `appa_user_permission`
--

CREATE TABLE IF NOT EXISTS `appa_user_permission` (
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `appa_user_role`
--

CREATE TABLE IF NOT EXISTS `appa_user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appa_path`
--
ALTER TABLE `appa_path`
  ADD CONSTRAINT `appa_path_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `appa_permission` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `appa_role_permission`
--
ALTER TABLE `appa_role_permission`
  ADD CONSTRAINT `appa_role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `appa_role` (`id`),
  ADD CONSTRAINT `appa_role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `appa_permission` (`id`);

--
-- Constraints for table `appa_user_permission`
--
ALTER TABLE `appa_user_permission`
  ADD CONSTRAINT `appa_user_permission_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `appa_permission` (`id`),
  ADD CONSTRAINT `appa_user_permission_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `appa_user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `appa_user_role`
--
ALTER TABLE `appa_user_role`
  ADD CONSTRAINT `appa_user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `appa_role` (`id`),
  ADD CONSTRAINT `appa_user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `appa_user` (`id`) ON DELETE CASCADE;

