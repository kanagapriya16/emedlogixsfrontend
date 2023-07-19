import React, { useEffect, useState } from "react";
import "../styles/Pagination.css";

export const Pagin = () => {
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


  

 

  return (
    <div>
      <div className="center">
        <div className="pagination">
          {items.map((item, index) => (
            <a key={index} onClick={() => handleClick(item)}>
              {item}
            </a>
          ))}
        </div>
      </div>
      <div>
      
        
      

      </div>
    </div>
  );
};

