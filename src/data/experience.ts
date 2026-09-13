import { ExperienceItem, EducationItem } from '../types';

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: 'BotCalm (Pvt) Ltd',
    role: 'Full Stack System Engineer',
    period: 'Present',
    status: 'CURRENT ROLE',
    location: 'Sri Lanka (Remote / Hybrid)',
    overview: 'Engineering robust full-stack production systems, resilient microservice APIs, real-time event pipelines, and secure enterprise administrative dashboards. Responsible for the end-to-end lifecycle of critical digital products from architectural design to deployment and live system observability.',
    focusAreas: [
      {
        title: 'APIs & Backend Systems',
        description: 'Architecting high-throughput RESTful endpoints and microservices with strict input validation, rate limiting, and optimized query pipelines.',
        tags: ['Node.js', 'Express.js', 'REST Architecture', 'API Gateways']
      },
      {
        title: 'Authentication & RBAC',
        description: 'Designing fine-grained role-based access control, cryptographic token rotation, and multi-tenant security layers.',
        tags: ['JWT', 'RBAC Bitmasks', 'Session Security', 'OAuth']
      },
      {
        title: 'Dashboards & System Telemetry',
        description: 'Building dense, responsive enterprise dashboards with real-time streaming charts, audit trail inspectors, and health diagnostics.',
        tags: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS']
      },
      {
        title: 'Webhooks & Asynchronous Processing',
        description: 'Engineering guaranteed-delivery webhook pipelines featuring cryptographic signature checks, distributed lock deduplication, and exponential backoff retry workers.',
        tags: ['Idempotency', 'HMAC SHA-256', 'Redis Locks', 'Dead Letter Queues']
      },
      {
        title: 'Databases & Performance Tuning',
        description: 'Structuring relational and document schemas, establishing index optimization strategies, and executing zero-downtime database migrations.',
        tags: ['PostgreSQL', 'MongoDB Atlas', 'Prisma ORM', 'Compound Indexing']
      },
      {
        title: 'Production Debugging & Reliability',
        description: 'Diagnosing critical edge-case race conditions, memory leaks, and concurrency bottlenecks under live production workloads.',
        tags: ['Observability', 'Profiling', 'Log Aggregation', 'Root Cause Analysis']
      },
      {
        title: 'Compliance & Audit Systems',
        description: 'Implementing tamper-proof audit trails, automated compliance reports, and strict data retention controls.',
        tags: ['Data Integrity', 'Audit Logs', 'Security Standards', 'Encryption']
      },
      {
        title: 'Payment Systems & Reconciliations',
        description: 'Integrating multi-currency payment gateway APIs, automated settlement ledger reconciliations, and instant refund verification loops.',
        tags: ['Payment Gateways', 'ACID Transactions', 'Ledger Consistency', 'Stripe']
      }
    ]
  }
];

export const EDUCATION_DATA: EducationItem = {
  institution: 'Sri Lanka Institute of Advanced Technological Education (SLIATE), Galle',
  degree: 'Higher National Diploma in Information Technology (HNDIT)',
  department: 'Information Technology Department',
  location: 'Galle, Sri Lanka',
  period: 'Completed with High Distinction',
  highlights: [
    'Comprehensive foundation in Computer Science, Data Structures & Algorithms, and Object-Oriented Software Engineering.',
    'Advanced coursework in Database Management Systems (RDBMS & NoSQL), System Analysis & Design, and Computer Networks.',
    'Hands-on enterprise capstone engineering: full-stack systems with end-to-end security, relational schema modeling, and API development.',
    'Active technical problem solving, agile methodology, and software architecture principles.'
  ]
};
