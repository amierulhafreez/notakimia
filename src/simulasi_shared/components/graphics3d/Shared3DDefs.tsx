import React from 'react';

interface Shared3DDefsProps {
  uid: string;
}

/**
 * Reusable 3D shading gradients, specular highlights, clay/glossy sphere radial gradients,
 * and glassware gradients scoped per simulation ID to prevent SVG ID collisions.
 */
export const Shared3DDefs: React.FC<Shared3DDefsProps> = ({ uid }) => (
  <defs>
    {/* Ambient Floor Shadow */}
    <radialGradient id={`${uid}-floor`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#0f172a" stopOpacity="0.34" />
      <stop offset="65%" stopColor="#0f172a" stopOpacity="0.12" />
      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
    </radialGradient>

    {/* 3D Glossy Glassware Gradient */}
    <linearGradient id={`${uid}-glass`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
      <stop offset="20%" stopColor="#ffffff" stopOpacity="0.32" />
      <stop offset="55%" stopColor="#e2e8f0" stopOpacity="0.16" />
      <stop offset="85%" stopColor="#ffffff" stopOpacity="0.48" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.82" />
    </linearGradient>

    {/* 3D Glass Rim Highlight */}
    <linearGradient id={`${uid}-rim`} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
    </linearGradient>

    {/* 3D Clay/Metallic Spheres */}
    <radialGradient id={`${uid}-sph-blue`} cx="32%" cy="28%" r="68%">
      <stop offset="0%" stopColor="#bae6fd" />
      <stop offset="35%" stopColor="#38bdf8" />
      <stop offset="78%" stopColor="#0284c7" />
      <stop offset="100%" stopColor="#075985" />
    </radialGradient>

    <radialGradient id={`${uid}-sph-indigo`} cx="32%" cy="28%" r="68%">
      <stop offset="0%" stopColor="#ddd6fe" />
      <stop offset="35%" stopColor="#818cf8" />
      <stop offset="78%" stopColor="#4f46e5" />
      <stop offset="100%" stopColor="#312e81" />
    </radialGradient>

    <radialGradient id={`${uid}-sph-emerald`} cx="32%" cy="28%" r="68%">
      <stop offset="0%" stopColor="#a7f3d0" />
      <stop offset="35%" stopColor="#34d399" />
      <stop offset="78%" stopColor="#059669" />
      <stop offset="100%" stopColor="#064e3b" />
    </radialGradient>

    <radialGradient id={`${uid}-sph-rose`} cx="32%" cy="28%" r="68%">
      <stop offset="0%" stopColor="#fecdd3" />
      <stop offset="35%" stopColor="#fb7185" />
      <stop offset="78%" stopColor="#e11d48" />
      <stop offset="100%" stopColor="#881337" />
    </radialGradient>

    <radialGradient id={`${uid}-sph-amber`} cx="32%" cy="28%" r="68%">
      <stop offset="0%" stopColor="#fef08a" />
      <stop offset="35%" stopColor="#fbbf24" />
      <stop offset="78%" stopColor="#d97706" />
      <stop offset="100%" stopColor="#78350f" />
    </radialGradient>

    <radialGradient id={`${uid}-sph-purple`} cx="32%" cy="28%" r="68%">
      <stop offset="0%" stopColor="#f3e8ff" />
      <stop offset="35%" stopColor="#c084fc" />
      <stop offset="78%" stopColor="#9333ea" />
      <stop offset="100%" stopColor="#4c1d95" />
    </radialGradient>

    <radialGradient id={`${uid}-sph-silver`} cx="32%" cy="28%" r="68%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="35%" stopColor="#e2e8f0" />
      <stop offset="78%" stopColor="#94a3b8" />
      <stop offset="100%" stopColor="#475569" />
    </radialGradient>

    <radialGradient id={`${uid}-sph-dark`} cx="32%" cy="28%" r="68%">
      <stop offset="0%" stopColor="#94a3b8" />
      <stop offset="32%" stopColor="#334155" />
      <stop offset="78%" stopColor="#1e293b" />
      <stop offset="100%" stopColor="#020617" />
    </radialGradient>

    <radialGradient id={`${uid}-sph-copper`} cx="32%" cy="28%" r="68%">
      <stop offset="0%" stopColor="#fed7aa" />
      <stop offset="35%" stopColor="#f97316" />
      <stop offset="78%" stopColor="#b45309" />
      <stop offset="100%" stopColor="#451a03" />
    </radialGradient>

    {/* 3D Porcelain & Metal Cylinders */}
    <linearGradient id={`${uid}-porcelain`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#e2e8f0" />
      <stop offset="28%" stopColor="#ffffff" />
      <stop offset="72%" stopColor="#f8fafc" />
      <stop offset="100%" stopColor="#cbd5e1" />
    </linearGradient>

    <linearGradient id={`${uid}-metal`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#475569" />
      <stop offset="28%" stopColor="#cbd5e1" />
      <stop offset="65%" stopColor="#94a3b8" />
      <stop offset="100%" stopColor="#334155" />
    </linearGradient>

    <linearGradient id={`${uid}-copper-cyl`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#7c2d12" />
      <stop offset="30%" stopColor="#fdba74" />
      <stop offset="65%" stopColor="#ea580c" />
      <stop offset="100%" stopColor="#7c2d12" />
    </linearGradient>

    {/* 3D Bunsen / Spirit Flame */}
    <linearGradient id={`${uid}-flame-blue`} x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.95" />
      <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#fef08a" stopOpacity="0.95" />
    </linearGradient>

    <linearGradient id={`${uid}-flame-warm`} x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stopColor="#dc2626" stopOpacity="0.95" />
      <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.95" />
      <stop offset="100%" stopColor="#fef9c3" stopOpacity="0.95" />
    </linearGradient>

    {/* Soft 3D Glow Filter */}
    <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
);
