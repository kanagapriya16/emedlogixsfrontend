
import { Autocomplete, Box, IconButton, Stack, TextField } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";
import { Main } from "./Main";
import { Alphabet } from "./Alphabet";
const Search = () => {
  console.log("enter into search");
  console.log(global.index);
  const [result, setResult] = useState([]);
  const [result1, setResult1] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [first, setFirst] = useState("");
  const [word, setWord] = useState("");
  const [isDescriptionFetched, setIsDescriptionFetched] = useState(false);
  function handleChange(e) {
    setWord(e.target.value);
    setIsDescriptionFetched(false);
  }
  console.log(word);
  const handleChanges = (event, newValue) => {
    if (word !== null) {
      setFirst(newValue);
    }
  };
  useEffect(() => {
    global.inatbleresult = null;

 const fetchBooks = async () => {
  try {
    if (word) {
      let response;
    //const regex = /^[a-zA-Z]$|^[a-zA-Z]+\d+$/;
    const regex = /^[a-zA-Z]$|^[a-zA-Z]+\d+$|^[a-zA-Z]+\d+[a-zA-Z]+$|^[a-zA-Z]+\d+[a-zA-Z]+\d+$/;
   
 
     if (regex.test(word)) {
        response = await fetch(`/codes/${word}/matches`);
      }
   else if (/^[a-zA-Z]{3}$/.test(word)|| word.length > 3) {
       response = await fetch(`/codes/${word}/description`);
       setIsDescriptionFetched(true);
     }
   
      else {
       console.error("Invalid input");
     return;
     }
      if (response.ok) {
        const data = await response.json();
        setResult1(data);
      } else {
        console.error("Failed to fetch data");
      }
    } else {
      setResult1([]);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
fetchBooks();
}, [word]);
  console.log("our result is", result1);
  console.log(first);
  global.values = first;
  console.log(global.values && global.values.code);
  console.log(word);
  global.words = word;
  return (
    <>
      <Box
        sx={{
          height: "80px",
          position: "static",
          marginTop: "-5px",
        }}
      >
        <Stack
          sx={{ margin: "auto", color: "black", mt: "20px" }}
          direction={"row"}
          gap={5}
        >
          <Fragment>
            <Autocomplete
              id="users"
              defaultValue={null}
              getOptionLabel={(result1) =>
                `${result1.id} ${result1.description}`
              }
              options={result1}
              sx={{
                width: "1450px",
                backgroundColor: "white",
                mt: "14px",
                ml: "130px",
                display: "inline-block",
                "& input": {
                  height: "5px",
                  bgcolor: "background.paper",
                  color: (theme) =>
                    theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
                },
              }}
              isoptionequalToValue={(option, value) =>
                option.description === value.description
              }
              noOptionsText={"PLEASE ENTER VALID CODES"}
              open={open}
              onInputChange={(_, value) => {
                if (value.length === 0) {
                  if (open) setOpen(false);
                } else {
                  if (!open) setOpen(true);
                }
              }}
              onClose={() => setOpen(false)}
              popupIcon={
                <SearchIcon
                  sx={{
                    transition: "transform 0s",
                    transform: open ? "rotate(180deg)" : "none",
                    "&:hover": { background: "none" },
                  }}
                />
              }
              onChange={handleChanges}
              autoSelect
              renderOption={(props, result1) => (
                <Box {...props} key={result.id}>
                  {isDescriptionFetched
                    ? `${result1.description} ${result1.id}`
                    : `${result1.id} ${result1.description}`}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={handleChange}
                  placeholder="Search for code"
                />
              )}
            />
          </Fragment>
        </Stack>
      </Box>
      <Main />
    </>
  );
};
export default Search;