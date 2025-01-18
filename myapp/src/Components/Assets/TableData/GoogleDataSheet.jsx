import React, { useEffect, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const SHEET_ID = "AKfycbzr1PbR6YHUtbzcfS5Wt4WA9SXhof3EsQkaeR8hcuOY5lLnq3sWHbvVjsl9ns"; // Your Google Sheets ID
  const API_KEY = "YOUR_API_KEY"; // Replace with your API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://script.googleusercontent.com/macros/echo?user_content_key=kyilgqjgn1UiSEOfQ6n3YgQs4Iw2CTdsY9bN79w7NiCVporlhNk3_5-SJ_syDqDUph1djYXeLUM320mM-6P0sD0NMJKZx-Mim5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLUsT0KDu7LmHgYJH5JEfi4z6SF_v3aKOD4SfiXTPkGuQq4vi07CDViFCpdjScVu7A&lib=MEOyeFvP_W-cArgp3mkZwZTB8Ga8GDvl_`,

          {
            headers:
            {
              "Access-Control-Allow-Origin":"*",
              "Access-Control-Allow-Headers": "Application/json"
            },

            }
        );
        console.log(response)
        const result = await response.json();

        if (result.values) {
          const [headers, ...rows] = result.values;
          setData({ headers, rows });
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

    fetchData();
  }, []);

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ margin: "20px" }}>
      <h1>Google Sheets Data</h1>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
