import React, { useEffect, useState } from "react";
// import { API, graphqlOperation } from "aws-amplify";
// import { v4 as uuidv4 } from "uuid";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    try {
      const response = await fetch('https://9m0mdrl7ea.execute-api.ap-southeast-1.amazonaws.com/dev/products', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Credentials': true, 
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
