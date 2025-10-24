import { useState, useEffect, useContext } from "react";
import BottomBar from "./BottomBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import IndicadorCarregamento from './LoaderDots';
import HabitosContext from '../contexts/HabitosContext';

export default function TelaHabitos() {
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [days, setDays] = useState([]);
  const [saving, setSaving] = useState(false);

  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

  const [habits, setHabits] = useState([]);
  const [todayHabits, setTodayHabits] = useState([]);
  const { listaHabitos, setListaHabitos } = useContext(HabitosContext);
  const [loadingHabits, setLoadingHabits] = useState(false);

  const toggleDay = (index) => {
    setDays((prev) => (prev.includes(index) ? prev.filter((d) => d !== index) : [...prev, index]));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('trackit-token');
    if (!token) {
      alert('Usuário não autenticado. Faça login primeiro.');
      return;
    }

    const body = {
      name: title,
      days: days,
    };

  setSaving(true);

    fetch('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => Promise.reject(err));
        return res.json();
      })
      .then((data) => {
        console.log('Habit created', data);
        setTitle('');
        setDays([]);
        setCreating(false);
        fetchHabits();
        refreshToday();
      })
      .catch((err) => {
        console.error(err);
        alert(err.message || 'Erro ao criar hábito');
      })
      .finally(() => setSaving(false));
  };

  const fetchHabits = () => {
    const token = localStorage.getItem('trackit-token');
    if (!token) return;
    setLoadingHabits(true);
    fetch('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) return r.json().then((err) => Promise.reject(err));
        return r.json();
      })
      .then((data) => setHabits(data))
      .catch((e) => { console.error('Error fetching habits', e); alert('Erro ao carregar hábitos'); })
      .finally(() => setLoadingHabits(false));
  };

  useEffect(() => {
    fetchHabits();
    refreshToday();
  }, []);

  const refreshToday = () => {
    const token = localStorage.getItem('trackit-token');
    if (!token) return;
    fetch('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.json())
      .then((data) => {
  setTodayHabits(data);
  if (typeof setListaHabitos === 'function') setListaHabitos(data);
      })
      .catch((e) => console.error('Error fetching today habits', e));
  };

  const toggleDone = (habit) => {
    const token = localStorage.getItem('trackit-token');
    if (!token) { alert('Autentique-se'); return; }
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${habit.done ? 'uncheck' : 'check'}`;
    fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        if (!r.ok) return r.json().then((err) => Promise.reject(err));
        return r.json();
      })
      .then(() => refreshToday())
      .catch((err) => { console.error(err); alert(err.message || 'Erro ao alterar status'); });
  };

  return (
    <Page>
      <TopBar />
      <Header>
        <h2>Meus hábitos</h2>
        <AddButton onClick={() => setCreating(true)}>+</AddButton>
      </Header>

      {creating && (
        <Card onSubmit={handleSave} aria-label="form-criar-habito">
          <input
            placeholder="nome do hábito"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={saving}
          />

          <Days>
            {weekdays.map((d, i) => (
              <DayButton
                type="button"
                key={i}
                selected={days.includes(i)}
                onClick={() => toggleDay(i)}
                disabled={saving}
                aria-pressed={days.includes(i)}
              >
                {d}
              </DayButton>
            ))}
          </Days>

          <Actions>
            <Cancel type="button" onClick={() => setCreating(false)} disabled={saving}>
              Cancelar
            </Cancel>
            <Save type="submit" disabled={saving}>{saving ? <IndicadorCarregamento color="#fff" size={8}/> : 'Salvar'}</Save>
          </Actions>
        </Card>
      )}

      <EmptyState>
        {loadingHabits ? 'Carregando hábitos...' : (habits.length === 0 ? 'Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!' : '')}
      </EmptyState>

      <Section>
        {habits.length === 0 ? (
          <p>Sem hábitos</p>
        ) : (
          habits.map((h) => (
            <HabitCard key={h.id}>
              <strong>{h.name}</strong>
              <WeekDays>
                {weekdays.map((d, i) => (
                  <SmallDay key={i} active={h.days.includes(i)}>{d}</SmallDay>
                ))}
              </WeekDays>
            </HabitCard>
          ))
        )}
      </Section>

      <Footer>
        <Link to="/">Voltar ao início</Link>
      </Footer>

      <BottomBar />

    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  padding: 90px 20px 90px;
  background: #F2F2F2;
  font-family: 'Lexend Deca', system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;

  h2 {
    color: #126BA5;
    font-size: 22px;
    margin: 0;
  }
`;

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  background: #52b6ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 22px;
  cursor: pointer;
  display: grid;
  place-items: center;
  line-height: 1;
  padding: 0;
`;

const Card = styled.form`
  background: #fff;
  border-radius: 5px;
  padding: 14px;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    width: 100%;
    height: 45px;
    padding: 10px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
  }
`;

const Days = styled.div`
  display: flex;
  gap: 4px;
`;

const DayButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
  background: ${(p) => (p.selected ? '#cfcfcf' : '#fff')};
  color: ${(p) => (p.selected ? '#fff' : '#DBDBDB')};
  cursor: pointer;
  display: inline-grid;
  place-items: center;
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Cancel = styled.button`
  background: transparent;
  border: none;
  color: #52b6ff;
  cursor: pointer;
`;

const Save = styled.button`
  background: #52b6ff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
`;

const EmptyState = styled.p`
  color: #666;
  margin-top: 20px;
`;

const Footer = styled.footer`
  margin-top: 30px;
`;

const Section = styled.section`
  margin-top: 20px;
`;

const HabitCard = styled.div`
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 1px 0 rgba(0,0,0,0.06);
`;

const WeekDays = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 12px;
`;

const SmallDay = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  margin-right: 4px;
  background: ${(p) => (p.active ? '#CFCFCF' : '#ffffff')};
  color: ${(p) => (p.active ? '#ffffff' : '#BDBDBD')};
  border: 1px solid ${(p) => (p.active ? '#CFCFCF' : '#e6e6e6')};
`;

const CardTitle = styled.div`
  strong { color: #666; display:block; font-size: 16px; }
`;

const TodayCard = styled(HabitCard)`
  background: ${(p) => (p.done ? '#dff0d8' : '#fff')};
`;

const ToggleDone = styled.button`
  background: #52b6ff;
  color: #fff;
  border: none;
  padding: 8px 10px;
  border-radius: 5px;
  cursor: pointer;
`;
