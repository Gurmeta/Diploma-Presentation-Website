import type { Dict } from './bg';

/** English copy. Mirrors the shape of `bg.ts`. */
export const en: Dict = {
  meta: {
    title: 'Diploma defence • Azure and IaC',
    description:
      'Interactive presentation for a diploma thesis defence: automated website provisioning with Microsoft Azure and Infrastructure as Code (Terraform).',
  },

  ui: {
    footer: 'Diploma defence • UTP • Georgi Stefanov (No. 170297)',
    universityShort: 'UTP',
    universityName: 'University of Telecommunications and Posts',
    logoAlt: 'UTP – 145 years',
    languageLabel: 'Language',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    skipToContent: 'Skip to content',
    locale: 'en-GB',
    prev: 'Back',
    next: 'Next',
    menuOpen: 'Open the slide list',
    menuClose: 'Close the slide list',
    slidesNav: 'Slides',
    fullscreen: 'Full screen',
    exitFullscreen: 'Exit full screen',
    progress: 'Presentation progress',
    keysHint: '← → to navigate • F for full screen',
    slideAria: (n, total, title) => `Slide ${n} of ${total}: ${title}`,
    counter: (n, total) => `${n} of ${total}`,
  },

  slides: [
    { title: 'Title page', description: 'Title, author and academic affiliation' },
    { title: 'Objective', description: 'Main objective and sub-goals of the designed solution' },
    { title: 'Tasks', description: 'Six concrete technical tasks to carry out' },
    { title: 'Personal contribution', description: 'Working around Azure subscription limits and fixing errors' },
    { title: 'Demonstration', description: 'Interactive IaC simulation with a CLI terminal' },
    { title: 'Conclusion', description: 'Summary and benefits of Infrastructure as Code' },
    { title: 'Thank you', description: 'Thanks for your attention and questions' },
    { title: 'Supplementary data', description: 'Interactive cost and latency comparisons' },
  ],

  people: {
    studentLabel: 'Student',
    studentName: 'Georgi Stefanov',
    program: 'Major: Computer Technologies',
    facultyNo: 'Student ID 170297',
    supervisorLabel: 'Supervisor',
    supervisorName: 'Assoc. Prof. Pavlinka Radoyska, PhD, Eng.',
    committeeLabel: 'State examination board',
    department: 'Department of Information Technologies',
    place: 'Sofia, Bulgaria • 2026',
    shortDepartment: 'Information Technologies',
  },

  title: {
    kicker: 'Diploma thesis • Defence 2026',
    heading: 'Automated website provisioning with Azure and Infrastructure as Code',
    subtitle:
      'Integrating HashiCorp Terraform to build resilient, idempotent and secure cloud infrastructure on Microsoft Azure',
    planCaption: 'What Terraform builds',
    planCreate: 'to create',
    planCreated: 'created',
    planReplay: 'Replay',
    stack: 'Technologies',
  },

  goal: {
    heading: 'Main objective',
    subtitle: 'Bringing IaC principles to Azure in a sustainable way',
    quote: [
      { text: 'To design, implement and critically analyse a working solution for the automated creation, optimisation and configuration of a website on ', strong: false },
      { text: 'Microsoft Azure', strong: true },
      { text: ', fully governed by the practice of ', strong: false },
      { text: 'Infrastructure as Code (IaC)', strong: true },
      { text: ' with ', strong: false },
      { text: 'HashiCorp Terraform', strong: true },
      { text: '.', strong: false },
    ],
    subgoals: [
      {
        title: 'Academic grounding',
        text: 'Mastering and applying declarative design principles, following the concepts of Kief Morris and Yevgeniy Brikman.',
      },
      {
        title: 'Engineering delivery',
        text: 'A full provisioning cycle in the real Azure cloud console – from the network to the web server, with no manual intervention.',
      },
      {
        title: 'Working within limits',
        text: 'Dealing with the system restrictions, quotas and network controls of Azure subscriptions as they appear.',
      },
      {
        title: 'Economic optimum',
        text: 'Studying and keeping running costs minimal relative to the capacity of the resources.',
      },
    ],
  },

  tasks: {
    heading: 'Tasks',
    subtitle: 'The path of technical implementation and research',
    items: [
      { title: 'Theoretical and comparative analysis', text: 'Analysis of the theoretical foundations of IaC and a comparison of leading tools (Terraform, Ansible, CloudFormation).' },
      { title: 'Choosing the technology stack', text: 'Justifying the cloud provider (Azure), OS (Ubuntu 22.04 LTS), VM size (Standard_D2s_v3) and web server (Nginx).' },
      { title: 'Architecture design', text: 'Virtual network address space, subnet segmentation and NSG security rules.' },
      { title: 'Terraform implementation', text: 'A Terraform configuration that provisions the resources and deploys the site through remote-exec scripts.' },
      { title: 'Technical challenges', text: 'Documenting and overcoming Azure Policy restrictions, unavailable SKU sizes and Public IP limits.' },
      { title: 'Assessment and industry practice', text: 'Functional and cost assessment of the solution (~€21.10/month) and a comparison with enterprise standards.' },
    ],
  },

  contribution: {
    heading: 'Personal contribution',
    subtitle: 'Working around Azure subscription limits and fixing errors',
    intro:
      'During deployment the project ran into real limits of the free, subsidised Azure subscription. Each one was resolved with corrective IaC practices.',
    errorLabel: 'Error',
    causeLabel: 'Cause',
    fixLabel: 'Fix',
    items: [
      {
        area: 'Policy',
        title: 'Azure Policy (Allowed locations)',
        code: 'RequestDisallowedByPolicy',
        cause: 'The student plan’s policy blocked deployment to the West Europe region.',
        fix: 'Listed the allowed regions with the Azure CLI (az account list-locations) and moved the resources to “Poland Central”.',
      },
      {
        area: 'Compute',
        title: 'Zero cores for the B-series',
        code: 'OperationNotAllowed',
        cause: 'A core limit of 0 for the Bsv2 family, while Standard_B1s returned SkuNotAvailable.',
        fix: 'Switched to a Pay-As-You-Go subscription and picked the available Standard_D2s_v3 virtual machine.',
      },
      {
        area: 'Network',
        title: 'IP address limit',
        code: 'IPv4BasicSkuPublicIpCountLimitReached',
        cause: 'The limit for “Basic” IP addresses was reached in subsidised plans.',
        fix: 'Changed the allocation to Static and used the Standard SKU.',
      },
    ],
  },

  demo: {
    heading: 'Live demonstration',
    subtitle: 'Simulating the IaC workflow in an interactive environment',
  },

  conclusion: {
    heading: 'Conclusion and key takeaways',
    subtitle: 'The engineering and academic goals, assessed',
    benefitsHeading: 'Engineering benefits of IaC',
    benefits: [
      { title: 'No more configuration drift.', text: 'State is defined in code that lives in VS Code and GitHub. Ad-hoc changes are isolated and eliminated.' },
      { title: '100% reproducible.', text: 'A new identical development or test environment is built from scratch in under 2 minutes.' },
      { title: 'Self-healing infrastructure.', text: 'After accidental damage, Terraform detects the missing resource and creates it again.' },
      { title: 'Self-documenting code.', text: 'The configuration is the single, always up-to-date source of truth – no stale manual documentation.' },
    ],
    summaryHeading: 'Technical summary',
    summary:
      'The work shows the advantages of the declarative model over classic manual administration. The project demonstrates IaC principles and gives a foundation for professional DevOps practice at minimal cost.',
    stats: [
      { value: '9', label: 'resources managed by IaC' },
      { value: '~46 s', label: 'time to deploy' },
      { value: '~€21.10', label: 'monthly cost' },
    ],
  },

  thanks: {
    heading: 'Thank you for your attention!',
    text: 'I look forward to your questions, suggestions and comments on the thesis presented.',
    departmentLabel: 'Department',
  },

  extra: {
    heading: 'Supplementary material: charts and statistics',
    subtitle: 'Comparing delivery methods, and an architecture analysis',
  },

  charts: {
    tabs: {
      comparison: 'Method comparison',
      calculator: 'Cost simulator',
      latencies: 'Regions and latency',
    },
    criteria: 'Criteria',
    analysis: 'Comparison index',
    methods: {
      terraform: 'HashiCorp Terraform (IaC)',
      scripts: 'CLI scripts (Azure CLI / Bash)',
      manual: 'Manual setup (Azure Portal)',
    },
    comparisonNote: 'Scores are based on the comparative analysis in chapters 1 and 5 of the thesis.',
    metrics: [
      {
        name: 'Repeatability',
        category: 'Operations',
        description:
          'Terraform’s idempotency guarantees an identical result every time the code is applied. With a manual process or imperative scripts, the risk of differences is high.',
      },
      {
        name: 'Disaster recovery',
        category: 'Reliability',
        description:
          'Recovery from scratch takes under 2 minutes with a single command – terraform apply. Rebuilding networks, disks and dependencies by hand takes hours.',
      },
      {
        name: 'Version control',
        category: 'Traceability',
        description:
          'The whole architecture is declared in Git. Every change goes through a pull request and leaves an audit trail. Manual clicks in the Azure portal are not tracked.',
      },
      {
        name: 'Configuration drift',
        category: 'Security',
        description:
          'The Terraform state file compares the real cloud state with the code on every plan. A manually changed NSG rule or a deleted resource is detected and corrected.',
      },
      {
        name: 'Scalability',
        category: 'Performance',
        description:
          'A second web server is added by copying a resource or changing a counter (count = 2). Other methods need complex logic for this.',
      },
    ],
    calculator: {
      title: 'Configuration parameters',
      hint: 'Change the values and watch the price update live',
      currencyBgn: 'BGN (lv)',
      currencyEur: 'EUR (€)',
      vms: 'Virtual machines (Standard_D2s_v3)',
      disk: 'Disk space (Standard LRS)',
      ips: 'Public IP addresses (Standard Static)',
      count: (n) => String(n),
      pricing: 'Poland Central pricing',
      monthly: 'Estimated monthly cost',
      perMonth: '/month',
      unitBgn: 'BGN',
      unitEur: '€',
      rowVms: (n) => `Virtual machines (${n})`,
      rowDisk: (gb, n) => `Cloud storage (${gb} GB × ${n})`,
      rowIps: (n) => `Static Standard IPs (${n})`,
      note: 'Prices follow the official Microsoft Azure rate card for the Poland Central region (as of 2026) and include Standard HDD LRS and static IPv4 Standard IP charges.',
    },
    latency: {
      why: 'Why Poland Central?',
      lead: 'During design, latency (ping) and resource prices were compared for users in Bulgaria.',
      points: [
        { title: 'Low latency.', text: 'Under 35 ms to Sofia – the site responds instantly.' },
        { title: '100% SKU availability.', text: 'Standard_D2s_v3 is free of quota restrictions.' },
        { title: 'No capacity limits.', text: 'Western European regions often run short of quota.' },
      ],
      chartTitle: 'Latency to Sofia, Bulgaria (ms)',
      chartHeading: 'Network latency comparison',
      chosen: 'Chosen',
      regions: [
        { name: 'Poland Central (Poland)', note: 'Fastest response' },
        { name: 'Germany West Central (Germany)', note: 'Stable European region' },
        { name: 'West Europe (Netherlands)', note: 'Frequent quota congestion' },
        { name: 'North Europe (Ireland)', note: 'Long distance' },
      ],
      note: 'Measurements come from the final research in chapter 4 of the thesis and were taken through the cloud router.',
    },
  },

  showcase: {
    presetsHeading: 'Scenarios to try',
    presets: {
      policy: 'Azure Policy error (blocked region)',
      quota: 'Zero core quota (OperationNotAllowed)',
      ok: 'Successful deployment (Poland Central)',
    },
    tfvars: 'Current code in terraform.tfvars',
    locationLabel: 'location (region)',
    sizeLabel: 'size (virtual machine size)',
    regionOptions: {
      west: 'West Europe (blocked by policy)',
      north: 'North Europe (blocked by policy)',
      poland: 'Poland Central (allowed)',
    },
    sizeOptions: {
      b1s: 'Standard_B1s (no capacity)',
      b2: 'Standard_B2ls_v2 (0 vCPU quota)',
      d2: 'Standard_D2s_v3 (allowed and available)',
    },
    monitorHeading: 'Azure Resource Monitor (live)',
    resources: {
      rg: 'Resource Group',
      vnet: 'VNet and Subnet',
      nsg: 'NSG rules (80, 22)',
      ip: 'Static Standard IP',
      vm: 'Ubuntu VM',
      nginx: 'Nginx website',
    },
    openDiagram: 'Open the architecture diagram',
    diagramThumb: 'Architecture diagram',
    browserTab: 'IaC Coursework – Cloud Automation',
    offlineTitle: 'This site can’t be reached',
    offlineText: (ip) => `The connection to ${ip} was refused.`,
    reload: 'Reload',
    iframeTitle: 'The deployed demo website',
    terminalTitle: 'Interactive IaC terminal',
    statusIdle: 'Idle',
    statusBusy: 'Deploying…',
    status: 'Status',
    clear: 'Clear',
    hint: 'Press the buttons to walk through the IaC lifecycle.',
    welcome: 'Press one of the commands below to start the deployment.',
    cleared: '=== Terminal cleared. Ready for new commands. ===',
    needInit: "Error: the directory is not initialised. Run 'terraform init' first.",
    needPlan: "Error: run 'terraform plan' first to generate the execution plan.",
    hintRegion: "↳ Fix: change location in 'terraform.tfvars' to 'Poland Central'.",
    hintQuota: "↳ Fix: pick the 'Standard_D2s_v3' family, which has vCPU quota.",
    hintSku: "↳ Fix: change the size in 'main.tf' to 'Standard_D2s_v3', which is validated for Poland.",
    presetLoaded: {
      policy: ">>> Scenario loaded: 'Azure Policy error'",
      quota: ">>> Scenario loaded: 'vCPU quota error (OperationNotAllowed)'",
      ok: ">>> Scenario loaded: 'Working configuration (Poland Central + Standard_D2s_v3)'",
    },
    diagramHeading: 'Azure + Terraform • Architecture diagram',
    diagramSub: 'Topology of the automated infrastructure',
    diagramAlt: 'Architecture diagram of the Azure infrastructure',
    diagramMissing: 'The diagram could not be loaded.',
    close: 'Close',
  },

  logo: {
    fallbackAlt: 'UTP',
  },

  site: {
    htmlLang: 'en',
    subtitle: 'Automated website provisioning with Azure and Infrastructure as Code',
    professor: 'Thesis supervisor: Assoc. Prof. Pavlinka Radoyska, PhD',
    goalHeading: '🎯 PROJECT GOAL',
    goalText:
      'A demonstration of Infrastructure as Code (IaC): cloud infrastructure on Azure created automatically with Terraform.',
    techHeading: '🛠️ TECHNOLOGIES',
    configHeading: '🔧 CONFIGURATION',
    vm: 'Virtual machine:',
    region: 'Region:',
    publicIp: 'Public IP:',
    publisher: 'Image publisher:',
    os: 'Operating system:',
    securityHeading: '🔐 NETWORK SECURITY',
    ports: ['Port 80 (HTTP) – web access', 'Port 443 (HTTPS) – secure web access, configured', 'Port 22 (SSH) – remote management'],
    automationHeading: '⚡ AUTOMATION',
    automationText: 'The entire cloud infrastructure was created automatically with Terraform:',
    automationItems: ['Resource Group', 'Virtual Network & Subnet', 'Network Security Group', 'Public IP Address', 'Virtual Machine', 'Nginx Web Server', 'Website Deployment'],
    footerProject: 'Diploma project',
    footerBuilt: 'Automatically provisioned website | Built by Georgi Stefanov – CT student, 4th year, UTP',
    locale: 'en-GB',
  },
};
