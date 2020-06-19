-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 19, 2020 at 03:23 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `campus_life`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `account` int(10) UNSIGNED NOT NULL,
  `friend_account` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`account`, `friend_account`) VALUES
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postId` int(11) NOT NULL,
  `account` int(11) NOT NULL,
  `content` varchar(10000) NOT NULL,
  `datePosted` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postId`, `account`, `content`, `datePosted`) VALUES
(31, 1, 'this is a test post', 'Sun Jun 07 2020 16:50:36 GMT-0700 (Pacific Daylight Time)'),
(32, 2, 'Hello I am jane\n', 'Sun Jun 07 2020 23:09:34 GMT-0700 (Pacific Daylight Time)');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `account` int(10) UNSIGNED NOT NULL,
  `token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`account`, `token`) VALUES
(1, 'BcO-c14v5m5w1cdW_Lws42CXFk--_TKX'),
(2, 'nDX9b9VwDQObohMmf3Yl7Ki4B0mGgHZA');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `account` int(11) UNSIGNED NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`account`, `firstname`, `lastname`, `email`, `password`) VALUES
(1, 'john', 'doe', 'john@gmail.com', '$2b$10$0bCDhrTTlRkqB9odPbwAfu94bo0na0TFUhbENjRjt/aivRkTB23kW'),
(2, 'jane', 'doe', 'jane@gmail.com', '$2b$10$mDQ3cq4SDl.k3StIaoIeDezWNrm.3FllKsviRzznJNZZ6YHG/P0rm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`account`,`friend_account`),
  ADD KEY `FK_FRIENDS_2` (`friend_account`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`account`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`account`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `account` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `account` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `FK_FRIENDS_1` FOREIGN KEY (`account`) REFERENCES `users` (`account`),
  ADD CONSTRAINT `FK_FRIENDS_2` FOREIGN KEY (`friend_account`) REFERENCES `users` (`account`);
