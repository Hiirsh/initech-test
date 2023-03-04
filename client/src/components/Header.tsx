import React from "react";
import { Button } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";
import { useTypeSelector } from "../hooks/useTypeSelector";

export default function Header() {
  const { auth: isAuth, login } = useTypeSelector((state) => state.login);
  const { setAuth, setLogin } = useLogin();
  const logout = (): void => {
    setAuth(false);
    setLogin("");
  };
  if (isAuth) {
    return (
      <header>
        Welcome, {login}
        <Button variant="primary" onPointerDown={logout}>
          Logout
        </Button>
      </header>
    );
  } else {
    return <header>Welcome!</header>;
  }
}
