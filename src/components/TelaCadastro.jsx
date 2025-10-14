import React, { useState } from "react";
import styled from "styled-components";

export default function TelaCadastro() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name,
            image,
            password,
          }),
        }
      );

      if (res.ok) {
        alert("Cadastro realizado com sucesso! Faça login.");
        window.location.href = "/";
        return;
      }

      const err = await res.json();
      alert(err.message || "Erro ao cadastrar. Verifique os dados e tente novamente.");
    } catch (error) {
      alert("Erro na requisição. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo src="src/assets/trackit_logo_home.png" alt="TrackIt" />
        <Input
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          placeholder="senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          placeholder="nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          placeholder="foto (url)"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          disabled={loading}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </SubmitButton>

        <Prompt>
          Já tem uma conta? <LoginLink href="/">Faça login!</LoginLink>
        </Prompt>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display:flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.img`
  margin-bottom: 32px;
`;

const Input = styled.input`
  width: 303px;
  height: 45px;
  margin-bottom: 13px;
  padding: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Lexend Deca', system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
`;

const SubmitButton = styled.button`
  width: 303px;
  height: 45px;
  background-color: #52b6ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 25px;
  display:flex;
  align-items:center;
  justify-content:center;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Prompt = styled.p`
  font-size: 14px;
  color: #a0a0a0;
`;

const LoginLink = styled.a`
  color: #52b6ff;
  text-decoration: underline;
  cursor: pointer;
`;