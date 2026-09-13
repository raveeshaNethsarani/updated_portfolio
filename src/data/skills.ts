import { SkillCategory, ExploringTopic } from '../types';

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    description: 'Modern, high-performance user interfaces and responsive architectures.',
    skills: [
      { name: 'React.js', level: 'Advanced', highlight: true, notes: 'Hooks, Suspense, Performance Optimization' },
      { name: 'Next.js', level: 'Advanced', highlight: true, notes: 'App Router, Server Components, SSR/SSG' },
      { name: 'TypeScript', level: 'Advanced', highlight: true, notes: 'Strict Typing, Generics, Type Narrowing' },
      { name: 'JavaScript', level: 'Expert', notes: 'ES6+, Asynchronous Event Loop, DOM API' },
      { name: 'HTML5', level: 'Expert', notes: 'Semantic Markup, Accessibility (WCAG), Web APIs' },
      { name: 'CSS3', level: 'Expert', notes: 'Modern CSS, Flexbox/Grid, Custom Properties' },
      { name: 'Tailwind CSS', level: 'Advanced', highlight: true, notes: 'Design Systems, Arbitrary Variants, v4' },
      { name: 'shadcn/ui', level: 'Advanced', notes: 'Radix Primitives, Accessible Components' },
      { name: 'React Router', level: 'Advanced', notes: 'Nested Routing, Loaders, Route Actions' },
      { name: 'Framer Motion', level: 'Advanced', highlight: true, notes: 'Layout Animations, Gestures, Springs' }
    ]
  },
  {
    id: 'state-data',
    title: 'STATE & DATA',
    description: 'Predictable client-state management and server-state caching.',
    skills: [
      { name: 'Zustand', level: 'Advanced', highlight: true, notes: 'Lightweight Store, Middleware, Multi-tab sync' },
      { name: 'TanStack Query', level: 'Advanced', highlight: true, notes: 'Cache Invalidation, Optimistic Updates' },
      { name: 'Context API', level: 'Advanced', notes: 'Scoped State, Provider Composition' }
    ]
  },
  {
    id: 'forms',
    title: 'FORMS & VALIDATION',
    description: 'Strict runtime data contracts and resilient form handling.',
    skills: [
      { name: 'React Hook Form', level: 'Advanced', highlight: true, notes: 'Uncontrolled Performance, Dynamic Fields' },
      { name: 'Zod', level: 'Advanced', highlight: true, notes: 'Schema Inferences, Runtime Contract Guards' }
    ]
  },
  {
    id: 'backend',
    title: 'BACKEND',
    description: 'Scalable server runtime, enterprise service layers, and high-throughput APIs.',
    skills: [
      { name: 'Node.js', level: 'Advanced', highlight: true, notes: 'Event Loop, Buffers, Streams, Cluster Module' },
      { name: 'Express.js', level: 'Advanced', highlight: true, notes: 'Middleware Chaining, Security Headers, Error Handlers' },
      { name: 'REST APIs', level: 'Expert', highlight: true, notes: 'Resource Modeling, Idempotency, Rate Limiting' },
      { name: 'Java', level: 'Intermediate', notes: 'OOP Principles, Concurrency, JVM Internals' },
      { name: 'Spring Boot', level: 'Intermediate', notes: 'Dependency Injection, Spring MVC, JPA' },
      { name: 'Go', level: 'Exploring / Practical', highlight: true, notes: 'Goroutines, Channels, Standard Library HTTP' }
    ]
  },
  {
    id: 'databases',
    title: 'DATABASES',
    description: 'Relational ACID integrity and document-oriented flexibility.',
    skills: [
      { name: 'MongoDB', level: 'Advanced', highlight: true, notes: 'Document Modeling, Aggregation Pipelines' },
      { name: 'Mongoose', level: 'Advanced', notes: 'Schema Middleware, Population, Validation' },
      { name: 'PostgreSQL', level: 'Advanced', highlight: true, notes: 'Indexing, Constraints, Transactions, JSONB' },
      { name: 'Prisma', level: 'Advanced', notes: 'Type-Safe Queries, Migrations, Relations' },
      { name: 'MongoDB Atlas', level: 'Advanced', notes: 'Cluster Provisioning, VPC Peering, Backups' }
    ]
  },
  {
    id: 'auth-security',
    title: 'AUTHENTICATION & SECURITY',
    description: 'Defense-in-depth token security, encryption, and permission models.',
    skills: [
      { name: 'JWT', level: 'Advanced', highlight: true, notes: 'Signed Claims, Refresh Token Rotation, Blacklists' },
      { name: 'Firebase Authentication', level: 'Advanced', notes: 'OAuth Providers, Custom Claims, Session Cookies' },
      { name: 'OAuth', level: 'Intermediate', notes: 'Authorization Code Flow with PKCE' },
      { name: 'RBAC', level: 'Advanced', highlight: true, notes: 'Role & Permission Bitmasks, Dynamic ACL' },
      { name: 'API Security', level: 'Advanced', highlight: true, notes: 'CORS, CSP, HMAC Signatures, Rate Limiting' }
    ]
  },
  {
    id: 'real-time',
    title: 'REAL-TIME & COMMUNICATION',
    description: 'Bi-directional protocols, push communication, and event dispatchers.',
    skills: [
      { name: 'Socket.IO', level: 'Advanced', highlight: true, notes: 'Rooms, Namespaces, Heartbeats, Reconnection' },
      { name: 'WebSockets', level: 'Advanced', highlight: true, notes: 'Raw WS Protocols, Frame Handling, Binary Streams' },
      { name: 'Webhooks', level: 'Advanced', highlight: true, notes: 'Idempotency Keys, Retry Queues, Signature Verification' },
      { name: 'Event-Driven Architecture', level: 'Practical', highlight: true, notes: 'Pub/Sub Patterns, Decoupled Listeners' }
    ]
  },
  {
    id: 'api-integration',
    title: 'API & INTEGRATION',
    description: 'Resilient client-side transport and external cloud provider bindings.',
    skills: [
      { name: 'Axios', level: 'Advanced', notes: 'Interceptors, Timeout AbortController, Retry logic' },
      { name: 'REST API Integration', level: 'Expert', highlight: true, notes: 'Contract Consumption, Rate Limiting' },
      { name: 'Third-Party API Integration', level: 'Advanced', highlight: true, notes: 'Payment Gateways, Webhook Handlers' }
    ]
  },
  {
    id: 'email-notifications',
    title: 'EMAIL & NOTIFICATIONS',
    description: 'Transactional mail transport, web push, and user alerts.',
    skills: [
      { name: 'Nodemailer', level: 'Advanced', notes: 'SMTP Pooling, HTML Templates, Attachment Streams' },
      { name: 'EmailJS', level: 'Advanced', notes: 'Client-side SMTP dispatch with templating' },
      { name: 'Real-Time Notifications', level: 'Advanced', highlight: true, notes: 'WebSocket & Server-Sent Event streaming' },
      { name: 'Toast Notifications', level: 'Advanced', notes: 'Optimistic UI alerts and action prompts' }
    ]
  },
  {
    id: 'file-cloud',
    title: 'FILE & CLOUD SERVICES',
    description: 'Binary object storage, media optimization, and CDN delivery.',
    skills: [
      { name: 'Cloudinary', level: 'Advanced', highlight: true, notes: 'On-the-fly Image Transformations & Delivery' },
      { name: 'AWS S3', level: 'Intermediate', highlight: true, notes: 'Presigned Upload URLs, Bucket Policies, Lifecycle' }
    ]
  },
  {
    id: 'testing',
    title: 'TESTING',
    description: 'Unit, contract, and snapshot testing for regression prevention.',
    skills: [
      { name: 'Jest', level: 'Intermediate', highlight: true, notes: 'Unit Tests, Mocking, Snapshot Assertions' }
    ]
  },
  {
    id: 'devops',
    title: 'DEVOPS & DEPLOYMENT',
    description: 'Continuous integration, containerized workloads, and hosting pipelines.',
    skills: [
      { name: 'Git', level: 'Advanced', notes: 'Rebase, Cherry-Pick, Branching Workflows' },
      { name: 'GitHub', level: 'Advanced', notes: 'Actions CI/CD, Issue Tracking, Releases' },
      { name: 'Docker', level: 'Intermediate', highlight: true, notes: 'Multi-stage builds, Container Networking, Compose' },
      { name: 'Vercel', level: 'Advanced', notes: 'Edge Functions, Serverless Deployment' },
      { name: 'Netlify', level: 'Intermediate', notes: 'Static Hosting, Redirect Rules' }
    ]
  },
  {
    id: 'development-tools',
    title: 'DEVELOPMENT TOOLS',
    description: 'Developer experience, static analysis, and interface design inspection.',
    skills: [
      { name: 'VS Code', level: 'Expert', notes: 'Custom Configs, Remote Containers' },
      { name: 'Postman', level: 'Advanced', notes: 'API Mocking, Automated Collections, Environment Variables' },
      { name: 'Figma', level: 'Intermediate', notes: 'UI Layout Inspections, Design-to-Code' },
      { name: 'ESLint', level: 'Advanced', notes: 'Static Code Analysis, Standardized AST Rules' },
      { name: 'Prettier', level: 'Advanced', notes: 'Automated Code Formatting' },
      { name: 'npm', level: 'Advanced', notes: 'Package Management & Script Lifecycle' },
      { name: 'Yarn', level: 'Advanced', notes: 'Workspaces & Lockfile Resolution' }
    ]
  }
];

export const CURRENTLY_EXPLORING_DATA: ExploringTopic[] = [
  {
    id: 'go',
    title: 'GO (GOLANG)',
    subtitle: 'High-Concurrency Systems & Lightweight Services',
    description: 'Developing high-throughput microservices utilizing Go’s native concurrency primitives (goroutines and channels), low memory overhead, and lightning-fast compilation.',
    useCase: 'Building high-throughput gateway proxies and background batch workers with sub-millisecond execution.',
    tags: ['Goroutines', 'Channels', 'Standard Library', 'Zero-Allocation I/O'],
    status: 'ACTIVE IMPLEMENTATION'
  },
  {
    id: 'microservices',
    title: 'MICROSERVICES ARCHITECTURE',
    subtitle: 'Decoupled Domain Services & Service Discovery',
    description: 'Structuring resilient, loosely-coupled distributed domains with bounded contexts, gRPC communication protocols, independent deployment lifecycles, and centralized observability.',
    useCase: 'Refactoring monolithic systems into independently scalable authentication, payment, and telemetry services.',
    tags: ['Bounded Context', 'API Gateway', 'gRPC / Protobuf', 'Circuit Breaker'],
    status: 'DEEP STUDY'
  },
  {
    id: 'kafka',
    title: 'APACHE KAFKA',
    subtitle: 'Distributed Event Streaming & Partitioned Message Logs',
    description: 'Architecting fault-tolerant streaming pipelines capable of processing thousands of events per second with immutable append-only commit logs and consumer group rebalancing.',
    useCase: 'Designing real-time audit logging and asynchronous event fan-out across multiple internal services.',
    tags: ['Brokers', 'Topic Partitions', 'Consumer Groups', 'Exactly-Once Semantics'],
    status: 'PROTOTYPING LABS'
  },
  {
    id: 'event-driven',
    title: 'EVENT-DRIVEN ARCHITECTURE',
    subtitle: 'Asynchronous State Propagation & Loose Coupling',
    description: 'Transitioning from request-response synchronous bottlenecks to choreographies powered by domain events, dead-letter queues, and event sourcing patterns.',
    useCase: 'Instant webhook fan-out, inventory reservation triggers, and real-time notification dispatches.',
    tags: ['Domain Events', 'Pub/Sub', 'Event Sourcing', 'Idempotent Consumers'],
    status: 'ACTIVE EXPLORATION'
  },
  {
    id: 'distributed-systems',
    title: 'DISTRIBUTED SYSTEMS',
    subtitle: 'Consensus, Partition Tolerance & Data Consistency',
    description: 'Studying the fundamental trade-offs of distributed computing: CAP theorem, eventual consistency models, distributed locking algorithms, and fault recovery protocols.',
    useCase: 'Designing multi-node resilient databases and distributed rate limiters across multi-region edge nodes.',
    tags: ['CAP Theorem', 'Raft / Paxos Consensus', 'Distributed Locks', 'Eventual Consistency'],
    status: 'RESEARCH & BENCHMARKING'
  }
];
