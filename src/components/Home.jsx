import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import IndicadorCarregamento from './LoaderDots';
import logoHome from '../assets/trackit_logo_home.png';

export default function TelaLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => Promise.reject(err));
        return res.json();
      })
      .then((data) => {
        const firstString = (...vals) => {
          for (const v of vals) {
            if (typeof v === 'string' && v.trim().length > 0) return v;
          }
          return null;
        };

        const token = firstString(
          data?.token,
          data?.data?.token,
          data?.auth?.token,
          typeof data === 'string' ? data : null
        );

        if (token) {
          localStorage.setItem('trackit-token', token);
        }

        const image = firstString(
          data?.image,
          data?.data?.image,
          data?.imageURL,
          data?.imageUrl,
          data?.user?.image
        );

        if (image) {
          localStorage.setItem('trackit-user-image', image);
        }

        navigate('/habitos');
      })
      .catch((err) => {
        console.error(err);
        alert(err.message || "Erro ao fazer login. Verifique suas credenciais.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <HomeContainer>
      <Logo src={logoHome} alt="Logo TrackIt" />

      <Form onSubmit={handleSubmit}>
        <CamposInput
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <CamposInput
          placeholder="senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
  <LoginButton type="submit" disabled={loading}>{loading ? <IndicadorCarregamento color="#fff" size={8}/> : 'Entrar'}</LoginButton>
      </Form>

      <RegisterPrompt>
        Não tem uma conta? <RegisterLink to="/cadastro">Cadastre-se!</RegisterLink>
      </RegisterPrompt>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
`;

const Logo = styled.img`
  margin-bottom: 32px;
`;

const CamposInput = styled.input`
  width: 303px;
  height: 45px;
  margin-bottom: 13px;
  padding: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  font-size: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginButton = styled.button`
  width: 303px;
  height: 45px;
  background-color: #52b6ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 25px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterPrompt = styled.p`
  font-size: 14px;
  color: #a0a0a0;
`;

const RegisterLink = styled(Link)`
  color: #52b6ff;
  text-decoration: underline;
  cursor: pointer;
`;