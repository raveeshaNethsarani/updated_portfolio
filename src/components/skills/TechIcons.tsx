import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
  colored?: boolean;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = 'w-4 h-4',
  colored = false
}) => {
  const norm = name.toLowerCase().replace(/[\s\.\/\-]/g, '');

  // 1. FRONTEND
  if (norm.includes('reactjs') || (norm.includes('react') && !norm.includes('router') && !norm.includes('hook'))) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor">
        <circle cx="0" cy="0" r="2.05" fill={colored ? '#61DAFB' : 'currentColor'} stroke="none" />
        <g stroke={colored ? '#61DAFB' : 'currentColor'} strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  if (norm.includes('nextjs') || norm.includes('next')) {
    return (
      <svg className={className} viewBox="0 0 180 180" fill="currentColor">
        <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
          <circle cx="90" cy="90" fill="black" r="90" />
        </mask>
        <g mask="url(#mask0_next)">
          <circle cx="90" cy="90" data-framer-name="circle" fill={colored ? '#000000' : 'currentColor'} r="90" stroke="currentColor" strokeWidth="6" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
          <rect fill="white" height="72" width="12" x="115" y="54" />
        </g>
      </svg>
    );
  }

  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#3178C6' : 'currentColor'}>
        <path d="M1.125 0C0.502 0 0 0.502 0 1.125v21.75C0 23.498 0.502 24 1.125 24h21.75c0.623 0 1.125-0.502 1.125-1.125V1.125C24 0.502 23.498 0 22.875 0H1.125zM12.62 9.07h7.24v2.09h-2.48v9.77h-2.28v-9.77h-2.48V9.07zm-7.65 3.38c.87-.87 2.06-1.39 3.48-1.39 1.49 0 2.64.55 3.44 1.47.78.9 1.15 2.1 1.15 3.52 0 1.48-.38 2.68-1.17 3.59-.81.93-1.99 1.44-3.52 1.44-1.19 0-2.22-.33-2.99-.94-.78-.62-1.22-1.48-1.33-2.58h2.24c.08.57.3 1 .66 1.3.36.29.83.44 1.42.44.75 0 1.34-.26 1.76-.77.41-.51.62-1.25.62-2.19 0-.96-.2-1.7-.6-2.2-.41-.51-1-.77-1.77-.77-.66 0-1.19.18-1.57.54-.38.36-.6.86-.67 1.49H4.97v-8.4h6.81v2.09H7.13v2.41z" fillRule="evenodd" />
      </svg>
    );
  }

  if (norm.includes('javascript') || norm === 'js') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#F7DF1E' : 'currentColor'}>
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.888-1.798-2.617-2.502-.857-.373-1.464-.672-1.748-.945-.285-.274-.428-.633-.428-1.077 0-.466.164-.847.493-1.144.329-.296.792-.444 1.39-.444.606 0 1.072.158 1.398.473.326.315.52.748.581 1.298l2.083-.342c-.151-1.053-.599-1.859-1.344-2.417-.745-.559-1.688-.838-2.829-.838-1.26 0-2.268.358-3.024 1.074-.756.716-1.134 1.636-1.134 2.76 0 1.066.336 1.916 1.008 2.551.672.635 1.613 1.11 2.822 1.425.96.252 1.603.526 1.928.822.325.297.487.697.487 1.202 0 .53-.198.966-.594 1.308-.396.342-.962.513-1.698.513-.787 0-1.408-.198-1.863-.594-.455-.396-.713-.984-.774-1.764l-2.138.252c.162 1.332.695 2.33 1.599 2.993.904.664 2.052.996 3.444.996 1.434 0 2.569-.374 3.405-1.122.836-.749 1.254-1.724 1.254-2.925 0-.74-.153-1.365-.459-1.874zm-9.845-.572c-.172-.252-.408-.378-.708-.378-.344 0-.584.116-.72.348-.136.232-.204.6-.204 1.104v4.716h-2.124v-8.226h2.124v1.176c.27-.42.612-.738 1.026-.954.414-.216.894-.324 1.44-.324.9 0 1.608.288 2.124.864.516.576.774 1.404.774 2.484v5.016h-2.124v-4.644c0-.528-.066-.924-.198-1.188z" />
      </svg>
    );
  }

  if (norm.includes('html5') || norm === 'html') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#E34F26' : 'currentColor'}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.485 10.53.003-.28 3.097H5.86l.22 2.485h7.794l-.37 4.148-3.527.95-3.52-.953-.228-2.568H3.743l.42 5.03 7.814 2.167 7.82-2.167 1.09-12.242.703-7.447z" />
      </svg>
    );
  }

  if (norm.includes('css3') || norm === 'css') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#1572B6' : 'currentColor'}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413H5.41l.213 2.485h12.512l-.28 3.097H5.86l.22 2.485h9.852l-.37 4.148-3.585.968-3.58-.968-.228-2.568H5.67l.42 5.03 5.887 1.632 5.892-1.632 1.09-12.242.703-7.447z" />
      </svg>
    );
  }

  if (norm.includes('tailwind')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#38BDF8' : 'currentColor'}>
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    );
  }

  if (norm.includes('shadcn')) {
    return (
      <svg className={className} viewBox="0 0 256 256" fill="currentColor">
        <path d="M208 128l-80 80M192 40L40 192" stroke={colored ? '#FFFFFF' : 'currentColor'} strokeWidth="24" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('router')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#F44250' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    );
  }

  if (norm.includes('framer') || norm.includes('motion')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#0055FF' : 'currentColor'}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    );
  }

  // 2. STATE & DATA
  if (norm.includes('zustand')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#443E38' : 'currentColor'} strokeWidth="1.75" strokeLinecap="round">
        <path d="M12 3c-4.5 0-7 2.5-7 6 0 2 .8 3.8 2.2 4.9C6.5 15.5 6 18 6 21h12c0-3-.5-5.5-1.2-7.1 1.4-1.1 2.2-2.9 2.2-4.9 0-3.5-2.5-6-7-6z" fill={colored ? '#B8860B' : 'currentColor'} fillOpacity="0.2" />
        <circle cx="9" cy="9" r="1" fill="currentColor" />
        <circle cx="15" cy="9" r="1" fill="currentColor" />
        <ellipse cx="12" cy="13" rx="2" ry="1" fill="currentColor" />
      </svg>
    );
  }

  if (norm.includes('tanstack') || norm.includes('query')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#FF4154' : 'currentColor'}>
        <circle cx="12" cy="12" r="10" stroke={colored ? '#FF4154' : 'currentColor'} strokeWidth="2" fill="none" />
        <path d="M12 6v6l4 2" stroke={colored ? '#FFD700' : 'currentColor'} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('contextapi') || norm.includes('context')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#58A6FF' : 'currentColor'} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" fill={colored ? '#58A6FF' : 'currentColor'} fillOpacity="0.3" />
        <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
      </svg>
    );
  }

  // 3. FORMS & VALIDATION
  if (norm.includes('hookform')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#EC5990' : 'currentColor'} strokeWidth="2">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill={colored ? '#EC5990' : 'currentColor'} />
        <path d="m9 14 2 2 4-4" stroke={colored ? '#3FB950' : 'currentColor'} />
      </svg>
    );
  }

  if (norm.includes('zod')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#3E67B1' : 'currentColor'}>
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.5l7 3.5v7.2l-7-3.5V9.5zm9 10.7V13l7-3.5v7.2l-7 3.5z" />
        <path d="M8 9h8l-6 6h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  // 4. BACKEND
  if (norm.includes('nodejs') || (norm.includes('node') && !norm.includes('mailer'))) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#5FA04E' : 'currentColor'}>
        <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm0 2.31l8.392 4.845v9.69L12 21.69l-8.392-4.845V7.155L12 2.31zm-1.07 5.61v6.78l5.22-3.01-5.22-3.77z" />
      </svg>
    );
  }

  if (norm.includes('express')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5h-2v-5h2zm0-7h-2V7h2z" fill={colored ? '#F8F9FA' : 'currentColor'} opacity="0.3" />
        <text x="5" y="16" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill={colored ? '#FFFFFF' : 'currentColor'}>ex</text>
      </svg>
    );
  }

  if (norm.includes('restapi') || (norm.includes('rest') && !norm.includes('router'))) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#3FB950' : 'currentColor'} strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="4" width="20" height="6" rx="2" />
        <rect x="2" y="14" width="20" height="6" rx="2" />
        <circle cx="6" cy="7" r="1" fill="currentColor" />
        <circle cx="6" cy="17" r="1" fill="currentColor" />
        <path d="M18 7h.01M18 17h.01M10 7h4M10 17h4" />
      </svg>
    );
  }

  if (norm.includes('java') && !norm.includes('javascript')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#EA2D2E' : 'currentColor'}>
        <path d="M9.06 14.49s-.8 0-1.08.62c-.34.78.36 1.45.36 1.45s-1.01-.15-1.42-.87c-.44-.77.16-1.57.16-1.57s-.8.15-1.06.66c-.34.66.11 1.42.11 1.42s-.98-.31-1.12-1.03c-.15-.75.46-1.39.46-1.39s-1.28.32-1.14 1.34c.15 1.05 1.77 1.83 1.77 1.83s-1.2-.08-1.52-.75c-.32-.67.14-1.29.14-1.29s-.6.41-.6 1.02c0 .94 1.13 1.45 1.13 1.45s-1.49.03-1.63-.82c-.14-.85.73-1.46.73-1.46s-1.41.52-1.16 1.63c.25 1.11 1.95 1.69 1.95 1.69s-1.35.26-2.02-.32c-.67-.58-.28-1.53-.28-1.53s-.4.65-.21 1.37c.19.72 1.04 1.25 1.86 1.39 3.01.51 6.54-.15 8.78-1.43 1.05-.6 1.69-1.37 1.49-2.07-.2-.71-1.07-1.04-1.95-1.04-1.23 0-2.31.54-3.19 1.15z" />
        <path d="M14.53 11.23c1.09-1.23 1.58-2.68 1.16-3.48-.42-.8-1.74-.95-2.83.28-1.09 1.23-1.58 2.68-1.16 3.48.42.8 1.74.95 2.83-.28z" />
      </svg>
    );
  }

  if (norm.includes('springboot') || norm.includes('spring')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#6DB33F' : 'currentColor'}>
        <path d="M21.56 9.38c-.46-3.8-3.32-6.84-7.07-7.3-4.52-.55-8.48 2.37-9.45 6.64-.17.75-.24 1.52-.24 2.28 0 4.14 2.45 7.73 6.06 9.33 3.61 1.6 7.85.92 10.79-1.72 1.32-1.18 1.74-3.08.97-4.66-.46-.94-1.29-1.63-2.28-1.92-1.3-.39-2.73-.13-3.79.7-1.51 1.18-3.6 1.21-5.14.07-1.54-1.14-2.14-3.13-1.47-4.91.67-1.78 2.43-2.92 4.33-2.82 2.35.12 4.29 1.79 4.7 4.1.2 1.12.98 2.04 2.05 2.4 1.07.36 2.27.12 3.1-.63 1.04-.95 1.55-2.34 1.38-3.75z" />
      </svg>
    );
  }

  if (norm === 'go' || norm.includes('golang')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#00ADD8' : 'currentColor'}>
        <path d="M1.54 9.474c.125-.436.31-.837.55-1.196.242-.36.536-.66.883-.896.348-.236.74-.408 1.173-.513.435-.106.898-.16 1.385-.16.593 0 1.14.08 1.636.237.497.158.927.387 1.287.685.36.3.645.666.852 1.097.208.43.328.922.36 1.472h-2.155c-.035-.306-.118-.567-.25-.782-.13-.215-.304-.386-.52-.513-.217-.126-.47-.215-.757-.265-.288-.05-.595-.075-.922-.075-.382 0-.728.048-1.037.143-.31.096-.57.238-.782.427-.21.19-.37.426-.476.71-.106.284-.16.613-.16.985 0 .39.056.73.167 1.02.112.292.275.534.488.728.214.193.475.338.784.433.308.096.653.143 1.036.143.376 0 .71-.05 1.002-.15.294-.1.543-.247.747-.44.205-.195.358-.435.46-.723.1-.287.16-.62.176-.998H5.53v-1.782h4.52v5.334H8.47v-1.12c-.28.39-.64.7-1.08.93-.44.23-.97.35-1.59.35-.55 0-1.04-.08-1.48-.23-.44-.16-.82-.39-1.14-.69-.32-.3-.57-.67-.75-1.1-.18-.44-.27-.94-.27-1.52 0-.58.09-1.1.28-1.554zM13.25 15.65c-.47-.16-.88-.4-1.22-.72-.34-.32-.61-.71-.8-1.17-.19-.46-.28-.99-.28-1.58 0-.58.1-1.1.29-1.56.19-.46.46-.85.81-1.17.35-.32.76-.56 1.24-.72.48-.16 1.01-.24 1.6-.24.58 0 1.11.08 1.58.24.47.16.88.4 1.22.72.34.32.61.71.8 1.17.19.46.28.98.28 1.56 0 .59-.09 1.12-.28 1.58-.19.46-.46.85-.8 1.17-.34.32-.75.56-1.22.72-.47.16-1 .24-1.58.24-.59 0-1.12-.08-1.6-.24zm2.46-1.85c.24-.1.44-.25.6-.45.16-.2.28-.44.36-.72.08-.28.12-.59.12-.93 0-.34-.04-.65-.12-.93-.08-.28-.2-.52-.36-.72-.16-.2-.36-.35-.6-.45-.24-.1-.51-.15-.82-.15-.31 0-.58.05-.82.15-.24.1-.44.25-.6.45-.16.2-.28.44-.36.72-.08.28-.12.59-.12.93 0 .34.04.65.12.93.08.28.2.52.36.72.16.2.36.35.6.45.24.1.51.15.82.15.31 0 .58.05.82-.15z" />
      </svg>
    );
  }

  // 5. DATABASES
  if (norm.includes('mongodb') || norm.includes('atlas')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#47A248' : 'currentColor'}>
        <path d="M12 0s-7.5 7.5-7.5 13.5C4.5 19.5 9 24 12 24s7.5-4.5 7.5-10.5C19.5 7.5 12 0 12 0zm.08 22.8c-.37 0-.74-.03-1.1-.1v-7.39c.35.03.72.05 1.1.05s.75-.02 1.1-.05v7.39c-.36.07-.73.1-1.1.1zm4.9-10.3c-.6 2.3-2.1 4.3-3.8 5.4v-6.9c1.9-.3 3.4-1.3 4.2-2.7.2 1.4.1 2.9-.4 4.2zm-9.8 0c-.5-1.3-.6-2.8-.4-4.2.8 1.4 2.3 2.4 4.2 2.7v6.9c-1.7-1.1-3.2-3.1-3.8-5.4z" />
      </svg>
    );
  }

  if (norm.includes('mongoose')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#880000' : 'currentColor'}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2V11h2v5.5zm0-7.5h-2V7h2v2z" opacity="0.3" />
        <path d="M4 14l4-8 4 6 4-6 4 8H4z" fill={colored ? '#E53E3E' : 'currentColor'} />
      </svg>
    );
  }

  if (norm.includes('postgresql') || norm.includes('postgres')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#336791' : 'currentColor'}>
        <path d="M12.012 0C7.24 0 3.376 3.864 3.376 8.636c0 3.31 1.865 6.183 4.604 7.636v2.182c-1.847.46-3.208 2.12-3.208 4.102h14.478c0-1.982-1.36-3.642-3.208-4.102v-2.182c2.739-1.453 4.604-4.326 4.604-7.636 0-4.772-3.864-8.636-8.636-8.636zm0 2.182c3.565 0 6.454 2.89 6.454 6.454 0 2.766-1.748 5.127-4.223 6.04-.664.246-1.123.882-1.123 1.587v2.191H10.89v-2.191c0-.705-.459-1.341-1.123-1.587-2.475-.913-4.223-3.274-4.223-6.04 0-3.564 2.89-6.454 6.454-6.454z" />
      </svg>
    );
  }

  if (norm.includes('prisma')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#2D3748' : 'currentColor'}>
        <path d="M22.5 19.5L13.5 2.25C13.125 1.5 12.375 1.5 12 2.25L1.5 19.5C1.125 20.25 1.5 21 2.25 21H21.75C22.5 21 22.875 20.25 22.5 19.5ZM12 5.25L18.75 18.75H5.25L12 5.25Z" fill={colored ? '#5A67D8' : 'currentColor'} />
      </svg>
    );
  }

  // 6. AUTHENTICATION & SECURITY
  if (norm.includes('jwt')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#FB015B' : 'currentColor'} strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" fill={colored ? '#FB015B' : 'currentColor'} fillOpacity="0.2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );
  }

  if (norm.includes('firebase')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#FFCA28' : 'currentColor'}>
        <path d="M4.643 19.345L1.082 12.72c-.416-.777-.07-1.745.74-2.083.333-.14.712-.128 1.036.035l2.454 1.233 4.298-8.212c.38-.727 1.272-.999 2-.609.308.165.541.45.642.793l2.253 7.647 3.518-3.518c.57-.57 1.494-.57 2.064 0 .216.216.33.51.317.815l-1.077 10.524H4.643z" />
      </svg>
    );
  }

  if (norm.includes('oauth')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#4285F4' : 'currentColor'} strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (norm.includes('rbac') || norm.includes('security')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#3FB950' : 'currentColor'} strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={colored ? '#3FB950' : 'currentColor'} fillOpacity="0.15" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  // 7. REAL-TIME & COMMUNICATION
  if (norm.includes('socketio') || norm.includes('socket')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#010101' : 'currentColor'}>
        <circle cx="12" cy="12" r="10" stroke={colored ? '#58A6FF' : 'currentColor'} strokeWidth="2" fill="none" />
        <path d="M12 6v12M6 12h12" stroke={colored ? '#3FB950' : 'currentColor'} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill={colored ? '#3FB950' : 'currentColor'} />
      </svg>
    );
  }

  if (norm.includes('websocket')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#3FB950' : 'currentColor'} strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (norm.includes('webhook')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#58A6FF' : 'currentColor'} strokeWidth="2">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 9v12a3 3 0 0 0 3 3h3" />
        <path d="M9 6h6a3 3 0 0 1 3 3v6" />
      </svg>
    );
  }

  if (norm.includes('eventdriven') || norm.includes('event')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#A371F7' : 'currentColor'} strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={colored ? '#A371F7' : 'currentColor'} fillOpacity="0.2" />
      </svg>
    );
  }

  // 8. API & INTEGRATION
  if (norm.includes('axios')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#5A29E4' : 'currentColor'}>
        <path d="M11.025 21.054L2.015 7.917h4.095l6.57 9.873 7.215-9.873h4.09l-9.96 13.137h-3zM15.42 2.946l-3.39 4.63-3.4-4.63H4.515l5.625 7.68 1.89-2.58 1.89 2.58 5.625-7.68h-4.125z" />
      </svg>
    );
  }

  // 9. EMAIL & NOTIFICATIONS
  if (norm.includes('nodemailer') || norm.includes('email')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#22B8CF' : 'currentColor'} strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  }

  if (norm.includes('toast') || norm.includes('notification')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#D29922' : 'currentColor'} strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    );
  }

  // 10. FILE & CLOUD SERVICES
  if (norm.includes('cloudinary')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#3448C5' : 'currentColor'}>
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    );
  }

  if (norm.includes('awss3') || norm.includes('s3') || norm.includes('aws')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={colored ? '#FF9900' : 'currentColor'} strokeWidth="2">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" fill={colored ? '#FF9900' : 'currentColor'} fillOpacity="0.2" />
        <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
      </svg>
    );
  }

  // 11. TESTING
  if (norm.includes('jest')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#C21325' : 'currentColor'}>
        <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm1.75 4.5h-3.5v7.25h3.5V4.5zm0 9h-3.5v2h3.5v-2z" />
      </svg>
    );
  }

  // 12. DEVOPS & DEPLOYMENT
  if (norm === 'git') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#F05032' : 'currentColor'}>
        <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.124 0L8.83 2.564l2.673 2.674a2.25 2.25 0 0 1 2.85 2.85l2.748 2.748a2.25 2.25 0 1 1-1.06 1.06l-2.674-2.674a2.25 2.25 0 0 1-2.85-2.85L7.844 3.7l-7.39 7.39a1.5 1.5 0 0 0 0 2.124l10.478 10.478a1.5 1.5 0 0 0 2.124 0l10.49-10.48a1.5 1.5 0 0 0 0-2.28z" />
      </svg>
    );
  }

  if (norm.includes('github')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#FFFFFF' : 'currentColor'}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }

  if (norm.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#2496ED' : 'currentColor'}>
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m0 2.714h2.118a.186.186 0 00.186-.185V6.289a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.954 0h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H8.075a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m0-2.716h2.119a.186.186 0 00.186-.185V6.289a.186.186 0 00-.186-.185H8.075a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.955 5.43h2.119a.186.186 0 00.186-.185V11.72a.186.186 0 00-.186-.185H5.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m0-2.714h2.119a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186H5.12a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m15.574 1.488c-.07-.367-.375-.623-.746-.623h-1.637a3.02 3.02 0 00-2.827-1.956c-1.393 0-2.583.94-2.935 2.24H.317c-.175 0-.317.142-.317.317C0 19.344 4.545 23.4 11.233 23.4c6.307 0 10.667-3.553 11.134-8.814.195-.084.34-.236.425-.434.126-.29.076-.645-.098-.92z" />
      </svg>
    );
  }

  if (norm.includes('vercel')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#FFFFFF' : 'currentColor'}>
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    );
  }

  if (norm.includes('netlify')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#00C7B7' : 'currentColor'}>
        <path d="M18.88 12.35l-2.14-2.14 2.14-2.14a.75.75 0 000-1.06l-3.39-3.39a.75.75 0 00-1.06 0L12.29 5.76 10.15 3.62a.75.75 0 00-1.06 0L5.7 7.01a.75.75 0 000 1.06l2.14 2.14-2.14 2.14a.75.75 0 000 1.06l3.39 3.39a.75.75 0 001.06 0l2.14-2.14 2.14 2.14a.75.75 0 001.06 0l3.39-3.39a.75.75 0 000-1.06z" />
      </svg>
    );
  }

  // 13. DEVELOPMENT TOOLS
  if (norm.includes('vscode')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#007ACC' : 'currentColor'}>
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
      </svg>
    );
  }

  if (norm.includes('postman')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#FF6C37' : 'currentColor'}>
        <circle cx="12" cy="12" r="10" fill={colored ? '#FF6C37' : 'currentColor'} fillOpacity="0.2" stroke={colored ? '#FF6C37' : 'currentColor'} strokeWidth="1.5" />
        <path d="M14.5 9.5l-5 5M9.5 9.5l5 5" stroke={colored ? '#FF6C37' : 'currentColor'} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('figma')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#F24E1E' : 'currentColor'}>
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" />
        <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill={colored ? '#A259FF' : 'currentColor'} />
        <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill={colored ? '#F24E1E' : 'currentColor'} />
        <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill={colored ? '#FF7262' : 'currentColor'} />
        <circle cx="16" cy="12" r="4" fill={colored ? '#1ABCFE' : 'currentColor'} />
      </svg>
    );
  }

  if (norm.includes('eslint')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#4B32C3' : 'currentColor'}>
        <polygon points="12 2 2 7 2 17 12 22 22 17 22 7 12 2" stroke={colored ? '#4B32C3' : 'currentColor'} strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="3" fill={colored ? '#4B32C3' : 'currentColor'} />
      </svg>
    );
  }

  if (norm.includes('prettier')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#F7B93E' : 'currentColor'}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    );
  }

  if (norm.includes('npm')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#CB3837' : 'currentColor'}>
        <path d="M0 0v24h24V0H0zm20.8 20.8H12v-12h4.8v12h4v-16H3.2v16h5.6v-12H12v12h8.8z" />
      </svg>
    );
  }

  if (norm.includes('yarn')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#2C8EBB' : 'currentColor'}>
        <circle cx="12" cy="12" r="10" stroke={colored ? '#2C8EBB' : 'currentColor'} strokeWidth="2" fill="none" />
        <path d="M8 8l8 8M16 8l-8 8" stroke={colored ? '#2C8EBB' : 'currentColor'} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('kafka')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#231F20' : 'currentColor'}>
        <circle cx="6" cy="12" r="3" fill={colored ? '#E0E0E0' : 'currentColor'} />
        <circle cx="18" cy="6" r="3" fill={colored ? '#E0E0E0' : 'currentColor'} />
        <circle cx="18" cy="18" r="3" fill={colored ? '#E0E0E0' : 'currentColor'} />
        <path d="M8.5 10.5l7-3M8.5 13.5l7 3" stroke={colored ? '#E0E0E0' : 'currentColor'} strokeWidth="2" />
      </svg>
    );
  }

  if (norm.includes('redis')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={colored ? '#DC382D' : 'currentColor'}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" fill={colored ? '#DC382D' : 'currentColor'} />
        <polygon points="12 12 2 17 12 22 22 17 12 12" fill={colored ? '#A8251D' : 'currentColor'} />
      </svg>
    );
  }

  // Fallback generic terminal icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
};
