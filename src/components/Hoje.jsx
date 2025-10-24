import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import HabitosContext from "../contexts/HabitosContext";
import checkSymbol from '../assets/check_symbol.png';

export default function TelaHoje() {
  const { listaHabitos = [], setListaHabitos } = useContext(HabitosContext);
  const [loadingIds, setLoadingIds] = React.useState(new Set());

  const days = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const hoje = new Date();
  const dateLabel = `${days[hoje.getDay()]}, ${String(hoje.getDate()).padStart(2, '0')}/${String(hoje.getMonth() + 1).padStart(2, '0')}`;

  useEffect(() => {
    const token = localStorage.getItem('trackit-token');
    if (!token) return;
    fetch('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        if (!r.ok) throw new Error('Erro ao carregar hábitos de hoje');
        return r.json();
      })
      .then((data) => {
        if (typeof setListaHabitos === 'function') setListaHabitos(data);
      })
      .catch(() => {});
  }, [setListaHabitos]);

  function toggleHabit(habit) {
    const token = localStorage.getItem('trackit-token');
    if (!token) { alert('Autentique-se'); return; }

    const action = habit.done ? 'uncheck' : 'check';
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${action}`;

    setLoadingIds((s) => new Set(s).add(habit.id));

    fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        if (!r.ok) {
          if (r.status === 400) throw new Error('Requisição inválida (400) - hábito pode já estar no estado solicitado ou não ser do dia/usuário.');
          throw new Error('Erro na requisição');
        }
  return null;
      })
      .then(() => {
        if (typeof setListaHabitos === 'function') {
          const token2 = localStorage.getItem('trackit-token');
          fetch('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', { headers: { Authorization: `Bearer ${token2}` } })
            .then((r) => {
              if (!r.ok) throw new Error('Erro ao recarregar hábitos');
              return r.json();
            })
            .then((data) => setListaHabitos(data))
            .catch((e) => { console.error(e); });
        }
      })
      .catch((err) => { console.error(err); alert(err.message || 'Erro ao alterar status'); })
      .finally(() => setLoadingIds((s) => {
        const copy = new Set(s);
        copy.delete(habit.id);
        return copy;
      }));
  }

  return (
    <Page>
      <TopBar />

      <Content>
        <Header>
          <Title>{dateLabel}</Title>
          <Subtitle />
        </Header>

        <List>
          {listaHabitos.length === 0 ? (
            <Empty>Você não tem hábitos para hoje.</Empty>
          ) : (
            listaHabitos.map((h) => (
              <Card key={h.id} $done={!!h.done}>
                <CardInfo>
                  <CardTitle>{h.name || h.nome || "Hábito"}</CardTitle>
                  <CardSub>
                    Sequência atual: {h.currentSequence ?? h.sequenciaAtual ?? 0} dias
                  </CardSub>
                  <CardSub>
                    Seu recorde: {h.highestSequence ?? h.recorde ?? 0} dias
                  </CardSub>
                </CardInfo>

                <CheckButton onClick={() => toggleHabit(h)} disabled={loadingIds.has(h.id)} $done={!!h.done}>
                  <Icon src={checkSymbol} $done={loadingIds.has(h.id) || !!h.done} alt={h.done ? 'feito' : 'não feito'} />
                </CheckButton>
              </Card>
            ))
          )}
        </List>
      </Content>

      <BottomBar />
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: #f2f2f2;
`;

const Content = styled.main`
  width: 100%;
  max-width: 375px;
  padding: 90px 18px 90px;
  box-sizing: border-box;
  min-height: calc(100vh - 180px);
  background: transparent;
`;

const Header = styled.div`
  margin-bottom: 18px;
`;

const Title = styled.h1`
  color: #126ba5;
  font-size: 23px;
  margin: 0 0 6px 0;
`;

const Subtitle = styled.p`
  color: #bababa;
  margin: 0;
`;

const List = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Empty = styled.p`
  color: #666;
`;

const Card = styled.article`
  background: #fff;
  border-radius: 5px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 0 rgba(0,0,0,0.06);
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CardTitle = styled.div`
  font-weight: 600;
  color: #666;
`;

const CardSub = styled.div`
  font-size: 12px;
  color: #bababa;
`;

const CheckButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => (p.$done ? '#8FC549' : '#E7E7E7')};
  cursor: pointer;
  padding: 6px;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 1;
  transition: opacity 150ms ease, transform 150ms ease;
`;
