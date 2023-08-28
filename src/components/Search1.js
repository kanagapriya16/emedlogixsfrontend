import {
  Autocomplete,
  Box,
  InputAdornment,
TextField,
} from "@mui/material";
import React, {  useEffect, useState } from "react";
import "../App.css";
import { Main } from "./Main";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
const Search1 = () => {
  const [result, setResult] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [first, setFirst] = useState("");
  const [word, setWord] = useState("");
 const [isValueSelected, setIsValueSelected] = useState(false);
  const [isDescriptionFetched, setIsDescriptionFetched] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);




const handleChange = (event) => {
    const newValue = event.target.value;
    setWord(newValue);
    if (newValue.length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    setSelectedItem(null);
    setIsValueSelected(false);
  };
  const handleClearInput = () => {
    setWord(""); // Clear the input value
    setSelectedItem(null);
    setIsValueSelected(false);
  };

  console.log(word);
  useEffect(() => {
    global.inatbleresult = null;
    const fetchBooks = async () => {
      try {
        if (word) {
          let response;
        
          const regex =
            /^[a-zA-Z]$|^[a-zA-Z]+\d+$|^[a-zA-Z]+\d+[a-zA-Z]+$|^[a-zA-Z]+\d+[a-zA-Z]+\d+$/;
          if (regex.test(word)) {
            response = await fetch(`/codes/${word}/matches`);
            setIsDescriptionFetched(false);
          }
          else if (/^[a-zA-Z]{2}$/.test(word) || word.length > 3) {
            response = await fetch(
              `/codes/index/search/name?name=${word}&mainTermSearch=true`
            );
            setIsDescriptionFetched(true);
          } else {
            console.error("Invalid input");
            return;
          }
          if (response.ok) {
            const data = await response.json();
            setResult(data);
          } else {
            console.error("Failed to fetch data");
          }
        } else {
          setResult([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [word]);
  console.log("our result is", result);
 
  console.log(first);
  global.values = first;
 global.words = word;
  const options = [...result];

if (setIsDescriptionFetched) {
    window.sortOptions = (options, typedValue) => {
      const typedValueLower = typedValue.toLowerCase();
      return options.sort((a, b) => {
        const aTitle = a.title ?? "";
        const bTitle = b.title ?? "";
        
        const aLower = aTitle.toLowerCase();
        const bLower = bTitle.toLowerCase();
        
        if (aLower.startsWith(typedValueLower)) return -1; 
        if (bLower.startsWith(typedValueLower)) return 1;  
        
        return aLower.localeCompare(bLower); 
      });
    };
  }
  return (
    <>
      <Box
        sx={{
          height: "80px",
          marginTop: "29px",
          ml: "130px",
        }}
      >
        <Box
          sx={{ margin: "auto", color: "black", mt: "20px" }}
          direction="column"
          gap={5}
        >
          <TextField
         
            sx={{
              "& input": {
                height: "5px",
                width: "86vw",
              },
            }}
            onChange={handleChange}
            placeholder="Search for code"
            value={
              selectedItem && isValueSelected 
                ? ` ${selectedItem.code !== 'null' ? selectedItem.code : ""} ${
                    selectedItem.description || ""
                  } ${selectedItem.title || ""}`
                : word 
            }
            onKeyDown={(event) => {
              if (event.key === "Backspace") {
      
                setSelectedItem(null);
                setIsValueSelected(false);
              }
            }}
            inputProps={{
              autoComplete: "off", 
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                   <CloseIcon onClick={handleClearInput} style={{ cursor: 'pointer' }}/>
                  <SearchIcon/>
           
                </InputAdornment>
                
              ),
            }}
          />
          <Autocomplete
            disableClearable
            freeSolo
            id="users"
            defaultValue={null}
            getOptionLabel={(item) =>
              `${item.title || ""}  ${item.level || ""}  ${item.seealso || ""}   ${
                item.id || ""
              }  ${item.description || ""} ${item.code || "" } ${item.nemod }`
            }

             options = {isDescriptionFetched
            ? window.sortOptions([...result], word)
            : [...result]}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
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
            onChange={(event, newValue) => {
              setSelectedItem(newValue); 
              setWord(newValue ? newValue.title : "");
              setFirst(newValue);
              setIsValueSelected(true);
           
            }}
            autoSelect
            renderInput={(params) => (
              <TextField
                disabled
                sx={{
                  "& input": {
                    height: "0px",
                    display: "none",
                    mt: "-50px",
                    border: "none",
                  },
                }}
                {...params}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
          
                    setSelectedItem(null);
                    setIsValueSelected(false);
                  }
                }}
                placeholder="Search for code"
              />
            )}
            renderOption={(props, result1) => (
              <Box {...props} key={result.id}>
                {isDescriptionFetched
                  ? `${result1.title} ${result1.code !== 'null' ? result1.code : ""} ${result1.seealso !== 'null' ? `seealso:${result1.seealso}` : ""} ${result1.see !== 'null' ? `see:${result1.see}` : ""} ${result1.nemod !== 'null' ? result1.nemod : ""}`
                  : `${result1.id} ${result1.description}`}
              </Box>
            )}
          />
        </Box>
      </Box>
      <Main isValueSelected={isValueSelected} />
    </>
  );
};
export default Search1;