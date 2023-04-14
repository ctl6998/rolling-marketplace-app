import React from "react";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";

export default function ProductDetail() {
  return (
    <>
      <Container
        maxWidth="xl"
        style={{ paddingTop: "50px", paddingBottom: "100px" }}
      >
        <section className="product-details">
          <div className="detail-image">
            {/* <img src="#" alt="10x Rule" /> */}
          </div>
          <div className="detail-description">
            <h2>Product Name</h2>
            <h4>Owner Info</h4>
            <p>Product description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, explicabo dolorem perspiciatis voluptatem nobis dignissimos vero odit porro quisquam consequatur delectus expedita maxime numquam est, facere, nisi eaque modi corrupti!</p>
            <h4>Price - 100.000vnd</h4>
            <Button
              className="btn"
              variant="contained"
            >
              Add to Cart
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
