"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#fff",
        color: "#007bff",
      }}
    >
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#fff",
          borderRadius: "12px",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "#007bff";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "#007bff";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        🚪 Logout
      </button>
    </nav>
  );
}
