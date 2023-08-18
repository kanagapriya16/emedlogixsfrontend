


import React, { Fragment, useState } from "react";
import "../styles/Pagination.css";
import { Box, TextField, Typography } from "@mui/material";
import { Pagin } from "./pagination";
import CircularWithValueLabel from "./circularper";


const renderChildRows = (row, depthLevel = 1) => {
  if (row.child) {
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
                  {row.child.title}
                  <a
                   style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                  >
                    {row.child.code !== null &&
                      row.child.code !== "null" &&
                      ` ${row.child.code}`}
                  </a>
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
const IndexTables = () => {
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(null);
  const [index1, setIndex1] = useState(null);
  const [clickedCode, setClickedCode] = useState(null);
  const [result1,setResult1]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeBtnIndex, setActiveBtnIndex] = useState(0);

  const handleClick1 = (index) => {
    setActiveBtnIndex(index);
  };
    
  React.useEffect(() => {
    console.log("enter index table");
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code) {
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
    setIsLoading(true)
    // Clear the previous index data before fetching new data
    setIndex(null);
    fetchBooks();
  }, [global.values?.code]);
  console.log("our index is", index);







 React.useEffect(() => {
    console.log("enter index table");
    const fetchBooks = async () => {
      try {
          const response = await fetch(`/codes/alldetails/index`);
          if (response.ok) {
            const data = await response.json();
            setIndex1(data);
          } else {
            console.error("Failed to fetch data");
          }
      } catch (error) {
        console.error("Error:", error);
      }
      finally{
        setIsLoading(false)
      }
    };
    // Clear the previous index data before fetching new data
    setIndex(null);
    fetchBooks();
  }, []);
  console.log("our index1 is", index1);








  //const handleCodeClick = (code) => {
    //setClickedCode(code);
   // fetchCodeDetails(code); // Call the function to fetch code details
   // global.intable = null;
   // global.values = null; 
    
  //};







  
  // Function to fetch code details when a row.code is clicked
  const fetchCodeDetails = async (code) => {
    try {
      if (code) {
        const response = await fetch(`/codes/${code}/details/?version=${global.years}`);
        if (response.ok) {
          const data = await response.json();
          setResult1(data);
        } else {
          console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  console.log(result1);
//global.intableresult=result1;
//onsole.log(global.intableresult)
 // console.log(clickedCode);

//global.intable=clickedCode;




  return (
    <>
      <Box
        sx={{
          height: "20px",
          width: "100%",
          textAlign: "left",
          ml: "5px",
          mt: "40px",
        }}
      >
        <Pagin />
      </Box>
      <div
        style={{
          height: "50%",
          width: "20%",
          marginRight: "10%",
          marginTop: "28px",
          marginLeft: "2px",
        }}
      >
        <TextField
          sx={{
            width: "120px",
            "& input": {
              height: "4px",
              bgcolor: "background.paper",
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
            },
          }}
          placeholder=" Use Filter"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      {isLoading ? ( // Show loading indicator
          <div
            style={{
              marginLeft: "350px",
              marginTop: "30%",
            }}
          >
            <CircularWithValueLabel />
          </div>
        ) : (
      <div
        style={{
          overflowX: "scroll",
          width: "796px",
          overflowY: "scroll",
          height: "450px",
          backgroundColor: "#C7E1ED",
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
                        {row.nemod ? ( // Check if nemod has a value
                          <li>
                            {row.title} {row.nemod}
                          </li>
                        ) : (
                          <li>{row.title}</li>
                        )}
                      </ul>
                    </td>
                
                    {row.seealso !== null && row.seealso !== "null" && (
                      <td>
                        <a
                       style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                        >
                          SeeAlso {row.seealso}
                        </a>
                      </td>
                    )}
                    {row.see !== null && row.see !== "null" && (
                      <td>
                        <a
                        style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                        >
                          See {row.see}
                        </a>
                      </td>
                    )}
                    <td>
                      <a style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                      //onClick={() => handleCodeClick(row.code)} 
                      >
                        {row.code}
                      </a>
                    </td>
                  </tr>
                  {renderChildRows(row)}
                </Fragment>
              ))}
          </tbody>

         




          <tbody style={{ textAlign: "left" }}>
            
          {!global.values?.code &&
            index1
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
                        {row.nemod !== null && row.nemod !== "null" ? ( // Check if nemod has a value
                          <li>
                            {row.title} {row.nemod}
                          </li>
                        ) : (
                          <li>{row.title}</li>
                        )}
                      </ul>
                    </td>
                   
                    {row.seealso !== null && row.seealso !== "null" && (
                      <td>
                        <a
                         style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                        >
                          SeeAlso {row.seealso}
                        </a>
                      </td>
                    )}
                    {row.see !== null && row.see !== "null" && (
                      <td>
                        <a
                         style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                        >
                          See {row.see}
                        </a>
                      </td>
                    )}
                     {row.code !== null && row.code !== "null" && (
                    <td>
                      <a style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                       //onClick={() => handleCodeClick(row.code)} 
                        >
                        {row.code}
                      </a>
                    </td>
                     )}
                  </tr>
                  {renderChildRows(row)}
                </Fragment>
              ))}
          </tbody>
          
        </table>
      </div>
        )}
    </>
  );
};
export default IndexTables;


