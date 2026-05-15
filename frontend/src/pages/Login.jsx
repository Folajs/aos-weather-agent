import { useState } from "react";

function Login({ onLogin }) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleLogin(e) {

    e.preventDefault();

    try {

      setError("");

      const response =
        await fetch(
          "http://localhost:3000/api/v1/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              email,
              password
            })
          }
        );

      const data =
        await response.json();

      if (!data.success) {

        setError(data.error);

        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      onLogin(data.token);

    } catch (error) {

      setError(
        "Login failed"
      );
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f3f4f6"
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          width: "350px"
        }}
      >
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "16px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "16px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;