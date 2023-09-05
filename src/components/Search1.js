import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Main } from "./Main";
import { BlindsClosed } from "@mui/icons-material";
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
  const [refreshMain, setRefreshMain] = useState(false);
  const [sortedResult, setSortedResult] = useState([]);

  global.tokens=localStorage.getItem("emed");
  console.log(global.tokens);


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
    setRefreshMain(!refreshMain);
    global.isCodeClicked = false;
   
  };
  const handleClearInput = () => {
    setWord(""); 
    setSelectedItem(null); 
    setIsValueSelected(false);

    setIsValueSelected(null);

  };
  console.log(word);


  useEffect(() => {
    const getdataAftertimeout = setTimeout(() => {
      global.inatbleresult = null;
  
      const fetchBooks = async () => {
        try {
          if (word) {
            const regex =
              /^[a-zA-Z]$|^[a-zA-Z]+\d+$|^[a-zA-Z]+\d+[a-zA-Z]+$|^[a-zA-Z]+\d+[a-zA-Z]+\d+$/;
            const combinedData = [];
  
            if (regex.test(word)) {
              const response = await fetch(`/codes/${word}/matches`, {
                method:'GET',
                headers: {
                  Authorization: `Bearer ${global.tokens} `// Replace with your actual token
                },
              });
              setIsDescriptionFetched(false);
  
              if (response.ok) {
                const data = await response.json();
                combinedData.push(...data);
              }  else {
                console.error("Failed to fetch data from the first API");
              }
            } else if (/^[a-zA-Z]{2}$/.test(word) || word.length > 3) {
        
              const response = await fetch(
                `/codes/index/search/name?name=${word}&mainTermSearch=true`,
                {
                  method:'GET',
                  headers: {
                    Authorization: `Bearer ${global.tokens} `// Replace with your actual token
                  },
                });
              setIsDescriptionFetched(true);
  
              if (response.ok) {
                const data = await response.json();
                combinedData.push(...data);
              } else {
                console.error("Failed to fetch data from the first API");
              }
  
              
              const alterResponse = await fetch(`/alter-terms/search?alterDescription=${word}`, {
                method:'GET',
                headers: {
                  Authorization: `Bearer ${global.tokens} `// Replace with your actual token
                },
              });
              setIsDescriptionFetched(true);
              if (alterResponse.ok) {
                const alterData = await alterResponse.json();
                combinedData.push(...alterData);
             
                console.log("Second API response:", alterData);
              } else {
                console.error("Failed to fetch data from the second API");
              }
         const thirdResponse = await fetch(`/codes/${word}/description`,{
          method:'GET',
          headers: {
            Authorization: `Bearer ${global.tokens} `// Replace with your actual token
          },
        });
              setIsDescriptionFetched(true);
              if (thirdResponse.ok) {
                const alterrData = await thirdResponse.json();
                combinedData.push(...alterrData);
            console.log("Second API response:", alterrData);
              } else {
                console.error("Failed to fetch data from the second API");
              }
            } else {
              console.error("Invalid input");
            }
            setResult(combinedData);
          } else {
            setResult([]);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchBooks();
    }, 700);
  
    return () => clearTimeout(getdataAftertimeout);
  }, [word]);

  console.log("our result is", result);
  console.log(first);
  global.values = first;
  global.words = word;
if (setIsDescriptionFetched) {
   window.sortOptions = (options, typedValueLower) => {
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


  
  
  const matches = useMediaQuery("(max-width:768px)");
  return (
    <>
      {matches ? (
        <Box
          sx={{
            height: "80px",
            marginTop: "29px",
            ml: "98px",
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
                  width: "50vw",
                },
              }}
              onChange={handleChange}
              placeholder="Search for code"
              value={
                selectedItem && isValueSelected
                  ? ` ${
                      selectedItem.code !== "null" ? selectedItem.code : ""
                    } ${selectedItem.description || ""} ${selectedItem.alterDescription || ""} ${
                      selectedItem.title || ""
                    }`
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
                    {word || selectedItem ? ( // Show close icon when there's input or a selected item
                      <CloseIcon
                        sx={{
                          fontSize: "20px",
                        }}
                        onClick={handleClearInput}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <SearchIcon />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <Autocomplete
              freeSolo
              disableClearable
              id="users"
              defaultValue={null}
              getOptionLabel={(item) =>
                `${item.title || ""}  ${item.level || ""}  ${
                  item.seealso || ""
                }   ${item.id || ""}  ${item.description || ""} ${
                  item.code || ""
                } ${item.nemod} ${item.alterDescription || ""}`
              }
           options={
                isDescriptionFetched
                  ? window.sortOptions([...result], word)
                  : [...result]
              }
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
              onClose={() => {
                setOpen(false);
          
              }}
              style={{
                width:"66vw"
              }}
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
                  placeholder="Search for code"
                />
              )}
              renderOption={(props, result1) => (
                <Box {...props} key={result.id}>
                {isDescriptionFetched ? (
                  <span>{result1.title && result1.code !== 'null' ? result1.title + " " : ''}{" "}{result1.description !== 'null' ? result1.description : ''}{" "}{result1.alterDescription !== 'null' ? result1.alterDescription : ''}{" "}{result1.seealso !== 'null' && result1.seealso !== undefined ? `seealso:${result1.seealso}` : ''}
                  {result1.see !== 'null' && result1.see !== undefined ? `see:${result1.see}` : ''}{" "}{result1.nemod !== 'null' ? result1.nemod : ''}{" "}{result1.code !== 'null' ? (<span style={{ color: 'blue' }}>{result1.code}</span>) : ('')}</span>) : (
                  <span><span style={{ color: 'blue' }}>{result1.id}</span>{" "}{result1.description}</span>
                )}
              </Box>
              )}
            />
          </Box>
        </Box>
      ) : (
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
                  width: "70vw",
                },
              }}
              onChange={handleChange}
              placeholder="Search for code"
              value={
                selectedItem && isValueSelected
                  ? ` ${
                      selectedItem.code !== "null" ? selectedItem.code : ""
                    } ${selectedItem.description || ""} ${selectedItem.alterDescription || ""} ${
                      selectedItem.title || ""
                    }`
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
                    {word || selectedItem ? ( // Show close icon when there's input or a selected item
                      <CloseIcon
                        sx={{
                          fontSize: "20px",
                        }}
                        onClick={handleClearInput}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <SearchIcon />
                    )}
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
                `${item.title || ""}  ${item.level || ""}  ${
                  item.seealso || ""
                }   ${item.id || ""}  ${item.description || ""} ${
                  item.code || ""
                } ${item.nemod}${item.alterDescription || ""}`
              }
              options={
                isDescriptionFetched
                  ? window.sortOptions([...result], word)
                  : [...result]
              }
              style={{
                width: "74vw",
              }}
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
              onClose={() => {
                setOpen(false);
              
              }}
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
                  placeholder="Search for code"
                />
              )}
              renderOption={(props, result1) => (
           
               <Box {...props} key={result.id}>
                {isDescriptionFetched ? (
                  <span>{result1.title && result1.code !== 'null' ? result1.title + " " : ''}{" "}{result1.description !== 'null' ? result1.description : ''}{" "}{result1.alterDescription !== 'null' ? result1.alterDescription : ''}{" "}{result1.seealso !== 'null' && result1.seealso !== undefined ? `seealso:${result1.seealso}` : ''}
                  {result1.see !== 'null' && result1.see !== undefined ? `see:${result1.see}` : ''}{" "}{result1.nemod !== 'null' ? result1.nemod : ''}{" "}{result1.code !== 'null' ? (<span style={{ color: 'blue' }}>{result1.code}</span>) : ('')}</span>) : (
                  <span><span style={{ color: 'blue' }}>{result1.id}</span>{" "}{result1.description}</span>
                )}
              </Box>
              )}
            />
          </Box>
        </Box>
      )}
      <Main isValueSelected={isValueSelected} refreshMain={refreshMain}/>
    </>
  );
};
export default Search1;
