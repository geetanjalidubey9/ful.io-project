import React, { useEffect, useState } from "react";
import "./GoogleDataSheet.css"

const DataTable = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [header, setHeader] = useState([]);
  const [rows, setRows] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy]=  useState(1);
  const [sortByOrder, setSortByOrder] = useState('ascending');
  const [next, setNext] = useState(true);
  const [prev, setPrev] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbweM81fWA12E2BF-XTLztJ8TZdC4lQzg-ouhEmrwPjmb52N_3bJ56TZzTt8rS_IJ9boqA/exec?limit=${limit}&page=${page}&sortby=${sortBy}&sortByOrder=${sortByOrder}&search=${search}`,

        {
          headers:
          {
            "Content-Type": "text/plain;charset=utf-8",
          },
          }
      );
     
      const result = await response.json();
      console.log(result)

      if (result) {
        if (result.header) {
          setHeader(result.header)
          
        }
        if (result.rows) {
        
          setRows(result.rows)
          if (result.rows.length < limit) {
            setNext(false);
          }
          else{
            setNext(true)
          }
        }
        // const headers = result.data[0]
        // console.log('headers', JSON.stringify(headers))
        
        // const leftRowObjects = result.data.slice(1)
        
      } else {
        setError("No data found.");
      }
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  const onNext=()=>{
    setPage(page+1);
  }
  const onPrev=()=>{
    if(page>1){
    setPage(page-1);
    }
  }
  
  const onSearch=()=>{
   
    if(page!=1){
      setPage(1);
    }
    else{
      fetchData();
    }
 
  }
  const handleSort=(i)=>{
     setSortBy(i+1);
  }

  const handleLimit=()=>{
  if(!limit){
    setLimit(20);
    
  }
  onSearch();

  }
  useEffect(() => {
    fetchData();
    if(page>1){
      setPrev(true);
    }
    if(page<=1){
      setPrev(false);
    }
  }, [page,sortBy]);


  if (isLoading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ margin: "20px" }} className="mytable">
      <h1>Google Sheets Data</h1>
       <p>Note:click on column to sort</p>

      <div>
        <input
        className='search'
          type="text"
          placeholder="Search by domain..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}


        />

        <button id='search' onClick={onSearch}>search</button>
      </div>
 
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", tableLayout: 'auto'}}>
        <thead>
          <tr>
            {header.map((header,index) => (
              <th style={{width:'10rem',cursor:'pointer'}}onClick={()=>{
                handleSort(index)
              }} key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
       
           {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
             
            </tr>
          
          
           ))}

        </tbody>
     
      </table>
 
      {/* {prev&&<button id='prev' onClick={onPrev}>prev</button>}
      {next&&<button id='next' onClick={onNext}>next</button>} */}
      <div className="pagination">
  {prev && <button id="prev" onClick={onPrev}>prev</button>}
  {next && <button id="next" onClick={onNext}>next</button>}
</div>

      <div>
        <input
         className='search'
          type="text"
          placeholder="rows limit..."
          value={limit}
          onChange={(e) => setLimit(e.target.value)}


        />

        <button id='sbmit' onClick={handleLimit}>submit</button>
      </div>
    </div>
  );
};

export default DataTable;

