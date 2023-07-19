import React, { useState } from 'react'
import "../styles/Pagination.css";
import { Box, TextField, Typography } from '@mui/material';
import { Pagin } from './pagination';
const IndexTables = () => {
  const items = [
    "0-9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(null);

  React.useEffect(() => {
    console.log("enter index table")
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
    fetchBooks();
  }, [global.values?.code]);
  console.log("our index is", index);







  return (
    <>
      <Box
        sx={{
          height: "20px",
          width: "100%",
          textAlign: "left",
          ml: "-60px",
          mt: "20px"
        }}
      >
        <Pagin />
      </Box>
      <div style={{ height: "50%", width: "20%", marginRight: "10%", marginTop: "22px", marginLeft: "2px" }}>

        <TextField sx={{
          width: "120px", "& input": {
            height: "4px",
            bgcolor: "background.paper",
            color: (theme) =>
              theme.palette.getContrastText(
                theme.palette.background.paper
              ),
          },
        }}
          placeholder=" Use Filter"
          onChange={(e) => setSearch(e.target.value)}
        />



      </div>



      <div style={{ overflowX: "scroll", width: "796px", overflowY: "scroll", height: "450px", backgroundColor: "#c7e1ed" }}>
        <table style={{marginLeft:"10px"}}>



         
 

<tbody style={{ textAlign: "left" }}>
  {index
    ?.filter((item) => {
      return search.toLowerCase() === ""
        ? item
        : item.title.toLowerCase().includes(search);
    })
    .map((row) => {
      return (
        <>
          <tr key={row.id} style={{ marginLeft: "-80px" }}>
            <td>
              <ul style={{ listStyleType: "square", paddingLeft: "20px", margin: 0 }}>
                <li>
                  {row.title}
                </li>
              </ul>
            </td>
            {row.seealso && (
              <td>
                <a href={`YOUR_CLSO_URL_PREFIX/${row.seealso}`} target="_blank" style={{ color: "blue"}}>
                  seeAlso {row.seealso}
                </a>
              </td>
            )}
            {row.see && (
              <td>
                <a href={`YOUR_CCC_URL_PREFIX/${row.see}`} target="_blank" style={{ color: "blue"}}>
                  see {row.see}
                </a>
              </td>
            )}
            <td>
              <a href={`YOUR_URL_PREFIX/${row.code}`} target="_blank">
                {row.code}
              </a>
            </td>
          </tr>

          {row.termHierarchyList && row.termHierarchyList.length > 0 && (
            row.termHierarchyList.map((add, addIndex) => {
              return (
                <tr key={add.id}>
                  <td style={{ paddingLeft: "40px" }}>
                    <ul style={{ listStyleType: "circle", paddingLeft: "20px", margin: 0 }} >
                      <li>
                        {add.title}
                      </li>
                    </ul>
                  </td>
                </tr>
              )
            })
          )}
        </>
      )
    })
  }
</tbody>

        </table>
      </div>

    </>
  )
}
export default IndexTables;