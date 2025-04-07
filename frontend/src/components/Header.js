"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <h1 style={{ margin: 0, fontSize: "24px" }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
          Health & Nutrition Tracker
        </Link>
      </h1>
      <nav>
        <Link
          href="/dashboard"
          style={{ color: "#fff", margin: "0 15px", textDecoration: "none" }}
        >
          Dashboard
        </Link>
        <Link
          href="/diet-planner"
          style={{ color: "#fff", margin: "0 15px", textDecoration: "none" }}
        >
          Diet Planner
        </Link>
        <Link
          href="/meal-ideas"
          style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}
        >
          Meal Ideas
        </Link>

        <Link
          href="/add-data"
          style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}
        >
          Add Data
        </Link>
        <Link
          href="/view-insights"
          style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}
        >
          View Insights
        </Link>
        <Link
          href="/profile"
          style={{ color: "#fff", margin: "0 15px", textDecoration: "none" }}
        >
          Profile
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              color: "#fff",
              margin: "0 15px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            style={{ color: "#fff", margin: "0 15px", textDecoration: "none" }}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
