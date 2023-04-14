import React from "react";
import { Outlet } from "react-router";
import Container from "@mui/material/Container";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Container maxWidth="xl" style={{paddingTop:"50px"}}>
        <Outlet />
      </Container>
    </>
  );
}
