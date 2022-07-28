export default {
  isoName: 'en-US',
  nativeName: 'English (US)',
  label: {
    clear: 'Clear',
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    set: 'Set',
    select: 'Select',
    reset: 'Reset',
    remove: 'Remove',
    update: 'Update',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    refresh: 'Refresh'
  },
  date: {
    days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    months:
      'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_'
      ),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: false,
    pluralDay: 'days'
  },
  table: {
    noData: 'No data available',
    noResults: 'No matching records found',
    loading: 'Loading...',
    selectedRecords: (rows) =>
      rows === 1
        ? '1 record selected.'
        : (rows === 0 ? 'No' : rows) + ' records selected.',
    recordsPerPage: 'Records per page:',
    allRows: 'All',
    pagination: (start, end, total) => start + '-' + end + ' of ' + total,
    columns: 'Columns'
  },
  editor: {
    url: 'URL',
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    underline: 'Underline',
    unorderedList: 'Unordered List',
    orderedList: 'Ordered List',
    subscript: 'Subscript',
    superscript: 'Superscript',
    hyperlink: 'Hyperlink',
    toggleFullscreen: 'Toggle Fullscreen',
    quote: 'Quote',
    left: 'Left align',
    center: 'Center align',
    right: 'Right align',
    justify: 'Justify align',
    print: 'Print',
    outdent: 'Decrease indentation',
    indent: 'Increase indentation',
    removeFormat: 'Remove formatting',
    formatting: 'Formatting',
    fontSize: 'Font Size',
    align: 'Align',
    hr: 'Insert Horizontal Rule',
    undo: 'Undo',
    redo: 'Redo',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    heading4: 'Heading 4',
    heading5: 'Heading 5',
    heading6: 'Heading 6',
    paragraph: 'Paragraph',
    code: 'Code',
    size1: 'Very small',
    size2: 'A bit small',
    size3: 'Normal',
    size4: 'Medium-large',
    size5: 'Big',
    size6: 'Very big',
    size7: 'Maximum',
    defaultFont: 'Default Font',
    viewSource: 'View Source'
  },
  tree: {
    noNodes: 'No nodes available',
    noResults: 'No matching nodes found'
  },
  html: {
    index: {
      project: 'PROJECT',
      projects: 'Projects',
      bank: 'Bank',
      countries: 'Countries',
      freesearch: 'Free search',
      search: 'Search',
      projectLc: 'Project',
      more: 'View more',
      multiaecDesc:
        'The MULTI AEC Project is a project promoted by the AEC Cluster, which aims to strengthen cooperation and partnership activities in the Architecture, Engineering and Construction sector, in the Financial Multilateral markets.',
      multiaec: 'INTEGRATED MULTILATERAL MANAGEMENT',
      multiaecMarket: 'Multilateral Market',
      multiaecMarketDesc:
        'Financial Multilaterals are International Financial Institutions (IFIs), which promote economic and social development in developing countries, with the objective of reducing poverty levels in the countries of operation.',
      news: 'News',
      newsDesc:
        'See here information and news about the most recent activities of the multilateral banks that are part of this project',
      tutoriais: 'Tutorials',
      tutoriaisDesc:
        'Here you can find information about Webinars, Promotional Videos, Bank Annual Reports and Strategic Documents, etc…',
      presentation: 'PRESENTATION',
      partner: {
        name: 'Local Partner',
        description:
          'Register your company as a local partner of the associate companies of the Portuguese Construction Technological Platform',
        register: 'Register'
      },
      associate: {
        name: 'Associate',
        description:
          'Become a member of the Portuguese Construction Technological Platform (PTPC) and discover all the advantages'
      },
      passwordRecover: 'Password recovery'
    },
    associates: {
      title: 'ASSOCIATES',
      bigCompanies: 'Big companies',
      sctn: 'SCTN Entities',
      associations: 'Associações',
      public: 'Entities public administration',
      pme: 'PME'
    },
    projects: {
      reference: 'Reference',
      data: 'Date',
      sector: 'Sector',
      country: 'Country',
      bank: 'Bank'
    },
    project: {
      title: 'PROJECT',
      p1: 'The MULTI AEC Project is a project promoted by the AEC Cluster, which aims to strengthen cooperation and partnership activities in the Architecture, Engineering and Construction sector, in the Multilateral Financial markets, in an approach to four of these markets:',
      p2: 'Promoting innovation and international competitiveness, as well as the international promotion of the construction sector, helping to leverage the presence of the business community in foreign markets, favoring strategic geographies in which the efficiency, innovation and know-how of the AEC sector are recognized.',
      p3: 'The MULTI AEC project is implemented at the level of five operational objectives, namely:',
      obj1: 'Creation of the Operational Mobilization Network for Multilateral Institutions;',
      obj2: 'Conducting Working Visits to Multilateral Institutions;',
      obj3: 'Development of an Internationalization Plan;',
      obj4: 'Strategic Capacity Building, tender preparation and demonstration;',
      obj5: 'Promoção Coletiva do setor AEC.'
    },
    multiaec: {
      title: 'MULTILATERAL MARKET',
      p1: "Financial Multilaterals are International Financial Institutions (IFIs), which promote economic and social development in developing countries, with the objective of reducing poverty levels in the countries of operation. These Financial Organizations, whose shareholders are the states, manage a global offer that exceeds 100 billion dollars/year in loans, donations, guarantees and equity participation in the public and private sectors of developing countries. In addition to the Portuguese participation in the United Nations System, Portugal is a shareholder in nine important IFI's:",
      p2: 'The financial multilateral market represents an enormous potential with regard to business opportunities, investment and international partnerships for companies that intend to internationalize their operations in developing countries, generating export opportunities, either through the Procurement created by the projects financed, or by, financing of investment projects for companies and investors.',
      obj1: 'World Bank Group (WB Group);',
      obj2: 'Inter-American Development Bank (IDB) Group;',
      obj3: 'European Bank for Reconstruction and Development (EBRD);',
      obj4: 'European Investment Bank Group (EIB Group);',
      obj5: 'African Development Bank (AfDB) Group;',
      obj6: 'Development Bank of Latin America (CAF);',
      obj7: 'Asian Development Bank (ADB);',
      obj8: 'Asian Infrastructure Investment Bank (AIIB);',
      obj9: 'Council of Europe Development Bank (CEB).'
    },
    news: {
      title: 'News'
    },
    tutorials: {
      title: 'TUTORIALS',
      studies: 'Studies'
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
      p1: 'The European Investment Bank is one of the largest multinational lenders in the world, it is the lending arm of the EU. The EIB is active not only in the European Union but in the rest of the world.',
      p2: "The majority of EIB loans are allocated to projects in EU Member States (about 90% of the total volume) that support the Union's continued development and integration. These loans are aimed at governments and companies.",
      p3: "The EIB's international financial operations around the world help to resolve imbalances and forge closer collaborative partnerships, foster a stable and open world economy and enable the integration of knowledge and technologies.",
      p4: 'The EIB provides loans to clients of all sizes, and its presence is often instrumental in attracting other investors.',
      p5: 'The EIB stimulates and catalyzes private capital through equity investment.',
      p6: 'The EIB provides guarantees that cover the risks of large and small projects. It also provides credit portfolios that make projects more attractive to other investors.',
      p7: 'The EIB offers many opportunities for suppliers, contractors and consultants around the world. Most of these acquisition opportunities are related to EBRD-financed projects in the regions where it operates. But there are also a limited number of contract opportunities involving internal EBRD projects and departments.'
    },
    bankBerd: {
      p1: 'The European Bank for Reconstruction and Development (EBRD) was created to help build a new post-Cold War era in Central and Eastern Europe. He played a historic role and gained unique experience in promoting change in the region, having so far invested almost €150 billion in more than 6,000 projects.',
      p2: 'EBRD offers many opportunities for suppliers, contractors and consultants around the world. Most of these acquisition opportunities are related to EBRD-financed projects in the regions where it operates. But there are also a limited number of contract opportunities involving internal EBRD projects and departments.',
      p3: 'EBRD offers financial products adapted to each client, whether they are countries or companies that operate in the markets covered by the institution. Potential clients must demonstrate that their project or business meets the minimum requirements for EBRD involvement to take place.',
      p4: "EBRD funding for private sector projects typically ranges from €5 million to €250 million, in the form of loans or shares. The EBRD's average investment is €25 million. Smaller projects can be financed through financial intermediaries or through special programs for smaller direct investments in least developed countries.",
      p5: 'The forms of direct financing available to the EBRD are:',
      obj1: 'Loans',
      obj2: 'Equal investments',
      obj3: 'Guarantees to promote trade',
      obj4: 'Support to SMEs, through the assistance of financial intermediaries.'
    },
    bankBid: {
      p1: 'The Inter-American Development Bank (IDB) was established in 1959 and is the main source of financing for the development of Latin America and the Caribbean. It provides loans, grants and technical assistance to countries in the region and conducts various types of research.',
      p2: "The IDB's governance is exercised by the Board of Governors, which heads the Bank's organizational structure. Each member country appoints a Governor, whose voting power is proportional to the Bank's capital subscribed by his country. Governors are usually finance ministers, central bank presidents. The Board of Governors holds an annual meeting in March or April each year to review the Bank's operations and make important policy decisions. It can also hold extraordinary meetings on key issues. These decisions are reflected in the list of resolutions passed by the Board of Governors. The Governors of the IDB are responsible for overseeing the Bank's activities and administration, although in practice they delegate many of these responsibilities to the Bank's Executive Board.",
      p3: 'The Inter-American Development Bank (IDB) currently has three categories of loans based on development purpose, eligibility and loan disbursement requirements, as well as criteria for determining the size of loan amounts and financial terms. Each loan category includes different types of loan instruments and approaches.',
      p4: 'LOAN CATEGORIES:',
      p5: 'GUARANTEE INSTRUMENTS FOR SOVEREIGN GUARANTEE OPERATIONS',
      p6: 'In addition to the three categories of loans, the IDB can guarantee loans made by private financial sources in public sector projects. The guarantees aim to improve the financing conditions for projects in Latin America and the Caribbean and help to promote investment in borrowing countries. These guarantees are partial credit and political risk guarantee.',
      obj1: 'Investment loans to borrowing member countries of the IDB finance goods, works and services to promote social and economic development. This category includes specific instruments to support IDB borrowing member countries in the event of a natural disaster.',
      obj2: 'Policy-based lending provides Bank borrowing member countries with financing to support policy reforms and/or institutional changes in a particular sector or subsector.',
      obj3: "Special development loans support borrowing countries during a macroeconomic crisis and mitigate the effects on countries' economic and social progress."
    },
    bankBm: {
      p1: 'The World Bank is like a cooperative, made up of 189 member countries. These member countries, or shareholders, are represented by a Board of Governors, who are primarily responsible for World Bank policy. Generally, governors are finance ministers or development ministers of member countries. They meet once a year at the Annual Meetings of the Boards of Governors of the World Bank Group and the International Monetary Fund.',
      p2: "The World Bank (WB) is made up of 5 independent organizations that work together for the institution's objectives:",
      p3: 'The International Bank for Reconstruction and Development (IBRD)',
      p4: 'The International Development Association (IDA)',
      p5: 'The International Finance Corporation (IFC)',
      p6: 'The Multilateral Investment Guarantee Agency (MIGA)',
      p7: 'The International Center for Settlement of Investment Disputes (ICSID)',
      obj1: 'The IBRD provides financial assistance to countries with medium or weak financial resources, but which are still credit worthy by the institution.',
      obj2: 'IDA offers interest-free loans and promotes grants to very poor countries.',
      obj3: 'IFC is an institution focused exclusively on the private sectors. It helps developing countries achieve sustainable growth by financing investments and mobilizing capital in financial markets and advising companies and governments.',
      obj4: 'MIGA promotes foreign direct investment in developing countries by providing political risk insurance (Guarantees) to investors and creditors.',
      obj5: 'ICSID is an arbitration center for investment disputes in the countries where the World Bank operates.'
    },
    registed: {
      invite: 'Invite',
      inviteMessage:
        'Come and discover the collaboration platform for construction'
    },
    login: {
      registerAssociated: 'Register Associate',
      registerPartner: 'Register Partner',
      recoverPassword: 'Recover Password'
    },
    errors: {
      getProjectTypes: 'Unable to get project types',
      noUsername: 'Enter username',
      noPassword: 'Enter the password',
      noName: 'Enter the name',
      noEmail: 'Enter a valid email',
      noCountry: 'Choose a country',
      p040: 'Oops. Nothing here...',
      p404Home: 'Go Home',
      invalidCredentials: 'Invalid credentials',
      loginError: 'Could not login',
      errorLoadBanks: 'Could not get banks',
      errorLoadNews: 'Unable to get the news',
      errorLoadStudies: 'It was not possible to obtain the studies',
      errorLoadVideos: 'Could not get the videos',
      errorLoadCountries: 'Could not get countries',
      errorLoadProjects: 'Unable to get projects',
      errorLoadCompanies: 'Unable to get companies',
      noData: 'No data'
    },
    registerPartner: {
      tabMain: 'General information',
      tabDescription: 'Multi AEC experience',
      user: 'User',
      organization: 'Company',
      username: 'Username',
      userPassword: 'Password',
      name: 'Name',
      contactEmail: 'Contact e-mail',
      country: 'Country',
      projectTypes: 'Types of projects',
      logo: 'Logo',
      return: 'Return',
      register: 'Register',
      error: 'Unable to create account',
      success:
        'The account was created successfully. It will be validated by PTPC and you will be notified by email once it is active.'
    }
  }
}
