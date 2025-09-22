import React from 'react';
import { ELEMENT_TYPES, ELEMENTS, type ElementType } from "../constants/SandboxConstants.ts";

interface ElementPaletteProps {
    selectedElement: number;
    setSelectedElement: React.Dispatch<React.SetStateAction<ElementType>>;
    onReset: () => void;
}

const ElementPalette: React.FC<ElementPaletteProps> = ({ selectedElement, setSelectedElement, onReset }) => {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 p-2 bg-black border-2 border-white shadow-[4px_4px_#000]">
            {Object.entries(ELEMENTS).map(([id, { color, name }]) => {
                const elementId = parseInt(id, 10);
                if (elementId as ElementType === ELEMENT_TYPES.STATIC) return null;
                const isActive = elementId === selectedElement;
                return (
                    <button
                        key={id}
                        onClick={() => setSelectedElement(elementId as ElementType)}
                        className={`w-10 h-10 transition-all duration-200 border-2 ${isActive ? 'border-yellow-400 scale-110' : 'border-black'}`}
                        style={{ backgroundColor: color, imageRendering: 'pixelated' }}
                        title={`Select ${name}`}
                    >
                    </button>
                );
            })}
            <button onClick={onReset} className="w-10 h-10 bg-gray-600 text-white flex items-center justify-center hover:bg-gray-500 transition-colors border-2 border-black" title="Reset Simulation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
            </button>
        </div>
    );
};

export default ElementPalette;