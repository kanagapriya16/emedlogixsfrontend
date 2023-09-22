import React, { Fragment, useState } from "react";

import { Box, TextField, Typography } from "@mui/material";

import { Alphabetm } from "./Alphabetm";


const IndexTables1m = ({ setResults1, setSelectedCode }) => {
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(null);
  const [index1, setIndex1] = useState(null);
  const [clickedCode, setClickedCode] = useState(null);
  const [result1, setResult1] = useState([]);
  const [results2, setResults2] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);
  const [activeBtnIndex, setActiveBtnIndex] = useState(0);
  const Code = (global.values?.code || '').replace(/[-.]/g, '');

  React.useEffect(() => {
    console.log("enter index table");
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code !== null) {
          const response = await fetch(`/codes/${Code}/index`, {
            method:'GET',
            headers: {
              Authorization: `Bearer ${global.tokens} `// Replace with your actual token
            },
          });
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

    setIndex(null);
    if (global.values && global.values.code !== null) {
      fetchBooks();
    }
  }, [global.values?.code]);
  console.log("our index is", index);

  const handleCodeClick = async (code) => {
    global.isCodeClicked = true;
    setClickedCode(code);
  
    try {
      if (code) {
        const response = await fetch(
          `/codes/${(code || '').replace(/[-.]/g, '')}/details/?version=${global.years}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${global.tokens} `
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setResults1(data);
          global.selectedCodeDetails = data;
          global.selectedSectionDetails = data;
          global.selectedChapterDetails = data;
          global.selectedCode = code;
        } else {
          console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };




  const renderChildRows = (row, depthLevel = 1) => {
    if (row.child && row.child.code !== null) {
      const paddingLeftValue = 20 + depthLevel * 20;
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
                        style={{ color: "blue", borderBottom: "1px solid blue" }}
                      >
                        {row.child.code}
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

  return (
    <>
      <Box
        sx={{
          height: "20px",
          width: "100%",
          textAlign: "left",
          ml: "17%",
          display: "flex",
        }}
      >
        {!global.values || !global.values.code ? (
          <Alphabetm
            setSelectedCode={setSelectedCode}
            selectedCodeDetails={results2}
          />
        ) : null}
      </Box>

      {/* {global.values && global.values.code && (
        <div style={{ marginTop: "0px", position: "absolute" }}>
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
      )} */}

      {global.values && global.values.code && (
        <div
          style={{
            width: "97vw",

            height: "65vh",
            backgroundColor: "#C7E1ED",
            marginTop: "33px",
            overflow: "scroll",
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
                            {row.nemod ? (
                              <li>
                                {row.title}{" "}
                                {row.nemod !== null &&
                                  row.nemod !== "null" &&
                                  row.nemod}
                              </li>
                            ) : (
                              <li>{row.title}</li>
                            )}
                          </ul>
                        </td>

                        {row.seealso !== null && row.seealso !== "null" && (
                          <td>
                            <a
                              style={{
                                color: "blue",
                                borderBottom: "1px solid blue",
                              }}
                            >
                              seeAlso {row.seealso}
                            </a>
                          </td>
                        )}
                        {row.see !== null && row.see !== "null" && (
                          <td>
                            <a
                              style={{
                                color: "blue",
                                borderBottom: "1px solid blue",
                              }}
                            >
                              See{row.see}
                            </a>
                          </td>
                        )}
                        <td>
                          <a
                            style={{
                              color: "blue",
                              borderBottom: "1px solid blue",
                            }}
                            onClick={() => handleCodeClick(row.code)}
                          >
                            {row.code !== null &&
                              row.code !== "null" &&
                              row.code}
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
export default IndexTables1m;