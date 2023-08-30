import React, { useEffect, useState } from "react";
import "../styles/Sectionnotes.css";
import { Loads } from "./Loads";
const Sectionnotes = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoNotesMessage, setShowNoNotesMessage] = useState(false);

  const globalValuesCode = global.values.code;
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (
          globalValuesCode &&
          global.years 
          &&
          !global.isCodeClicked 
 
        ) {
          const response = await fetch(
            `/codes/${globalValuesCode}/details/?version=${global.years}`
          );
          if (response.ok) {
            const data = await response.json();
            setResults(data);
  

          
          } else {
            console.error("Failed to fetch data");
          
          }
        }
      } catch (error) {
        console.error("Error:", error);
        
      }
      finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchBooks();
    if (results === null) {
      setShowNoNotesMessage(true);
    } else {
      setShowNoNotesMessage(false);
    }
  }, [globalValuesCode, global.years]);


  useEffect(() => {
    if (global.selectedCodeDetails && global.isCodeClicked ) {
      setResults(global.selectedSectionDetails);
    } else {
      setResults(null);
    }
    if (results === null) {
      setShowNoNotesMessage(true);
    } else {
      setShowNoNotesMessage(false);
    }
  }, [global.selectedSectionDetails]);


  return (
    <div
    
      style={{
        height: "40vh",
        width: "auto",
        marginLeft: "-10%",
        marginTop: "-20px",
        fontFamily: "Verdana ",
       
      }}
    >
     <div>
        {results && results.section && results.section.notes ? (
          <table>
            <tbody className="chapter">
              {results.section.notes.map((note, index) => (
                <tr key={index}>
                  <td>{note.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : showNoNotesMessage ? (
          <table>
            <tbody className="chapter">
              <tr>
                <td>No Code notes</td>
              </tr>
            </tbody>
          </table>
        ) : null}

        {globalValuesCode === "H548" && results?.section?.visualImpairment ? (
          <table className="table1" cellSpacing={0}>
            <thead>
              <tr>
                <th className="tablees" rowSpan="2">
                  {results.section.visualImpairment.categoryHeading}
                </th>
                <th className="tablees" colSpan="2">
                  {results.section.visualImpairment.rangeHeading}
                </th>
              </tr>
              <tr>
                <th className="tablees">
                  {results.section.visualImpairment.maxHeading}
                </th>
                <th className="tablees">
                  {results.section.visualImpairment.minHeading}
                </th>
              </tr>
            </thead>
            <tbody>
              {results.section.visualImpairment.categoriesList.map(
                (category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    {category.value &&
                      category.visRangeList &&
                      category.visRangeList.some(
                        (range) => range.max || range.min
                      ) && (
                        <>
                          {category.visRangeList.map(
                            (range, rangeIndex) =>
                              (range.max || range.min) && (
                                <tr key={`${categoryIndex}-${rangeIndex}`}>
                                  {rangeIndex === 0 && (
                                    <td
                                      className="tablees category-number"
                                      rowSpan={category.visRangeList.length}
                                    >
                                      {category.value}
                                    </td>
                                  )}
                                  <td className="tablees">{range.max}</td>
                                  <td className="tablees">{range.min}</td>
                                </tr>
                              )
                          )}
                        </>
                      )}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};
export default Sectionnotes;