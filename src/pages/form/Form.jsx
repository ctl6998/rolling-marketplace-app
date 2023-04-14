import * as React from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";

export default function Form() {
  return (
    <>
      <form className="product-form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            style={{ display: "flex", flexDirection: "column", gap: "25px", justifyContent:"center" }}
          >
            <Button variant="outlined" component="label" style={{flexGrow:"4"}}>
              Upload Image
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            <TextField
              id="outlined-basic"
              label="Product Name"
              defaultValue=""
              size="small"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Product Price"
              defaultValue=""
              size="small"
              variant="outlined"
            />
            <TextField
              id="outlined-multiline-static"
              label="Product Description"
              multiline
              rows={8}
              defaultValue="Enter your product description here"
            />
            <Button variant="contained">Update Product</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
