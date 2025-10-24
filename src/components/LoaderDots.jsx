import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
`;

export default function IndicadorCarregamento({ size = 8, color = '#fff' }) {
  return (
    <Dots role="img" aria-label="Indicador de carregamento">
      <Dot style={{ width: size, height: size, background: color }} />
      <Dot style={{ width: size, height: size, background: color, animationDelay: '80ms' }} />
      <Dot style={{ width: size, height: size, background: color, animationDelay: '160ms' }} />
    </Dots>
  );
}

const Dots = styled.div`
  display: inline-flex;
  gap: 6px;
  align-items: center;
`;

const Dot = styled.span`
  display: inline-block;
  border-radius: 50%;
  animation: ${bounce} 0.9s infinite ease-in-out;
`;
