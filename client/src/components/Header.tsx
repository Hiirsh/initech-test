import React from "react";
import { useTypeSelector } from "../hooks/useTypeSelector";

export default function Header() {
  const isAuth = useTypeSelector((state) => state.login.auth);
  const login = useTypeSelector((state) => state.login.login);

  if (isAuth) {
    return <header>Welcome, {login}</header>;
  } else {
    return <header>Welcome!</header>;
  }
}
