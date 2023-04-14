import React from "react";
import "./home.scss";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  const products = [
    {
      image: "#",
      title: "Product Demo",
      price: "100.000",
      id: "productID",
    },
    {
      image: "#",
      title: "Product Demo",
      price: "100.000",
      id: "productID",
    },
    {
      image: "#",
      title: "Product Demo",
      price: "100.000",
      id: "productID",
    },
    {
      image: "#",
      title: "Product Demo",
      price: "100.000",
      id: "productID",
    },
  ];

  return (
    <>
      <div className="hero-banner">
        <h1>Rolling Marketplace</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <Button variant="contained">View Market</Button>
      </div>
      <Container maxWidth="xl" style={{ paddingTop: "50px", paddingBottom: "100px" }}>
        <section className="products">
          {products.map(({ image, id, title, price }) => (
            <article key={id} className="product">
              <div className="product-image">
                {/* <img src={image} alt={title} /> */}
              </div>
              <p className="product-title">{title}</p>
              <p className="product-price">{price}</p>
              <Link to={`products/${id}`} className="btn product-link">
                View Product
              </Link>
            </article>
          ))}
        </section>
      </Container>
    </>
  );
}
