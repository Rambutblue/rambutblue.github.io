import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
    children: React.ReactNode;
    isCvVisible: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isCvVisible }) => (
    <AnimatePresence>
        {isCvVisible && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative max-w-5xl mx-auto p-4 sm:p-8"
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);