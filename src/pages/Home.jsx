import React from "react";
import "./home.scss";
import { Button } from "@mui/material";
import Product from "./Product";

export default function Home() {
  return (
    <>
      <div className="hero-banner">
        <h1>Rolling Marketplace</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <Button variant="contained">View Market</Button>
      </div>
      <Product/>
    </>
  );
}
