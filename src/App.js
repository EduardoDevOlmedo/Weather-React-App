import React, { useState } from 'react';
import './App.css';

const api = {
  key: "9052a0f58d9ecdbd0674ad37c207e76a",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  
  const [query, setQuery] = useState()
  const [weather, setWeather] = useState({})
  const [display, setDisplay] = useState({display: 'none'})


  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
          
        });
    }
  }

  const dateBuilder = (d) => {
  
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  function activateDisplay(){
    setDisplay({
      display: "flex"
    })
  }


  

  return (
    
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App Warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input onChange={e => setQuery(e.target.value)} 
          type="text" 
          placeholder="Enter your city" 
          className="search-bar"
          value={query}
          onKeyPress={search}
          >
          </input>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name }, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          <div className="icon">
            <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt={weather.weather[0].description}></img>
          </div>
          <div className="show-more" onClick={activateDisplay}>
            Show More
          </div>
          <div className="difference-temp" style={display}>
            <div className="max-temp">
              Max: {weather.main.temp_max} °c
            </div>
            <div className="min-temp">
              Min: {weather.main.temp_min} °c
            </div>
          </div>
        </div>
        ) : (
          <div>
          <div>
          <div className="location-box">
            <div className="location">Choose your city!</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              0°c
            </div>
            <div className="weather"></div>
          </div>
        </div>
          </div>
        )}
        <div className="attribution">
           Developed by: <a href="https://github.com/EduardoDevOlmedo">EDev</a>
        </div>
      </main>
    </div>
  );
}

export default App;
