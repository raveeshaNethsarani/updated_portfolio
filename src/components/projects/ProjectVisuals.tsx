import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Cpu,
  Lock,
  RefreshCw,
  Server,
  Zap,
  CheckCircle2,
  Database,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectVisualsProps {
  project: ProjectItem;
}

export const ProjectVisuals: React.FC<ProjectVisualsProps> = ({ project }) => {
  switch (project.previewType) {
    case 'ai-agent':
      return <AIAgentVisual />;
    case 'webhook-pipeline':
      return <WebhookPipelineVisual />;
    case 'rbac-system':
      return <RBACSystemVisual />;
    case 'clinic-system':
      return <ClinicSystemVisual />;
    case 'e-commerce':
      return <EcommerceVisual />;
    default:
      return <DefaultSystemVisual project={project} />;
  }
};

/* 01: Vesant AI Interactive Stream Visualizer */
const AIAgentVisual: React.FC = () => {
  const [tokens, setTokens] = useState<string[]>(['SELECT', 'TENANT', 'VPC_ROUTE', 'STREAM_OK']);
  const [streamActive, setStreamActive] = useState(true);

  useEffect(() => {
    const vocab = ['ORCHESTRATE', 'LATENCY_42MS', 'COMPACT_CTX', 'WEBSOCKET_OPEN', 'VECTOR_EMBED', 'TOKEN_DISPATCH'];
    const interval = setInterval(() => {
      setTokens((prev) => {
        const nextWord = vocab[Math.floor(Math.random() * vocab.length)];
        const updated = [...prev.slice(1), nextWord];
        return updated;
      });
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#0D1117] border border-[#30363D] rounded-xl p-5 font-mono text-xs flex flex-col justify-between select-none relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-ping" />
          <span className="text-[#C9D1D9] font-bold">VESANT_AI // STREAM_ENGINE</span>
        </div>
        <span className="text-[10px] text-[#3FB950] bg-[#3FB950]/10 px-2 py-0.5 rounded border border-[#3FB950]/30">
          WS: LIVE (82ms)
        </span>
      </div>

      {/* Real-time Streaming Pipeline Diagram */}
      <div className="my-4 space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="p-2 bg-[#161B22] border border-[#30363D] rounded">
            <span className="text-[#8B949E] block">PROMPT_INGEST</span>
            <span className="text-[#58A6FF] font-semibold">TOKENIZED</span>
          </div>
          <div className="p-2 bg-[#161B22] border border-[#30363D] rounded">
            <span className="text-[#8B949E] block">CONTEXT_REDUCE</span>
            <span className="text-[#A371F7] font-semibold">VECTOR_SYNC</span>
          </div>
          <div className="p-2 bg-[#161B22] border border-[#30363D] rounded">
            <span className="text-[#8B949E] block">OUTPUT_STREAM</span>
            <span className="text-[#3FB950] font-semibold">CHUNKS</span>
          </div>
        </div>

        {/* Live Token Buffer Stream */}
        <div className="p-3 bg-[#161B22]/80 border border-[#30363D] rounded-lg">
          <div className="text-[10px] text-[#8B949E] mb-2 flex items-center justify-between">
            <span>LIVE CHUNK BUFFER:</span>
            <span className="text-[#3FB950]">24.8 T/S</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tokens.map((token, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-0.5 rounded bg-[#21262D] text-[#3FB950] border border-[#30363D] text-[10px]"
              >
                {token}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-[#8B949E] border-t border-[#30363D] pt-2">
        <span>TENANT: ENTERPRISE_SECURE_01</span>
        <span>PROTOCOL: AES-256</span>
      </div>
    </div>
  );
};

/* 02: Payment / Webhook Pipeline Visualizer */
const WebhookPipelineVisual: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    { title: 'HMAC_VERIFY', status: 'PASS (SHA-256)', color: '#58A6FF' },
    { title: 'IDEMPOTENCY_LOCK', status: 'REDIS_MUTEX_ACQUIRED', color: '#3FB950' },
    { title: 'POSTGRES_TX', status: 'ACID_COMMITTED', color: '#A371F7' },
    { title: 'EVENT_DISPATCH', status: 'STATUS: 200_OK', color: '#3FB950' }
  ];

  return (
    <div className="w-full h-full bg-[#0D1117] border border-[#30363D] rounded-xl p-5 font-mono text-xs flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-[#58A6FF]" />
          <span className="text-[#C9D1D9] font-bold">WEBHOOK_DISPATCHER // V2</span>
        </div>
        <span className="text-[10px] text-[#58A6FF] bg-[#58A6FF]/10 px-2 py-0.5 rounded border border-[#58A6FF]/30">
          IDEMPOTENCY: 100%
        </span>
      </div>

      <div className="my-4 space-y-2">
        {stages.map((st, i) => (
          <div
            key={i}
            className={`p-2.5 rounded-lg border flex items-center justify-between transition-all duration-300 ${
              activeStage === i
                ? 'bg-[#161B22] border-[#58A6FF] text-[#C9D1D9] shadow-md'
                : 'bg-[#161B22]/40 border-[#30363D]/60 text-[#8B949E]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#8B949E]">0{i + 1}</span>
              <span className="font-semibold">{st.title}</span>
            </div>
            <span className="text-[10px]" style={{ color: activeStage === i ? st.color : '#8B949E' }}>
              {st.status}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] text-[#8B949E] border-t border-[#30363D] pt-2">
        <span>DLQ: 0 REJECTED</span>
        <span>LATENCY: 14MS</span>
      </div>
    </div>
  );
};

/* 03: HR Management RBAC System Visualizer */
const RBACSystemVisual: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0D1117] border border-[#30363D] rounded-xl p-5 font-mono text-xs flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#A371F7]" />
          <span className="text-[#C9D1D9] font-bold">RBAC // ACCESS_MASK</span>
        </div>
        <span className="text-[10px] text-[#A371F7] bg-[#A371F7]/10 px-2 py-0.5 rounded border border-[#A371F7]/30">
          8 ROLES // ACTIVE
        </span>
      </div>

      <div className="my-4 space-y-2 text-[11px]">
        <div className="p-2.5 bg-[#161B22] border border-[#30363D] rounded-lg flex items-center justify-between">
          <span className="text-[#C9D1D9]">SUPER_ADMIN</span>
          <span className="text-[#3FB950] font-bold">BITMASK: 0b11111111</span>
        </div>
        <div className="p-2.5 bg-[#161B22] border border-[#30363D] rounded-lg flex items-center justify-between">
          <span className="text-[#C9D1D9]">HR_MANAGER</span>
          <span className="text-[#58A6FF] font-bold">BITMASK: 0b01111100</span>
        </div>
        <div className="p-2.5 bg-[#161B22] border border-[#30363D] rounded-lg flex items-center justify-between">
          <span className="text-[#C9D1D9]">TEAM_LEAD</span>
          <span className="text-[#A371F7] font-bold">BITMASK: 0b00011100</span>
        </div>
        <div className="p-2.5 bg-[#161B22] border border-[#30363D] rounded-lg flex items-center justify-between">
          <span className="text-[#C9D1D9]">EMPLOYEE</span>
          <span className="text-[#8B949E] font-bold">BITMASK: 0b00000001</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-[#8B949E] border-t border-[#30363D] pt-2">
        <span>PAYROLL_JOB: EXECUTED</span>
        <span>AUTH: JWT_ROTATION</span>
      </div>
    </div>
  );
};

/* 04: Animal Clinic Scheduling Visualizer */
const ClinicSystemVisual: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0D1117] border border-[#30363D] rounded-xl p-5 font-mono text-xs flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[#D29922]" />
          <span className="text-[#C9D1D9] font-bold">CLINICAL_ROOM_SYNC</span>
        </div>
        <span className="text-[10px] text-[#D29922] bg-[#D29922]/10 px-2 py-0.5 rounded border border-[#D29922]/30">
          SOCKET.IO LIVE
        </span>
      </div>

      <div className="my-4 grid grid-cols-2 gap-2 text-[10px]">
        <div className="p-3 bg-[#161B22] border border-[#3FB950]/50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#C9D1D9] font-bold">EXAM_BAY_01</span>
            <span className="w-2 h-2 rounded-full bg-[#3FB950]" />
          </div>
          <span className="text-[#3FB950]">IN_CONSULTATION</span>
          <span className="text-[#8B949E] block mt-1">PATIENT: #VN-8021</span>
        </div>

        <div className="p-3 bg-[#161B22] border border-[#58A6FF]/50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#C9D1D9] font-bold">SURGERY_ROOM</span>
            <span className="w-2 h-2 rounded-full bg-[#58A6FF]" />
          </div>
          <span className="text-[#58A6FF]">PREPPED</span>
          <span className="text-[#8B949E] block mt-1">INTERVAL: LOCKED</span>
        </div>

        <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#C9D1D9] font-bold">PHARMACY</span>
            <span className="w-2 h-2 rounded-full bg-[#D29922]" />
          </div>
          <span className="text-[#D29922]">RX_DISPENSE</span>
          <span className="text-[#8B949E] block mt-1">AUTO_DEDUCT_OK</span>
        </div>

        <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#C9D1D9] font-bold">TRIAGE</span>
            <span className="w-2 h-2 rounded-full bg-[#8B949E]" />
          </div>
          <span className="text-[#8B949E]">STANDBY</span>
          <span className="text-[#8B949E] block mt-1">WAIT_TIME: 0M</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-[#8B949E] border-t border-[#30363D] pt-2">
        <span>POSTGRES EXCLUSION: ACTIVE</span>
        <span>SYNC: REALTIME</span>
      </div>
    </div>
  );
};

/* 05: Aura Furniture Headless Storefront Visualizer */
const EcommerceVisual: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0D1117] border border-[#30363D] rounded-xl p-5 font-mono text-xs flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#3FB950]" />
          <span className="text-[#C9D1D9] font-bold">AURA // HEADLESS_STORE</span>
        </div>
        <span className="text-[10px] text-[#3FB950] bg-[#3FB950]/10 px-2 py-0.5 rounded border border-[#3FB950]/30">
          EDGE_SSR: 24MS
        </span>
      </div>

      <div className="my-4 space-y-2">
        <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg">
          <div className="flex items-center justify-between text-[10px] text-[#8B949E] mb-1">
            <span>STOCK_MUTEX_LOCK</span>
            <span className="text-[#3FB950]">RESERVED</span>
          </div>
          <div className="text-sm font-display font-bold text-[#C9D1D9]">
            SCANDINAVIAN OAK LOUNGE CHAIR
          </div>
          <div className="text-[11px] text-[#3FB950] mt-1 flex items-center justify-between">
            <span>SKU: #AURA-OK-09</span>
            <span>STRIPE_SESSION: ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 bg-[#161B22] border border-[#30363D] rounded text-center">
            <span className="text-[#8B949E] block">ZUSTAND CART</span>
            <span className="text-[#58A6FF] font-semibold">CROSS-TAB SYNC</span>
          </div>
          <div className="p-2 bg-[#161B22] border border-[#30363D] rounded text-center">
            <span className="text-[#8B949E] block">IMAGE OPTIMIZE</span>
            <span className="text-[#A371F7] font-semibold">AVIF / WEBP</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-[#8B949E] border-t border-[#30363D] pt-2">
        <span>CORE WEB VITALS: 99/100</span>
        <span>EDGE CDN: GLOBAL</span>
      </div>
    </div>
  );
};

const DefaultSystemVisual: React.FC<{ project: ProjectItem }> = ({ project }) => {
  return (
    <div className="w-full h-full bg-[#0D1117] border border-[#30363D] rounded-xl p-5 font-mono text-xs flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
        <span className="text-[#C9D1D9] font-bold">{project.title}</span>
        <span className="text-[10px] text-[#3FB950]">{project.category}</span>
      </div>
      <div className="p-4 bg-[#161B22] rounded-lg border border-[#30363D]">
        <p className="text-xs text-[#8B949E]">{project.summary}</p>
      </div>
      <div className="text-[10px] text-[#8B949E]">SYSTEM ENGINE // RAVEESHA</div>
    </div>
  );
};
