import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import habWhite from '../assets/habitos_branco.png';
import habGray from '../assets/habitos_cinza.png';
import hojeWhite from '../assets/hoje_branco.png';
import hojeGray from '../assets/hoje_cinza.png';

export default function BottomBar(){
  const loc = useLocation();
  return (
    <Bar>
      <Inner>
        <Tab to="/habitos" $active={loc.pathname === '/habitos'}>
          <Icon src={loc.pathname === '/habitos' ? habWhite : habGray} $active={loc.pathname === '/habitos'} />
          <Label>Hábitos</Label>
        </Tab>
        <Tab to="/hoje" $active={loc.pathname === '/hoje'}>
          <Icon src={loc.pathname === '/hoje' ? hojeWhite : hojeGray} $active={loc.pathname === '/hoje'} />
          <Label>Hoje</Label>
        </Tab>
      </Inner>
    </Bar>
  )
}

const Bar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 375px;
  display: flex;
  padding: 0;
  background: transparent;
  height: 70px;
`;

const Tab = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  height: 70px;
  background: ${(p) => (p.$active ? '#52b6ff' : '#fff')};
  color: ${(p) => (p.$active ? '#fff' : '#D4D4D4')};
  border-top: 1px solid rgba(0,0,0,0.04);
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
