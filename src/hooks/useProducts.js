import { useState, useEffect } from "react";

export default function useProducts(query = "", category = "") {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = "";

    if (query) {
      // for Search 
      url = `https://dummyjson.com/products/search?q=${query}`;
    } else if (category) {
      // for Category
      url = `https://dummyjson.com/products/category/${category}`;
    } else {
      // for all products
      url = `https://dummyjson.com/products?limit=28`;
    }

    setLoading(true);
    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch products");
      })
      .then((data) => {
        setProducts(data.products || []); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [query, category]); 

  return { products, loading, error };
}
