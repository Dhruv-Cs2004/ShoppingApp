import React from "react";
import ProductGallery from "./ProductGallery";

function App() {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", background: "#1e1e2f" }}>
      <header style={{
        textAlign: "center",
        paddingTop: "30px",
        fontSize: "2rem",
        color: "#fff",
      }}>
        🛒 Dark Mode Product Store
      </header>
      <ProductGallery />
    </div>
  );
}

export default App;
