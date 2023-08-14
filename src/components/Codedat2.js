import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import "../App.css";
import React, { useEffect, useState } from "react";



const Codedat2 = () => {
  console.log("enter codedet page")
  console.log(global.index,"codedet index value")
  const [result, setResult] = useState(null);
  const [result1, setResult1] = useState(null);
  const [isClosed, setIsClosed] = useState(false);
  console.log(global.results);
  console.log(global.codess)
  



  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (global.results && global.codess && global.years) {
          const response = await fetch(`/codes/${global.codess}/details/?version=${global.years}`);
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
    fetchBooks();
  }, [global.results]);

    
  





  const handleClose = () => {
    setIsClosed(true);
    window.location.reload();
  };
 


  console.log("our result1 is", result1);
  return (
 
 
 <div className="division">
      
 {!isClosed && global.results && global.codess  &&(
        <div>
          <div>
            <Button
              disableFocusRipple
              disableRipple
              sx={{
                border: "0.5px solid green",
                textAlign: "center",
                height: "20px",
                width: "80px",
                backgroundColor: "#ADD8E6",
                marginLeft: "125px",
              }}
            >
              {global.codess}
              <Close
                sx={{
                  width: "20px",
                  ml: "5px",
                  color: "#4169E1",
                }}
                onClick={handleClose}
              />
            </Button>
        
          </div>
          <table style={{marginLeft:"230px"}}>
            
            <tbody>
              {result1 && (
                <tr key={result1.code}>
                  <td>{result1.code}</td>
                  <td>{result1.longDescription}</td>
                
                  <td>
  {result1.billable === true ? (
    <Button
      variant="contained"
      sx={{
        width: "150px",
        height: "15px",
        color: "white",
        fontFamily: "sans-serif",
        ml: "20px",
        backgroundColor: "green",
        textTransform: "lowercase",
        fontWeight: "700px",
        textAlign: "center",
        "&:hover": {
          backgroundColor: "green",
        },
      }}
    >
      Billable Codes
    </Button>
  ) : (
    <Button
      variant="contained"
      disableElevation
      disableFocusRipple
      sx={{
        color: "white",
        width: "150px",
        height: "15px",
        fontFamily: "sans-serif",
        backgroundColor: "orange",
        textTransform: "lowercase",
        fontWeight: "700px",
        textAlign: "center",
        "&:hover": {
          backgroundColor: "orange",
        },
      }}
    >
      NonBillable Codes
    </Button>
  )}
</td>    
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}









    </div>
  );
};
export default Codedat2;