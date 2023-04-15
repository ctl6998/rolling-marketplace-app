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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { v4 as uuidv4 } from 'uuid'; 
import { Storage } from "aws-amplify";

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
    postData();
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

  // Handle image
  const [image, setImage] = useState(null);
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const extension = file.name.split(".")[1];
    const name = file.name.split(".")[0];
    const key = `images/${uuidv4()}${name}.${extension}`;
    // const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    // try {
    //   // Upload the file to s3 with public access level.
    //   await Storage.put(key, file, {
    //     level: "public",
    //     contentType: file.type,
    //   });
    //   // Retrieve the uploaded file to display
    //   const image = await Storage.get(key, { level: "public" });
    //   setImage(image);
    //   setBookDetails({ ...bookDetails, image: url });
    // } catch (err) {
    //   console.log(err);
    // }
  }

  // Handle http request
  const postData = async () => {
    try {
      const response = await fetch(
        "https://6439c4eb90cd4ba563eda753.mockapi.io/products",
        {
          method: "POST",
          headers: {
            'Access-Control-Allow-Headers' : 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,PATCH,DELETE'
          },
          body: JSON.stringify(formDetails),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            {image ? (
              <img className="image-preview" src={image} alt="" />
            ) : (
              <Button
                variant="outlined"
                component="label"
                style={{ flexGrow: "4" }}
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/jpg"
                  onChange={(e) => handleImageUpload(e)}
                  hidden
                />
              </Button>
            )}
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
