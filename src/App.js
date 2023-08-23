import React, {useState} from 'react'
import './components/style.css'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [city, setCity] = useState("");
  const [info, setInfo] = useState({});
  const [veriGirildiMi, setVeriGirildiMi] = useState(false);

  const handleChange = (degisiklik) => {
    setCity(degisiklik.target.value);
  }

  const handleClick = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b0ab4dc798ba6753d4268b0cfbd38b8b&units=metric`
    console.log("click basarili",url);
    await axios.get(url).then(async data => {
      setInfo(data.data)
    }).catch(err => console.log("Hataniz : ", err));
    setVeriGirildiMi(true);
  }

  const handleEnter = (event) =>{
    if(event.key === 'Enter'){
      handleClick();
    }
  }


  return (
    <div className="container row">
      <div className="search m-2">
        <h1 style={{display: 'inline-block', whiteSpace: 'nowrap'}}>HAVA DURUMU</h1>
        <input type="text" placeholder='Sehir girin...' value={city} onChange={handleChange} onKeyPress={handleEnter}/>
        <button type='submit' onClick={handleClick}>Araştır</button>
      </div>

      {veriGirildiMi ?
            <div className="info col-sm-12">
              <div className="derece col-sm-4">
                <p className='tanim'>Sıcaklık</p>
                <p className='alt' id='temp'>{info.main.temp.toFixed()}°C</p>
              </div>
              <div className="nem col-sm-4">
                <p className='tanim'>Nem</p>
                <p className='alt'>{info.main.humidity}%</p>
              </div>
              <div className="ruzgar-hizi col-sm-4">
                <p className='tanim'>Rüzgar Hızı</p>
                <p className='alt' style={{display: 'inline-block', whiteSpace: 'nowrap'}}>{info.wind.speed.toFixed()} MPH</p>
              </div>
          </div> : null} 
    </div>
  );
}

export default App;
