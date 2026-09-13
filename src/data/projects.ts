import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'vesant-ai',
    number: '01',
    title: 'VESANT AI',
    tagline: 'Enterprise Conversational Intelligence & Multi-Tenant Agent Engine',
    category: 'System Architecture & AI Platform',
    role: 'Full Stack System Engineer',
    clientOrContext: 'Enterprise AI & Automation Platform',
    summary: 'A high-throughput conversational AI workflow orchestrator integrating streaming LLM responses, custom prompt engineering pipelines, and multi-tenant telemetry dashboards.',
    description: 'Vesant AI was engineered to bridge large language model capabilities with real-time enterprise workflow automation. The platform features dynamic tool calling, context window compaction, secure multi-tenant workspace isolation, and ultra-responsive WebSocket streaming for natural dialogue latency.',
    technologies: [
      'React.js',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
      'WebSockets',
      'MongoDB Atlas',
      'Redis Cache',
      'JWT Auth'
    ],
    architecture: {
      frontend: 'Next.js App Router with reactive state management, streaming markdown parser, and custom telemetry charts.',
      backend: 'Node.js Express micro-layer orchestrating asynchronous token streams, rate-limiting, and LLM prompt chaining.',
      database: 'MongoDB Atlas with indexed tenant partitions and Redis in-memory session persistence.',
      infrastructure: 'Dockerized microservice deployment with horizontal load balancing and automated health probes.',
      keyFlow: 'Client Prompt → Edge Gateway → Token Buffer & Tokenizer → Context Retrieval → Streaming LLM Response → Real-Time Client Dispatch.'
    },
    metricsAndHighlights: [
      'Sub-80ms initial token stream latency over encrypted WebSockets',
      'Multi-tenant workspace isolation with strict RBAC access controls',
      'Dynamic fallback routing across multiple AI model endpoints',
      'Interactive prompt analytics and query token usage monitoring'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Handling bursty LLM token streaming without dropping client connections or freezing React render cycles.',
        solution: 'Implemented a chunked buffer queue with requestAnimationFrame throttling and memoized markdown stream tokens.'
      },
      {
        challenge: 'Preventing context window overflows across multi-turn complex engineering sessions.',
        solution: 'Built an automated rolling context summarizer that aggregates previous conversation turns into dense vector memories.'
      }
    ],
    accentColor: '#3FB950',
    previewType: 'ai-agent'
  },
  {
    id: 'payment-webhook-system',
    number: '02',
    title: 'PAYMENT / WEBHOOK SYSTEM',
    tagline: 'Idempotent Webhook Processing Engine & Resilient Payment Pipeline',
    category: 'Backend & Financial Infrastructure',
    role: 'Lead Backend Engineer',
    clientOrContext: 'BotCalm Core Infrastructure',
    summary: 'A mission-critical payment integration and asynchronous webhook dispatching engine built with cryptographic signature verification, guaranteed idempotency, and exponential backoff retry queues.',
    description: 'Financial transactions demand zero data loss and bulletproof consistency. This system processes incoming payment events from multiple payment gateways, guarantees strict idempotency via distributed lock primitives, and fans out reconciled state updates to internal accounting and subscription services.',
    technologies: [
      'Node.js',
      'TypeScript',
      'Express.js',
      'PostgreSQL',
      'Prisma ORM',
      'Redis Distributed Locks',
      'HMAC SHA-256',
      'Docker'
    ],
    architecture: {
      frontend: 'Administrative financial audit console with real-time event ledger, replay triggers, and dead-letter queue inspector.',
      backend: 'Hardened Express.js pipeline with middleware signature verification, payload sanitization, and idempotent key deduplication.',
      database: 'PostgreSQL with transactional ACID guarantees and strict unique constraints on transaction hash IDs.',
      infrastructure: 'Isolated VPC subnet with encrypted webhook receivers and automated TLS termination.',
      keyFlow: 'Gateway Webhook → HMAC Validation → Idempotency Check in Redis → ACID PostgreSQL Transaction → Async Event Broker → Subscriber Replay.'
    },
    metricsAndHighlights: [
      '100% duplicate transaction prevention using Redis distributed mutex locks',
      'Automated dead-letter queue (DLQ) with configurable exponential backoff retry policies',
      'Cryptographic HMAC signature validation with replay-attack timestamp drift windows',
      'Full audit trail logging for SOC2 and financial compliance standards'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Payment gateways occasionally firing out-of-order webhook events for refund and settlement cycles.',
        solution: 'Implemented state-machine event versioning where transition rules only accept valid state transitions based on monotonic event timestamps.'
      },
      {
        challenge: 'High concurrency spikes during flash sales causing database transaction lock contention.',
        solution: 'Introduced an in-memory Redis ingestion buffer that dequeues events in sequential batches per tenant key.'
      }
    ],
    accentColor: '#58A6FF',
    previewType: 'webhook-pipeline'
  },
  {
    id: 'hr-management-system',
    number: '03',
    title: 'HR MANAGEMENT SYSTEM',
    tagline: 'Enterprise Role-Based Access Control, Attendance & Payroll Platform',
    category: 'Full Stack Enterprise Application',
    role: 'Full Stack System Engineer',
    clientOrContext: 'Corporate Workforce Operations',
    summary: 'A unified enterprise human resource platform orchestrating fine-grained role-based permissions (RBAC), automated biometric attendance logging, leave approval workflows, and payroll generation.',
    description: 'Designed to replace fragmented legacy spreadsheets with a secure, centralized system. Features hierarchical team structures, automated overtime and tax calculation algorithms, secure document vaults, and comprehensive employee lifecycle tracking.',
    technologies: [
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT / RBAC',
      'Framer Motion'
    ],
    architecture: {
      frontend: 'React dashboard with dynamic navigation trees derived from user permission bitmasks, responsive data tables, and export utilities.',
      backend: 'RESTful API with granular middleware authorization checks, automated scheduled cron workers for daily payroll & leave accrual.',
      database: 'MongoDB with denormalized department trees and time-series attendance records.',
      infrastructure: 'Containerized deployment behind reverse proxy with strict CORS and CSP headers.',
      keyFlow: 'Employee Action → Token & Permission Bitmask Validation → Schema Sanitization (Zod) → Database Mutation → Audit Log Emission.'
    },
    metricsAndHighlights: [
      'Fine-grained RBAC with 8 configurable permission levels across departments',
      'Automated payroll ledger generation supporting customized tax and bonus deductions',
      'Real-time attendance anomaly detection with geolocation and biometric verification hooks',
      'Instant PDF export for compliance reports, payslips, and tax filings'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Complex permission inheritance across matrix management organizations.',
        solution: 'Designed a hierarchical bitwise permission mask system that calculates effective rights in O(1) time.'
      },
      {
        challenge: 'Heavy queries when calculating monthly payroll across hundreds of employees with diverse overtime rules.',
        solution: 'Optimized MongoDB aggregation pipelines with compound indexes, reducing batch processing from minutes to 4.2 seconds.'
      }
    ],
    accentColor: '#A371F7',
    previewType: 'rbac-system'
  },
  {
    id: 'animal-clinic',
    number: '04',
    title: 'ANIMAL CLINIC',
    tagline: 'Veterinary Clinical Management & Real-Time Patient Scheduling',
    category: 'Full Stack Medical & Scheduling System',
    role: 'System Architect & Developer',
    clientOrContext: 'Healthcare & Veterinary Services',
    summary: 'An end-to-end clinical workflow suite enabling veterinarian schedule synchronization, medical record versioning, prescription tracking, and automated client SMS/email reminders.',
    description: 'Built for high-paced veterinary hospitals requiring rapid patient intake, historical medical record comparison, vaccine schedule calculation, and pharmacy inventory deduction upon diagnosis creation.',
    technologies: [
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Socket.IO',
      'Zod',
      'Framer Motion'
    ],
    architecture: {
      frontend: 'Interactive multi-room calendar grid with drag-and-drop appointment reallocation and patient vitals charts.',
      backend: 'Express.js API with Socket.IO channels broadcasting room occupancy updates and emergency triage alerts.',
      database: 'Relational PostgreSQL storing detailed patient histories, vaccination timelines, and inventory batch IDs.',
      infrastructure: 'Cloud deployment with automated database snapshots and encrypted PHI data fields.',
      keyFlow: 'Patient Intake → Room Allocation Event → Doctor Diagnosis & Rx Input → Automatic Inventory Deduction → Client Alert.'
    },
    metricsAndHighlights: [
      'Live room status synchronization across front desk and examination bays',
      'Vaccination timeline calculator with predictive booster reminder triggers',
      'Integrated pharmacy batch inventory tracking with minimum-threshold alarms',
      'Clean, accessible medical charting interface optimized for fast clinical data entry'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Preventing double-booking across shared specialized surgical equipment and doctor rosters.',
        solution: 'Implemented PostgreSQL exclusion constraints with range types to disallow overlapping appointment intervals at the database engine level.'
      },
      {
        challenge: 'Ensuring offline resilience in clinics with intermittent network connectivity.',
        solution: 'Constructed an IndexedDB local caching layer with optimistic updates and background sync reconciliation.'
      }
    ],
    accentColor: '#D29922',
    previewType: 'clinic-system'
  },
  {
    id: 'aura-furniture',
    number: '05',
    title: 'AURA FURNITURE',
    tagline: 'Editorial E-Commerce Platform & High-Performance Headless Storefront',
    category: 'Full Stack E-Commerce & Interactive Web',
    role: 'Lead Frontend & Systems Developer',
    clientOrContext: 'Modern Architectural Living Brand',
    summary: 'A minimalist, high-performance headless digital storefront pairing editorial aesthetic typography with real-time stock synchronization, fast checkout pipelines, and custom product configurators.',
    description: 'Aura Furniture blends luxury Scandinavian aesthetic minimalism with robust modern web engineering. Built with sub-second page transitions, dynamic cart state management, and an administrative stock control interface.',
    technologies: [
      'React.js',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Node.js',
      'PostgreSQL',
      'Stripe SDK',
      'Framer Motion'
    ],
    architecture: {
      frontend: 'Next.js App Router with server-side rendered catalog pages, client-side Zustand cart persist, and micro-animations.',
      backend: 'Node.js service handling payment intent sessions, inventory reservation locks, and shipping rate calculations.',
      database: 'PostgreSQL storing product variants, dimensions, material options, and customer order history.',
      infrastructure: 'Edge CDN caching for image assets and dynamic API route acceleration.',
      keyFlow: 'Product Customization → Cart State Hydration → Stripe Checkout Intent → Inventory Lock → Order Confirmation.'
    },
    metricsAndHighlights: [
      'Sub-second page load times with Next.js image optimization and edge caching',
      'Real-time inventory reservation preventing overselling of limited-run furniture pieces',
      'Custom 360-degree fabric and finish previewer with smooth material switches',
      'Seamless checkout flow with automated tax calculation and international shipping quotes'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Rendering high-resolution product photography without sacrificing Core Web Vitals or mobile performance.',
        solution: 'Configured progressive WebP/AVIF srcset delivery with blur-up placeholders and intersection observer prefetching.'
      },
      {
        challenge: 'Synchronizing client cart state across browser tabs and devices.',
        solution: 'Used Zustand with cross-tab BroadcastChannel synchronization and optimistic server validation.'
      }
    ],
    accentColor: '#3FB950',
    previewType: 'e-commerce'
  }
];
