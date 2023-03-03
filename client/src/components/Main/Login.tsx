import React from "react";
import { Button, Form } from "react-bootstrap";
import { useLogin } from "../../hooks/useLogin";
import "../../styles/Login.css";

export default function Login() {

  const [value, setValue] = React.useState('')
  const { setAuth, setLogin } = useLogin()

  const signUp = (): void => {
    setLogin(value)
    setAuth(true)
  };

  return (
    <>
      <Form className="form">
        <Form.Group className="mb-3" controlId="login">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter login"
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!value}
          onPointerDown={signUp}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}
