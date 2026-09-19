import { EducationItem } from '../types';

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
import {
  Database,
  Globe,
  Shield,
  type LucideIcon,
} from 'lucide-react';

export interface ExperienceProject {
  code: string;
  title: string;
  category: string;
  color: string;
  icon: LucideIcon;
  description: string;
  responsibilities: string[];
  stack: string[];
}

export interface ExperienceData {
  company: string;
  role: string;
  period: string;
  status: string;
  location: string;
  overview: string;
  progression: {
    number: string;
    label: string;
    title: string;
    description: string;
  }[];
  projects: ExperienceProject[];
}

export const EXPERIENCE_DATA: ExperienceData[] = [
  {
    company: 'BotCalm (Pvt) Ltd',
    role: 'Full Stack System Engineer Intern',
    period: 'Sep 2025 – Sep 2026',
    status: 'INTERNSHIP',
    location: 'Sri Lanka',

    overview:
      'Worked across multiple software engineering initiatives, progressing from MERN-based application development to Next.js and TypeScript systems, and eventually contributing to Vesant — a multi-tenant enterprise compliance platform built around Go, microservices, PostgreSQL, and distributed infrastructure.',

    progression: [
      {
        number: '01',
        label: 'MERN',
        title: 'Application Foundations',
        description:
          'Built full-stack application features using MongoDB, Express, React, and Node.js, focusing on REST APIs, authentication, permissions, notifications, and cloud-based file management.',
      },
      {
        number: '02',
        label: 'NEXT.JS',
        title: 'Modern Full Stack',
        description:
          'Developed a full-stack HR management system using Next.js, React, TypeScript, and Tailwind CSS with API integration, authentication, responsive interfaces, and theme support.',
      },
      {
        number: '03',
        label: 'GO / SERVICES',
        title: 'Enterprise Systems',
        description:
          'Contributed to Vesant, working across Go services, PostgreSQL, Next.js, microservices, compliance workflows, audit systems, and distributed development infrastructure.',
      },
    ],

    projects: [
      {
        code: 'PRJ-01',
        title: 'Product Management System',
        category: 'MERN APPLICATION',
        color: '#3FB950',
        icon: Database,

        description:
          'Developed a full-stack product management platform using the MERN stack, implementing product workflows, authentication, role-based permissions, notifications, pagination, and cloud-based asset management.',

        responsibilities: [
          'Built responsive React interfaces and reusable components',
          'Developed REST APIs using Node.js and Express',
          'Implemented JWT authentication and role-based permissions',
          'Integrated MongoDB for product and user data',
          'Implemented pagination and backend notification workflows',
          'Integrated Cloudinary and AWS S3 for file and image uploads',
          'Implemented email workflows using EmailJS and Nodemailer',
        ],

        stack: [
          'MongoDB',
          'Express',
          'React',
          'Node.js',
          'JWT',
          'Cloudinary',
          'AWS S3',
        ],
      },

      {
        code: 'PRJ-02',
        title: 'HR Management System',
        category: 'NEXT.JS APPLICATION',
        color: '#58A6FF',
        icon: Globe,

        description:
          'Built a full-stack HR management system using Next.js, React, TypeScript, and Tailwind CSS, covering employee management workflows, API integration, authentication, authorization, and responsive interface development.',

        responsibilities: [
          'Developed frontend interfaces using Next.js and React',
          'Implemented backend functionality and REST API integration',
          'Built employee and HR management workflows',
          'Implemented authentication and authorization flows',
          'Tested and validated APIs using Postman',
          'Developed responsive interfaces with Tailwind CSS',
          'Implemented dark and light theme support',
        ],

        stack: [
          'Next.js',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'REST API',
          'Postman',
        ],
      },

      {
        code: 'PRJ-03',
        title: 'Vesant Compliance Platform',
        category: 'ENTERPRISE / MICROSERVICES',
        color: '#A371F7',
        icon: Shield,

        description:
          'Contributed to Vesant, a multi-tenant enterprise compliance platform supporting AML, KYC, fraud monitoring, case management, and tax compliance workflows. Worked across frontend and backend services while gaining practical experience with Go, PostgreSQL, microservices, and distributed infrastructure.',

        responsibilities: [
          'Developed enterprise interfaces using Next.js, React, and TypeScript',
          'Contributed to Go-based backend services and REST APIs',
          'Worked with PostgreSQL and database-backed service workflows',
          'Implemented and maintained RBAC and permission-based workflows',
          'Worked across AML, KYC, fraud monitoring, and tax compliance modules',
          'Worked on evidence request and case management workflows',
          'Worked on notification and user-facing workflow states',
          'Investigated and fixed audit logging inconsistencies across modules',
          'Worked on tax compliance exports and reporting workflows',
          'Worked on customer profile and transaction-related workflows',
          'Debugged distributed frontend and backend issues across services',
          'Worked with Docker, Kubernetes, Redis, Kafka, and service infrastructure',
        ],

        stack: [
          'Next.js',
          'React',
          'TypeScript',
          'Go',
          'PostgreSQL',
          'Redis',
          'Kafka',
          'Docker',
          'Kubernetes',
        ],
      },
    ],
  },
];
