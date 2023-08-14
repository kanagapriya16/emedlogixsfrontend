import React, { Fragment, useState } from "react";
import "../styles/Pagination.css";
import { Box, TextField, Typography } from "@mui/material";
import { Pagin } from "./pagination";
import CircularWithValueLabel from "./circularper";
import { Alphabet } from "./Alphabet";
import { Loads } from "./Loads";
import Search from "./Search";
import { Main } from "./Main";



const renderChildRows = (row, depthLevel = 1) => {
  if (row.child && row.child.code !== null) {
    const paddingLeftValue = 20 + depthLevel * 20; // Increase padding for deeper levels
    return (
      <>
        <tr key={row.child.id}>
          <td style={{ paddingLeft: `${paddingLeftValue}px` }}>
            <ul
              style={{
                listStyleType: "circle",
                paddingLeft: "20px",
                margin: 0,
              }}
            >
              {row.child.title && (
                <li>
                   {row.child.title}{" "}
                  {row.child.code !== null && row.child.code !== "null" && (
                  <a
                   style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                  >
                    {row.child.code}
                      {/* {row.child.code !== null &&
                      row.child.code !== "null" &&
                      ` ${row.child.code}`}*/}
                  </a>
                  )}
                </li>
              )}
            </ul>
          </td>
        </tr>
        {renderChildRows(row.child, depthLevel + 1)}
      </>
    );
  }
  return null;
};
const IndexTables1 = () => {
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(null);
  const [index1, setIndex1] = useState(null);
  const [clickedCode, setClickedCode] = useState(null);
  const [result1,setResult1]=useState([]);
 

  
  const [activeBtnIndex, setActiveBtnIndex] = useState(0);


    
  React.useEffect(() => {
    console.log("enter index table");
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code !== null) {
          const response = await fetch(`/codes/${global.values.code}/index`);
          if (response.ok) {
            const data = await response.json();
            setIndex(data);
           
          } else {
            console.error("Failed to fetch data");
          }
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    // Clear the previous index data before fetching new data
    setIndex(null);
    if (global.values && global.values.code !== null) {
      fetchBooks();
    }
  }, [global.values?.code]);
  console.log("our index is", index);

  const handleClick = async (event, codes) => {
    console.log(`Code clicked: ${codes}`);
    await fetchCodeDetails(codes);
   
 
  };



   // Function to fetch code details when a row.code is clicked
   const fetchCodeDetails = async (codes) => {
    try {
      if (codes) {
        const response = await fetch(`/codes/${codes}/matches`);
        if (response.ok) {
          const data = await response.json();
          setResult1(data);
          setClickedCode(codes); 
        } else {
          console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  console.log(result1);
global.results=result1;
const codesFromResults = global.results.map(result => result.code);


console.log(codesFromResults);
global.codess=codesFromResults[0];


return (
    <>
      <Box
        sx={{
          height: "20px",
          width: "100%",
          textAlign: "left",
          ml: "17%",
        
        }}
      >
         {!global.values || !global.values.code ? <Alphabet /> : null}
      </Box>
    

      {global.values && global.values.code && (
  <div style={{ marginTop: "0px" ,position:"absolute"}}>
    <TextField
      sx={{
        width: "120px",
        "& input": {
          height: "4px",
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.background.paper),
        },
      }}
      placeholder=" Use Filter"
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
)}
      
      {global.values && global.values.code && (
      <div
        style={{
      
          width: "790px",
       
          height: "550px",
          backgroundColor: "#C7E1ED",
          marginTop:"33px",
          overflow:"scroll",
    
         
        }}
      >



        <table style={{ marginLeft: "10px" }}>
          <tbody style={{ textAlign: "left" }}>
          {global.values?.code !== null &&
            index
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(search);
              })
              .map((row) => (
                <Fragment key={row.id}>
                  <tr>
                    <td>
                      <ul
                        style={{
                          listStyleType: "square",
                          paddingLeft: "20px",
                          margin: 0,
                        }}
                      >
                        {row.nemod ?  ( // Check if nemod has a value
                          <li>
                            {row.title} {row.nemod !== null && row.nemod !== "null" && row.nemod}
                          </li>
                        ) : (
                          <li>{ row.title}</li>
                        )}
                      </ul>
                    </td>
                
                    {row.seealso !== null && row.seealso !== "null" && (
                      <td>
                        <a
                       style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                        >
                          seeAlso {row.seealso}
                        </a>
                      </td>
                    )}
                    {row.see !== null && row.see !== "null" && (
                      <td>
                        <a
                        style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                        >
                           See{row.see}
                        </a>
                      </td>
                    )}
                    <td>
                      <a style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                   onClick={(event) =>handleClick(event, row.code)}>
                     {row.code !== null && row.code !== "null" && row.code}
                      </a>
                      
                    </td>
                  </tr>
                  {renderChildRows(row)}
                </Fragment>
              ))}
          </tbody>

          
          {global.values?.code !== null && index && index.length === 0 && (
          <Typography
            marginLeft={30}
            variant="caption"
            color={"#4185D2"}
            fontWeight={800}
          >
            <h3>No Index codes found for the given search criteria.</h3>
          </Typography>
        )}
        



         
          
        </table>
      </div>
      )}
     
    </>
  );
};
export default IndexTables1;
