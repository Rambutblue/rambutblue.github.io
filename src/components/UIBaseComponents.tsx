import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => (
    <div className={`relative p-px rounded-2xl bg-gradient-to-b from-cyan-400/30 to-transparent ${className}`}>
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-[15px] p-6 shadow-lg">
            {children}
        </div>
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
    <span className="inline-block bg-cyan-900/50 text-cyan-300 text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full border border-cyan-700/50 transition-all duration-200 hover:bg-cyan-800/70 hover:text-cyan-200">
        {children}
    </span>
);