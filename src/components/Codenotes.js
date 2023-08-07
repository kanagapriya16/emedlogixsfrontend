import React, { useEffect, useState } from "react";
const Codenotes = () => {
  const [results, setResults] = useState(null);
  const [results1, setResults1] = useState(null);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code && global.years) {
          const response = await fetch(`/codes/${global.values.code}/details/?version=${global.years}`);
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
    };
    fetchBooks();
  }, [global.values]);



  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (global.intableresult && global.intableresult.code && global.years) {
          const response = await fetch(`/codes/${global.intableresult.code}/details/?version=${global.years}`);
          if (response.ok) {
            const data = await response.json();
            setResults1(data);
          } else {
            console.error("Failed to fetch data");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [global.intableresult]);



  console.log("our result is", results1);



  return (
    <div className="codenotes">
        { global.values && global.values.code && global.intableresult==null &&(
      <div>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {results && results.code && (
              <tr key={results.code}>
                <td>{results.longDescription}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        )}

{  global.intableresult!==null && global.intable &&(


  <div>
    <table>
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        {results1 && results1.code && (
          <tr key={results1.code}>
            <td>{results1.longDescription}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
    )}


    </div>
  );
};
export default Codenotes;