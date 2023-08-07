import React, { useEffect, useState } from "react";
import "../styles/Pagination.css";

export const Pagin = () => {
  const items = [
    
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
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);

  const handleClick = (alphabet) => {
    setSelectedAlphabet(alphabet);
  
    console.log("Selected alphabet:", alphabet);
    global.alphabets=alphabet;
    console.log(global.alphabets);
  };
 /*const [result, setResult] = useState(null);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        
          const response = await fetch(`/codes/${global.words}/index?filterBy=${global.alphabets}`);
          if (response.ok) {
            const data = await response.json();
            setResult(data);
          }
           else {
            console.error("Failed to fetch data");
          }
        
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [global.alphabets]);
  console.log("our result is", result);*/


  
  const [activeBtnIndex, setActiveBtnIndex] = useState(0);

  const handleClick1 = (index) => {
    setActiveBtnIndex(index);
  };
  

 

  return (
    <div>
     
     
     
    
       
      
         <div className="center">
         <div className="pagination">
        
        
  {items.map((item, index) => (
  <button style={{
   
  }}  onClick={() => handleClick1(index)}  className={`btn ${index === activeBtnIndex ? 'active' : ''}`}> {item}</button> ))}
          
             </div>
             
      </div>
      </div>

    
   
  );
};

