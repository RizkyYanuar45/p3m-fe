import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Kirim request POST menggunakan fetch
      const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include", // PENTING: agar browser mengirim dan menerima cookie
      });

      // Ambil data JSON dari respons
      const data = await response.json();

      // fetch tidak melempar error untuk status 4xx/5xx, jadi kita periksa manual
      if (!response.ok) {
        // Lemparkan error agar bisa ditangkap oleh blok catch
        throw new Error(data.message || "Terjadi kesalahan.");
      }

      // Jika login berhasil
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("admin", JSON.stringify(data.admin));
      navigate("/admin");
    } catch (err) {
      // Tangkap error jaringan atau error yang kita lempar di atas
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: `url('/backgroundbatikmegamendung.png') center center / cover no-repeat, radial-gradient(circle at 70% 60%, #ffb300 0%, #e53935 60%, #7b1fa2 100%)`,
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
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(1.5px)",
        }}
      />
      <form
        onSubmit={handleLogin}
        style={{
          minWidth: 380,
          background: "rgba(60,0,0,0.55)",
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #fff",
                color: "#fff",
                fontSize: 18,
                padding: "8px 0",
                outline: "none",
              }}
              autoFocus
              required
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
              }}
              required
            />
          </div>
        </div>

        {/* Menampilkan pesan error jika ada */}
        {error && (
          <div
            style={{
              color: "#ffcdd2",
              background: "#c62828",
              padding: "10px",
              width: "90%",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "90%",
            margin: "0 auto",
            marginTop: 16,
            marginBottom: 32,
            background: loading ? "#ccc" : "#fff",
            color: "#e6ae22ff",
            fontWeight: 500,
            fontSize: 28,
            border: "none",
            padding: "12px 0",
            letterSpacing: 2,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px #0002",
            transition: "background 0.2s",
          }}
        >
          {loading ? "LOADING..." : "SIGN IN"}
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
