export default {
  isoName: 'pt',
  nativeName: 'Português',
  label: {
    clear: 'Limpar',
    ok: 'OK',
    cancel: 'Cancelar',
    close: 'Fechar',
    set: 'Marcar',
    select: 'Escolher',
    reset: 'Limpar',
    remove: 'Remover',
    update: 'Atualizar',
    create: 'Criar',
    search: 'Procurar',
    filter: 'Filtrar',
    refresh: 'Recarregar'
  },
  date: {
    days: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: true
  },
  table: {
    noData: 'Sem dados disponíveis',
    noResults: 'Não foi encontrado nenhum resultado',
    loading: 'A carregar...',
    selectedRecords: function (rows) {
      return rows > 0 ? rows + ' linha' + (rows === 1 ? ' selecionada' : 's selecionadas') + '.' : 'Nenhuma linha selecionada.'
    },
    recordsPerPage: 'Linhas por página:',
    allRows: 'Todas',
    pagination: function (start, end, total) {
      return start + '-' + end + ' de ' + total
    },
    columns: 'Colunas'
  },
  editor: {
    url: 'URL',
    bold: 'Negrito',
    italic: 'Itálico',
    strikethrough: 'Rasurado',
    underline: 'Sublinhado',
    unorderedList: 'Lista não-ordenada',
    orderedList: 'Lista ordenada',
    subscript: 'Subscrito',
    superscript: 'Sobrescrito',
    hyperlink: 'Hyperlink',
    toggleFullscreen: 'Maximizar',
    quote: 'Citação',
    left: 'Alinhado à esquerda',
    center: 'Alinhado ao centro',
    right: 'Alinhado à direita',
    justify: 'Justificado',
    print: 'Imprimir',
    outdent: 'Diminuir indentação',
    indent: 'Aumentar indentação',
    removeFormat: 'Remover formatação',
    formatting: 'Formatação',
    fontSize: 'Tamanho do tipo de letra',
    align: 'Alinhar',
    hr: 'Inserir linha horizontal',
    undo: 'Desfazer',
    redo: 'Refazer',
    heading1: 'Cabeçalho 1',
    heading2: 'Cabeçalho 2',
    heading3: 'Cabeçalho 3',
    heading4: 'Cabeçalho 4',
    heading5: 'Cabeçalho 5',
    heading6: 'Cabeçalho 6',
    paragraph: 'Parágrafo',
    code: 'Código',
    size1: 'Muito pequeno',
    size2: 'Pequeno',
    size3: 'Normal',
    size4: 'Médio',
    size5: 'Grande',
    size6: 'Enorme',
    size7: 'Máximo',
    defaultFont: 'Tipo de letra padrão',
    viewSource: 'Exibir fonte'
  },
  tree: {
    noNodes: 'Sem nós disponíveis',
    noResults: 'Nenhum resultado encontrado'
  },
  html: {
    index: {
      project: 'PROJETO',
      projects: 'Projetos',
      bank: 'Banco',
      countries: 'Países',
      freesearch: 'Pesquisa livre',
      search: 'Pesquisa',
      projectLc: 'Projeto',
      more: 'Ver mais',
      multiaecDesc: 'O Projeto MULTI AEC é um projeto promovido pelo Cluster AEC, que visa o reforço das atividades de cooperação e parceria no sector da Arquitetura Engenharia e Construção, nos mercados das Multilaterais Financeiras.',
      multiaec: 'GESTÃO INTEGRADA DAS MULTILATERAIS',
      multiaecMarket: 'Mercado das Multilaterais',
      multiaecMarketDesc: 'As Multilaterais Financeiras são Instituições Financeiras Internacionais (IFI), que promovem o desenvolvimento económico e social, em países em desenvolvimento, tendo como objetivo a redução dos níveis de pobreza nos países de operação.',
      news: 'Notícias',
      newsDesc: 'Veja aqui informações e notícias sobre as atividades mais recentes dos bancos multilaterais que fazem parte  deste projeto',
      presentation: 'APRESENTAÇÃO',
      tutoriais: 'Tutoriais',
      tutoriaisDesc: 'Aqui pode encontrar informação sobre Webinars, Videos promocionais, relatórios anuais dos bancos e documentos estratégicos, etc…',
      partner: {
        name: 'Parceiro Local',
        description: 'Registe-se a sua empresa como parceiro local das empresas sócias da Plataforma Tecnológica Portuguesa da Construção',
        register: 'Registar'
      },
      associate: {
        name: 'Associado',
        description: 'Torne-se associado da Plataforma Tecnológica Portuguesa de Construção (PTPC) e conheça todas as vantagens'
      },
      passwordRecover: 'Recuperar password'
    },
    sideMenu: {
      associates: 'Associados',
      projects: 'Projetos',
      project: 'Projeto',
      multiAEC: 'Mercado das Multilaterais',
      news: 'Notícias',
      tutoriais: 'Tutoriais'
    },
    associates: {
      title: 'ASSOCIADOS',
      bigCompanies: 'Grandes empresas',
      sctn: 'Entidades SCTN',
      associations: 'Associações',
      public: 'Entidades administração pública',
      pme: 'PME'
    },
    projects: {
      reference: 'Referência',
      data: 'data',
      sector: 'Setor',
      country: 'País',
      bank: 'Banco'
    },
    project: {
      title: 'PROJETO',
      p1: 'O Projeto MULTI AEC é um projeto promovido pelo Cluster AEC, que visa o reforço das atividades de cooperação e parceria no sector da Arquitetura Engenharia e Construção, nos mercados das Multilaterais Financeiras, numa abordagem a quatro desses mercados:',
      p2: 'Promovendo a inovação e a capacidade competitiva internacional, bem como a promoção internacional do setor da construção, contribuindo para alavancar a presença do tecido empresarial nos mercados externos, privilegiando geografias estratégicas nas quais a eficiência, inovação e know-how do setor AEC sejam reconhecidas.',
      p3: 'O projeto MULTI AEC é concretizado ao nível de cinco objetivo operacionais, a saber:',
      obj1: 'Criação da Rede Operacional de mobilização para as Instituições Multilaterais;',
      obj2: 'Realização de Visitas de Trabalho às Instituições Multilaterais;',
      obj3: 'Desenvolvimento de um Plano de Internacionalização;',
      obj4: 'Capacitação Estratégica, preparação de concursos e demonstração;',
      obj5: 'Promoção Coletiva do setor AEC.'
    },
    multiaec: {
      title: 'MERCADO MULTILATERAIS',
      p1: "As Multilaterais Financeiras são Instituições Financeiras Internacionais (IFI), que promovem o desenvolvimento económico e social, em países em desenvolvimento, tendo como objetivo a redução dos níveis de pobreza nos países de operação. Estas Organizações Financeiras, que tem como os acionistas os estados, movimentam uma oferta à escala global que ultrapassa os 100 mil milhões de dólares/ano em empréstimos, doações, garantias e participações de capital nos sectores público e privado dos países em desenvolvimento. Para além da participação Portuguesa no Sistema das Nações Unidas, Portugal e acionista em nove IFI's de relevo:",
      p2: 'O mercado das multilaterais financeiras representa um enorme potencial no que diz respeito a oportunidades de negócio, investimento e parcerias internacionais para as empresas que pretendem internacionalizar as suas operações nos países em desenvolvimento, gerando oportunidades de exportação, quer por, via do Procurement criado pelos projetos financiados, ou por, financiamento de projetos de investimento para as empresas e investidores.',
      obj1: 'Grupo Banco Mundial (Grupo BM);',
      obj2: 'Grupo Banco Interamericano de Desenvolvimento (BID);',
      obj3: 'Banco Europeu para a Reconstrução e Desenvolvimento (BERD);',
      obj4: 'Grupo Banco Europeu de Investimento (Grupo BEI);',
      obj5: 'Grupo Banco Africano de Desenvolvimento (BAfD);',
      obj6: 'Banco de Desenvolvimento da América Latina (CAF);',
      obj7: 'Banco Asiático de Desenvolvimento (BAsD);',
      obj8: 'Banco Asiático de Investimento em Infraestrutura (BAII);',
      obj9: 'Banco de Desenvolvimento do Conselho da Europa (CEB).'
    },
    news: {
      title: 'Notícias'
    },
    tutorials: {
      title: 'TUTORIAIS',
      studies: 'Estudos'
    },
    bank: {
      bm: 'Banco Mundial',
      bmInitials: 'BM',
      bid: 'Banco Interamericano de Desenvolvimento',
      bidInitials: 'BID',
      berd: 'Banco Europeu para a Reconstrução e Desenvolvimento',
      berdInitials: 'BERD',
      bei: 'Banco Europeu de Investimento',
      beiInitials: 'BEI'
    },
    bankBei: {
      p1: 'O Banco Europeu de Investimento é um dos maiores credores multinacionais do mundo, é o braço de empréstimos da UE. O BEI atua não só na União Europeia como no resto do mundo.',
      p2: 'A maioria dos empréstimos do BEI é atribuída a projetos nos Estados-Membros da UE (cerca de 90% do volume total) que apoiam o desenvolvimento e a integração contínuos da União. Estes empréstimos são dirigidos a governos e ás empresas.',
      p3: 'As operações financeiras internacionais do BEI em todo o mundo ajudam a resolver os desequilíbrios e a estabelecer parcerias de colaboração mais estreitas, estimulam a economia mundial estável e aberta e permitem a integração de conhecimentos e tecnologias.',
      p4: 'O BEI fornece empréstimos a clientes de todos os tamanhos, sendo a sua presença muitas vezes fundamental para atrair outros investidores.',
      p5: 'O BEI estimula e catalisa capital privado através do investimento em equity.',
      p6: 'O BEI fornece garantias que cobrem os riscos de grandes e pequenos projetos. Também disponibiliza carteiras de crédito que tornam os projetos mais atrativos para outros investidores.',
      p7: 'O BEI oferece muitas oportunidades para fornecedores, empreiteiros e consultores em todo o mundo. A maioria dessas oportunidades de aquisição está relacionada a projetos financiados pelo BERD nas regiões onde atua. Mas há também um número limitado de oportunidades de contratos envolvendo projetos e departamentos internos do BERD.'
    },
    bankBerd: {
      p1: 'O Banco Europeu de Reconstrução e Desenvolvimento (BERD) foi criado para ajudar a construir uma nova era pós-Guerra Fria na Europa Central e Oriental. Desempenhou um papel histórico e ganhou experiência única na promoção de mudanças na região, tendo até ao momento investindo quase € 150 biliões em mais de 6.000 projetos.',
      p2: 'O BERD oferece muitas oportunidades para fornecedores, empreiteiros e consultores em todo o mundo. A maioria dessas oportunidades de aquisição está relacionada a projetos financiados pelo BERD nas regiões onde atua. Mas há também um número limitado de oportunidades de contratos envolvendo projetos e departamentos internos do BERD.',
      p3: 'O BERD oferece produtos financeiros adaptados a cada cliente, sejam eles Países ou empresas que atuem nos mercados cobertos pela instituição. Os potenciais clientes devem demonstrar que seu projeto ou negócio cumpre os requisitos mínimos para que o envolvimento do BERD se efetue.',
      p4: 'O financiamento do BERD para projetos do setor privado geralmente varia de € 5 milhões a € 250 milhões, na forma de empréstimos ou ações. O investimento médio do BERD é de € 25 milhões. Projetos menores podem ser financiados por intermediários financeiros ou por meio de programas especiais para investimentos diretos menores nos países menos avançados.',
      p5: 'As formas de financiamento direto que o BERD dispõe são:',
      obj1: 'Empréstimos',
      obj2: 'Investimentos igualitários',
      obj3: 'Garantias para promover o comércio',
      obj4: 'Apoio a PMEs, através de assistência de intermediários financeiros.'
    },
    bankBid: {
      p1: 'O Banco Interamericano de Desenvolvimento (BID) foi constituído em 1959, é a principal fonte de financiamento para o desenvolvimento da América Latina e do Caribe. Fornece empréstimos, doações e assistência técnica aos países da região e conduz diversas tipologias de pesquisas.',
      p2: 'A governança do BID é exercida pela Assembleia de Governadores, que encabeça a estrutura organizacional do Banco. Cada país membro nomeia um Governador, cujo poder de voto é proporcional ao capital do Banco subscrito pelo seu país. Os governadores são geralmente ministros das finanças, presidentes de bancos centrais. A Assembleia de Governadores realiza uma reunião anual em março ou abril de cada ano para rever as operações do Banco e tomar decisões políticas importantes. Também pode realizar reuniões extraordinárias sobre questões-chave. Estas decisões estão refletidas na lista de resoluções aprovadas na Assembleia de Governadores Os Governadores do BID são os responsáveis por supervisionar as atividades e a administração do Banco, embora, na prática, deleguem muitas dessas responsabilidades na Direção Executiva do Banco.',
      p3: 'O Banco Interamericano de Desenvolvimento (BID) tem atualmente três categorias de empréstimos com base na finalidade de desenvolvimento, elegibilidade e requisitos de desembolso do empréstimo, bem como nos critérios para determinar o tamanho dos montantes do empréstimo e os termos financeiros. Cada categoria de empréstimo inclui diferentes tipos de instrumentos e abordagens de empréstimo.',
      p4: 'CATEGORIAS DE EMPRÉSTIMO:',
      p5: 'INSTRUMENTOS DE GARANTIAS PARA OPERAÇÕES COM GARANTIA SOBERANA',
      p6: 'Além das três categorias de empréstimos, o BID pode garantir empréstimos feitos por fontes financeiras privadas em projetos do setor público. As garantias visam melhorar as condições de financiamento de projetos na América Latina e no Caribe e ajudam a promover o investimento nos países mutuários. Estas garantias são ao crédito de forma parcial e garantia de risco político.',
      obj1: 'Os empréstimos para investimentos aos países membros mutuários do BID financiam bens, obras e serviços para promover o desenvolvimento social e económico. Esta categoria inclui instrumentos específicos para apoiar os países membros mutuários do BID em caso de desastre natural.',
      obj2: 'Os empréstimos baseados em políticas fornecem aos países membros mutuários do Banco financiamento para apoiar reformas de políticas e/ou mudanças institucionais num determinado setor ou subsetor.',
      obj3: 'Os empréstimos especiais para o desenvolvimento apoiam os países mutuários durante uma crise macroeconómica e atenuam os efeitos sobre o progresso económico e social dos países.'
    },
    bankBm: {
      p1: 'O Banco Mundial é como uma cooperativa, composta por 189 países membros. Esses países membros, ou acionistas, são representados por uma Assembleia de Governadores , que são os principais responsáveis pelas políticas do Banco Mundial. Geralmente, os governadores são ministros das finanças ou ministros do desenvolvimento dos países membros. Reúnem-se uma vez por ano nas Reuniões Anuais dos Conselhos de Governadores do Grupo Banco Mundial e do Fundo Monetário Internacional.',
      p2: 'O Banco Mundial (BM) é constituído por 5 organizações independentes, mas que trabalham em conjunto para os objetivos da instituição:',
      p3: 'The International Bank for Reconstruction and Development (IBRD)',
      p4: 'The International Development Association (IDA)',
      p5: 'The International Finance Corporation (IFC)',
      p6: 'The Multilateral Investment Guarantee Agency (MIGA)',
      p7: 'The International center for Settlement of Investment Disputes (ICSID)',
      obj1: 'O IBRD presta auxilio financeiro a países com médios ou fracos recursos financeiros, mas que ainda assim sejam dignos de crédito pela instituição.',
      obj2: 'A IDA oferece empréstimos sem juros e promove doações a países muito pobres.',
      obj3: 'A IFC é uma instituição focada exclusivamente nos sectores privados. Ajuda países em desenvolvimento a alcançar um crescimento sustentável, financiando investimentos e mobilizando capital nos mercados financeiros e prestando consultoria a empresas e Governos.',
      obj4: 'A MIGA promove o investimento estrangeiro direto nos países em desenvolvimento, fornecendo seguros contra riscos políticos (Garantias) a investidores e credores.',
      obj5: 'O ICSID é um centro de Arbitragem para disputas de investimentos nos países de atuação do Banco Mundial.'
    },
    registed: {
      invite: 'Convidar',
      inviteMessage: 'Venha conhecer a plataforma de colaboração para construção'
    },
    login: {
      registerAssociated: 'Novo Associado PTPC',
      registerPartner: 'Parceiro local',
      recoverPassword: 'Recuperar senha',
      associateWarning: `<p>Este registo destina-se exclusivamente a empresas portuguesas cujo ramo de atividade seja a Arquitetura, Engenharia, Construção, e que se pretendam candidatar a associado do cluster AEC/PTPC.  Para tal deverão ter interesse em participar na rede operacional das multilaterais financeiras, que permitirá receber informação atualizada, se qualificarem para consórcios e parcerias nacionais tendo em vista os concursos internacionais a decorrer junto das seguintes entidades:</p>
      <ul>
      <li>Banco Mundial - BM</li>
      <li>Banco europeu de reconstrução e desenvolvimento - BERD</li>
      <li>Banco Interamericano para o desenvolvimento - BID</li>
      <li>Banco europeu de investimento - BEI</li>
      </ul>
      <p>A sua aceitação como novo associado fica sujeito a prévia validação da AEC/PTPC</p>`,
      partnerWarning: `<p>Este registo destina-se a empresas que pretendam posicionar-se como parceiros locais de empresas de construção portuguesas que se qualifiquem para processos de contratação das seguintes entidades:</p>
      <ul>
      <li>Banco Mundial</li>
      <li>Banco Europeu de Reconstrução e Desenvolvimento - EBERD</li>
      <li>Banco Interamericano de Desenvolvimento - BID</li>
      <li>Banco Europeu de Investimento - BEI</li>
      </ul>
      <p>Se pretende estabelecer contacto com empresas portuguesas para contratos no seu país de origem, por favor deixe os seus contactos, dados e experiência na página seguinte.</p>
      <p>A sua aceitação será validada pelo Cluster da Construção Portuguesa.</p>
      <p>Será então contatado pelos associados PTPC interessados.</p>`
    },
    recover: {
      recoverMessage: 'Indique o utilizador para alterar a palavra-passe. Caso o utilizador esteja registado na nossa plataforma, irá receber um email onde poderá redefinir a palavra-passe.',
      changePasswordMessage: 'Indique a nova palavra-passe'
    },
    errors: {
      error: 'Erro',
      warning: 'Aviso',
      getProjectTypes: 'Não foi possível obter os tipos de projeto',
      noUsername: 'Insira o utilizador',
      noPassword: 'Insira a password',
      noName: 'Insira o nome',
      noEmail: 'Insira um email válido',
      noCountry: 'Escolha um país',
      p404: 'Ops. Nada aqui...',
      p404Home: 'Ir página inicial',
      invalidCredentials: 'Credenciais inválidas',
      loginError: 'Não foi possível efetuar o login',
      errorLoadBanks: 'Não foi possível obter os bancos',
      errorLoadNews: 'Não foi possível obter as notícias',
      errorLoadStudies: 'Não foi possível obter os estudos',
      errorLoadVideos: 'Não foi possível obter os vídeos',
      errorLoadCountries: 'Não foi possível obter os países',
      errorLoadProjects: 'Não foi possível obter os projetos',
      errorLoadCompanies: 'Não foi possível obter as empresas',
      error: 'Não foi possível concluir o pedido',
      noData: 'Sem dados'
    },
    registerPartner: {
      tabMain: 'Informação geral',
      tabDescription: 'Experiência Multi AEC',
      user: 'Utilizador',
      organization: 'Empresa',
      username: 'Utilizador',
      userPassword: 'Password',
      name: 'Nome',
      contactEmail: 'Email contato',
      country: 'País',
      projectTypes: 'Tipos de projetos',
      logo: 'Logotipo',
      return: 'Voltar',
      register: 'Registar',
      error: 'Não foi possível criar a conta',
      success: 'A conta foi criada com sucesso. Vai ser validada pela PTPC e será notificado por email assim que estiver ativo.'
    }
  }
}
