import * as React from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";

function getStyles(name, cateName, theme) {
  return {
    fontWeight:
      cateName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Form() {
  const theme = useTheme();
  const [cateName, setCateName] = useState([]);
  const categories = [
    "Categories 1",
    "Categories 2",
    "Categories 3",
    "Categories 4",
  ];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCateName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    setFormDetails({ ...formDetails, categories: cateName });
  }, [cateName]);

  // Hanlde form logic
  const [formDetails, setFormDetails] = useState({
    date: "",
    name: "",
    price: "",
    image: "",
    description: "",
    id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);
    postData()
  };

  const handleReset = (e) => {
    setFormDetails({
      date: "",
      name: "",
      price: "",
      image: "",
      description: "",
      id: "",
    });
    setCateName([]);
  };

  // Handle http request
  const postData = async () => {
    try {
      const response = await fetch('https://6439c4eb90cd4ba563eda753.mockapi.io/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDetails)
      });
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <form
        className="product-form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              component="label"
              style={{ flexGrow: "4" }}
            >
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
              value={formDetails.name}
              onChange={(e) =>
                setFormDetails({ ...formDetails, name: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Product Price"
              defaultValue=""
              size="small"
              variant="outlined"
              value={formDetails.price}
              onChange={(e) =>
                setFormDetails({ ...formDetails, price: e.target.value })
              }
            />
            <span style={{ textAlign: "left", marginBottom: "-15px" }}>
              Choose Categories
            </span>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={cateName}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              onChange={handleChange}
            >
              {categories.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, cateName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              id="outlined-multiline-static"
              label="Product Description"
              multiline
              rows={8}
              value={formDetails.description}
              onChange={(e) =>
                setFormDetails({ ...formDetails, description: e.target.value })
              }
            />
            <Button variant="contained" type="submit">
              Update Product
            </Button>
            <Button variant="outlined" type="button" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
