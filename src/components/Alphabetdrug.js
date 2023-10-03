import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Stack, Tab, Tabs, TextField } from "@mui/material";
import Drug1 from "./Drug1";
import Drug2 from "./Drug2";

function CustomTabPanel(props) {
  const { children, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={false} // Always set this to false
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}






CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Alphabetdrug = ({ setSelectedCode }) => {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCodeDetails, setSelectedCodeDetails] = useState(null);

  // Define your tab components and labels here

  

  // Define your tab components and labels here
  const tabLabels = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const tabComponents = tabLabels.map((label) => {
    if (label === "a") {
      return <Drug1 onCodeClick={setSelectedCode} filterText={search} />;
    } else {
      return <Drug2 onCodeClick={setSelectedCode} filterText={search} />;
    }
  });

  const defaultTabValue = "b"; // Set the default active tab to "b"
  

  useEffect(() => {
    // Automatically switch to the tab starting with the first letter of the filter text
    const firstLetter = search.charAt(0).toLowerCase();
    const tabIndex = tabLabels.indexOf(firstLetter);
    if (tabIndex !== -1) {
      setValue(tabIndex);
    }
  }, [search]);




const handleChange = (event, newValue) => {

  setValue(newValue);
    const clickedTabLabel = tabLabels[newValue];
    console.log("Tab clicked: ", clickedTabLabel);
    global.clickedTab2 = clickedTabLabel;
    

};


  


const handleSearchChange = (event) => {
  const searchText = event.target.value.toLowerCase();
  setSearch(searchText);

  // Set global.clickedTab2 to the search text itself
  global.clickedTab2 = searchText;
};
  return (
    <>
      <div
        style={{
          marginTop: "-80px",
          display: "flex",
          position: "absolute",
        }}
      >
        <TextField
          label="use filter"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{
            marginLeft: "-12%",
          }}
        />
      </div>

      <div>
        <Stack direction={"column"} ml={20} mt={1.5} sx={{ width: "5px" }}>
        <Box
          sx={{
            height: "300px",
            width: "100%",
            gap: "0px",
          }}
        >
          <Box
            sx={{
              height: "30px",
              width: "49.9vw",
              background:
                "linear-gradient(to right, #E9F8FF,#90B2D8 , #C1E3FF)",

              color: "black",
              fontFamily: "sans-serif",
              fontSize: "13px",
ml:"-187px",
mt:"-50px"
            }}
          >
            <Stack direction={"row"} gap={"0px"} ml={5}> 
              <Box sx={{ width: "100%" }}>
                <Box sx={{ marginTop: "-10px" }}>
                <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="basic tabs example"
            className="tabs"
            sx={{ marginLeft: "-25px" }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#4185d2",
                width: "20px",
                marginLeft: "38px",
                marginBottom: "10px",
              },
            }}
          >
            {tabLabels.map((label, index) => (
              <Tab
                key={index}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                sx={{
                  cursor: "pointer",
                  variant: "subtitle1",
                  fontWeight: "700px",
                  color: "#4185D2",
                  textTransform: "none",
                  width: "1px",
                }}
                label={label}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
                </Box>
               
                <div
                  className="tabpanels"
                  style={{
                    height: "60vh",
                    width: "49.9vw",
                  

                  
                    marginTop: "-36px",
                    marginLeft: "-46px",

                    display: "flex",
                  }}
                >
                
                {tabComponents.map((component, index) => (
  <CustomTabPanel key={index} value={value} index={index}>
    {value === index && component}
  </CustomTabPanel>
))}
                </div>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </div>
    </>

  );
};