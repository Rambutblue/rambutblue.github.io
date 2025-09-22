import React, { useRef, useEffect, useCallback } from 'react';
import { ELEMENT_TYPES, ELEMENTS, PARTICLE_SIZE, type ElementType } from "../constants/SandboxConstants.ts";

// This component contains the entire physics simulation logic, now fully typed.

interface SandboxCanvasProps {
    selectedElement: ElementType;
    isPaused: boolean;
}

const SandboxCanvas: React.FC<SandboxCanvasProps> = ({ selectedElement, isPaused }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gridRef = useRef<ElementType[][] | null>(null);
    const colsRef = useRef(0);
    const rowsRef = useRef(0);
    const animationFrameId = useRef<number | null>(null); // Allow null for initial value
    const mousePos = useRef({ x: -1, y: -1, isDown: false });

    const setupGrid = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        colsRef.current = Math.floor(canvas.width / PARTICLE_SIZE);
        rowsRef.current = Math.floor(canvas.height / PARTICLE_SIZE);
        gridRef.current = new Array(colsRef.current).fill(null).map(() => new Array(rowsRef.current).fill(ELEMENT_TYPES.EMPTY));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (canvas) {
                    canvas.width = width;
                    canvas.height = height;
                    setupGrid();
                }
            }
        });
        if (canvas) {
            resizeObserver.observe(canvas);
        }

        const handleMouseDown = () => { mousePos.current.isDown = true; };
        const handleMouseUp = () => { mousePos.current.isDown = false; };
        const handleMouseMove = (e: MouseEvent) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mousePos.current.x = e.clientX - rect.left;
            mousePos.current.y = e.clientY - rect.top;
        };
        const handleMouseLeave = () => {
            mousePos.current.isDown = false;
        }

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        canvas?.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (canvas) {
                resizeObserver.unobserve(canvas);
                canvas.removeEventListener('mousemove', handleMouseMove);
            }
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [setupGrid]);

    const draw = useCallback(() => {
        const grid = gridRef.current;
        const cols = colsRef.current;
        const rows = rowsRef.current;
        const canvas = canvasRef.current;
        if (!grid || !canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (grid[i][j] !== ELEMENT_TYPES.EMPTY) {
                    ctx.fillStyle = ELEMENTS[grid[i][j]].color;
                    ctx.fillRect(i * PARTICLE_SIZE, j * PARTICLE_SIZE, PARTICLE_SIZE, PARTICLE_SIZE);
                }
            }
        }
    }, []);

    const update = useCallback(() => {
        const grid = gridRef.current;
        const cols = colsRef.current;
        const rows = rowsRef.current;
        if (!grid) return;
        const newGrid = grid.map(arr => arr.slice()); // Deep copy

        for (let i = 0; i < cols; i++) {
            for (let j = rows - 1; j >= 0; j--) {
                const type = grid[i][j];

                if (type === ELEMENT_TYPES.EMPTY || type === ELEMENT_TYPES.STATIC || type === ELEMENT_TYPES.JAVA) {
                    continue;
                }

                const below = j + 1;
                const isBelowEmpty = below < rows && newGrid[i][below] === ELEMENT_TYPES.EMPTY;
                const isBelowWater = below < rows && newGrid[i][below] === ELEMENT_TYPES.REACT;

                if (type === ELEMENT_TYPES.CSHARP || type === ELEMENT_TYPES.POSTGRES) {
                    if (isBelowEmpty) {
                        newGrid[i][j] = ELEMENT_TYPES.EMPTY;
                        newGrid[i][below] = type;
                    } else if (isBelowWater && type === ELEMENT_TYPES.POSTGRES) {
                        newGrid[i][j] = ELEMENT_TYPES.REACT;
                        newGrid[i][below] = type;
                    } else {
                        const dir = Math.random() < 0.5 ? 1 : -1;
                        const sideA = i + dir;
                        const sideB = i - dir;

                        const canSlideA = sideA >= 0 && sideA < cols && below < rows && newGrid[sideA][below] === ELEMENT_TYPES.EMPTY;
                        const canSlideB = sideB >= 0 && sideB < cols && below < rows && newGrid[sideB][below] === ELEMENT_TYPES.EMPTY;

                        if (canSlideA) {
                            newGrid[i][j] = ELEMENT_TYPES.EMPTY;
                            newGrid[sideA][below] = type;
                        } else if (canSlideB) {
                            newGrid[i][j] = ELEMENT_TYPES.EMPTY;
                            newGrid[sideB][below] = type;
                        }
                    }
                }

                if (type === ELEMENT_TYPES.REACT) {
                    if (isBelowEmpty) {
                        newGrid[i][j] = ELEMENT_TYPES.EMPTY;
                        newGrid[i][below] = type;
                    } else {
                        const dir = Math.random() < 0.5 ? 1 : -1;
                        const sideA = i + dir;
                        const sideB = i - dir;
                        const canFlowA = sideA >= 0 && sideA < cols && newGrid[sideA][j] === ELEMENT_TYPES.EMPTY;
                        const canFlowB = sideB >= 0 && sideB < cols && newGrid[sideB][j] === ELEMENT_TYPES.EMPTY;

                        if (canFlowA) {
                            newGrid[i][j] = ELEMENT_TYPES.EMPTY;
                            newGrid[sideA][j] = type;
                        } else if (canFlowB) {
                            newGrid[i][j] = ELEMENT_TYPES.EMPTY;
                            newGrid[sideB][j] = type;
                        }
                    }
                }
            }
        }
        gridRef.current = newGrid;
    }, []);

    useEffect(() => {
        const animate = () => {
            if (!isPaused) {
                if (mousePos.current.isDown && mousePos.current.x > 0) {
                    const grid = gridRef.current;
                    const cols = colsRef.current;
                    const rows = rowsRef.current;
                    if (grid) {
                        const mouseCol = Math.floor(mousePos.current.x / PARTICLE_SIZE);
                        const mouseRow = Math.floor(mousePos.current.y / PARTICLE_SIZE);
                        const brushSize = 4;
                        for (let i = -brushSize; i <= brushSize; i++) {
                            for (let j = -brushSize; j <= brushSize; j++) {
                                if (Math.random() > 0.65) {
                                    const col = mouseCol + i;
                                    const row = mouseRow + j;
                                    if (col >= 0 && col < cols && row >= 0 && row < rows && grid[col][row] === ELEMENT_TYPES.EMPTY) {
                                        grid[col][row] = selectedElement;
                                    }
                                }
                            }
                        }
                    }
                }
                if (Math.random() < 0.3) {
                    const grid = gridRef.current;
                    const cols = colsRef.current;
                    if (grid && cols > 0) {
                        const randomCol = Math.floor(Math.random() * cols);
                        if (grid[randomCol][0] === ELEMENT_TYPES.EMPTY) {
                            const elementKeys = Object.keys(ELEMENTS).filter(id => parseInt(id, 10) !== ELEMENT_TYPES.STATIC).map(id => parseInt(id, 10));
                            const randomElement = elementKeys[Math.floor(Math.random() * elementKeys.length)];
                            // FIX: Added 'as ElementType' to assert the type.
                            grid[randomCol][0] = randomElement as ElementType;
                        }
                    }
                }
                update();
            }
            draw();
            animationFrameId.current = requestAnimationFrame(animate);
        };
        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [draw, update, selectedElement, isPaused]);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a]" />;
};

export default SandboxCanvas;