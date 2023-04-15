import React from "react";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const [info, setInfo] = useState();
  const { id } = useParams();
  console.log(id);
  const fetchDetailProducts = async (id) => {
    try {
      const response = await fetch(
        `https://9m0mdrl7ea.execute-api.ap-southeast-1.amazonaws.com/dev/product?id=${id}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(info);
  useEffect(() => {
    fetchDetailProducts(id);
  }, []);

  if (info == undefined) {
    return <h3 style={{textAlign:"center"}}>Loading....</h3>;
  }

  return (
    <>
      <Container
        maxWidth="xl"
        style={{ paddingTop: "150px", paddingBottom: "100px" }}
      >
        <section className="product-details">
          <div className="detail-image">
            <img src={info.image} alt="10x Rule" />
          </div>
          <div className="detail-description">
            <h2>{info.name}</h2>
            <h4>Owner Info</h4>
            <p>{info.description}</p>
            <h4>Price: {info.price}vnd</h4>
            <Button className="btn" variant="contained">
              Add to Cart
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
