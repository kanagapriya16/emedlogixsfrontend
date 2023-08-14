import { TextField } from '@mui/material';
import React, { Fragment, useState } from 'react'
import Search from "./Search";
const renderChildRows = (row, depthLevel = 1) => {
  if (row.child) {
    const paddingLeftValue = 20 + depthLevel * 20; // Increase padding for deeper levels
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
                  {row.child.title}
                  <a
                    style={{ color: "blue", borderBottom: "1px solid blue" }}
                  >
                    {row.child.code !== null &&
                      row.child.code !== "null" &&
                      ` ${row.child.code}`}
                  </a>
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
const Codenotes1 = () => {
  const [index1, setIndex1] = useState(null);
  const [result1,setResult1]=useState([]);
  
 
  React.useEffect(() => {
    console.log("enter index table");
    const fetchBooks = async () => {
      try {
        const response = await fetch(`codes/filterby/index?filterBy=a`);
        if (response.ok) {
          const data = await response.json();
          setIndex1(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // Clear the previous index data before fetching new data

    fetchBooks();
  }, []);
  console.log("our index1 is", index1);
  console.log(global.searches);
  const search=global.searches;


  const handleClick = (event, codes) => {

    console.log(`Code clicked: ${codes}`);
    fetchCodeDetails(codes); 
    <Search/>
  };



   // Function to fetch code details when a row.code is clicked
   const fetchCodeDetails = async (codes) => {
    try {
      if (codes) {
        const response = await fetch(`/codes/${codes}/matches`);
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
  
  console.log(result1);

 
 
  
  return (
    
    <>

      <div>
   
      
  <tbody style={{ textAlign: "left" }}>
  {!global.values?.code &&
    index1
      ?.filter((item) => {
        return search.toLowerCase() === ""
          ? item
          : item.title.toLowerCase().includes(search);
      })
      .map((row) => (
        <Fragment key={row.id}>
          {row.ismainterm && ( // Check if ismainterm is true
            <tr>
              <td>
                <ul
                  style={{
                    listStyleType: "square",
                    paddingLeft: "20px",
                    margin: 0,
                  }}
                >
                  {row.nemod !== null && row.nemod !== "null" ? (
                    <li>
                      {row.title} {row.nemod}
                    </li>
                  ) : (
                    <li>{row.title}</li>
                  )}
                </ul>
              </td>

              {row.seealso !== null && row.seealso !== "null" && (
                <td>
                  <a style={{ color: "blue", borderBottom: "1px solid blue" }}>
                    SeeAlso {row.seealso}
                  </a>
                </td>
              )}
              {row.see !== null && row.see !== "null" && (
                <td>
                  <a style={{ color: "blue", borderBottom: "1px solid blue" }}>
                    See {row.see}
                  </a>
                </td>
              )}
              {row.code !== null && row.code !== "null" && (
                <td style={{ marginRight: "10px"}}>
                   <a
                            style={{
                              color: "blue",
                              borderBottom: "1px solid blue",
                            }}
                            onClick={(event) =>
                              handleClick(event, row.code)
                            }
                          >
                            {row.code}
                          </a>
                </td>
              )}
            </tr>
          )}
          {row.ismainterm && renderChildRows(row)}
        </Fragment>
      ))}
</tbody>
      </div>
    </>
  )
}
export default Codenotes1



