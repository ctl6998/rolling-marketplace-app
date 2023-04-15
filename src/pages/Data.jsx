import React from "react";
import "./data.scss";
import Container from "@mui/material/Container";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/products";

export default function Data() {
  const data = useContext(ProductContext);
  console.log(data);
  const deleteData = async (id) => {
    try {
      const response = await fetch(
        "https://9m0mdrl7ea.execute-api.ap-southeast-1.amazonaws.com/dev/product",
        {
          method: "DELETE",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

//   useEffect(() => {
//     renderTable();
//   }, [data.products.products]);

  const handleDelete = (e) => {
    console.log(e.target.id)
    deleteData(e.target.id)
    document.reload();
  }
 
  const renderTable = () => {
    if (data.products.length == 0) {
      return (
        <tr style={{ textAlign: "center" }}>
          <td>Loading....</td>
        </tr>
      );
    }
    return data.products.products.map(
      ({ name, price, image, description, categories, id }) => (
        <tr key={id}>
          <td style={{ overFlow: "hidden", width: "10%" }}>{id}</td>
          <td>
            <div>
              <img src={image} className="image-database" />
            </div>
          </td>
          <td>{name}</td>
          <td>{price}</td>
          <td>{description}</td>
          <td>{categories}</td>
          <td>
            <button
              onClick={handleDelete}
              id={id}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    );
  };

  return (
    <Container
      maxWidth="xl"
      style={{ paddingTop: "50px", paddingBottom: "100px" }}
    >
      <h1>Database</h1>
      <span>For checking purposes</span>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Categories</th>
            <th>Editing</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </Container>
  );
}
