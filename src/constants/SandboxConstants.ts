export const ELEMENT_TYPES = {
    EMPTY: 0,
    JAVA: 1,    // Rock
    REACT: 2,   // Water
    CSHARP: 3,  // Sand
    POSTGRES: 4,// Heavy Sand
    STATIC: 5,  // Immovable wall
} as const;

type ElementTypeKeys = keyof typeof ELEMENT_TYPES;
export type ElementType = typeof ELEMENT_TYPES[ElementTypeKeys];

interface ElementConfig {
    color: string;
    name: string;
}

export const ELEMENTS: Record<number, ElementConfig> = {
    [ELEMENT_TYPES.JAVA]: { color: 'rgba(2, 132, 199, 0.9)', name: 'Java' },
    [ELEMENT_TYPES.REACT]: { color: 'rgba(34, 211, 238, 0.9)', name: 'React' },
    [ELEMENT_TYPES.CSHARP]: { color: 'rgba(168, 85, 247, 0.9)', name: 'C#' },
    [ELEMENT_TYPES.POSTGRES]: { color: 'rgba(99, 102, 241, 0.9)', name: 'PostgreSQL' },
    [ELEMENT_TYPES.STATIC]: { color: 'rgba(75, 85, 99, 0.5)', name: 'Wall' },
};

export const PARTICLE_SIZE = 5;