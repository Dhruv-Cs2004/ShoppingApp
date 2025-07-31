import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=20");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p style={styles.centerText}>Loading...</p>;
  if (error) return <p style={{ ...styles.centerText, color: "red" }}>{error}</p>;

  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <div key={product.id} style={styles.card}>
          <img src={product.thumbnail} alt={product.title} style={styles.image} />
          <div style={styles.details}>
            <h3 style={styles.title}>{product.title}</h3>
            <p style={styles.category}>{product.category.toUpperCase()}</p>
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>₹ {product.price}</p>
            <div style={styles.rating}>
              ⭐ {product.rating}
            </div>
            <button style={styles.button}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "24px",
    padding: "2rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.2s ease",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  details: {
    padding: "1rem",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: "4px",
  },
  category: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#6c5ce7",
    marginBottom: "8px",
  },
  description: {
    fontSize: "0.9rem",
    color: "#636e72",
    marginBottom: "8px",
  },
  price: {
    color: "#d63031",
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginBottom: "8px",
  },
  rating: {
    color: "#0984e3",
    fontSize: "0.9rem",
    marginBottom: "12px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#00b894",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  centerText: {
    textAlign: "center",
    fontSize: "1.2rem",
    padding: "2rem",
    color: "#555",
  },
};

export default ProductList;
