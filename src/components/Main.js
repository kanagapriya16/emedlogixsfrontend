
import {
  Box,
  Container,
  Stack,
  Typography,
  Tab,
  Tabs,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import Codedet from "./Codedet";
import PropTypes from "prop-types";
import Codenotes from "./Codenotes";
import Sectionnotes from "./Sectionnotes";
import Chapternotes from "./Chapternotes";
import "../App.css";
import "../styles/Main.css";

import DrugTable from "./DrugTable";



import IndexTables from "./IndexTables";
import NeoplasmTable from "./NeoplasmTable";





function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
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

export const Main = ({ isValueSelected }) => {
  const [value, setValue] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [showIndx, setShowIndex] = useState(false);
  const [showDrug, setShowdrug] = useState(false);
  const handleIndexClick = () => {
    setShowIndex(!showIndx);
    setShowTable(false);
    setShowdrug(false);
  };
  const handleTableClick = () => {
    setShowTable(!showTable);
    setShowIndex(false);
    setShowdrug(false);
  };
  const handleDrugClick = () => {
    setShowdrug(!showDrug);
    setShowIndex(false);
    setShowTable(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShowIndex(false);
    setShowTable(false);
    setShowdrug(false);
  };
 

  return (
    <div>
      <Container maxWidth="4px">
        <Stack direction={"row"} gap={"10px"} mt={2.5}>
          <Box
            sx={{
              height: "635px",
              width: "55%",
              display: "flex",
              border: "0.5px solid grey",
            
            }}
          >
            {" "}
            <Button 
                onClick={handleIndexClick}
              variant="contained"
              sx={{
                textAlign: "center",
                mt: "0px",
                width: "80px",
                position: "absolute",
                height:"40px",
               
                textTransform: "none",
                color:"#F2BE71",
                backgroundColor: showIndx ? "rgb(138, 175, 198)" : "rgb(138, 175, 198)",
                border:"1px solid #90B2D8",
                
                
       
        "&:hover": {
          backgroundColor: showIndx ? "rgb(138, 175, 198)" : "rgb(138, 175, 198)",
        },
              }}
            >
              {showIndx ? "" : ""}
              Index
            </Button>
            <div
              style={{
                position: "absolute",
                marginTop: "200px",
              }}
            >
              {showIndx && <IndexTables/>}
            </div>
            <Button
                onClick={handleTableClick}
              variant="contained"
              sx={{
                textAlign: "center",
                mt: "0px",
                width: "100px",
                position: "absolute",
                height:"40px",
                marginLeft:"85px",
                textTransform: "none",
                
                color:"#F2BE71",
                backgroundColor: showIndx ? "rgb(138, 175, 198)" : "rgb(138, 175, 198)",
                border:"1px solid #90B2D8",
                "&:hover": {
                  backgroundColor: showIndx ? "rgb(138, 175, 198)" : "rgb(138, 175, 198)",
                },
               
              }}
            >
              {showTable ? "" : ""}
              Neoplasam
            </Button>
            {showTable && <NeoplasmTable/>}
            <Button
               onClick={handleDrugClick}
              variant="contained"
              sx={{
                textAlign: "center",
                mt: "0px",
                width: "80px",
                position: "absolute",
                height:"40px",
              marginLeft:"190px",
                textTransform: "none",
                color:"#F2BE71",
                backgroundColor: showIndx ? "rgb(138, 175, 198)" : "rgb(138, 175, 198)",
                border:"1px solid #90B2D8",
                "&:hover": {
                  backgroundColor: showIndx ? "rgb(138, 175, 198)" : "rgb(138, 175, 198)",
                },
              }}
            >
              {showDrug ? "" : ""}
              Drugs
            </Button>
            <div
              style={{
                position: "absolute",
                marginTop: "100px",
              }}
            >
              {showDrug && <DrugTable/>}
            </div>
        
          </Box>

          <Box
            classname="Tabularsearch"
            sx={{
              height: "635px",
              width: "45%",
              display: "flex",
              backgroundColor: "white",
              border: "0.5px solid black",
            }}
          >
            <Box
              sx={{
                height: "20px",
                width: "50%",
                mt: "10px",
                ml: "6px",

              }}
            >
              <Typography
                sx={{
                 
                  width: "100%",

                }}
                variant="subtitle1"
                fontFamily={"sans-serif"}
                color={" #4185d2"}
                noWrap
               >
                Tabular Search
              </Typography>
            </Box>
            <Stack direction={"column"} ml={10} mt={10}>
              <Typography
                variant="subtitle1"
                fontFamily={"sans-serif"}
                color={" #4185d2"}
                fontWeight={600}
                ml={-24}
                sx={{
                  borderBottom: "0.3px solid grey",
                  width: "141%",
                }}>
                Code details
              </Typography>
              <Box sx={{ marginRight: "20px" }}>
                {isValueSelected && <Codedet />}
              </Box>
              <Box
                sx={{
                  height: "300px",
                  width: "100%",
                }}>
                <Box
                  sx={{
                    height: "30px",
                    width: "660px",
                    background: "linear-gradient(to right, #E9F8FF,#90B2D8 , #C1E3FF)",
                    color: "black",
                    fontFamily: "sans-serif",
                    fontSize: "13px",
                    marginLeft: "-200px",
                    mt: "20px",
                    ml: "-195px"
                  }}>
                <Stack direction={"row"} gap={"70px"} ml={5}  >
                    <Box sx={{ width: "100%"}}>
                      <Box sx={{ marginTop: "-10px"}}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                          className="tabs"
                          sx={{ marginLeft: "-25px" }}
                          TabIndicatorProps={{
                            style: {
                              backgroundColor: "#4185d2",  
                              width: "50px",
                              marginLeft: "38px",
                              marginBottom:"10px"
                            }
                          }}>
                          <Tab
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            sx={{
                              cursor: "pointer",
                              variant: "subtitle1",
                              fontWeight: "700px",
                              color: "#4185D2",
                              textTransform: "none",
                              width: "150px",
                            }}
                            label="  Code notes"
                            {...a11yProps(0)}/>
                          <Tab
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            sx={{
                              cursor: "pointer",
                              variant: "subtitle1",
                              fontWeight: "700px",
                              color: "#4185D2",
                              textTransform: "none",
                              width: "150px",
                            }}
                            variant="subtitle1"
                            fontWeight={"700"}
                            label="Section notes"
                            {...a11yProps(1)}/>
                          <Tab
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            sx={{
                              cursor: "pointer",
                              variant: "subtitle1",
                              fontWeight: "700px",
                              color: "#4185D2",
                              textTransform: "none",
                              width: "150px",
                            }}
                            variant="subtitle1"
                            fontWeight={"700"}
                            label="Chapter notes"
                            {...a11yProps(2)}/>
                          <Tab
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            sx={{
                              cursor: "pointer",
                              variant: "subtitle1",
                              fontWeight: "700px",
                              color: "#4185D2",
                              textTransform: "none",
                              width: "150px",
                            }}
                            variant="subtitle1"
                            fontWeight={"700"}
                            label="Chapter guidlines"
                            {...a11yProps(3)}/>
                        </Tabs>
                      </Box >
                      <div
                        className="tabpanels"
                        style={{
                          height: "250px",
                          width: "590px",
                          overflowY: "scroll",
                          paddingLeft: "30px",
                        }}>
                        {" "}
                      <CustomTabPanel
                        value={value}
                        index={0}>
                        <Codenotes />
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={1}>
                        <Sectionnotes />
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={2}>
                        <Chapternotes />
                      </CustomTabPanel>

                      <CustomTabPanel value={value} index={3}></CustomTabPanel>
                      </div>
                     
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
     
    </div>
  );
};
