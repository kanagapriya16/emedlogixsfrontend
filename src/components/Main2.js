
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
  
  
  
  import NeoplasmTable from "./NeoplasmTable";
  import IndexTables1 from "./IndexTable1";
import Codenotes2 from "./codenotes2";
import Codedat2 from "./Codedat2";
import Codenotes1 from "./codenotes1";
import Sectionnotes2 from "./Sectionnotes2";
import Chapternotes2 from "./Chapternotes2";
  
  
  
  
  
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
  
  export const Main2 = () => {
    console.log("enter main")
    const [value, setValue] = useState(0);
    const [showTable, setShowTable] = useState(false);
    const [showIndx, setShowIndex] = useState(false);
    const [showDrug, setShowdrug] = useState(false);
  
      
  
   
    const handleChange = (event, newValue) => {
      setValue(newValue);
     
     
    };
    const [activeBtn, setActiveBtn] = useState(null);
  
    const handleNavBtnClick = (btnId) => {
      setActiveBtn(btnId);
      setShowIndex(!showIndx);
      setShowTable(false);
      setShowdrug(false);
    };
    const handleNavBtnClick2 = (btnId) => {
      setActiveBtn(btnId);
      setShowTable(!showTable);
      setShowIndex(false);
      setShowdrug(false);
    };
   
    const handleNavBtnClick3 = (btnId) => {
      setActiveBtn(btnId);
      setShowdrug(!showDrug);
      setShowIndex(false);
      setShowTable(false);
    };
   
   
  
    return (
      <div style={{height:"300px",width:"550px",marginLeft:"10px"}}>
        
              <Stack direction={"column"} ml={30} mt={10} width={50}>
              
                <Box sx={{ marginRight: "20px" }}>
                  { <Codedat2/>}
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
                          <Codenotes2 />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                          <Sectionnotes2 />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                          <Chapternotes2 />
                        </CustomTabPanel>
  
                        <CustomTabPanel value={value} index={3}></CustomTabPanel>
                        </div>
                       
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
      
       
      </div>
    );
  };