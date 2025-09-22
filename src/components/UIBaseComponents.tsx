import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => (
    <div className={`bg-gray-900/40 backdrop-blur-md border border-gray-400/20 rounded-2xl p-6 shadow-lg ${className}`}>
        {children}
    </div>
);

interface SectionTitleProps {
    children: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
    <h2 className="text-2xl font-bold text-sky-300 mb-4 tracking-wide">{children}</h2>
);

interface TagProps {
    children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ children }) => (
    <span className="inline-block bg-cyan-400/20 text-cyan-300 text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">
        {children}
    </span>
);
