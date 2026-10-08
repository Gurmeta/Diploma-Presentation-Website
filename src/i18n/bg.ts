/** Bulgarian copy. `en.ts` must match this shape exactly. */
export const bg = {
  meta: {
    title: 'Дипломна защита • Azure и IaC',
    description:
      'Интерактивна презентация за защита на дипломна работа: автоматизирано създаване на уебсайт чрез Microsoft Azure и Infrastructure as Code (Terraform).',
  },

  ui: {
    footer: 'Дипломна защита ВУТП • Георги Стефанов (№170297)',
    universityShort: 'ВУТП',
    universityName: 'Висше училище по телекомуникации и пощи',
    logoAlt: '145 години ВУТП',
    languageLabel: 'Език',
    themeToDark: 'Включи тъмна тема',
    themeToLight: 'Включи светла тема',
    skipToContent: 'Към съдържанието',
    locale: 'bg-BG',
    prev: 'Назад',
    next: 'Напред',
    menuOpen: 'Отвори списъка със слайдове',
    menuClose: 'Затвори списъка',
    slidesNav: 'Слайдове',
    fullscreen: 'Цял екран',
    exitFullscreen: 'Изход от цял екран',
    progress: 'Напредък на презентацията',
    keysHint: '← → за навигация • F за цял екран',
    slideAria: (n: number, total: number, title: string) => `Слайд ${n} от ${total}: ${title}`,
    counter: (n: number, total: number) => `${n} от ${total}`,
  },

  slides: [
    { title: 'Титулна страница', description: 'Заглавие, автор и академична принадлежност' },
    { title: 'Цел', description: 'Основна цел и подцели на проектираното решение' },
    { title: 'Задачи', description: 'Шест конкретни технически задачи за изпълнение' },
    { title: 'Личен принос', description: 'Справяне със системни Azure ограничения и отстраняване на грешки' },
    { title: 'Демонстрация', description: 'Интерактивна IaC симулация с CLI терминал' },
    { title: 'Заключение', description: 'Равносметка и ползи от Infrastructure as Code' },
    { title: 'Благодарност', description: 'Благодарност за вниманието и въпроси' },
    { title: 'Допълнителни данни', description: 'Интерактивни финансови и латентни сравнения' },
  ],

  people: {
    studentLabel: 'Дипломант',
    studentName: 'Георги Стефанов',
    program: 'Специалност: Компютърни технологии (КТ)',
    facultyNo: 'Факултетен № 170297',
    supervisorLabel: 'Научен ръководител',
    supervisorName: 'доц. д-р инж. Павлинка Радойска',
    committeeLabel: 'Държавна изпитна комисия',
    department: 'Катедра „Информационни технологии“',
    place: 'София, България • 2026 г.',
    shortDepartment: 'Информационни технологии',
  },

  title: {
    kicker: 'Дипломна работа • Защита 2026',
    heading: 'Автоматизирано създаване на уебсайт чрез Azure и практиката IaC',
    subtitle:
      'Интеграция на HashiCorp Terraform за изграждане на устойчива, идемпотентна и сигурна облачна инфраструктура върху Microsoft Azure',
    planCaption: 'Какво изгражда Terraform',
    planCreate: 'за създаване',
    planCreated: 'създаден',
    planReplay: 'Покажи отново',
    stack: 'Технологии',
  },

  goal: {
    heading: 'Основна цел на разработката',
    subtitle: 'Устойчиво пренасяне на IaC концепции в Azure',
    quote: [
      { text: 'Да се проектира, внедри и критично анализира реално работещо решение за автоматизирано създаване, оптимизиране и конфигуриране на уебсайт в ', strong: false },
      { text: 'Microsoft Azure', strong: true },
      { text: ', изцяло подчинено на практиката ', strong: false },
      { text: 'Infrastructure as Code (IaC)', strong: true },
      { text: ' чрез ', strong: false },
      { text: 'HashiCorp Terraform', strong: true },
      { text: '.', strong: false },
    ],
    subgoals: [
      {
        title: 'Академично позоваване',
        text: 'Овладяване и прилагане на принципите за декларативно проектиране според концепциите на Kief Morris и Yevgeniy Brikman.',
      },
      {
        title: 'Инженерна реализация',
        text: 'Пълен цикъл на провизиране в реалната облачна конзола на Azure – от мрежата до уеб сървъра, без ръчна намеса.',
      },
      {
        title: 'Преодоляване на лимити',
        text: 'Справяне със системните ограничения, квоти и мрежови контроли на Azure subscriptions в реално време.',
      },
      {
        title: 'Икономически оптимум',
        text: 'Изследване и поддържане на минимални разходи по поддръжка спрямо капацитета на ресурсите.',
      },
    ],
  },

  tasks: {
    heading: 'Поставени задачи',
    subtitle: 'Пътят на техническото изпълнение и изследване',
    items: [
      { title: 'Теоретичен и сравнителен анализ', text: 'Анализ на теоретичните основи на IaC и сравнение на водещи инструменти (Terraform, Ansible, CloudFormation).' },
      { title: 'Избор на технологичен стек', text: 'Обосновка на избора на облачен доставчик (Azure), ОС (Ubuntu 22.04 LTS), размер на VM (Standard_D2s_v3) и уеб сървър (Nginx).' },
      { title: 'Проектиране на архитектура', text: 'Адресно пространство на виртуалната мрежа, сегментация по подмрежи и NSG правила за сигурност.' },
      { title: 'Terraform имплементация', text: 'Terraform конфигурация за автоматизирано провизиране на ресурсите и разгръщане чрез remote-exec скриптове.' },
      { title: 'Технически предизвикателства', text: 'Документиране и преодоляване на Azure Policy ограничения, липсващи SKU размери и лимити за Public IP.' },
      { title: 'Оценка и индустриални практики', text: 'Функционална и ценова оценка на решението (~21.10 €/мес.) и сравнение между учебния проект и корпоративните стандарти.' },
    ],
  },

  contribution: {
    heading: 'Личен принос и съавторство',
    subtitle: 'Справяне със системни Azure ограничения и отстраняване на грешки',
    intro:
      'В хода на разгръщането дипломният проект се сблъска с реални ограничения на безплатния субсидиран абонамент в Azure. Всяко от тях беше преодоляно с коригиращи практики в IaC.',
    errorLabel: 'Грешка',
    causeLabel: 'Причина',
    fixLabel: 'Решение',
    items: [
      {
        area: 'Правила',
        title: 'Azure Policy (Allowed locations)',
        code: 'RequestDisallowedByPolicy',
        cause: 'Политиката за студентския план забрани разполагането в регион West Europe.',
        fix: 'Позволените региони бяха изследвани с Azure CLI (az account list-locations) и ресурсите се преместиха в „Poland Central“.',
      },
      {
        area: 'Ресурси',
        title: 'Cores = 0 за B-серията',
        code: 'OperationNotAllowed',
        cause: 'Лимит от 0 ядра за серията Bsv2. Същевременно Standard_B1s връщаше SkuNotAvailable.',
        fix: 'Преминаване към Pay-As-You-Go абонамент и избор на наличната виртуална машина Standard_D2s_v3.',
      },
      {
        area: 'Мрежа',
        title: 'Лимит на IP адресите',
        code: 'IPv4BasicSkuPublicIpCountLimitReached',
        cause: 'Достигнат лимит за „Basic“ IP адреси в субсидираните планове.',
        fix: 'Промяна на алокацията на статична (Static) и използване на Standard SKU.',
      },
    ],
  },

  demo: {
    heading: 'Демонстрация на живо',
    subtitle: 'Симулация на IaC стъпки в интерактивна развойна среда',
  },

  conclusion: {
    heading: 'Заключение и ключови изводи',
    subtitle: 'Равносметка на инженерните и академични цели',
    benefitsHeading: 'Инженерни предимства на IaC',
    benefits: [
      { title: 'Край на конфигурационния дрейф.', text: 'Състоянието е зададено в код, който живее в VS Code и GitHub. Ad-hoc промените се изолират и елиминират.' },
      { title: '100% възпроизводимост.', text: 'Нова идентична среда за разработка или тест се вдига от нула за под 2 минути.' },
      { title: 'Автоматично отстраняване на щети.', text: 'При случайна повреда Terraform засича липсващия ресурс и го създава наново.' },
      { title: 'Самодокументиращ се код.', text: 'Конфигурацията е единственият и винаги актуален източник на истина – без остарели ръчни документации.' },
    ],
    summaryHeading: 'Техническа равносметка',
    summary:
      'Разработката показва предимствата на декларативния модел пред класическото ръчно администриране. Проектът демонстрира принципите на IaC и дава основа за професионални DevOps практики с минимални разходи.',
    stats: [
      { value: '9', label: 'ресурса под управлението на IaC' },
      { value: '~46 сек.', label: 'време за разгръщане' },
      { value: '~21.10 €', label: 'месечни разходи' },
    ],
  },

  thanks: {
    heading: 'Благодаря за вниманието!',
    text: 'Очаквам Вашите въпроси, препоръки и коментари по представената дипломна работа.',
    departmentLabel: 'Катедра',
  },

  extra: {
    heading: 'Допълнителни материали: диаграми и статистики',
    subtitle: 'Сравнителни развойни методи и архитектурен анализ',
  },

  charts: {
    tabs: {
      comparison: 'Съпоставка на методите',
      calculator: 'Финансов симулатор',
      latencies: 'Региони и латентност',
    },
    criteria: 'Критерии за оценка',
    analysis: 'Сравнителен индекс',
    methods: {
      terraform: 'HashiCorp Terraform (IaC)',
      scripts: 'CLI скриптове (Azure CLI / Bash)',
      manual: 'Ръчна конфигурация (Azure Portal)',
    },
    comparisonNote: 'Оценките се базират на сравнителния анализ в глави 1 и 5 на дипломната работа.',
    metrics: [
      {
        name: 'Повтаряемост',
        category: 'Оперативност',
        description:
          'Идемпотентността на Terraform гарантира идентичен резултат при всяко прилагане на кода. При ръчен модел или императивни скриптове рискът от разлики е голям.',
      },
      {
        name: 'Възстановяване след срив',
        category: 'Надеждност',
        description:
          'Възстановяването от нула отнема под 2 минути с една команда – terraform apply. Ръчното пресъздаване на мрежи, дискове и зависимости отнема часове.',
      },
      {
        name: 'Версиониране',
        category: 'Проследимост',
        description:
          'Цялата архитектура е декларирана в Git. Всяка промяна минава през pull request и оставя следа за одит. Ръчните кликове в Azure портала не се проследяват.',
      },
      {
        name: 'Конфигурационен дрейф',
        category: 'Сигурност',
        description:
          'Terraform state файлът сверява реалното състояние в облака с кода при всяка команда plan. Ръчно променено NSG правило или изтрит ресурс се засича и се коригира.',
      },
      {
        name: 'Мащабируемост',
        category: 'Производителност',
        description:
          'Втори уеб сървър се добавя с копиране на ресурс или промяна на брояч (count = 2). При другите методи това изисква сложна логика.',
      },
    ],
    calculator: {
      title: 'Конфигурационни параметри',
      hint: 'Променете стойностите и вижте цената на живо',
      currencyBgn: 'BGN (лв)',
      currencyEur: 'EUR (€)',
      vms: 'Виртуални машини (Standard_D2s_v3)',
      disk: 'Дисково пространство (Standard LRS)',
      ips: 'Публични IP адреси (Standard Static)',
      count: (n: number) => (n === 1 ? '1 брой' : `${n} броя`),
      pricing: 'Цени за Poland Central',
      monthly: 'Прогнозна месечна такса',
      perMonth: '/месец',
      unitBgn: 'лв.',
      unitEur: '€',
      rowVms: (n: number) => `Виртуални машини (${n})`,
      rowDisk: (gb: number, n: number) => `Облачен сторидж (${gb} GB × ${n})`,
      rowIps: (n: number) => `Статични Standard IP (${n})`,
      note: 'Цените следват официалната тарифа на Microsoft Azure за регион Poland Central (към 2026 г.) и включват Standard HDD LRS и таксите за статичен IPv4 Standard IP.',
    },
    latency: {
      why: 'Защо Poland Central?',
      lead: 'При проектирането бяха сравнени латентността (ping) и цените на ресурсите спрямо потребителите в България.',
      points: [
        { title: 'Ниска латентност.', text: 'Под 35 ms до София – сайтът отговаря веднага.' },
        { title: '100% наличност на SKU.', text: 'Standard_D2s_v3 е свободна, без квотни ограничения.' },
        { title: 'Без капацитетни лимити.', text: 'Регионите в Западна Европа често имат квотен дефицит.' },
      ],
      chartTitle: 'Латентност до София, България (ms)',
      chartHeading: 'Сравнение на мрежовата латентност',
      chosen: 'Избран',
      regions: [
        { name: 'Poland Central (Полша)', note: 'Най-бърз отзвук' },
        { name: 'Germany West Central (Германия)', note: 'Стабилен европейски регион' },
        { name: 'West Europe (Нидерландия)', note: 'Чести квотни претоварвания' },
        { name: 'North Europe (Ирландия)', note: 'Голямо разстояние' },
      ],
      note: 'Измерванията са от финалните изследвания в глава 4 на дипломната работа и са направени през облачния рутер.',
    },
  },

  showcase: {
    presetsHeading: 'Сценарии за изпробване',
    presets: {
      policy: 'Грешка в Azure Policy (забранен регион)',
      quota: 'Нулева квота за ядра (OperationNotAllowed)',
      ok: 'Успешно разгръщане (Poland Central)',
    },
    tfvars: 'Текущ код в terraform.tfvars',
    locationLabel: 'location (регион)',
    sizeLabel: 'size (размер на виртуалната машина)',
    regionOptions: {
      west: 'West Europe (забранен от политиката)',
      north: 'North Europe (забранен от политиката)',
      poland: 'Poland Central (разрешен)',
    },
    sizeOptions: {
      b1s: 'Standard_B1s (няма капацитет)',
      b2: 'Standard_B2ls_v2 (0 vCPU квота)',
      d2: 'Standard_D2s_v3 (разрешен и наличен)',
    },
    monitorHeading: 'Azure Resource Monitor (на живо)',
    resources: {
      rg: 'Resource Group',
      vnet: 'VNet и Subnet',
      nsg: 'NSG правила (80, 22)',
      ip: 'Статичен Standard IP',
      vm: 'Ubuntu VM',
      nginx: 'Nginx уебсайт',
    },
    openDiagram: 'Отвори архитектурната диаграма',
    diagramThumb: 'Архитектурна диаграма',
    browserTab: 'IaC Coursework – Cloud Automation',
    offlineTitle: 'Този сайт не може да бъде достигнат',
    offlineText: (ip: string) => `Връзката към ${ip} беше отказана.`,
    reload: 'Презареждане',
    iframeTitle: 'Разгърнатият демонстрационен уебсайт',
    terminalTitle: 'Интерактивен IaC терминал',
    statusIdle: 'Свободен',
    statusBusy: 'Разгръщане…',
    status: 'Статус',
    clear: 'Изчисти',
    hint: 'Натиснете бутоните, за да минете през жизнения цикъл на IaC.',
    welcome: 'Натиснете някоя от командите долу, за да започне разгръщането.',
    cleared: '=== Терминалът е изчистен. Готов за нови команди. ===',
    needInit: "Грешка: директорията не е инициализирана. Първо изпълнете 'terraform init'.",
    needPlan: "Грешка: първо изпълнете 'terraform plan', за да се генерира планът за изпълнение.",
    hintRegion: "↳ Решение: променете location в 'terraform.tfvars' на 'Poland Central'.",
    hintQuota: "↳ Решение: изберете семейство 'Standard_D2s_v3', за което има vCPU квота.",
    hintSku: "↳ Решение: сменете размера в 'main.tf' на 'Standard_D2s_v3', валидиран за Полша.",
    presetLoaded: {
      policy: ">>> Зареден сценарий: 'Грешка в Azure Policy'",
      quota: ">>> Зареден сценарий: 'Грешка в vCPU квотата (OperationNotAllowed)'",
      ok: ">>> Зареден сценарий: 'Стабилна конфигурация (Poland Central + Standard_D2s_v3)'",
    },
    diagramHeading: 'Azure + Terraform • Архитектурна схема',
    diagramSub: 'Топология на автоматизираната инфраструктура',
    diagramAlt: 'Архитектурна диаграма на инфраструктурата в Azure',
    diagramMissing: 'Диаграмата не може да бъде заредена.',
    close: 'Затвори',
  },

  logo: {
    fallbackAlt: 'ВУТП',
  },

  site: {
    htmlLang: 'bg',
    subtitle: 'Автоматизирано създаване на уебсайт чрез Azure и практиката IaC',
    professor: 'Дипломен ръководител: доц. д-р Павлинка Радойска',
    goalHeading: '🎯 ЦЕЛ НА ПРОЕКТА',
    goalText:
      'Демонстрация на практиката Infrastructure as Code (IaC) чрез автоматизирано създаване на облачна инфраструктура в Azure с Terraform.',
    techHeading: '🛠️ ТЕХНОЛОГИИ',
    configHeading: '🔧 КОНФИГУРАЦИЯ',
    vm: 'Виртуална машина:',
    region: 'Регион:',
    publicIp: 'Публичен IP:',
    publisher: 'Издател на образа:',
    os: 'Операционна система:',
    securityHeading: '🔐 МРЕЖОВА СИГУРНОСТ',
    ports: ['Port 80 (HTTP) – уеб достъп', 'Port 443 (HTTPS) – сигурен уеб достъп на ниво конфигурация', 'Port 22 (SSH) – отдалечено управление'],
    automationHeading: '⚡ АВТОМАТИЗАЦИЯ',
    automationText: 'Цялата облачна инфраструктура е създадена автоматично чрез Terraform:',
    automationItems: ['Resource Group', 'Virtual Network & Subnet', 'Network Security Group', 'Public IP Address', 'Virtual Machine', 'Nginx Web Server', 'Website Deployment'],
    footerProject: 'Дипломен проект',
    footerBuilt: 'Автоматично провизиран уебсайт | Създаден от Георги Стефанов – студент КТ, 4. курс, ВУТП',
    locale: 'bg-BG',
  },
};

export type Dict = typeof bg;
