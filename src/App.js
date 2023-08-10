import './App.css';
import axios from 'axios';
import cloudImg from './img/clouds.png'
import rainImg from './img/rainy.png'
import mistImg from './img/mist.png'
import sunnyImg from './img/sunny.png'
import hazeImg from './img/haze.png'
import { BiSolidDropletHalf } from "react-icons/bi"
import { FaTemperatureLow } from "react-icons/fa"
import { CiLocationOn } from "react-icons/ci"
import { useState } from 'react';

const App = () => {

  const [weatherData, setweatherData] = useState("")
  const [cityName, setcityName] = useState("")
  const [imgSrc, setimgSrc] = useState("")

  const changeHandler = (event) => {
    const name = event.target.value
    setcityName(name)
  }
  const submitHandler = (event) => {
    event.preventDefault(); //prevent reloading
    // console.log(cityName)
    fetch_api(cityName)
  }

  const updateImg = (details) => {
    console.log(details, ", weather detailed data")
    switch (details) {
      case "Clouds":
        setimgSrc(cloudImg);
        break;
      case "Rain":
        setimgSrc(rainImg);
        break;
      case "Clear":
        setimgSrc(sunnyImg);
        break;
      case "Mist":
        setimgSrc(mistImg);
        break;
      case "Haze":
        setimgSrc(hazeImg);
        break;
      default:
        setimgSrc(cloudImg);
    }
  }

  const fetch_api = async (cityName) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6d5a8f6bca8950c6e569607adc87a9be&units=metric`);
      // console.log(res.data)
      setweatherData(res.data)
      updateImg(res.data.weather[0].main)
    } catch (error) {
      // console.log(error)
      error.response.status === 404 ? alert('Location not found') : error.response.status === 400 ? alert('Enter Location') :
        alert('Something Went Wrong')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="card" style={{ width: '25em' }}>
          <h5 className="card-title">Weather App</h5>
          <hr></hr>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className="input">
                <input type="text" onChange={changeHandler} className="form-control" placeholder="Enter City Name" />
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
            {!!weatherData &&
              <header>
                <div className="Weather-body">
                  <img src={imgSrc} alt='weatherImg' style={{ width: 150 }}></img>
                </div>
                <div className="weather-box">
                  <p className="temperature">{weatherData.main.temp}°C</p>
                  <p className="description">{weatherData.weather[0].description}</p>
                  <CiLocationOn /><span style={{ marginLeft: 5 }}>{weatherData.name}, {weatherData.sys.country}</span>
                </div>
                <hr></hr>
                <div className="weather-details">
                  <div className='feels-like'>
                    <div className='text'>
                      <FaTemperatureLow style={{ color: "cadetblue" }} /><span style={{ marginLeft: 2 }}>{weatherData.main.feels_like}°C</span>
                      <p>Feels Like</p>
                    </div>
                  </div>
                  <div className='humidity'>
                    <div className='text'>
                      <BiSolidDropletHalf style={{ color: "cornflowerblue" }} /><span style={{ marginLeft: 2 }}>{weatherData.main.humidity}%</span>
                      <p>Humidity</p>
                    </div>
                  </div>
                </div>
              </header>}
          </div>
        </div>
      </header>
    </div>
  );
}
export default App;