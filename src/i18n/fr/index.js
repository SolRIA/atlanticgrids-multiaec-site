export default {
  isoName: 'fr',
  nativeName: 'Français',
  label: {
    clear: 'Effacer',
    ok: 'OK',
    cancel: 'Annuler',
    close: 'Fermer',
    set: 'Régler',
    select: 'Sélectionner',
    reset: 'Réinitialiser',
    remove: 'Supprimer',
    update: 'Mettre à jour',
    create: 'Créer',
    search: 'Rechercher',
    filter: 'Filtrer',
    refresh: 'Rafraîchir',
    expand: (label) => (label ? `Développer "${label}"` : 'Développer'),
    collapse: (label) => (label ? `Réduire "${label}"` : 'Effondrement')
  },
  date: {
    days: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
    daysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
    months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Avr_Mai_Juin_Jui_Aou_Sep_Oct_Nov_Dec'.split('_'),
    headerTitle: (date) =>
      new Intl.DateTimeFormat('fr', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }).format(date),
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: true,
    pluralDay: 'jours'
  },
  table: {
    noData: 'Aucune donnée à afficher',
    noResults: 'Aucune donnée trouvée',
    loading: 'Chargement...',
    selectedRecords: (rows) => (rows > 0 ? rows + ' ' + (rows === 1 ? 'ligne sélectionnée' : 'lignes sélectionnées') + '.' : 'Aucune ligne sélectionnée.'),
    recordsPerPage: 'Lignes par page :',
    allRows: 'Tous',
    pagination: (start, end, total) => start + '-' + end + ' sur ' + total,
    columns: 'Colonnes'
  },
  editor: {
    url: 'URL',
    bold: 'Gras',
    italic: 'Italique',
    strikethrough: 'Barré',
    underline: 'Souligné',
    unorderedList: 'Liste non ordonnée',
    orderedList: 'Liste ordonnée',
    subscript: 'Indice',
    superscript: 'Exposant',
    hyperlink: 'Hyperlien',
    toggleFullscreen: 'Basculer en plein écran',
    quote: 'Citation',
    left: 'Aligner à gauche',
    center: 'Aligner au centre',
    right: 'Aligner à droite',
    justify: 'Justifier',
    print: 'Imprimer',
    outdent: "Diminuer l'indentation",
    indent: "Augmenter l'indentation",
    removeFormat: 'Supprimer la mise en forme',
    formatting: 'Mise en forme',
    fontSize: 'Taille de police',
    align: 'Aligner',
    hr: 'Insérer une règle horizontale',
    undo: 'Annuler',
    redo: 'Refaire',
    heading1: 'Titre 1',
    heading2: 'Titre 2',
    heading3: 'Titre 3',
    heading4: 'Titre 4',
    heading5: 'Titre 5',
    heading6: 'Titre 6',
    paragraph: 'Paragraphe',
    code: 'Code',
    size1: 'Très petit',
    size2: 'Petit',
    size3: 'Normal',
    size4: 'Moyenne',
    size5: 'Grand',
    size6: 'Très grand',
    size7: 'Maximum',
    defaultFont: 'Police par défaut',
    viewSource: 'Voir la source'
  },
  tree: {
    noData: 'Aucun nœud à afficher',
    noResults: 'Aucun nœud trouvé'
  },
  html: {
    index: {
      project: 'PROJET',
      projects: 'Projets',
      bank: 'Banque',
      countries: 'Des pays',
      freesearch: 'recherche libre',
      search: 'Chercher',
      projectLc: 'Projet',
      more: 'Voir plus',
      multiaecDesc: `Le projet MULTI AEC est un projet promu par le cluster AEC, qui vise à renforcer les activités de coopération et de partenariat dans le secteur de l'architecture, de l'ingénierie et de la construction, sur les marchés financiers multilatéraux.`,
      multiaec: 'GESTION MULTILATÉRALE INTÉGRÉE',
      multiaecMarket: 'Marché multilatéral',
      multiaecMarketDesc: `Les institutions financières multilatérales sont des institutions financières internationales (IFI) qui promeuvent le développement économique et social dans les pays en développement, dans le but de réduire les niveaux de pauvreté dans les pays d'opération.`,
      news: 'Actualités',
      newsDesc: 'Voir ici des informations et des nouvelles sur les activités les plus récentes des banques multilatérales qui font partie de ce projet',
      tutoriais: 'Tutoriels',
      tutoriaisDesc: 'Vous trouverez ici des informations sur les webinaires, les vidéos promotionnelles, les rapports annuels et les documents stratégiques de la Banque, etc…',
      presentation: 'PRÉSENTATION',
      partner: {
        name: 'Partenaire local',
        description: 'Enregistrez votre entreprise en tant que partenaire local des entreprises associées de la plate-forme technologique portugaise de construction',
        register: `S'inscrire`
      },
      associate: {
        name: 'Associé',
        description: 'Devenez membre de la Plateforme Technologique Portugaise de la Construction (PTPC) et découvrez tous les avantages'
      },
      passwordRecover: 'Récupération de mot de passe'
    },
    sideMenu: {
      associates: 'Associés',
      projects: 'Projets',
      project: 'Projet',
      multiAEC: 'Marché multilatéral',
      news: 'Nouvelles',
      tutoriais: 'Tutoriels'
    },
    associates: {
      title: 'ASSOCIÉS',
      bigCompanies: 'Grandes entreprises',
      sctn: 'Entités SCTN',
      associations: 'Associations',
      public: 'Entités administration publique',
      pme: 'PME'
    },
    projects: {
      reference: 'Référence',
      data: 'Date',
      sector: 'Secteur',
      country: 'Pays',
      bank: 'Banque'
    },
    project: {
      title: 'PROJET',
      p1: `Le Projet MULTI AEC est un projet promu par le Pôle AEC, qui vise à renforcer les activités de coopération et de partenariat dans le secteur de l'Architecture, de l'Ingénierie et de la Construction, sur les marchés Financiers Multilatéraux, dans une approche de quatre de ces marchés :`,
      p2: `Promouvoir l'innovation et la compétitivité internationale, ainsi que la promotion internationale du secteur de la construction, contribuer à tirer parti de la présence de la communauté des affaires sur les marchés étrangers, en favorisant les géographies stratégiques dans lesquelles l'efficacité, l'innovation et le savoir-faire du secteur AEC sont reconnus.`,
      p3: 'Le projet MULTI AEC est mis en œuvre au niveau de cinq objectifs opérationnels, à savoir :',
      obj1: 'Création du Réseau Opérationnel de Mobilisation des Institutions Multilatérales;',
      obj2: 'Effectuer des visites de travail dans les institutions multilatérales;',
      obj3: `Élaboration d'un plan d'internationalisation;`,
      obj4: `Renforcement des capacités stratégiques, préparation des appels d'offres et démonstration;`,
      obj5: 'Promotion collective de la filière AEC.'
    },
    multiaec: {
      title: 'MARCHÉ MULTILATÉRAL',
      p1: "Les institutions financières multilatérales sont des institutions financières internationales (IFI) qui promeuvent le développement économique et social dans les pays en développement, dans le but de réduire les niveaux de pauvreté dans les pays d'opération. Ces Organismes Financiers, dont les Etats sont actionnaires, gèrent une offre globale qui dépasse 100 milliards de dollars/an en prêts, dons, garanties et prises de participation dans les secteurs public et privé des pays en développement. En plus de la participation portugaise au système des Nations Unies, le Portugal est actionnaire de neuf importantes IFI:",
      p2: `Le marché financier multilatéral représente un énorme potentiel en matière d'opportunités d'affaires, d'investissement et de partenariats internationaux pour les entreprises qui ont l'intention d'internationaliser leurs opérations dans les pays en développement, générant des opportunités d'exportation, soit par l'approvisionnement créé par les projets financés, soit par le financement d'investissements. projets pour entreprises et investisseurs.`,
      obj1: 'Groupe de la Banque mondiale (Groupe BM);',
      obj2: 'Groupe de la Banque interaméricaine de développement (BID);',
      obj3: 'Banque européenne pour la reconstruction et le développement (BERD);',
      obj4: `Groupe Banque européenne d'investissement (Groupe BEI);`,
      obj5: 'Groupe de la Banque africaine de développement (BAD);',
      obj6: "Banque de développement d'Amérique latine (CAF);",
      obj7: 'Banque asiatique de développement (BAD);',
      obj8: "Banque asiatique d'investissement dans les infrastructures (AIIB);",
      obj9: "Banque de développement du Conseil de l'Europe (CEB)."
    },
    news: {
      title: 'Des nouvelles'
    },
    tutorials: {
      title: 'TUTORIELS',
      studies: 'Études'
    },
    bank: {
      bm: 'World Bank',
      bmInitials: 'WB',
      bid: 'Inter-American Development Bank',
      bidInitials: 'IADB',
      berd: 'European Bank for Reconstruction and Development',
      berdInitials: 'EBRD',
      bei: 'European Investment Bank',
      beiInitials: 'EIB'
    },
    bankBei: {
      p1: "La Banque européenne d'investissement est l'un des plus grands prêteurs multinationaux au monde, c'est le bras prêteur de l'UE. La BEI est active non seulement dans l'Union européenne, mais dans le reste du monde.",
      p2: "La majorité des prêts de la BEI sont alloués à des projets dans les États membres de l'UE (environ 90 % du volume total) qui soutiennent le développement et l'intégration continus de l'Union. Ces prêts sont destinés aux gouvernements et aux entreprises.",
      p3: "Les opérations financières internationales de la BEI dans le monde contribuent à résoudre les déséquilibres et à forger des partenariats de collaboration plus étroits, à favoriser une économie mondiale stable et ouverte et à permettre l'intégration des connaissances et des technologies.",
      p4: "La BEI accorde des prêts à des clients de toutes tailles et sa présence est souvent déterminante pour attirer d'autres investisseurs.",
      p5: 'La BEI stimule et catalyse les capitaux privés par le biais de prises de participation.',
      p6: 'La BEI offre des garanties qui couvrent les risques des grands et petits projets. Il fournit également des portefeuilles de crédit qui rendent les projets plus attrayants pour les autres investisseurs.',
      p7: "La BEI offre de nombreuses opportunités aux fournisseurs, entrepreneurs et consultants du monde entier. La plupart de ces opportunités d'acquisition sont liées à des projets financés par la BERD dans les régions où elle opère. Mais il existe également un nombre limité d'opportunités de contrats impliquant des projets et des départements internes de la BERD."
    },
    bankBerd: {
      p1: "La Banque européenne pour la reconstruction et le développement (BERD) a été créée pour aider à construire une nouvelle ère post-guerre froide en Europe centrale et orientale. Il a joué un rôle historique et acquis une expérience unique dans la promotion du changement dans la région, ayant jusqu'à présent investi près de 150 milliards d'euros dans plus de 6 000 projets.",
      p2: "La BERD offre de nombreuses opportunités aux fournisseurs, entrepreneurs et consultants du monde entier. La plupart de ces opportunités d'acquisition sont liées à des projets financés par la BERD dans les régions où elle opère. Mais il existe également un nombre limité d'opportunités de contrats impliquant des projets et des départements internes de la BERD.",
      p3: "La BERD propose des produits financiers adaptés à chaque client, qu'il s'agisse de pays ou d'entreprises opérant sur les marchés couverts par l'institution. Les clients potentiels doivent démontrer que leur projet ou leur entreprise répond aux exigences minimales pour que la participation de la BERD ait lieu.",
      p4: "Le financement de la BERD pour les projets du secteur privé varie généralement entre 5 et 250 millions d'euros, sous forme de prêts ou d'actions. L'investissement moyen de la BERD est de 25 millions d'euros. Les petits projets peuvent être financés par des intermédiaires financiers ou par le biais de programmes spéciaux pour les petits investissements directs dans les pays les moins avancés.",
      p5: 'Les formes de financement direct dont dispose la BERD sont:',
      obj1: 'Prêts',
      obj2: 'Investissements égaux',
      obj3: 'Des garanties pour favoriser le commerce',
      obj4: "Soutien aux PME, par le biais d'intermédiaires financiers."
    },
    bankBid: {
      p1: "La Banque interaméricaine de développement (BID) a été créée en 1959 et est la principale source de financement du développement de l'Amérique latine et des Caraïbes. Il accorde des prêts, des subventions et une assistance technique aux pays de la région et mène divers types de recherche.",
      p2: "La gouvernance de la BID est exercée par le Conseil des gouverneurs, qui dirige la structure organisationnelle de la Banque. Chaque pays membre nomme un gouverneur dont le pouvoir de vote est proportionnel au capital de la Banque souscrit par son pays. Les gouverneurs sont généralement des ministres des Finances, des présidents de banques centrales. Le Conseil des gouverneurs tient une réunion annuelle en mars ou en avril de chaque année pour examiner les opérations de la Banque et prendre des décisions politiques importantes. Il peut également tenir des réunions extraordinaires sur des questions clés. Ces décisions sont reflétées dans la liste des résolutions adoptées par le Conseil des gouverneurs. Les gouverneurs de la BID sont chargés de superviser les activités et l'administration de la Banque, bien qu'en pratique, ils délèguent bon nombre de ces responsabilités au Conseil d'administration de la Banque.",
      p3: "La Banque interaméricaine de développement (BID) propose actuellement trois catégories de prêts en fonction de l'objectif de développement, des conditions d'éligibilité et de décaissement des prêts, ainsi que des critères pour déterminer le montant des prêts et les conditions financières. Chaque catégorie de prêt comprend différents types d'instruments et d'approches de prêt.",
      p4: 'CATÉGORIES DE PRÊTS:',
      p5: 'INSTRUMENTS DE GARANTIE POUR LES OPÉRATIONS DE GARANTIE SOUVERAINE',
      p6: "En plus des trois catégories de prêts, la BID peut garantir des prêts consentis par des sources financières privées dans des projets du secteur public. Les garanties visent à améliorer les conditions de financement des projets en Amérique latine et dans les Caraïbes et à favoriser l'investissement dans les pays emprunteurs. Ces garanties sont des garanties partielles de crédit et de risque politique.",
      obj1: "Les prêts d'investissement aux pays membres emprunteurs de la BID financent des biens, des travaux et des services pour promouvoir le développement social et économique. Cette catégorie comprend des instruments spécifiques pour soutenir les pays membres emprunteurs de la BID en cas de catastrophe naturelle.",
      obj2: "Les prêts à l'appui de réformes fournissent aux pays membres emprunteurs de la Banque un financement pour soutenir les réformes politiques et/ou les changements institutionnels dans un secteur ou sous-secteur particulier.",
      obj3: 'Les prêts spéciaux de développement soutiennent les pays emprunteurs pendant une crise macroéconomique et atténuent les effets sur le progrès économique et social des pays.'
    },
    bankBm: {
      p1: 'La Banque mondiale est comme une coopérative, composée de 189 pays membres. Ces pays membres, ou actionnaires, sont représentés par un Conseil des gouverneurs, qui sont principalement responsables de la politique de la Banque mondiale. Généralement, les gouverneurs sont les ministres des finances ou les ministres du développement des pays membres. Ils se réunissent une fois par an lors des Assemblées annuelles des Conseils des gouverneurs du Groupe de la Banque mondiale et du Fonds monétaire international.',
      p2: "La Banque mondiale (BM) est composée de 5 organisations indépendantes qui travaillent ensemble pour les objectifs de l'institution :",
      p3: 'La Banque internationale pour la reconstruction et le développement (BIRD)',
      p4: "L'Association internationale de développement (IDA)",
      p5: 'La Société financière internationale (SFI)',
      p6: "L'Agence multilatérale de garantie des investissements (MIGA)",
      p7: 'Le Centre international pour le règlement des différends relatifs aux investissements (CIRDI)',
      obj1: "La BIRD fournit une assistance financière aux pays disposant de ressources financières moyennes ou faibles, mais qui sont toujours solvables par l'institution.",
      obj2: "L'IDA propose des prêts sans intérêt et encourage les subventions aux pays vermédium.",
      obj3: "L'IFC est une institution axée exclusivement sur le secteur privé. Il aide les pays en développement à atteindre une croissance durable en finançant des investissements et en mobilisant des capitaux sur les marchés financiers et en conseillant les entreprises et les gouvernements.",
      obj4: "La MIGA promeut l'investissement étranger direct dans les pays en développement en fournissant une assurance contre les risques politiques (garanties) aux investisseurs et aux créanciers.",
      obj5: "Le CIRDI est un centre d'arbitrage pour les différends relatifs aux investissements dans les pays où opère la Banque mondiale."
    },
    registed: {
      invite: 'Inviter',
      inviteMessage: 'Venez découvrir la plateforme de collaboration pour la construction'
    },
    login: {
      registerAssociated: 'Nouvel associé PTPC',
      registerPartner: 'Partenaire local',
      recoverPassword: 'Récupérer mot de passe',
      partnerWarning: `
      <p>Cette inscription est destinée aux entreprises qui souhaitent se positionner en tant que partenaires locaux des entreprises de construction portugaises qui se qualifient pour les processus d'approvisionnement des entités suivantes :</p>
       <ul>
       <li>Banque mondiale</li>
       <li>Banque européenne pour la reconstruction et le développement - EBERD</li>
       <li>Banque interaméricaine de développement - IBD</li>
       <li>Banque européenne d'investissement - BEI</li>
       </ul>
       <p>Si vous souhaitez entrer en contact avec des entreprises portugaises pour des contrats dans votre pays d'origine, veuillez laisser vos contacts, données et expérience sur la page suivante.</p>
       <p>Son acceptation sera validée par le cluster portugais de la construction.</p>
       <p>Vous serez ensuite contacté par nos entreprises intéressées.</p>`
    },
    recover: {
      recoverMessage: "Saisissez l'utilisateur pour modifier le mot de passe. Si vous êtes inscrit sur notre plateforme, vous recevrez un e-mail vous permettant de réinitialiser votre mot de passe.",
      changePasswordMessage: 'Entrez le nouveau mot de passe'
    },
    errors: {
      error: 'Erreur',
      warning: 'Warning',
      getProjectTypes: "Impossible d'obtenir les types de projet",
      noUsername: "Saisissez votre nom d'utilisateur",
      noPassword: 'Entrer le mot de passe',
      noName: 'Entrez le nom',
      noEmail: 'Entrer un email valide',
      noCountry: 'Choisissez un pays',
      p040: 'Oops. Rien ici...',
      p404Home: 'Allez commencer',
      invalidCredentials: "les informations d'identification invalides",
      loginError: 'Ne pouvait pas se connecter',
      errorLoadBanks: "Impossible d'obtenir des banques",
      errorLoadNews: "Impossible d'obtenir les nouvelles",
      errorLoadStudies: "Il n'a pas été possible d'obtenir les études",
      errorLoadVideos: "Impossible d'obtenir les vidéos",
      errorLoadCountries: "Impossible d'obtenir les pays",
      errorLoadProjects: "Impossible d'obtenir des projets",
      errorLoadCompanies: "Impossible d'obtenir des entreprises",
      error: 'Impossible de terminer la demande',
      noData: 'Pas de données'
    },
    registerPartner: {
      tabMain: 'Informations générales',
      tabDescription: 'Expérience multi AEC',
      user: 'Utilisateur',
      organization: 'Compagnie',
      username: "Nom d'utilisateur",
      userPassword: 'Mot de passe',
      name: 'Nom',
      contactEmail: 'Email du contact',
      country: 'Pays',
      projectTypes: 'Types de projets',
      logo: 'Logo',
      return: 'Revenir',
      register: "S'inscrire",
      error: 'Impossible de créer un compte',
      success: "Le compte a été créé avec succès. Il sera validé par PTPC et vous serez notifié par email dès qu'il sera actif."
    }
  }
}
