import React, { Fragment, useState } from "react";
import "../styles/Pagination.css";
import { Box, TextField, Typography } from "@mui/material";
import { Pagin } from "./pagination";
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
                    href={`YOUR_CCC_URL_PREFIX/${row.code}`}
                    target="_blank"
                    style={{ color: "blue" }}
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
    // Clear the previous index data before fetching new data
    setIndex(null);
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
          ml: "-50px",
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
          marginTop: "22px",
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
            {index
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
                    {/* ... (previous code) */}
                    {row.seealso !== null && row.seealso !== "null" && (
                      <td>
                        <a
                          href={`YOUR_CLSO_URL_PREFIX/${row.seealso}`}
                          target="_blank"
                          style={{ color: "blue" }}
                        >
                          SeeAlso {row.seealso}
                        </a>
                      </td>
                    )}
                    {row.see !== null && row.see !== "null" && (
                      <td>
                        <a
                          href={`YOUR_CCC_URL_PREFIX/${row.see}`}
                          target="_blank"
                          style={{ color: "blue" }}
                        >
                          See {row.see}
                        </a>
                      </td>
                    )}
                    <td>
                      <a href={`YOUR_URL_PREFIX/${row.code}`} target="_blank">
                        {row.code}
                      </a>
                    </td>
                  </tr>
                  {renderChildRows(row)}
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default IndexTables;