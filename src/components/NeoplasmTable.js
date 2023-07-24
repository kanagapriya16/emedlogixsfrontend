import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TextField } from "@mui/material";
import { Pagin } from "./pagination";
import { useState } from "react";
import "../App.css"
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    backgroundColor: "#90B2D8",
    padding: "0px 12px 0px 0px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 1,
    border: "1px solid grey",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    height: 1,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    height: 1,
  },
}));
export default function NeoplasmTable() {
  console.log("neo enter");
 
  const [neo, setNeo] = useState(null);
  const [neo1, setNeo1] = useState(null);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code) {
          const response = await fetch(`/codes/${global.values.code}/neoplasm`);
          if (response.ok) {
            const data = await response.json();
            setNeo(data);

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
    fetchBooks();
  }, [global.values?.code]);
  console.log("our neo is", neo);

//All neoplasm values
React.useEffect(() => {
  const fetchBooks = async () => {
    try {
     
        const response = await fetch(`/codes/allDetails/neoplasm`);
        if (response.ok) {
          const data = await response.json();
          setNeo1(data);

        } else {
          console.error("Failed to fetch data");
        }
      
    } catch (error) {
      console.error("Error:", error);
    }
  };
  fetchBooks();
}, []);
console.log("our neo1 is", neo1);







  const [result, setResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState("");
  const [word, setWord] = useState("");
  const [isValueSelected, setIsValueSelected] = useState(false);
  const [search, setSearch] = useState("");

  
  function handleChange(e) {
    setWord(e.target.value);
  }
  return (
    <>
      <Box
        sx={{
          height: "20px",
          width: "100%",
          textAlign: "left",
          ml: "-40px",
          mt: "240px",
         
        }}
      >
        <Pagin />
      </Box>
      <TableContainer
        sx={{
          mt: "100px",
          display: "flex",
          position: "absolute",
          width: "910px",
          ml: "-115px",
          height:"450px",
          overflowY: "scroll",
        }}
      >
        <Table sx={{ height: "5px" }}>
          <TableHead sx={{ height: "5px", minHeight: "10px" }}>
            <TableRow>
              <div>
                <div className="table">
                  <Box
                    sx={{
                      width: "100px",
                      height: "20%",
                      marginTop:"5%"
                     
                    }}
                  >
                   
                      <Box
                        sx={{ width: "120px", height: "22%" }}>
                        <TextField
                          sx={{
                            width: "130px",
                            
                            "& input": {
                              height: "10px",
                              bgcolor: "background.paper",
                              marginTop:"-5%",

                              color: (theme) =>
                                theme.palette.getContrastText(
                                  theme.palette.background.paper
                                ),
                            },
                          }}
                          placeholder="Use Filter"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </Box>
                      
                   
                  </Box>
                </div>
              </div>
            </TableRow>
          </TableHead>
          <TableHead sx={{ height: "20px", border: "1px solid grey" }} >
            <TableRow
              sx={{
                border: "1px solid grey",
                height: "20px",
                alignItems:"center"
              }}

            >
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                N-term
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Primary Malignant
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Secondary Malignant
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Ca in situ
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Benign
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Uncertain Behavior
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Unspecified Behavior
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {global.values?.code !== null &&
  neo
    ?.filter((item) => {
      return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search);
    })
    .map((row) => (
      <StyledTableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
          {row.title}
        </StyledTableCell>
        {row.code.map((value, index) => (
          <StyledTableCell
            key={index}
            sx={{
              border: "1px solid grey",
            }}
            align="center"
          >
            {value}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ))}

{!global.values?.code &&
  neo1
    ?.filter((item) => {
      return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search);
    })
    .map((row) => (
      <StyledTableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
          {row.title}
        </StyledTableCell>
        {row.code.map((value, index) => (
          <StyledTableCell
            key={index}
            sx={{
              border: "1px solid grey",
            }}
            align="center"
          >
            {value}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ))}
    </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}










