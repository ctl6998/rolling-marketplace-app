import React from "react";
import "./home.scss";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/products";
import { useEffect, useContext } from "react";

export default function Product() {
  const data = useContext(ProductContext);
  console.log(data);

  if (data.products.length == 0) {
    return <h3 style={{textAlign:"center"}}>Loading...</h3>;
  }
  
  return (
    <Container
      maxWidth="xl"
      style={{ paddingTop: "50px", paddingBottom: "100px" }}
    >
      <section className="products">
        {data.products.products.map(({ name, price, image, categories, id }) => (
          <article key={id} className="product">
            <div className="product-image">
              <img 
                src={"https://cdn.shopify.com/s/files/1/0247/4021/products/Aboriginal-Art-Reusable-Shopping-Bags-Grocery-BBH-Yarn-Marketplace_800x.jpg?v=1644792413"} 
                alt={name} />
            </div>
            <p className="product-title">{name}</p>
            <p className="product-price">{price}đ</p>
            <Link to={`products/${id}`} className="btn product-link">
              View Product
            </Link>
          </article>
        ))}
      </section>
    </Container>
  );
}
