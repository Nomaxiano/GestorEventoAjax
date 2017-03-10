-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2017 a las 22:56:40
-- Versión del servidor: 10.1.19-MariaDB
-- Versión de PHP: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_eventos`
--

-- --------------------------------------------------------
DROP DATABASE IF EXISTS gestion_eventos;
CREATE DATABASE gestion_eventos;
USE gestion_eventos;

--
-- Estructura de tabla para la tabla `entrada`
--

CREATE TABLE `entrada` (
  `EVENTO_ID_EVENTO` int(10) UNSIGNED NOT NULL,
  `PERSONA_DNI` varchar(9) NOT NULL,
  `UNIDADES` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `entrada`
--

INSERT INTO `entrada` (`EVENTO_ID_EVENTO`, `PERSONA_DNI`, `UNIDADES`) VALUES
(1, '21454789M', 4),
(1, '48278542X', 3),
(3, '47214872N', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `ID_EVENTO` int(10) UNSIGNED NOT NULL,
  `ID_LUGAR` int(10) UNSIGNED NOT NULL,
  `FECHA` date DEFAULT NULL,
  `DESCRIPCION` varchar(60) DEFAULT NULL,
  `DNI_CONTRATANTE` varchar(9) NOT NULL,
  `PRECIO` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`ID_EVENTO`, `ID_LUGAR`, `FECHA`, `DESCRIPCION`, `DNI_CONTRATANTE`, `PRECIO`) VALUES
(1, 2, '2017-03-16', 'FestivalOfColors', '47214872N', 20),
(3, 4, '2017-03-19', 'Concierto en acustico', '47885663C', 34),
(5, 3, '2017-03-24', 'Musical Rey Leon', '48278542X', 22),
(16, 1, '2017-03-11', 'Tomorrowland', '47214872N', 54);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugar`
--

CREATE TABLE `lugar` (
  `ID_LUGAR` int(10) UNSIGNED NOT NULL,
  `DESCRIPCION` varchar(60) DEFAULT NULL,
  `DIRECCION` varchar(60) DEFAULT NULL,
  `CAPACIDAD` int(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `lugar`
--

INSERT INTO `lugar` (`ID_LUGAR`, `DESCRIPCION`, `DIRECCION`, `CAPACIDAD`) VALUES
(1, 'Auditorio Rocio Jurado', 'Camino de los Descubrimientos, s/n, 41092 Sevilla', 8000),
(2, 'Teatro Barceló', 'Calle Barceló, 11, Madrid', 1200),
(3, 'Sala La Riviera', 'Paseo Bajo de la Virgen del Puerto, 28005 Madrid, España', 6000),
(4, 'Teatro Lope de Vega', 'Av. de María Luisa, s/n, 41013 Sevilla, España', 1500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `DNI` varchar(9) NOT NULL,
  `TIPO` varchar(30) NOT NULL,
  `NOMBRE` varchar(40) DEFAULT NULL,
  `APELLIDOS` varchar(50) DEFAULT NULL,
  `TELEFONO` int(9) DEFAULT NULL,
  `EMAIL` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`DNI`, `TIPO`, `NOMBRE`, `APELLIDOS`, `TELEFONO`, `EMAIL`) VALUES
('21454789M', 'asistente', 'Elena', 'Nito del Bosque', 625214789, 'email@gmail.es'),
('41112254S', 'asistente', 'Mireia', 'Tienda Leches', 678541259, 'email@hotmail.es'),
('47214872N', 'contratante', 'Miguel', 'Ramirez Ramos', 621145521, 'email@gmail.com'),
('47415872M', 'contratante', 'Tomas', 'Muncho Café', 745632145, 'email@hotmail.es'),
('47885663C', 'contratante', 'Genoveva', 'Sicon Duce', 698854478, 'email@hotmail.es'),
('48278542X', 'contratante', 'Tolomeo', 'Fueral Water', 647852145, 'email@hotmail.com'),
('49012345A', 'asistente', 'Pedrito', 'Clavo un Clavito', 741852963, 'asd@asd.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD PRIMARY KEY (`EVENTO_ID_EVENTO`,`PERSONA_DNI`),
  ADD KEY `FK_ASS_2` (`PERSONA_DNI`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`ID_EVENTO`),
  ADD KEY `CONTRATA` (`DNI_CONTRATANTE`),
  ADD KEY `PERTENECE` (`ID_LUGAR`);

--
-- Indices de la tabla `lugar`
--
ALTER TABLE `lugar`
  ADD PRIMARY KEY (`ID_LUGAR`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`DNI`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `ID_EVENTO` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `lugar`
--
ALTER TABLE `lugar`
  MODIFY `ID_LUGAR` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD CONSTRAINT `FK_ASS_1` FOREIGN KEY (`EVENTO_ID_EVENTO`) REFERENCES `evento` (`ID_EVENTO`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_ASS_2` FOREIGN KEY (`PERSONA_DNI`) REFERENCES `persona` (`DNI`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `CONTRATA` FOREIGN KEY (`DNI_CONTRATANTE`) REFERENCES `persona` (`DNI`),
  ADD CONSTRAINT `PERTENECE` FOREIGN KEY (`ID_LUGAR`) REFERENCES `lugar` (`ID_LUGAR`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
