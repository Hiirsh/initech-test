import React from "react";
import Login from "./Main/Login";
import MainPage from "./Main/MainPage";
import { useTypeSelector } from "../hooks/useTypeSelector";

export default function Main() {
  const isAuth = useTypeSelector((state) => state.login.auth);

  return (
    <>
      {!isAuth ? <Login /> : <MainPage />}
    </>
  );
}
