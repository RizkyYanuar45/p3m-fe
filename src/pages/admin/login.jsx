import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin12345") {
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: `url('/backgroundbatikmegamendung.png') center center / cover no-repeat, radial-gradient(circle at 70% 60%, #ffb300 0%, #e53935 60%, #7b1fa2 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Background image and overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          background: `url('/backgroundbatikmegamendung.png') center center / cover no-repeat`,
          filter: "blur(2.5px)",
          opacity: 0.7,
          transition: "opacity 0.3s",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          background: "rgba(0,0,0,0.55)", // overlay lebih gelap
          backdropFilter: "blur(1.5px)",
        }}
      />
      <form
        onSubmit={handleLogin}
        style={{
          minWidth: 380,
          background: "rgba(60,0,0,0.55)",
          borderRadius: 0,
          boxShadow: "0 8px 32px #0005",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "100%",
            background: "#e6a622",
            color: "#fff",
            padding: "24px 32px 16px 32px",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 6,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            textAlign: "left",
          }}
        >
          LOGIN ADMIN
          <div
            style={{
              fontWeight: 400,
              fontSize: 20,
              letterSpacing: 2,
              marginTop: 4,
            }}
          >
            P3M UNIM
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "36px 32px 0 32px",
            color: "#fff",
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 500,
              }}
            >
              UserName
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #fff",
                color: "#fff",
                fontSize: 18,
                padding: "8px 0",
                outline: "none",
                marginBottom: 8,
              }}
              autoFocus
            />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 500,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #fff",
                color: "#fff",
                fontSize: 18,
                padding: "8px 0",
                outline: "none",
                marginBottom: 8,
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          style={{
            width: "90%",
            margin: "0 auto",
            marginTop: 16,
            marginBottom: 32,
            background: "#fff",
            color: "#e6ae22ff",
            fontWeight: 500,
            fontSize: 28,
            border: "none",
            borderRadius: 0,
            padding: "12px 0",
            letterSpacing: 2,
            cursor: "pointer",
            boxShadow: "0 2px 8px #0002",
            transition: "background 0.2s",
          }}
        >
          SIGN IN
        </button>
      </form>
      <div
        style={{
          color: "#fff",
          marginTop: 40,
          fontSize: 18,
          letterSpacing: 1,
          textAlign: "center",
          zIndex: 3,
          position: "relative",
          textShadow: "0 2px 8px #0008",
        }}
      >
        2025 &copy; P3M UNIM
      </div>
    </div>
  );
};

export default Login;
// This code defines a modern and attractive login page for an admin interface using React. It includes a form for entering a username and password, and upon submission, it checks the credentials. If the credentials match predefined values, it stores a login state in local storage and navigates to the admin dashboard. The page features a gradient background, a logo, and responsive design elements.
