import React, { useEffect, useState } from 'react'

const Codenotes2 = () => {
    const [results1, setResults1] = useState(null);


    useEffect(() => {
        const fetchBooks = async () => {
          try {
            if (global.results && global.codess && global.years) {
              const response = await fetch(`/codes/${global.codess}/details/?version=${global.years}`);
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
      }, [global.results]);
      console.log("our result is", results1);
    

    return (
        <div className="codenotes">
           
    
    {  global.results!==null && global.codess &&(
    
    
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
  
}

export default Codenotes2
