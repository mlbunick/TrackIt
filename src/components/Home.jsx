import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <HomeContainer>
      <Logo src="src/assets/trackit_logo_home.png" alt="Logo TrackIt" />
      <CamposInput placeholder="email" type="email" />
      <CamposInput placeholder="senha" type="password" />
      <LoginButton type='submit'>Entrar</LoginButton>
      <RegisterPrompt>Não tem uma conta? <RegisterLink to="/cadastro">Cadastre-se!</RegisterLink></RegisterPrompt>
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

const LoginButton = styled.button`
  width: 303px;
  height: 45px;
  background-color: #52b6ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 25px;

  &:hover {
    background-color: #3a8edb;
  }
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