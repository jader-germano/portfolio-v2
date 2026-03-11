export const SUPPORTED_LOCALES = ["en", "pt"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";
export const LANGUAGE_STORAGE_KEY = "jpglabs-language";

export const resolveLocale = (value: unknown): AppLocale => (value === "pt" ? "pt" : "en");

export const dictionaries = {
  en: {
    nav: {
      items: {
        home: "Home",
        login: "Login",
        instances: "Instances",
        guardian: "Guardian",
      },
      logout: "Logout",
      language: "Language",
      authenticatedUser: "Authenticated User",
      localeOptions: {
        en: "English",
        pt: "Português",
      },
    },
    hero: {
      eyebrow: "Senior Full-Stack Engineer",
      status: "Available",
      summary:
        "10+ years crafting enterprise systems. Java 21 · Spring Boot 3 · Angular 20 · Node.js · React · AI Orchestration.",
      emphasis: "Founder of JPG Labs",
      scroll: "Scroll",
    },
    whatIBuild: {
      pillars: [
        {
          title: "Engineering",
          desc: "Java 21 + Spring Boot 3, Angular 20, Node.js + TypeScript. LGPD-compliant government systems, DDD, microservices at scale.",
        },
        {
          title: "AI Orchestration",
          desc: "AgentOps, MCP Protocol, n8n automation, Ollama LLMs. Building autonomous decision pipelines for real business processes.",
        },
        {
          title: "Cloud & Infra",
          desc: "k3s / Kubernetes, Docker, Traefik, GitHub Actions CI/CD. From zero to production on a low-cost VPS.",
        },
      ],
    },
    codeSnippets: {
      eyebrow: "Production Patterns · Real Systems",
      title: "Architecture in Practice",
      description: "Abstracted implementation patterns from production systems. Project identity stays visible; proprietary source stays protected.",
      copy: "Copy",
      copied: "Copied",
      items: [
        {
          title: "Privacy-Safe Session Audit Buffer",
          subtitle: "Deduplicate audit events across stateless authenticated flows",
          context: "TSE Electoral Court · Java 21 · Spring Boot 3",
        },
        {
          title: "Legacy Boolean Persistence Mapping",
          subtitle: "Normalize numeric database flags at the persistence boundary",
          context: "TSE Electoral Court · MyBatis 3 · Oracle DB",
        },
        {
          title: "Transactional Booking Guard",
          subtitle: "Protect service-layer rules before persisting reservations",
          context: "GoBarber · Node.js · Scheduling Domain",
        },
        {
          title: "Repository Boundary Pattern",
          subtitle: "Keep data access isolated behind intention-driven contracts",
          context: "GoBarber · Repository Layer · PostgreSQL",
        },
        {
          title: "Client Auth State Lifecycle",
          subtitle: "Hydrate, persist, and clear session state consistently in the UI",
          context: "GoBarber Frontend · React · Axios",
        },
      ],
    },
    projects: {
      eyebrow: "Selected Work",
      title: "Projects",
      viewGithub: "View on GitHub",
      confidential: "Confidential · NDA",
      items: [
        {
          category: "Full-Stack · Open Source",
          desc: "Production-grade barber appointment platform with explicit service boundaries, JWT auth, scheduling rules, React frontend, and Expo mobile support.",
        },
        {
          category: "Government · Java · LGPD",
          desc: "Teacher registry system for Brazil's Electoral Court (TSE). LGPD-compliant, identity-aware, Oracle-backed, and built around strongly documented integration boundaries.",
        },
        {
          category: "AI · Infrastructure",
          desc: "AI automation platform. n8n workflows, MCP Protocol, Traefik ingress, WhatsApp bot, Kiwify payment hooks. Self-hosted on k3s.",
        },
      ],
    },
    experience: {
      eyebrow: "Career",
      title: "Experience",
      items: [
        {
          company: "JPG Labs",
          period: "2026 – Present",
          role: "Founder & AI Engineer",
          desc: "Building AI automation products: n8n workflows, MCP Protocol integrations, LLM orchestration, WhatsApp bots, open-webui on self-hosted k3s.",
        },
        {
          company: "Digisystem → TSE (Electoral Court)",
          period: "2024 – Present",
          role: "Senior Java Engineer",
          desc: "LGPD-compliant teacher registry for Brazil's Electoral Court. Stateless session deduplication, privacy-oriented access flows, Oracle persistence, and Angular 20 delivery.",
        },
        {
          company: "GoBarber (Personal Project)",
          period: "2023",
          role: "Full-Stack Engineer",
          desc: "End-to-end appointment platform with backend business rules, React + Vite frontend, React Native + Expo mobile app, and production-ready scheduling workflows.",
        },
        {
          company: "Enterprise Java (Multiple clients)",
          period: "2018 – 2024",
          role: "Senior Software Developer",
          desc: "6 years building mission-critical enterprise systems. Spring ecosystem, DDD, hexagonal architecture, microservices, Kafka, PostgreSQL, CI/CD with GitHub Actions.",
        },
      ],
    },
    skills: {
      eyebrow: "Tech Stack",
      title: "Skills",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        devops: "DevOps",
        aiAutomation: "AI & Automation",
      },
    },
    resumeUpload: {
      eyebrow: "Platform Feature",
      titleLineOne: "Instantiate Your",
      titleLineTwo: "Own Portfolio",
      description:
        "Bought the kit? Upload your resume here to automatically generate a high-performance portfolio based on my architecture. Powered by Deepseek-R1 on my private VPS.",
      success: "Resume Parsed Successfully!",
      labels: {
        name: "Name",
        title: "Title",
        skills: "Skills",
      },
      generateLink: "Generate Portfolio Link",
      dropzoneIdle: "Drop your resume here",
      dropzoneFileTypes: "PDF or TXT (Max 5MB)",
      parsing: "Parsing with AI...",
      action: "Instantiate Portfolio",
      genericError: "Something went wrong",
      parseError: "Failed to parse resume",
    },
    knowledgeVault: {
      eyebrow: "Bonus Session",
      title: "Knowledge Vault",
      description:
        "My personal digital garden. A centralized hub of technical solutions, architectural decisions, and AI prompts used across my projects.",
      searchPlaceholder: "Search documentation...",
      categories: [
        { name: "Infrastructure", countLabel: "12 Articles" },
        { name: "AI Agents", countLabel: "8 Articles" },
        { name: "Full-Stack", countLabel: "15 Articles" },
      ],
      explore: "Explore the Vault",
      latestTitle: "Latest Entry: Portfolio k3s Migration",
      latestDescription: "Documenting the 404 resolution and ingress configuration.",
      rawRepository: "View Raw Repository",
    },
    cta: {
      titleLineOne: "Let's Build",
      titleLineTwo: "Something Real",
      description: "Available for senior engineering roles, technical consulting, and AI integration projects.",
      linkedin: "LinkedIn Profile",
    },
    footer: "© 2026 Jader Germano · All Systems Operational",
    login: {
      title: "Access Hub",
      subtitle: "Authorized Personnel Only",
      expired: "Your session expired after 5 minutes of inactivity. Sign in again to continue.",
      credentialsError: "The provided e-mail credentials were rejected.",
      accessDenied: "This sign-in attempt was denied by the identity provider.",
      emailError: "Unable to authenticate with e-mail and password.",
      github: "Sign in with GitHub",
      google: "Sign in with Google",
      emailToggle: "Sign in with E-mail",
      emailLabel: "E-mail",
      passwordLabel: "Password",
      emailSubmit: "Continue with E-mail",
      emailSubmitting: "Authenticating...",
      brandTitle: "JPG Labs",
      brandSubtitle: "Private operational access",
      legalPrefix: "By signing in, you agree to our",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
    sessionWarning: {
      eyebrow: "Session Warning",
      title: "Automatic logout in {seconds}s",
      body: "For security, authenticated access expires after 5 minutes of inactivity. Interact now to keep the current session alive.",
      badge: "Inactivity timeout protection active",
      stay: "Stay Signed In",
      logout: "Logout Now",
    },
    terms: {
      back: "Back to login",
      eyebrow: "Legal",
      title: "Terms of Service",
      description:
        "Operational terms governing access to the JPG Labs authenticated workspace and the protected technical material made available after sign-in.",
      sections: [
        {
          title: "1. Authenticated Access",
          body: "Private routes are reserved for authorized users. Access must be performed through the configured identity providers and can be revoked when misuse, credential sharing, or suspicious activity is detected.",
        },
        {
          title: "2. Session Security",
          body: "Authenticated sessions are protected by a five-minute inactivity timeout. A ten-second warning is displayed before automatic logout so the user can explicitly continue the session.",
        },
        {
          title: "3. Restricted Material",
          body: "Protected dashboards, documents, architecture notes, snippets, and operational artifacts remain restricted to signed-in users. Downloading, redistribution, or reuse without authorization is prohibited.",
        },
        {
          title: "4. Operational Conduct",
          body: "Users must preserve the confidentiality of credentials, keep their workstation protected, and avoid using the private area for automated scraping, abusive requests, or any activity that compromises service stability.",
        },
      ],
    },
    privacy: {
      back: "Back to login",
      eyebrow: "Legal",
      title: "Privacy Policy",
      description: "Privacy commitments related to authentication, session handling, and access to the JPG Labs protected workspace.",
      sections: [
        {
          title: "1. Data Collected",
          body: "When authentication is used, the platform may process identity data returned by GitHub, Google, or the e-mail/password flow, including name, e-mail address, provider identifier, and role metadata required for access control.",
        },
        {
          title: "2. Session and Security Logs",
          body: "The platform stores secure session identifiers, inactivity timeout state, and minimal access audit information needed to protect private routes and investigate security incidents. Sensitive secrets are never exposed in the frontend.",
        },
        {
          title: "3. Protected Content",
          body: "Private documents, snippets, dashboards, and operational assets are visible only to authenticated users. Access is limited to the minimum data necessary to operate the private workspace and maintain service security.",
        },
        {
          title: "4. Retention and User Rights",
          body: "Identity and audit records are retained only for operational, security, and compliance purposes. Requests related to access review, correction, or removal should be handled through the official JPG Labs contact channels.",
        },
      ],
    },
    instances: {
      title: "Active Instances",
      subtitle: "Real-time cluster metrics and pod status",
      guardianCta: "Guardian Console",
      empty: "No running containers detected. Contact Guardian.",
      cpu: "CPU Usage",
      memory: "Memory",
      live: "Live cluster synchronization active",
      statuses: {
        Running: "Running",
        Pending: "Pending",
        Error: "Error",
        Terminating: "Terminating",
      },
    },
    guardian: {
      title: "Guardian Console",
      subtitle: "System integrity and self-healing monitor",
      healthy: "System Healthy",
      admin: "Master Admin",
      replicaTitle: "Replica Status (Blue/Green)",
      replicaAStatus: "Active Core",
      replicaBStatus: "Standby / Updating",
      uptime: "Uptime",
      load: "Load",
      version: "Version",
      status: "Status",
      syncing: "Syncing Context...",
      logs: "System Logs",
      logLines: [
        "Replica-A: Infrastructure check completed. All systems GO.",
        "Cron: Starting daily backup routine...",
        "Traefik: Detected latency spike on n8n. Scaling...",
        "Replica-A: Auto-healing triggered. Latency resolved.",
      ],
      neuralLoad: "Neural Load",
      contextWindow: "Context Window",
      tokensActive: "Tokens active in memory",
      nextUpdate: "Next Auto-Update",
      sunday: "Sunday",
    },
  },
  pt: {
    nav: {
      items: {
        home: "Início",
        login: "Login",
        instances: "Instâncias",
        guardian: "Guardian",
      },
      logout: "Sair",
      language: "Idioma",
      authenticatedUser: "Usuário autenticado",
      localeOptions: {
        en: "English",
        pt: "Português",
      },
    },
    hero: {
      eyebrow: "Engenheiro Full-Stack Sênior",
      status: "Disponível",
      summary:
        "Mais de 10 anos construindo sistemas corporativos. Java 21 · Spring Boot 3 · Angular 20 · Node.js · React · Orquestração de IA.",
      emphasis: "Fundador da JPG Labs",
      scroll: "Role",
    },
    whatIBuild: {
      pillars: [
        {
          title: "Engenharia",
          desc: "Java 21 + Spring Boot 3, Angular 20, Node.js + TypeScript. Sistemas governamentais aderentes à LGPD, DDD e microsserviços em escala.",
        },
        {
          title: "Orquestração de IA",
          desc: "AgentOps, protocolo MCP, automações n8n e LLMs com Ollama. Construção de pipelines autônomos para processos reais de negócio.",
        },
        {
          title: "Cloud & Infra",
          desc: "k3s / Kubernetes, Docker, Traefik e CI/CD com GitHub Actions. Da ideia à produção em uma VPS de baixo custo.",
        },
      ],
    },
    codeSnippets: {
      eyebrow: "Padrões de Produção · Sistemas Reais",
      title: "Arquitetura em Prática",
      description: "Padrões de implementação abstraídos de sistemas reais. A identidade dos projetos permanece; o código proprietário não.",
      copy: "Copiar",
      copied: "Copiado",
      items: [
        {
          title: "Buffer de Auditoria com Privacidade",
          subtitle: "Deduplicação de eventos em fluxos autenticados stateless",
          context: "TSE · Java 21 · Spring Boot 3",
        },
        {
          title: "Mapeamento de Boolean Legado",
          subtitle: "Normalização de flags numéricas na fronteira de persistência",
          context: "TSE · MyBatis 3 · Oracle DB",
        },
        {
          title: "Guarda Transacional de Agendamento",
          subtitle: "Proteção das regras de negócio antes da persistência",
          context: "GoBarber · Node.js · Domínio de Agendamento",
        },
        {
          title: "Padrão de Fronteira de Repositório",
          subtitle: "Isolamento do acesso a dados por contratos orientados à intenção",
          context: "GoBarber · Camada de Repositório · PostgreSQL",
        },
        {
          title: "Ciclo de Estado de Autenticação no Cliente",
          subtitle: "Hidratação, persistência e limpeza consistente da sessão na UI",
          context: "GoBarber Frontend · React · Axios",
        },
      ],
    },
    projects: {
      eyebrow: "Trabalhos Selecionados",
      title: "Projetos",
      viewGithub: "Ver no GitHub",
      confidential: "Confidencial · NDA",
      items: [
        {
          category: "Full-Stack · Open Source",
          desc: "Plataforma de agendamentos para barbearia em nível de produção, com regras de serviço explícitas, autenticação JWT, frontend React e app mobile em Expo.",
        },
        {
          category: "Governo · Java · LGPD",
          desc: "Sistema de cadastro de docentes para a Justiça Eleitoral, aderente à LGPD, orientado a identidade e sustentado por integrações fortemente documentadas.",
        },
        {
          category: "IA · Infraestrutura",
          desc: "Plataforma de automação com IA. Workflows n8n, protocolo MCP, Traefik, bot de WhatsApp e integrações de pagamento. Auto-hospedada em k3s.",
        },
      ],
    },
    experience: {
      eyebrow: "Carreira",
      title: "Experiência",
      items: [
        {
          company: "JPG Labs",
          period: "2026 – Atual",
          role: "Fundador & Engenheiro de IA",
          desc: "Construção de produtos de automação com IA: workflows n8n, integrações MCP, orquestração de LLMs, bots de WhatsApp e open-webui em k3s auto-hospedado.",
        },
        {
          company: "Digisystem → TSE (Justiça Eleitoral)",
          period: "2024 – Atual",
          role: "Engenheiro Java Sênior",
          desc: "Cadastro de docentes para a Justiça Eleitoral com aderência à LGPD, fluxos de acesso orientados à privacidade, persistência Oracle e entrega em Angular 20.",
        },
        {
          company: "GoBarber (Projeto Pessoal)",
          period: "2023",
          role: "Engenheiro Full-Stack",
          desc: "Plataforma end-to-end de agendamento com regras de negócio no backend, frontend em React + Vite, app mobile React Native + Expo e fluxos prontos para produção.",
        },
        {
          company: "Java Corporativo (Múltiplos clientes)",
          period: "2018 – 2024",
          role: "Desenvolvedor de Software Sênior",
          desc: "Seis anos construindo sistemas corporativos críticos com ecossistema Spring, DDD, arquitetura hexagonal, microsserviços, Kafka, PostgreSQL e CI/CD com GitHub Actions.",
        },
      ],
    },
    skills: {
      eyebrow: "Stack Técnica",
      title: "Competências",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        devops: "DevOps",
        aiAutomation: "IA & Automação",
      },
    },
    resumeUpload: {
      eyebrow: "Funcionalidade da Plataforma",
      titleLineOne: "Instancie Seu",
      titleLineTwo: "Próprio Portfólio",
      description:
        "Comprou o kit? Envie seu currículo aqui para gerar automaticamente um portfólio de alta performance baseado na minha arquitetura. Executado com Deepseek-R1 na minha VPS privada.",
      success: "Currículo processado com sucesso!",
      labels: {
        name: "Nome",
        title: "Título",
        skills: "Competências",
      },
      generateLink: "Gerar link do portfólio",
      dropzoneIdle: "Solte seu currículo aqui",
      dropzoneFileTypes: "PDF ou TXT (máx. 5 MB)",
      parsing: "Processando com IA...",
      action: "Instanciar Portfólio",
      genericError: "Algo deu errado",
      parseError: "Falha ao processar o currículo",
    },
    knowledgeVault: {
      eyebrow: "Sessão Bônus",
      title: "Base de Conhecimento",
      description:
        "Meu jardim digital pessoal. Um hub centralizado com soluções técnicas, decisões arquiteturais e prompts de IA usados ao longo dos meus projetos.",
      searchPlaceholder: "Buscar documentação...",
      categories: [
        { name: "Infraestrutura", countLabel: "12 Artigos" },
        { name: "Agentes de IA", countLabel: "8 Artigos" },
        { name: "Full-Stack", countLabel: "15 Artigos" },
      ],
      explore: "Explorar Base",
      latestTitle: "Última entrada: Migração do portfólio para k3s",
      latestDescription: "Documentação da correção do 404 e da configuração de ingress.",
      rawRepository: "Ver repositório bruto",
    },
    cta: {
      titleLineOne: "Vamos Construir",
      titleLineTwo: "Algo Real",
      description: "Disponível para posições sênior de engenharia, consultoria técnica e projetos de integração com IA.",
      linkedin: "Perfil no LinkedIn",
    },
    footer: "© 2026 Jader Germano · Todos os sistemas operando",
    login: {
      title: "Central de Acesso",
      subtitle: "Apenas pessoal autorizado",
      expired: "Sua sessão expirou após 5 minutos de inatividade. Faça login novamente para continuar.",
      credentialsError: "As credenciais de e-mail informadas foram rejeitadas.",
      accessDenied: "Esta tentativa de login foi negada pelo provedor de identidade.",
      emailError: "Não foi possível autenticar com e-mail e senha.",
      github: "Entrar com GitHub",
      google: "Entrar com Google",
      emailToggle: "Entrar com E-mail",
      emailLabel: "E-mail",
      passwordLabel: "Senha",
      emailSubmit: "Continuar com E-mail",
      emailSubmitting: "Autenticando...",
      brandTitle: "JPG Labs",
      brandSubtitle: "Acesso operacional privado",
      legalPrefix: "Ao entrar, você concorda com nossos",
      terms: "Termos de Serviço",
      privacy: "Política de Privacidade",
    },
    sessionWarning: {
      eyebrow: "Aviso de Sessão",
      title: "Logout automático em {seconds}s",
      body: "Por segurança, o acesso autenticado expira após 5 minutos de inatividade. Interaja agora para manter a sessão ativa.",
      badge: "Proteção por timeout de inatividade ativa",
      stay: "Continuar conectado",
      logout: "Sair agora",
    },
    terms: {
      back: "Voltar para o login",
      eyebrow: "Legal",
      title: "Termos de Serviço",
      description:
        "Termos operacionais que regem o acesso ao workspace autenticado da JPG Labs e ao material técnico protegido disponível após o login.",
      sections: [
        {
          title: "1. Acesso Autenticado",
          body: "As rotas privadas são reservadas a usuários autorizados. O acesso deve ocorrer pelos provedores configurados e pode ser revogado em caso de uso indevido, compartilhamento de credenciais ou atividade suspeita.",
        },
        {
          title: "2. Segurança de Sessão",
          body: "As sessões autenticadas são protegidas por expiração após cinco minutos de inatividade. Um aviso de dez segundos é exibido antes do logout automático para que o usuário possa continuar a sessão explicitamente.",
        },
        {
          title: "3. Material Restrito",
          body: "Dashboards, documentos, notas arquiteturais, snippets e artefatos operacionais protegidos permanecem restritos a usuários autenticados. Download, redistribuição ou reutilização sem autorização são proibidos.",
        },
        {
          title: "4. Conduta Operacional",
          body: "Os usuários devem preservar a confidencialidade das credenciais, manter a estação de trabalho protegida e evitar scraping automatizado, abuso de requisições ou qualquer atividade que comprometa a estabilidade do serviço.",
        },
      ],
    },
    privacy: {
      back: "Voltar para o login",
      eyebrow: "Legal",
      title: "Política de Privacidade",
      description: "Compromissos de privacidade relacionados à autenticação, ao controle de sessão e ao acesso ao workspace protegido da JPG Labs.",
      sections: [
        {
          title: "1. Dados Coletados",
          body: "Quando a autenticação é usada, a plataforma pode processar dados de identidade retornados pelo GitHub, Google ou pelo fluxo de e-mail e senha, incluindo nome, endereço de e-mail, identificador do provedor e metadados de papel necessários ao controle de acesso.",
        },
        {
          title: "2. Sessão e Logs de Segurança",
          body: "A plataforma armazena identificadores seguros de sessão, estado do timeout de inatividade e informações mínimas de auditoria para proteger rotas privadas e investigar incidentes. Segredos sensíveis nunca são expostos no frontend.",
        },
        {
          title: "3. Conteúdo Protegido",
          body: "Documentos privados, snippets, dashboards e ativos operacionais ficam visíveis apenas para usuários autenticados. O acesso é limitado ao mínimo necessário para operar a área privada com segurança.",
        },
        {
          title: "4. Retenção e Direitos do Usuário",
          body: "Registros de identidade e auditoria são mantidos apenas para finalidades operacionais, de segurança e conformidade. Solicitações de revisão, correção ou remoção devem seguir os canais oficiais de contato da JPG Labs.",
        },
      ],
    },
    instances: {
      title: "Instâncias Ativas",
      subtitle: "Métricas do cluster e status dos pods em tempo quase real",
      guardianCta: "Console Guardian",
      empty: "Nenhum container em execução foi detectado. Contate o Guardian.",
      cpu: "Uso de CPU",
      memory: "Memória",
      live: "Sincronização do cluster ativa",
      statuses: {
        Running: "Executando",
        Pending: "Pendente",
        Error: "Erro",
        Terminating: "Encerrando",
      },
    },
    guardian: {
      title: "Console Guardian",
      subtitle: "Monitor de integridade do sistema e autocorreção",
      healthy: "Sistema saudável",
      admin: "Administrador master",
      replicaTitle: "Status das réplicas (Blue/Green)",
      replicaAStatus: "Núcleo ativo",
      replicaBStatus: "Standby / Atualizando",
      uptime: "Uptime",
      load: "Carga",
      version: "Versão",
      status: "Status",
      syncing: "Sincronizando contexto...",
      logs: "Logs do sistema",
      logLines: [
        "Réplica-A: verificação de infraestrutura concluída. Todos os sistemas OK.",
        "Cron: iniciando rotina diária de backup...",
        "Traefik: pico de latência detectado no n8n. Escalando...",
        "Réplica-A: autocorreção acionada. Latência normalizada.",
      ],
      neuralLoad: "Carga neural",
      contextWindow: "Janela de contexto",
      tokensActive: "Tokens ativos em memória",
      nextUpdate: "Próxima atualização automática",
      sunday: "Domingo",
    },
  },
} as const;

export type AppDictionary = (typeof dictionaries)[AppLocale];

export const getDictionary = (locale: AppLocale): AppDictionary => dictionaries[locale];
