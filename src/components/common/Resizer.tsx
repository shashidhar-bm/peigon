import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

interface ResizerProps {
    direction?: 'horizontal' | 'vertical';
    onResize: (delta: number) => void;
    className?: string; // Allow styled-components extension
}

const Handle = styled.div<{ $direction: 'horizontal' | 'vertical' }>`
  position: relative;
  /* Visual styling */
  background-color: ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s;
  z-index: 10;
  flex-shrink: 0;

  /* Dimensions based on direction */
  width: ${({ $direction }) => ($direction === 'horizontal' ? '4px' : '100%')};
  height: ${({ $direction }) => ($direction === 'horizontal' ? '100%' : '4px')};
  
  /* Cursor */
  cursor: ${({ $direction }) => ($direction === 'horizontal' ? 'col-resize' : 'row-resize')};

  &:hover, &:active {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  /* Expand hit area */
  &::after {
    content: '';
    position: absolute;
    top: ${({ $direction }) => ($direction === 'horizontal' ? '0' : '-3px')};
    bottom: ${({ $direction }) => ($direction === 'horizontal' ? '0' : '-3px')};
    left: ${({ $direction }) => ($direction === 'horizontal' ? '-3px' : '0')};
    right: ${({ $direction }) => ($direction === 'horizontal' ? '-3px' : '0')};
    z-index: 10;
  }
`;

export const Resizer: React.FC<ResizerProps> = ({ direction = 'horizontal', onResize, className }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
        document.body.style.userSelect = 'none';
    }, [direction]);

    const handleMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    }, [isDragging]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;

        // For simplicity, we pass movementX/Y. 
        // A more robust solution might track absolute start position.
        const delta = direction === 'horizontal' ? e.movementX : e.movementY;
        if (delta !== 0) {
            onResize(delta);
        }
    }, [isDragging, direction, onResize]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <Handle
            $direction={direction}
            onMouseDown={handleMouseDown}
            className={className}
            data-testid={`resizer-${direction}`}
        />
    );
};
