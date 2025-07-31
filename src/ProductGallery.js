import React, { useEffect, useState } from "react";

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://dummyjson.com/products?limit=30");
      const data = await res.json();
      setProducts(data.products);
      const cats = Array.from(new Set(data.products.map(p => p.category)));
      setCategories(cats);
    }
    fetchData();
  }, []);

  const view = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <div style={styles.wrapper}>
      <div style={styles.filterBar}>
        <button onClick={() => setFilter("all")} style={btnStyle(filter === "all")}>All</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={btnStyle(filter === cat)}>
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {view.map(p => (
          <div key={p.id} style={styles.card}>
            <img src={p.thumbnail} alt={p.title} style={styles.image} />
            <div style={styles.info}>
              <h3 style={styles.title}>{p.title}</h3>
              <p style={styles.category}>{p.category}</p>
              <p style={styles.description}>{p.description.substring(0, 60)}…</p>
              <div style={styles.bottom}>
                <span style={styles.price}>₹{p.price}</span>
                <span style={styles.rating}>⭐ {p.rating}</span>
              </div>
              <button style={styles.cartBtn}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🎨 Styles
const darkBg = "#1e1e2f";
const cardBg = "#2c2c3e";
const textLight = "#eaeaea";
const accent = "#6c5ce7";

const styles = {
  wrapper: {
    background: darkBg,
    padding: "2rem",
    minHeight: "100vh",
    color: textLight,
  },
  filterBar: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: cardBg,
    borderRadius: "10px",
    boxShadow: "0 8px 18px rgba(0,0,0,0.4)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  info: {
    padding: "16px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: "0 0 6px",
    color: "#ffffff",
  },
  category: {
    fontSize: "0.8rem",
    color: accent,
    marginBottom: "10px",
  },
  description: {
    fontSize: "0.9rem",
    color: "#bbb",
    marginBottom: "10px",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  price: {
    color: "#00cec9",
    fontWeight: "bold",
  },
  rating: {
    color: "#ffeaa7",
  },
  cartBtn: {
    padding: "8px",
    backgroundColor: accent,
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
};

const btnStyle = active => ({
  margin: "0 6px 10px",
  padding: "8px 16px",
  background: active ? "#00cec9" : "#2d2d3f",
  color: active ? "#000" : "#ddd",
  border: "1px solid #444",
  borderRadius: "6px",
  cursor: "pointer",
});

export default ProductGallery;
