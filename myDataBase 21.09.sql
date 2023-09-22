-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: db:3306
-- Время создания: Сен 20 2023 г., 20:22
-- Версия сервера: 5.7.43
-- Версия PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `myDataBase`
--

-- --------------------------------------------------------

--
-- Структура таблицы `page_about`
--

CREATE TABLE `page_about` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `block_name` varchar(255) NOT NULL,
  `block_title` varchar(255) NOT NULL,
  `content` mediumtext NOT NULL,
  `order_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `page_about`
--

INSERT INTO `page_about` (`id`, `block_name`, `block_title`, `content`, `order_number`) VALUES
(1, 'meta', 'Meta Information', '{\"page_title\":\"About Us\",\"meta_description\":\"Learn more about us.\",\"meta_keywords\":\"about, company, info\",\"og_description\":\"OG Descr\",\"og_locale\":\"OG Locale\",\"og_image\":\"OG Img\"}', 1),
(2, 'content', 'Content Information', '{\"text\":\"<p class=\\\"p1\\\">ICA Events is one of the region&rsquo;s leading organisers of international trade exhibitions and conferences in the markets of the<span class=\\\"Apple-converted-space\\\">&nbsp; </span>the Central A sia, Caucasus, Middle East, Eastern Europe. We bring international companies to over 60 of the top exhibitions and conferences of the region, covering all sectors, including Construction, Oil and Gas, Mining, Agriculture, Healthcare, Food etc.</p>\\n<p class=\\\"p1\\\">&nbsp;</p>\\n<p class=\\\"p1\\\">Our events attract industry leaders and decision-makers, offering valuable networking opportunities and insights into the latest trends and advancements. We organise our events in the most prestigious exhibition venues, working with the best local partners, and offer regional expertise to all international companies, aiming to enter new markets and open new opportunities.</p>\\n<p class=\\\"p1\\\">&nbsp;</p>\\n<p class=\\\"p1\\\">ICA Events is headquartered in London, UK with six regional offices in Dubai/UAE, Baku/Azerbaijan, Almaty/Kazakhstan, Tashkent/Uzbekistan, Istanbul/Turkey and Warsaw/Poland.</p>\\n<p class=\\\"p1\\\">&nbsp;</p>\\n<p class=\\\"p1\\\">Welcome to ICA Events &ndash; where businesses meet opportunities!</p>\",\"image\":\"/uploads/pages/bg_about_title.png\"}', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `page_contacts`
--

CREATE TABLE `page_contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `block_name` varchar(255) NOT NULL,
  `block_title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `order_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `page_contacts`
--

INSERT INTO `page_contacts` (`id`, `block_name`, `block_title`, `content`, `order_number`) VALUES
(1, 'page', 'Page', '{\"offices\":[{\"id\":\"876rvb89noyu\",\"image\":\"/assets/london.png\",\"city\":\"London\",\"text\":\"<p>125 Kensington Church Street, London,</p>\\n<p>England, W8 7LP</p>\\n<p>tel: <a href=\\\"tel:020%207313%208040\\\">020 7313 8040</a></p>\",\"hours\":\"<p>Monday - Friday</p>\\n<p>9AM-6PM</p>\",\"theme\":\"Medium\",\"map\":\"<iframe src=\\\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.330241587586!2d-0.19743372329995518!3d51.507157071813324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760ffbcc501e93%3A0xcf5593f70a59daa3!2zMTI1IEtlbnNpbmd0b24gQ2h1cmNoIFN0LCBMb25kb24gVzggN0xQLCDQktC10LvQuNC60L7QsdGA0LjRgtCw0L3QuNGP!5e0!3m2!1sru!2skz!4v1694771027280!5m2!1sru!2skz\\\" width=\\\"600\\\" height=\\\"450\\\" style=\\\"border:0;\\\" allowfullscreen=\\\"\\\" loading=\\\"lazy\\\" referrerpolicy=\\\"no-referrer-when-downgrade\\\"></iframe>\"},{\"id\":\"f78fda32-e8f1-4239-9a1e-c52e35c26ca8\",\"image\":\"/assets/dubai.png\",\"city\":\"Dubai\",\"text\":\"<p>Office No. 1709-1710, Shatha Tower,</p>\\n<p>Al-Falak Street, Dubai Media City, P.O.</p>\\n<p>Box 502147, Dubai, United Arab Emirates</p>\\n<p>tel: <a href=\\\"tel:+971%20(4)%205%20545%20319\\\">+971 (4) 5 545 319</a></p>\\n<p>email: <a href=\\\"mailto:info@ica.events\\\">info@ica.events</a></p>\",\"hours\":\"<p>Monday - Friday</p>\\n<p>9AM-6PM</p>\",\"theme\":\"Dark\",\"map\":\"<iframe src=\\\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.358978199028!2d55.150288875494674!3d25.089706877780298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b05f4abefab%3A0x3faa7c87bf6473e3!2sShatha%20Tower!5e0!3m2!1sru!2skz!4v1694771366995!5m2!1sru!2skz\\\" width=\\\"600\\\" height=\\\"450\\\" style=\\\"border:0;\\\" allowfullscreen=\\\"\\\" loading=\\\"lazy\\\" referrerpolicy=\\\"no-referrer-when-downgrade\\\"></iframe>\"}],\"image\":\"/assets/bg_contacts_title.png\"}', 1),
(2, 'meta', 'Meta', '{\"page_title\":\"Contacts\",\"meta_description\":\"Learn more about us.\",\"meta_keywords\":\"about, company, info\",\"og_description\":\"OG descr\",\"og_locale\":\"OG Locale\",\"og_image\":\"/assets/bg_contacts_title.png\"}', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `page_galleries`
--

CREATE TABLE `page_galleries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `block_name` varchar(255) NOT NULL,
  `block_title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `order_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `page_galleries`
--

INSERT INTO `page_galleries` (`id`, `block_name`, `block_title`, `content`, `order_number`) VALUES
(1, 'page', 'Page', '{\"image\":\"/uploads/reports/preview_bg_reports_title.png\",\"galleries\":[{\"id\":\"\",\"gallery_title\":\"Beauty Eurasia 2023\",\"country\":\"Turkey\",\"preview\":\"/uploads/galleries/BeautyEurasia_2023/preview_beauty-eurasia_06.jpg\",\"year\":\"2023\",\"urls\":[\"/uploads/galleries/BeautyEurasia_2023/photo_beauty-eurasia_01.jpg\",\"/uploads/galleries/BeautyEurasia_2023/photo_beauty-eurasia_02.jpg\",\"/uploads/galleries/BeautyEurasia_2023/photo_beauty-eurasia_03.jpg\",\"/uploads/galleries/BeautyEurasia_2023/photo_beauty-eurasia_05.jpg\",\"/uploads/galleries/BeautyEurasia_2023/photo_beauty-eurasia_06.jpg\",\"/uploads/galleries/BeautyEurasia_2023/photo_beauty-eurasia_07.jpg\",\"/uploads/galleries/BeautyEurasia_2023/photo_beauty-eurasia_09.jpg\",\"/uploads/galleries/BeautyEurasia_2023/photo_beauty-eurasia_10.jpg\"],\"path\":\"BeautyEurasia_2023\",\"isNew\":false},{\"id\":\"fa9fdb54-0ec4-4230-93bb-940b71bd3f39\",\"gallery_title\":\"Baku Energy Forum 2023\",\"country\":\"Azerbaijan\",\"preview\":\"/uploads/galleries/Baku_Energy_Forum_2023/preview_energy-forum_06.jpg\",\"year\":\"2023\",\"urls\":[\"/uploads/galleries/Baku_Energy_Forum_2023/photo_energy-forum_01.jpg\",\"/uploads/galleries/Baku_Energy_Forum_2023/photo_energy-forum_02.jpg\",\"/uploads/galleries/Baku_Energy_Forum_2023/photo_energy-forum_03.jpg\",\"/uploads/galleries/Baku_Energy_Forum_2023/photo_energy-forum_04.jpg\",\"/uploads/galleries/Baku_Energy_Forum_2023/photo_energy-forum_05.jpg\",\"/uploads/galleries/Baku_Energy_Forum_2023/photo_energy-forum_06.jpg\",\"/uploads/galleries/Baku_Energy_Forum_2023/photo_energy-forum_07.jpg\",\"/uploads/galleries/Baku_Energy_Forum_2023/photo_energy-forum_08.jpg\",\"/uploads/galleries/Baku_Energy_Forum_2023/photo_energy-forum_09.jpg\",\"/uploads/galleries/Baku_Energy_Forum_2023/photo_energy-forum_10.jpg\"],\"path\":\"Baku_Energy_Forum_2023\",\"isNew\":false}]}', 1),
(2, 'meta', 'Meta', '{\"page_title\":\"Events reports\",\"meta_description\":\"Photo materials from our cases\",\"meta_keywords\":\"photos, reports, events\",\"og_description\":\"OG descr\",\"og_locale\":\"OG Locale\",\"og_image\":\"ololo\"}', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `page_home`
--

CREATE TABLE `page_home` (
  `id` int(11) NOT NULL,
  `block_name` varchar(255) CHARACTER SET latin1 NOT NULL,
  `block_title` varchar(255) CHARACTER SET latin1 NOT NULL,
  `content` text CHARACTER SET latin1 NOT NULL,
  `order_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `page_home`
--

INSERT INTO `page_home` (`id`, `block_name`, `block_title`, `content`, `order_number`) VALUES
(1, 'title', 'Title', '{\"title\":\"EXPANDING YOUR BUSINESS HORIZONS\",\"buttons\":{\"events\":{\"isActive\":true,\"label\":\"Events\"},\"stand\":{\"isActive\":true,\"label\":\"Book Stand\"},\"contact\":{\"isActive\":true,\"label\":\"Contact Us\"}},\"bgImage\":\"/assets/bg.jpg\"}', 1),
(2, 'about', 'About', '{\"text\":\"<p style=\\\"text-align: center;\\\">ICA Events is one of the region&rsquo;s leading organisers of international trade exhibitions and conferences in the markets of the Middle East, Central Asia, and the Caucasus. We provide all services for exhibitions, selling&nbsp; exhibition stand space, stand construction and technical services, sponsorship and advertising,&nbsp; across its portfolio of events.</p>\",\"bullets\":{\"countries\":\"7\",\"events\":\"50\",\"visitors\":\"100,000\",\"sqm\":\"50,000\"}}', 2),
(3, 'events', 'Upcoming Events', '[\n  {\n    \"title\": \"Kazbuild 2023\",\n    \"description\": \"Kazakhstan International Exhibition Construction and Interiors, Fenestration, Ceramics & Stone\",\n    \"image_profile\": \"https://onsite.iteca.kz/img/files/ica/kazbuild.jpg\",\n    \"beginDate\": \"2023-09-06\",\n    \"endDate\": \"2023-09-08\",\n    \"location\": \"\\\"Atakent\\\" IEC,  Almaty,  Kazakhstan\",\n    \"website\": \"https://kazbuild.kz/en\"\n  },\n  {\n    \"title\": \"Aquatherm Almaty 2023\",\n    \"description\": \"Kazakhstan International Exhibition for Heating, Ventilation, Air-Conditioning, Water Supply, Sanitary, Environmental Technology and Swimming Pool\",\n    \"image_profile\": \"https://onsite.iteca.kz/img/files/ica/aquatherm.jpg\",\n    \"beginDate\": \"2023-09-06\",\n    \"endDate\": \"2023-09-08\",\n    \"location\": \"\\\"Atakent\\\" IEC,  Almaty,  Kazakhstan\",\n    \"website\": \"https://aquatherm-almaty.kz/en/\"\n  },\n  {\n    \"title\": \"Mining and Metals Central Asia 2023\",\n    \"description\": \"Central Asian International Mining Exploration & Mining Equipment Exhibition and Forum\",\n    \"image_profile\": \"https://onsite.iteca.kz/img/files/ica/mining.jpg\",\n    \"beginDate\": \"2023-09-20\",\n    \"endDate\": \"2023-09-22\",\n    \"location\": \"\\\"Atakent\\\" IEC,  Almaty,  Kazakhstan\",\n    \"website\": \"https://mining-metals.kz/en\"\n  },\n  {\n    \"title\": \"Kazcomak 2023\",\n    \"description\": \"Kazakhstan International Road and Heavy Construction, Communal Machinery Exhibition\",\n    \"image_profile\": \"https://onsite.iteca.kz/img/files/ica/kazcomak.jpg\",\n    \"beginDate\": \"2023-09-20\",\n    \"endDate\": \"2023-09-22\",\n    \"location\": \"\\\"Atakent\\\" IEC,  Almaty,  Kazakhstan\",\n    \"website\": \"https://www.kazcomak.kz/en/\"\n  },\n  {\n    \"title\": \"Mining and Metals Central Asia 2024\",\n    \"description\": \"Central Asian International Mining Exploration & Mining Equipment Exhibition and Forum\",\n    \"image_profile\": \"https://onsite.iteca.kz/img/files/ica/mining.jpg\",\n    \"beginDate\": \"2023-09-20\",\n    \"endDate\": \"2023-09-22\",\n    \"location\": \"\\\"Atakent\\\" IEC,  Almaty,  Kazakhstan\",\n    \"website\": \"https://mining-metals.kz/en\"\n  },\n  {\n    \"title\": \"TransLogistica Kazakhstan 2023\",\n    \"description\": \"Kazakhstan International  Transport & Logistics Exhibition\",\n    \"image_profile\": \"https://onsite.iteca.kz/img/files/ica/translogistica.jpg\",\n    \"beginDate\": \"2023-10-04\",\n    \"endDate\": \"2023-10-06\",\n    \"location\": \"International Exhibition Center \\\"EXPO\\\". Astana,  Kazakhstan\",\n    \"website\": \"https://translogistica.kz/en\"\n  },\n  {\n    \"title\": \"Powerexpo Almaty 2023\",\n    \"description\": \"Kazakhstan International Energy, Electrical Equipment and Machine Building Exhibition and Forum of Power Engineers\",\n    \"image_profile\": \"https://onsite.iteca.kz/img/files/ica/Power_almaty.jpg\",\n    \"beginDate\": \"2023-10-17\",\n    \"endDate\": \"2023-10-19\",\n    \"location\": \"\\\"Atakent\\\" IEC,  Almaty,  Kazakhstan\",\n    \"website\": \"https://powerexpo.kz/en\"\n  },\n  {\n    \"title\": \"Pharmatech Kazakhstan 2023\",\n    \"description\": \"1st Kazakhstan International Exhibition of Equipment, Ingredients & Technologies for Pharmaceutical Industry\",\n    \"image_profile\": \"https://onsite.iteca.kz/img/files/ica/astzdorovie.jpg\",\n    \"beginDate\": \"2023-10-24\",\n    \"endDate\": \"2023-10-26\",\n    \"location\": \"«EXPO» IEC Nur-Sultan, Kazakhstan\",\n    \"website\": \"https://astanazdorovie.kz/en/exhibition/exhibition-programme\"\n  },\n  {\n    \"title\": \"Astana Zdorovie 2023\",\n    \"description\": \"International Kazakhstan Exhibition on Healthcare\",\n    \"image_profile\": \"https://onsite.iteca.kz/img/files/ica/astzdorovie.jpg\",\n    \"beginDate\": \"2023-10-25\",\n    \"endDate\": \"2023-10-27\",\n    \"location\": \"«EXPO» IEC Astana, Kazakhstan\",\n    \"website\": \"https://astanazdorovie.kz/en/\"\n  }\n]', 3),
(4, 'testimonials', 'Testimonials', '[{\"id\":\"dbeaa40b-62c2-402c-ac82-fe2157dfae07\",\"author\":\"John Doe, Your Great Event Inc\",\"testimonial\":\"<p style=\\\"text-align: center;\\\">We are taking part in the KazBuild 2022 exhibition for the first time, we noticed an unprecedented activity of participants. At t he exhibition we present both a popular coll ection and novelties of our products. We are very glad that we have something to offer the market, that Russian products are in demand. We see a large influx of customers and a good response. The activity of visitors and the contracts concluded anticipated all our best expectations from the exhibition. We plan to take part next year. - Tatyana Berkunova, SHAKHINTEX International Company LLC</p>\"},{\"id\":\"fd1a8c70-bac8-498d-b618-45ffef25edbd\",\"author\":\"Tatyana Berkunova, SHAKHINTEX International Company LLC\",\"testimonial\":\"<p style=\\\"text-align: center;\\\">We are taking part in the KazBuild 2022 exhibition for the first time, we noticed an unprecedented activity of participants. At t he exhibition we present both a popular coll ection and novelties of our products. We are very glad that we have something to offer the market, that Russian products are in demand. We see a large influx of customers and a good response. The activity of visitors and the contracts concluded anticipated all our best expectations from the exhibition. We plan to take part next year.</p>\"}]', 4),
(5, 'contacts', 'Contacts', '{\"contactsHtml\":\"<p>125 Kensington Church Street, London,</p>\\n<p>England, W8 7LP.</p>\\n<p>Tel: <a href=\\\"tel:020%207313%208040\\\">020 7313 8040</a></p>\\n<p>&nbsp;</p>\\n<p>Office No. 1709-1710, Shatha Tower,</p>\\n<p>Al-Falak Street, Dubai Media City, P.O.</p>\\n<p>Box 502147, Dubai, United Arab Emirates</p>\\n<p>tel: <a href=\\\"tel:+971%20(4)%205%20545%20319\\\">+971 (4) 5 545 319</a></p>\\n<p>email: <a href=\\\"mailto:info@ica.events\\\">info@ica.events</a></p>\",\"photo\":\"/assets/bg_photo.png\"}', 6),
(6, 'meta', 'Meta Information', '{\r\n    \"id\": 0,\r\n    \"page_title\": \"Home Page\",\r\n    \"meta_description\": \"This is a test description for the Home Page\",\r\n    \"meta_keywords\": \"home, test, sample\",\r\n    \"og_description\": \"Social description for Home Page\",\r\n    \"og_locale\": \"en_US\",\r\n    \"og_image\": \"mydomain.com/sample_image_url.jpg\"\r\n}', 7),
(7, 'membership', 'Membership', '{\"label\":\"Proud member of\",\"image\":\"/assets/ufi_logo.png\"}', 5);

-- --------------------------------------------------------

--
-- Структура таблицы `page_settings`
--

CREATE TABLE `page_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `block_name` varchar(255) NOT NULL,
  `block_title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `order_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `page_settings`
--

INSERT INTO `page_settings` (`id`, `block_name`, `block_title`, `content`, `order_number`) VALUES
(1, 'main', 'Main', '{\"footer\":\"<p>Copyright Database &copy; 2023 ICA (JV) LTD &ndash; ICA Events. Company number 11499614. All right reserved. <a href=\\\"http://www.ica-eurasia.com/privacy.html\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">Cookie and Privacy Policy</a>.</p>\"}', 1),
(2, 'navigation', 'Navigation', '{\"nav\":[{\"label\":\"HOME\",\"path\":\"/\",\"order\":\"1\",\"isActive\":true},{\"label\":\"ABOUT\",\"path\":\"/about\",\"order\":\"2\",\"isActive\":true},{\"label\":\"EVENTS\",\"path\":\"/events\",\"order\":\"3\",\"isActive\":true},{\"label\":\"EVENT SOLUTIONS\",\"path\":\"/solutions\",\"order\":\"4\",\"isActive\":true},{\"label\":\"MEDIA\",\"path\":\"/media\",\"order\":\"5\",\"isActive\":true},{\"label\":\"CONTACTS\",\"path\":\"/contacts\",\"order\":\"6\",\"isActive\":true}]}', 2),
(3, 'social', 'Social Links', '{\"socialLinks\":{\"linkedin\":{\"url\":\"https://www.linkedin.com/company/ica-events\",\"isActive\":true,\"icon\":\"faLinkedin\"},\"instagram\":{\"url\":\"https://www.instagram.com/ica_events/\",\"isActive\":true,\"icon\":\"faInstagram\"},\"youtube\":{\"url\":\"#\",\"isActive\":true,\"icon\":\"faYoutube\"},\"facebook\":{\"url\":\"https://www.facebook.com/icaeventsglobal\",\"isActive\":true,\"icon\":\"faFacebook\"}}}', 3),
(4, 'meta', 'Meta Information', '{\"page_title\":\"About Us\",\"meta_description\":\"Learn more about us.\",\"meta_keywords\":\"about, company, info\",\"og_description\":\"OG descr\",\"og_locale\":\"OG Locale\",\"og_image\":\"OG Image Url Custom\"}', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `page_solutions`
--

CREATE TABLE `page_solutions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `block_name` varchar(255) NOT NULL,
  `block_title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `order_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `page_solutions`
--

INSERT INTO `page_solutions` (`id`, `block_name`, `block_title`, `content`, `order_number`) VALUES
(1, 'page', 'Page', '{\"intro\":\"<p>At ICA Events, we offer a range of exhibition solutions designed to help your business grow in today\'s dynamic marketplace. Our services are tailored to meet your unique needs and objectives, whether it\'s expanding into new markets, strengthening B2B relations hips, or showcasing your products and services to a global audience.</p>\",\"solutions\":[{\"image\":\"/assets/Event_management.png\",\"title\":\"Exhibition Stand Desigin and Construction \",\"text\":\"<p>Tailored exhibition booth designs can make a significant impact on your brand\'s presence. We create visually stunning and immersive booth experiences that not only attract potential clients but also communicate your company\'s unique value proposition.</p>\\n<h3>Benefits:</h3>\\n<p>Brand Identity: Create a unique and memorable brand presence. Engagement: Encourage interaction and lead generation. Personalization: Tailor booth design to specific event themes. Physical Impact: Showcase products and services in a tangible way.</p>\",\"id\":\"41c2286c-692f-492c-9ea5-c716282abeeb\"},{\"id\":\"25924d2f-db34-46fe-8489-339ee84d68aa\",\"image\":\"/assets/Exhibition_stand_construction.png\",\"title\":\"Market Entry Strategy  Consultation\",\"text\":\"<p>Our market entry experts work closely with you to develop a comprehensive market entry strategy. This includes market research, competitor analysis, regulatory compliance guidance, and localization strategies. We help you navigate the complexities of new markets, reducing risks and increasing opportunities for success.</p>\\n<h3>Benefits:</h3>\\n<p>Research-Driven: Develop a data-driven approach to entering new markets. Risk Mitigation: Identify potential challenges and devise mitigation strategies. Market Analysis: Gain insights into consumer behaviour, competition, and trends. Localisation: Adapt your offerings to fit the cultural and regulatory aspects of new markets.</p>\"},{\"id\":\"f9e45428-094e-4dc3-83cc-c31d4bf758a4\",\"image\":\"/assets/Consulting.png\",\"title\":\"B2B Matchmaking Services\",\"text\":\"<p>Our B2B matchmaking services connect you with potential partners, distributors, and clients in your target markets. We use data-driven matchmaking algorithms and industry insights to facilitate meaningful connections, helping you expand your business network effectively.</p>\\n<h3>Benefits:</h3>\\n<p>Strategic Connections: Facilitate connections with potential partners and clients. Lead Generation: Identify and engage with qualified B2B prospects. Knowledge Sharing: Participate in industry-specific discussions and knowledge sharing. Deal Closing: Create opportunities for business deals and collaborations.</p>\"}],\"image\":\"/assets/bg_solutions_title.png\",\"contacts\":{\"phone\":\"+971 (4) 5 545 319\",\"email\":\"info@ica.events\",\"text\":\"<p>Contact us today to learn how we can tailor our services to meet your specific needs and guide your business toward success.</p>\"}}', 1),
(2, 'meta', 'Meta', '{\"page_title\":\"Events Solutions\",\"meta_description\":\"Learn more about us.\",\"meta_keywords\":\"about, company, info\",\"og_description\":\"OG descr\",\"og_locale\":\"OG Locale\",\"og_image\":\"/assets/bg_solutions_title.png\"}', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 NOT NULL,
  `email` varchar(255) CHARACTER SET latin1 NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 NOT NULL,
  `role` enum('editor','news_manager','super_user') CHARACTER SET latin1 NOT NULL,
  `avatar` varchar(255) CHARACTER SET latin1 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `page_about`
--
ALTER TABLE `page_about`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `page_contacts`
--
ALTER TABLE `page_contacts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `page_galleries`
--
ALTER TABLE `page_galleries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `page_home`
--
ALTER TABLE `page_home`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `page_settings`
--
ALTER TABLE `page_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `page_solutions`
--
ALTER TABLE `page_solutions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `page_about`
--
ALTER TABLE `page_about`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `page_contacts`
--
ALTER TABLE `page_contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `page_galleries`
--
ALTER TABLE `page_galleries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `page_home`
--
ALTER TABLE `page_home`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `page_settings`
--
ALTER TABLE `page_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `page_solutions`
--
ALTER TABLE `page_solutions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
