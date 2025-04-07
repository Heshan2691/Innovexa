"use client";

import Link from "next/link";
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
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
      }}
    >
      <div>
        <Link
          href="/"
          style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}
        >
          Home
        </Link>
        <Link
          href="/diet-planner"
          style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}
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
          href="/meal-blogs"
          style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}
        >
          Meal Blogs
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
          href="/play-eatsmart"
          style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}
        >
          Play EatSmart
        </Link>
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: "5px 10px",
          backgroundColor: "#fff",
          color: "#007bff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
