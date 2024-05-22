import josh from './josh.jpg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Papa from 'papaparse';


function App() {

  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wineName, setWineName] = useState("");

  useEffect(() => {
    Papa.parse("/wine_reviews.csv", {
      download: true,
      header: true,
      complete: function(results) {
        setData(results.data);
      }
    });
  }, []);

  const handleInputChange = (event) => {
    setWineName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const filtered = data.filter((row) => {
        return row.brand && row.brand.toLowerCase().includes(wineName.toLowerCase());
      });
      setReviews(filtered); // This will trigger a re-render
    }
  };

  const filtered = data.length > 0 ? data.filter((row) => {
    return row.brand && row.brand.toLowerCase().includes(wineName.toLowerCase());
  }) : [];
  
  


    return (
    <div className="App">
      <header className="App-header">
        <img src={josh} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <input
          className='user-input'
          type="text"
          placeholder="Enter your preferred choice of beverage"
          value={wineName}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <ul>
          {filtered.map((row, index) => (
            <li key={index}>{row.brand}: {row['reviews.txt']}</li>
          ))}
        </ul>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
    );
  }


export default App;
