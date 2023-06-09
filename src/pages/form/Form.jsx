import * as React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import awsconfig from "../../aws-exports";
import { Storage } from "aws-amplify";
import { Amplify } from "aws-amplify";
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
Amplify.configure(awsconfig);
const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = awsconfig;
const date = new Date();

export default function Form() {
  const theme = useTheme();
  const [cateName, setCateName] = useState([]);
  const categories = ["Bag", "Hat", "Glove", "Shoe"];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCateName(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    setFormDetails({ ...formDetails, categories: cateName });
  }, [cateName]);

  // Hanlde form logic
  const [formDetails, setFormDetails] = useState({
    date: date,
    name: "",
    price: "",
    image: "",
    description: "",
    categories: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);
    handleClickOpen();
    // postData();
  };

  const handleReset = async (e) => {
    setFormDetails({
      name: "",
      price: "",
      image: "",
      description: "",
    });
    setCateName([]);
    setFile("");
    await Storage.remove(key.replace("/images", ""), { level: "public" });
  };

  // Handle image
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [key, setKey] = useState("");
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const extension = file.name.split(".")[1];
    const name = file.name.split(".")[0];
    setKey(`images/${uuidv4()}${name}.${extension}`);
    const key = `images/${uuidv4()}${name}.${extension}`;
    const url =
      await `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    try {
      // Upload the file to s3 with public access level.
      const storageResult = await Storage.put(key, file, {
        level: "public",
        type: "image/png,image/jpg",
      });
      setUploaded(true);
      // Retrieve the uploaded file to display
      const imageUrl = await Storage.get(key, { level: "public" });
      setFile(imageUrl);
      setFormDetails({ ...formDetails, image: imageUrl });
    } catch (err) {
      console.log(err);
    }
  };
  // Handle http request
  const postData = async () => {
    try {
      const response = await fetch(
        "https://9m0mdrl7ea.execute-api.ap-southeast-1.amazonaws.com/dev/product",
        {
          method: "POST",
          headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials': true, 
            'Content-Type': 'application/json'
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
  // Handle popup
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirmation = async () => {
    await postData();
    setOpen(false);
    handleReset();
  }
  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Continue updating the product?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                This means sending the data to the database
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirmation} autoFocus>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
              style={{ flexGrow: "4", flexDirection: "column", gap: "15px" }}
            >
              {uploaded ? (
                <img className="image-preview" src={file} alt="" />
              ) : (
                ""
              )}
              <input
                type="file"
                accept="image/png,image/jpg"
                onChange={handleImageUpload}
              />
            </Button>
            <div>
              {uploaded ? (
                <div>Your image is uploaded!!</div>
              ) : (
                <div>Upload your product photos</div>
              )}
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            <TextField
              id="outlined-basic"
              label="Product Name"
              size="small"
              variant="outlined"
              value={formDetails.name || ""}
              onChange={(e) =>
                setFormDetails({ ...formDetails, name: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Product Price"
              size="small"
              variant="outlined"
              value={formDetails.price || ""}
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
              value={formDetails.categories || []}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              multiple
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
              value={formDetails.description || ""}
              onChange={(e) =>
                setFormDetails({ ...formDetails, description: e.target.value })
              }
            />
            <Button variant="contained" type="submit">
              Update Product
            </Button>
            <Button variant="outlined" type="button" onClick={handleReset}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
