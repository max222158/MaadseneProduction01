/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Realm from "realm";
const data = [
  {
      "id": 10017,
      "name": "Wolof Podcast",
      "title": "yàqu-yàqu jikko yi (xaaj bu njëkk)",
      "auteur": "Lahat Diaw",
      "categorie": "",
      "created_at": "2022-06-03 14:43:49",
      "saison": 1,
      "episode": 9,
      "langue": "Wolof",
      "image": "1654285429.jpg",
      "lien": "1654285429.mp3",
      "video": "",
      "description": "«Danoo xëm te ñor a gu ñu » Sëriñ Saam Mbay.\r\n\r\nTay ñuy waxtaane yàqu-yàqu jikko yi ànd ci ak Seex Aliw Saar. Ku am seetlu tuuti dina xam ni sunu reew mi fi mu tollu ci jikko yu yàqu kéeman la. Lan mooko sabab ak lan mooy saafara ci? Ci waxtaan bi di nanu ci yaatal lu bari ci ñaari xaaj",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10040,
      "name": "IMPACT VOICE PODCAST",
      "title": "Comprendre la douleur et comment la surmonter",
      "auteur": "Amy Samb",
      "categorie": "",
      "created_at": "2022-02-20 06:04:02",
      "saison": 1,
      "episode": 1,
      "langue": "Française",
      "image": "1645358642.png",
      "lien": "1645358642.mp4",
      "video": "",
      "description": "La douleur est une émotion que beaucoup ne comprennent pas ou font tout, afin d'éviter de souffrir, ce qui ne fait qu'accroître leur mal-être. Dans cet épisode, je vous livre quelques idées comment surmonter un passage douloureux.",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10032,
      "name": "SABALI",
      "title": "Papa Moda LOUM \"Être familier du génie des autres pour construire son propre génie\" P1",
      "auteur": "Papa Ablaye Baldé",
      "categorie": "",
      "created_at": "2022-02-19 10:13:16",
      "saison": 1,
      "episode": 11,
      "langue": "",
      "image": "1645287196.png",
      "lien": "1645287196.mp3",
      "video": "",
      "description": "Pour ce 11ème épisode de Sabali, j’ai eu l’immense plaisir de recevoir Papa Moda LOUM, Chargé d’investissements à la Banque Mondiale (BM). \r\n\r\nIl était très important pour moi de l’inviter dans mon podcast, car, on le sait des Africains, jeunes et Sénégalais de surcroît travaillant à la BM ne font pas légion. Cette invitation était pour moi une manière de mettre en lumière ces futurs leaders comme Papa Moda. Et surtout de montrer aux jeunes africains les voies et moyens pour intégrer cette prestigieuse institution qu’est la BM.\r\n\r\nNous avons évoqué la récente nomination de Makhtar DIOP, ancien Ministre Sénégalais de l’économie et des Finances et Vice-Président pour les infrastructures à la BM, aujourd’hui à la tête de l’IFC (International Finance Corporation). J’ai voulu également recueillir son avis sur la crise du Covid qui s’est traduite en une crise économique. \r\n\r\nOriginaire de la ville de Dakar où il a suivi ses études jusqu’à la Seconde aux Cours Saint Marie de Hann. Papa Moda a été reçu à la fois au Collège du Monde Uni et au African Leadership Academy dont Aida Ndiaye que je salue nous a beaucoup parlé. \r\n\r\nFinalement, il a opté pour le Collège du Monde Uni à Singapour où il s’est forgé une vraie personnalité avant de rejoindre Colby College aux Etats Unis où il s’est spécialisé en économie et en finances. \r\n\r\nPapa Moda est largement revenu sur les motivations qui l’ont amené à travailler pour la Citi Bank et aujourd’hui à la Banque Mondiale. Pour les jeunes qui nous écoutent Papa Moda est revenu très en détails sur le processus de sélection à la BM, le rôle de la BM, ses différentes missions et aussi l’intérêt de ces missions. \r\n\r\nAu-delà du brillant intellectuel, j’ai beaucoup aimé l’homme qui se cache derrière féru de littérature et adepte de l’indépendance et de la curiosité intellectuelle. D’ailleurs à cet égard, j’en profite pour rendre un hommage appuyé à son défunt père Amadou Mbaye LOUM, une grande figure de l’audiovisuel Sénégalais pour qui Papa Moda ne tarit pas d’éloges et qui représente aussi un modèle de pensée et une source de motivation. \r\n\r\nBonne écoute !",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 82,
      "name": "YOU BE YOU",
      "title": "Le mariage n'est pas une fin en soi",
      "auteur": "Thiane Ndiaye",
      "categorie": "",
      "created_at": "2022-06-15 14:33:50",
      "saison": 1,
      "episode": 10,
      "langue": "Française",
      "image": "1655321630.png",
      "lien": "1655321630.mp3",
      "video": "",
      "description": "Le mariage, acte de foi, ou phénomène de mode ?\r\n\r\nDans cet épisode, je vous fais part de mon avis sur le sujet à partir d'expériences personnelles et de recherches. Donc ce que je dis n'engage que moi bien entendu :) \r\n\r\nJe vous fais ici une comparaison du mariage occidental vs mariage africain/sénégalais. \r\n\r\nAttention: Petit lapsus vers la 6e minute, je voulais dire au lieu de \"couple divorcé\", couple où l'un des partenaires est décédé.\r\n\r\nN'hésitez pas à revenir moi si vous avez des retours à me faire sur le sujet, ou contributions. \r\n\r\nJe vous mets ci dessous mon compte Instagram. \r\n\r\nhttps://www.instagram.com/call_me_thiathia/\r\n\r\nBon dimanche et bonne écoute. \r\n\r\nThiane",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 79,
      "name": "YOU BE YOU",
      "title": "Santé mentale: \"Ma depression est la meilleure chose qui me soit arrivée\" avec Penda de Event by P",
      "auteur": "",
      "categorie": "",
      "created_at": "2022-06-15 14:13:05",
      "saison": 1,
      "episode": 7,
      "langue": "Française",
      "image": "1655320385.png",
      "lien": "1655320385.mp3",
      "video": "",
      "description": "Non, la dépression n'est pas une maladie de blanc. Ni de riche d'ailleurs. Ni de pauvre. Ni de non croyant. Elle n'a pas de couleur, pas de race, pas de religion. \r\n\r\nC'est une maladie en fait. Qui heureusement se soigne si on s'en donne les moyens. Mais qui peut être mortelle, si on la néglige. \r\n\r\nElle peut être chronique, ou passagère. Elle peut toucher femme comme homme. \r\n\r\nOui, tout ça, c'est la dépression. \r\n\r\nPenda nous raconte dans cet épisode son expérience avec cette «mal-a-dit», quand elle a vu tout son monde s'effondrer à cause de discriminations qu'elle subissait dans son travail, de problèmes personnels, et d'une série de malaises qui contribuaient à son mal-être. \r\n\r\nElle nous raconte aussi comment elle l’a vaincue pour aujourd'hui devenir sa propre boss et une fervente défenseuse du bien-être et la santé mentale. \r\n\r\nVas vite découvrir notre nouvel épisode sur toutes les appli de podcast (Spotify, Apple Podcasts, Google Podcasts) et viens me dire ici ce que tu en as pensé. \r\n\r\nPour plus d’échanges sur le sujet, rejoignez moi sur mon compte Instagram (lien ci-dessous)\r\n\r\nhttps://www.instagram.com/call_me_thiathia/\r\n\r\nEt n’hésite pas à bien nous noter sur l’appli et nous laisser un avis pour un max de soutien. \r\n\r\nHappy Sunday",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10035,
      "name": "SABALI",
      "title": "Déborah DIALLO \"Mon ADN, c'est la défense des droits humains\"",
      "auteur": "Papa Ablaye Baldé",
      "categorie": "",
      "created_at": "2022-02-19 10:38:44",
      "saison": 1,
      "episode": 13,
      "langue": "",
      "image": "1645288724.png",
      "lien": "1645288724.mp3",
      "video": "",
      "description": "Pour ce 13ème épisode de Sabali, j’ai eu l’honneur d’accueillir Maître Déborah Diallo, brillante entrepreneure et avocate au barreau de Strasbourg. \r\n\r\nComme sur l’épisode précédent, il était très important pour moi, à l’occasion du mois de mars, d’avoir des femmes remarquables, inspirantes et qui incarnent le leadership féminin afin de motiver davantage la jeune génération. \r\n\r\nC’est naturellement que j’ai pensé à Déborah Diallo, qui, au-delà de son métier d’avocat, milite pour les droits des femmes notamment sur une thématique extrêmement difficile et qui lui tient à cœur : les mutilations génitales. \r\n\r\nA cet égard, elle s’est fait connaître au grand public grâce au concours international de Plaidoiries des avocats du Mémorial de Caen qu’elle a remporté. Une plaidoirie forte et percutante qui s'est intitulée : \"Les écorchées vives de la Diaspora africaine : itinéraire d'une fillette victime d'excision\" que je vous invite à regarder sur YouTube. \r\n\r\nAprès une formation en Droit international et européen, elle a créé son cabinet d’avocat qu’elle dirige depuis plus de 4 ans. Maître Diallo intervient sur tout ce qui est contentieux notamment en droit privé, en droit des affaires et droit international à Strasbourg. \r\n\r\nEnsemble on a évoqué son expérience d’avocate et dirigeante d’entreprise notamment les dossiers parfois très difficiles qu’elle est amenée à gérer. \r\n\r\nOn a naturellement parlé de leadership féminin, de développement personnel, de droit, de doute ou encore de livres au cours de cet entretien passionnant qui, je l’espère, va vous plaire. \r\n\r\nCabinet Déborah DIALLO\r\n\r\nMaître Déborah DIALLO\r\n\r\nAVOCATE & MANDATAIRE\r\nen transactions immobilières\r\n12 Avenue de la Marseillaise 67000 STRASBOURG\r\n\r\nTél : 03.67.70.03.03    \r\nFax :03.67.70.03.09\r\nCase Palais: 319 \r\n\r\nLivres:\r\nChanson douce - Leïla Slimani\r\nL'aventure ambigue - Cheikh Hamidou Kane\r\nLes impatientes -  Djaïli Amadou Amal",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10024,
      "name": "Wolof Podcast",
      "title": "Identité culturelle (xam sa bopp ak sa mbatiit)",
      "auteur": "Lahat Diaw",
      "categorie": "",
      "created_at": "2022-06-03 14:14:39",
      "saison": 1,
      "episode": 2,
      "langue": "Wolof",
      "image": "1654283679.jpg",
      "lien": "1654283679.mp3",
      "video": "",
      "description": "Sunu episode bu njëkk ñuy waxtaane « identité culturelle » : ndax dañoo ñàkk suñu mbaatit (culture) ginnaaw bi Tubaab yi ñëwee suñu réew yi noot ñu? Ndax xeebuñ suñu bopp ginnaaw loolu? Ndax jéem nanu dellu suñu bopp? Mu nekk ay laaj yu bari yoo xamne mat na waxtaane. Ak téereeb Ken Bugul bi tudd « Le Baobab fou » lañuy jéema saytu laaj yi yépp.",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 80,
      "name": "YOU BE YOU",
      "title": "Globetrotter- Love the life you live and live the life you love- avec Nouche Life",
      "auteur": "Thiane Ndiaye",
      "categorie": "",
      "created_at": "2022-06-15 14:24:07",
      "saison": 1,
      "episode": 8,
      "langue": "Française",
      "image": "1655321047.png",
      "lien": "1655321047.mp3",
      "video": "",
      "description": "Nouche, de son vrai nom Mouhamadou Moustapha Ndiaye, est un jeune sénégalais qui a quitté son Sénégal natal à l’âge de 17 ans pour faire ses études à Londres. \r\n\r\nEn 2014, il y a à peine 8 ans, a commencé sa folle aventure d’aller explorer ce monde et ce qu’il regorge de beau. \r\n\r\nPartir en fin fond de la Palestine, visiter la Jordanie, la Lybie, l’Europe entière, aller voir les aurores boréales en Islande, essayer de prier dans la mer rouge comme le prophète Moussa (je ne sais pas s’il a pu la diviser en deux, on va l’appeler Kukandé du coup), ou encore visiter la Mecque deux fois, partir au Brésil sur un coup de tête, on va dire que ce n’est pas chose commune de nos jours, de tous les temps d’ailleurs. \r\n\r\nEt ce qui est incroyable mais vrai, il a visité tous ces pays avec son passeport sénégalais !\r\n\r\nJe t’invite donc à aller écouter avec attention et j’espère avec beaucoup de plaisir ma conversation avec THE Nouche Life. \r\n\r\nJ’aurais tellement appris sur l’importance d’avoir des rêves dans la vie et de se donner les moyens pour y arriver.\r\n\r\nJ’aurais beaucoup appris sur l’abnégation, le courage, la détermination et la capacité à se surpasser quand on veut quelque chose. \r\n\r\nCi dessous, quelques sujets abordés dans ce podcast. \r\n\r\n18:00: Voyager avec un passeport sénégalais\r\n\r\n20:00: Le tunnel de l’amour \r\n\r\n26:00: Voyager en avion- vaincre ses peurs\r\n\r\n30:00: Il faut voyager surtout quand on est jeune !\r\n\r\n32:00: L’impact de la COVID 19 dans nos vies\r\n\r\n46:00: Histoire de miles et bon plans voyages\r\n\r\n50:00: Voyages et vie pro- les joies du télétravail !\r\n\r\n56:37: Voyage à la Mecque, Palestine, Jerusalem \r\n\r\n01:01:00: Influence sur les réseaux sociaux\r\n\r\n01:06:00: Motherland, Africa \r\n\r\n01:07:00: Anecdotes sur les voyages. Black Tourism",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10005,
      "name": "WOLOF TECH",
      "title": "Les applications informatiques",
      "auteur": "Elhadji Ibrahima Diago",
      "categorie": "",
      "created_at": "2022-02-17 11:05:29",
      "saison": 1,
      "episode": 5,
      "langue": "",
      "image": "1645117529.jpg",
      "lien": "1645117529.mp3",
      "video": "",
      "description": "Les applications sont des outils incontournables pour le bon fonctionnement de nos ordinateurs et en plus de cela elles les rendent encore plus intelligents. Dans cet épisode, nous parlons dans une première partie des applications informatiques, des différences entre applications, logiciels et programmes informatiques et enfin dans la seconde partie nous abordons les différents types d'application.\r\n.............\r\nPour participer au VOCALCAST et partager votre expérience, envoyé votre vocal de présentation via whatsapp au +221 76 374 12 91 ou par mail elibrahimadiago@gmail.com\r\n\r\nInvité VocalCast : Mr Demba FALL\r\nLinkedIn : https://bit.ly/3kQTham\r\nBlog : http://mmdiago.com/podcast",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10028,
      "name": "SABALI",
      "title": "Fatima Zahra BA \"Les gens n'achètent pas juste un produit mais une expérience\"",
      "auteur": "Papa Ablaye Baldé",
      "categorie": "",
      "created_at": "2022-02-19 09:45:58",
      "saison": 1,
      "episode": 8,
      "langue": "",
      "image": "1645285558.png",
      "lien": "1645285558.mp3",
      "video": "",
      "description": "Pour ce dernier épisode de l’année, j’ai le plaisir de recevoir Fatima Zahra BA, créatrice de la marque de mode So Fatoo. \r\n\r\nAprès ses études primaire et secondaire à Dakar, Fatima Zahra a rejoint le Maroc où elle a été diplômée en droit public et en relations internationales au Maroc. \r\n\r\nAprès l’obtention de son diplôme, Fatima a travaillé dans un cabinet d’avocat avant de retourner au Sénégal où elle a exercé le métier d’Assistante parlementaire à l’Assemblée Nationale puis au Ministère de la femme, de la famille et du genre. \r\n\r\nPassionnée de couture depuis sa tendre enfance, elle a créé, en juillet 2018, la marque So Fatoo en hommage à sa grand-mère et homonyme Fatou Sow mais aussi à toutes les femmes africaines. Ensemble, on a largement évoqué ses débuts avec So Fatoo, ses ambitions, ses difficultés qu’elle a surmontées et les valeurs défendues à travers la marque. \r\n\r\nFace à la recrusdence des violences faites aux femmes, elle a initié la campagne « Doyna » (ça suffit en wolof) qui a réuni plusieurs personnages publics pour dénoncer et alerter l’opinion publique sur ce fléau.\r\n\r\nAvec So Fatoo, elle habillé les acteurs de la série à succès « MDHM » avec ses créations. Vous allez découvrir une femme très engagée et très ambitieuse.\r\n\r\nLivres:\r\nLe jardiens des vertueux (Riyâd as-sâlihîn) de Imam Al-Nawawi\r\nLa Confrerie des éveillés de Jacques Attali\r\nConscious Loving: The Journey to Co-Commitment de Gay Hendricks",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10007,
      "name": "WOLOF TECH",
      "title": "Dix étapes pour créer un site web Partie I",
      "auteur": "Elhadji Ibrahima Diago",
      "categorie": "",
      "created_at": "2022-02-17 11:16:39",
      "saison": 1,
      "episode": 7,
      "langue": "",
      "image": "1645293130.jpg",
      "lien": "1645118199.mp3",
      "video": "",
      "description": "Créé vers les années 90 par le chercheur Tim Berners-Lee, le web est un réseau mondial de sites et d’applications fonctionnant sur l'internet. Dans cet épisode nous proposons dix étapes à suivre pour bien réussir la création de son site web.\r\n\r\nInvité VocalCast : Mr Jean Waly SARR de Kaolack Innovation Technology nous parle de l’organisation Kitech \r\nLinkedIn : https://www.linkedin.com/in/jean-noel-sarr-05424967/\r\nFacebook : https://www.facebook.com/kaolackinnovtech\r\n \r\n Pour participer au VOCALCAST et partager votre expérience, envoyé votre vocal de présentation via whatsapp au +221 76 374 12 91 ou par mail elibrahimadiago@gmail.com\r\n\r\n Blog woloftech : http://mmdiago.com/podcast",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10029,
      "name": "SABALI",
      "title": "Ownlabs \"Laboratoire virtuel de science destiné aux établissements secondaires\"Ownlabs \"Laboratoire virtuel de science destiné aux établissements secondaires\"",
      "auteur": "Papa Ablaye Baldé",
      "categorie": "",
      "created_at": "2022-02-19 09:50:35",
      "saison": 1,
      "episode": 9,
      "langue": "",
      "image": "1645285835.png",
      "lien": "1645285835.mp3",
      "video": "",
      "description": "Pour ce tout premier numéro de l’année 2021, j’ai eu le plaisir de recevoir les fondateurs de la star-up Venturi. Je nomme Abdou Khadre Diop le CEO et Mouhamed SECK, le Directeur des opérateurs et Business Developer. \r\n\r\nEnsembles, ils ont créé la solution Ownlabs. Face à l’absence de travaux pratiques dans le cursus scolaire sénégalais, ces jeunes entrepreneurs ont lancé OwnLabs, casque de réalité virtuelle accompagnée d’une application qui simule des expériences en chimie, en physique et en biologie. \r\n\r\nOwnlabs est un vrai laboratoire virtuel de sciences qui permet aux écoles secondaires d’offrir à bas coût l’occasion à leurs élèves de faire des expériences de manière ludique, fun et moderne !\r\n\r\nD’après le journal Le Monde Afrique, « l’application OwnLabs veut révolutionner la façon dont on fait de la science dans les collèges et lycées africains. »\r\n\r\nLeur objectif, je les cite, est de « créer une nouvelle génération de scientifiques et de chercheurs africains capables d’exceller dans les disciplines d’excellence. »",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10009,
      "name": "SABALI",
      "title": "Mouhammed El Bachir DIA \"L'émancipation intellectuelle passe par une meilleure éducation\"",
      "auteur": "Papa Ablaye Baldé",
      "categorie": "",
      "created_at": "2022-02-18 17:10:43",
      "saison": 1,
      "episode": 2,
      "langue": "",
      "image": "1645225843.png",
      "lien": "1645225843.mp3",
      "video": "",
      "description": "Pour ce nouvel épisode du podcast Sabali, j’ai le plaisir de recevoir Mouhammed Bachir DIA. Une personne pour qui j’ai un énorme respect. Il fait parti de cette catégorie de personnes qui vous marquent dès votre premier contact.\r\nMouhammad Bachir DIA se distingue par son ouverture d’esprit, ses qualités intellectuelles et humaines et surtout son humilité. Vous voyez que je ne taris pas d’éloges au sujet de mon invité.\r\n\r\nAprès des études primaires et secondaires à Thiès, ville située à 70 km de Dakar. Bachir a réussi le prestigieux concours d’admission au Lycée Louis Le Grand à Paris où il a fait ses classes prépas. Ensuite il a intégré Centrale Supelec une grande école d’ingénieur où il a suivi des études en mathématiques appliquées. Une fois diplômé, Bachir a travaillé pour différentes institutions financières et actuellement pour un cabinet d’audit du Big 4 ! Un brillant parcours vous me diriez dont on parlera plus en détails.",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 81,
      "name": "YOU BE YOU",
      "title": "VBG (Violences basées sur le genre)- Lissa DIOP",
      "auteur": "Thiane Ndiaye",
      "categorie": "",
      "created_at": "2022-06-15 14:30:38",
      "saison": 1,
      "episode": 9,
      "langue": "Française",
      "image": "1655321437.png",
      "lien": "1655321437.mp3",
      "video": "",
      "description": "Bienvenue sur l’épisode 09 de You be You. \r\n\r\nNotre invitée de ce jour n’est personne d’autre que la grande Lissa Diop, fervente advocatrice des violences basées sur le genre, mais aussi victime. \r\n\r\nDans cet épisode, nous traitons de:\r\n\r\nL’identité\r\nColorisme dans nos pays africains \r\nSon agression traumatisante à Dakar\r\nLibération de la parole\r\nTypes d’agression dont sont souvent victimes les femmes\r\nViolences conjugales\r\nComment éduquer et préparer son enfant à toutes ces violences ? \r\nChemin vers la guérison \r\nBonne écoute, et bon dimanche. \r\n\r\nSuivez nous sur ce lien suivant pour plus de contenus sur les podcasts",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 75,
      "name": "YOU BE YOU",
      "title": "Immigration en France avec Bamba Niang- Partie 1",
      "auteur": "Thiane Ndiaye",
      "categorie": "",
      "created_at": "2022-06-15 13:41:53",
      "saison": 1,
      "episode": 3,
      "langue": "",
      "image": "1655318513.png",
      "lien": "1655318513.mp3",
      "video": "",
      "description": "Ce restera surement l’un de mes épisodes «coup de coeur» de loin. \r\n\r\nVivre à l’étranger peut avoir l’air facile et même être un coup de chance pour beaucoup qui sont de l’autre côté de l’Occident et qui rêvent de vivre cette expérience unique sur tous les plans. \r\n\r\nEt pour autant, et aussi nombreux que nous sommes, nous n’avons pas tous les mêmes rêves, les mêmes aspirations, les mêmes projets de vie, et surtout le même destin. \r\n\r\nLe parcours de Bamba mérite d’être couché sur papier dans les livres de développement personnel, étudié dans les salles de classe, et raconté à nos enfants. Non pas parce qu’il est devenu un Steve Jobs ou Elon Musk ou encore Bill Gates (parce que finalement la réussite pour moi, ce n’est pas de devenir quelqu’un ou d’avoir fait une découverte qui va révolutionner le monde), mais parce que Bamba a su faire des choix de vie qui le correspondaient, lui. \r\n\r\nBamba a su partir quand il le fallait. Se battre quand il le fallait. Essuyer ses échecs quand il le fallait et continuer son chemin parce qu’il croit en ses rêves. \r\n\r\nDans cette première partie, nous allons parler de la vie de Bamba quand il était encore élève au Prytanée militaire de Saint-Louis (école Militaire qui forme les 50 meilleurs élèves garçons du Sénégal), de ses études supérieures militaires dans l’Armée de Terre à Turin/Italie, et de ses premières expériences en tant que lieutenant et Manager d’unité opérationnelle dans le 12e bataillon d’instruction de l’Armée sénégalaise avant qu’il ne quitte tout pour écrire sa propre histoire.",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10013,
      "name": "SABALI",
      "title": "Madjiguène DIENG \"Veiller à sa culture générale pour avoir des conversations substantielles\"",
      "auteur": "Papa Ablaye Baldé",
      "categorie": "",
      "created_at": "2022-02-19 07:26:01",
      "saison": 1,
      "episode": 6,
      "langue": "",
      "image": "1645277161.png",
      "lien": "1645277161.mp3",
      "video": "",
      "description": "Pour ce nouvel épisode du podcast Sabali j’ai eu un immense plaisir de recevoir Ndèye Madjigène DIENG. \r\n\r\nOriginaire de Dakar où elle a suivi ses études primaires à l’école Liberté 6 A. Ensuite elle a intégré l’excellent Lycée Seydou Nourou TALL où elle a obtenu son bac en 2012 malgré une année scolaire très chahutée par des grèves et un contexte politique difficile à l’époque. Cette année compliquée a beaucoup marqué Madjiguène et elle nous en parle avec beaucoup de maturité et de la manière dont elle a pu garder sa motivation intacte. \r\n\r\nUne fois le bac obtenu, elle est arrivée en France particulièrement à Toulouse pour y faire 2 années en IUT avant d’être sélectionnée sur dossier par l’Université Paris Dauphine. \r\n\r\nMadjiguène est revenue également sur ses différentes expériences professionnelles notamment à la banque BNP Paribas et un très beau parcours chez Air France.\r\n\r\nAujourd’hui Madjiguène travaille en tant que Consultante Sénior en Analyse de données. Au cours de notre interview, elle nous a fait une belle vulgarisation sur tout ce qui traitement de données massives. Elle en parle avec beaucoup de facilité vous allez l’entendre.\r\n\r\nEnsemble nous avons évoqué aussi son entourage familial, ses passions pour le voyage et la lecture, ses valeurs et ses modèles de réussite. Vous découvrirez une jeune femme très ambitieuse qui a un goût de l’excellence et qui a su faire preuve de résilience pendant des périodes compliquées comme son arrivée en France et ses débuts à l’Université Paris Dauphine. Je vous invite surtout les jeunes filles à l’écouter jusqu’au bout car je trouve qu’elles pourront s’identifier à elle. \r\n\r\nPlace à mon invité Ndèye Madjiguène DIENG.\r\n\r\nBonne écoute ! \r\n\r\nLivres: \r\nSamia CHERIF - Le voile de la peur\r\nMichele OBAMA - Becoming\r\nMariama BA - Une si longue lettre\r\nGary CHAPMAN - Les 5 langages de l'amour",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10012,
      "name": "SABALI",
      "title": "Codou MAR \"Ne jamais s'arrêter aux obstacles\"",
      "auteur": "Papa Ablaye Baldé",
      "categorie": "",
      "created_at": "2022-02-18 17:40:46",
      "saison": 1,
      "episode": 5,
      "langue": "",
      "image": "1645227646.png",
      "lien": "1645227646.mp3",
      "video": "",
      "description": "Pour ce nouvel épisode du podcast Sabali j’ai eu l’immense plaisir de recevoir à la fois une amie et une sœur Codou MAR. \r\n\r\nOriginaire de Rufisque, une ville située à 28 km de Dakar où elle a suivi ses études primaires avant d’être sélectionnée à la Maison d’Education Mariama BA de l’ile de Gorée. Codou a ensuité intégré l’ESMT présente dans 7 pays africains pour y faire deux années de classes préparatoires avant de venir en France et s’installer à Rouen où elle a poursuivi ses études supérieures dans une école d’ingénieur ESIGELEC. Elle nous en parlera plus en détails.  \r\n\r\nAujourd’hui Codou travaille en tant que Chargée d’études en électricité et en télécommunications à la SNCF. Vous allez découvrir une jeune femme très ambitieuse qui travaille dans un domaine assez technique quand même mais qui en parle avec beaucoup facilité et de pédagogie. Elle est très passionnée de sciences mais aussi de littérature une évidence pour une personne ayant fréquenté la MEMBA. \r\n\r\nCe que j’ai bien aimé avec codou c’est son côté très résilient, vous allez l’entendre au fil de l’épisode car elle revient sur des périodes délicates qu’elle a vécues mais elle a cette capacité de switcher très rapidement et de se révéler assez vite. J’en parle parce que c’est une qualité dont on a vraiment besoin surtout en cette période de crise sanitaire. Je ne vous en dis pas et laisse place à mon invité Codou MAR. Bonne écoute ! \r\n\r\nLivres: \r\nPaulo COELHO - L'Alchimiste\r\nElif SHAFAK - Soufi, mon amour\r\nSheryl Sandberg - En avant toutes\r\nEcoles\r\nMaison d'Education Mariama Ba\r\nESMT\r\nESIGELEC",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 71,
      "name": "YOU BE YOU",
      "title": "Bande annonce",
      "auteur": "Thiane Ndiaye",
      "categorie": "",
      "created_at": "2022-06-14 07:52:18",
      "saison": 1,
      "episode": 0,
      "langue": "",
      "image": "1655211138.png",
      "lien": "1655211138.mp3",
      "video": "",
      "description": "You be You est une émission qui va vous parler d'accomplissement de soi. Nous évoluons dans un monde où l'identité, le bonheur, l'authenticité, le retour et la connection vers soi sont tellement importants pour être soi.\r\n\r\nA chaque épisode, mes invités et moi vous partagerons des parties de nos vies et des expériences qui pourront vous inspirer et vous prouver qu'in fine \"we're all struggling and you're not alone\".\r\n\r\nRetrouvez nous un dimanche sur 2 sur toutes les plateformes d'écoute: Spotify, Apple Podcast, Google Podcast...\r\n\r\nMusic Credits: Ismael Lô/ Tajabone",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10025,
      "name": "Wolof Podcast",
      "title": "INTRO",
      "auteur": "Lahat Diaw",
      "categorie": "",
      "created_at": "2022-05-30 16:53:41",
      "saison": 1,
      "episode": 1,
      "langue": "Wolof",
      "image": "1653947621.jpg",
      "lien": "1653947621.mp3",
      "video": "",
      "description": "Tay ñuy def benn tambali bu ndaw ngir dégtal leen suñu « podcast » bi ñu am yéene tambali. Ñuy wax lutax ñu fas ko yéene def ci kàllaama wolof, yan woppa (sujets) lanu fas yéene waxtaane ak ki kay def mooy kan. Ci tënk lii ag ubbite la",
      "traduction": "",
      "support": "podcast",
      "view": 0
  },
  {
      "id": 10003,
      "name": "WOLOF TECH",
      "title": "L'histoire d'Internet",
      "auteur": "Elhadji Ibrahima Diago",
      "categorie": "",
      "created_at": "2022-02-17 11:00:45",
      "saison": 1,
      "episode": 4,
      "langue": "",
      "image": "1645117245.jpg",
      "lien": "1645117245.mp3",
      "video": "",
      "description": "Avec plus de 4 milliards d’utilisateurs et des millions de petits réseaux interconnectés à travers le monde entier, l’internet est le plus grand système de télécommunication informatique développée au niveau international. Dans cet épisode nous parlons de l’histoire de l’internet de sa naissance à son état actuel en passant en revue les différentes étapes de son évolution.\r\n\r\nQuizz : Quel est le lien du premier site mis en ligne dans l’histoire du web ?\r\n\r\nVous pouvez répondre a la question dans le blog ou sur twitter, facebook, instagram en utilisant le hashtag #woloftech\r\n\r\nBlog : https://bit.ly/33kCdmA\r\nFacebook : https://bit.ly/3i1ndyh\r\nTwitter : https://bit.ly/3kf8EZY\r\nLien utiles : https://www.internetworldstats.com/",
      "traduction": "",
      "support": "podcast",
      "view": 0
  }
];
const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
  },
  primaryKey: "_id",
};

const PodcastSchema = {
  name: "Podcast",
  properties: {
    id: "int",
    name: "string",
    title: "string",
    auteur: "string",
    categorie: "string",
    created_at: "string",
    saison: "int",
    episode: "int",
    langue: "string",
    image: "string",
    lien: "string",
    video: "string",
    description: "string",
    traduction: "string",
    support: "string",
    view: "int"
  
  },
  primaryKey: "id",
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  React.useEffect(()=>{

     (async()=>{

      try{
      const realm = await Realm.open({
        path: "myrealm",
        schema: [PodcastSchema],
      });

      let podcasts = data;
       realm.write(() => {
          podcasts.forEach(obj => {
              realm.create("Podcast", obj);
          });
      });  

      
      const pod = realm.objects("Podcast");
      console.log("------ - - -podcast - - -  - -",pod)

    }catch(e){

      console.log(e)    
    }
/*       const realm = await Realm.open({
        path: "myrealm",
        schema: [TaskSchema],
      }); */
      //realm.delete(realm.objects("Task"));
      
/*       realm.write(() => {
        realm.deleteAll();

      }); */
      //const tasks = realm.objects("Task");
      //console.log(`The lists of tasks are: ${tasks.map((task) => task.name)}`);

/*    let task1, task2;
      realm.write(() => {
        task1 = realm.create("Task", {
          _id: 4,
          name: "MAxime a isi",
          status: "Open",
        });
        task2 = realm.create("Task", {
          _id: 3,
          name: "go exercise 3 ",
          status: "Open3",
        });
        console.log(`created two tasks: ${task1.name} & ${task2.name}`);
      });*/ 
    })()



  },[])
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
