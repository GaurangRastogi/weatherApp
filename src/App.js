import Navbar from "./components/Navbar/Navbar";
import { startTransition, useEffect } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import { useState } from "react";
import makeToast from "./Toaster";
import "./App.css";
function App() {
  const [location, setLocation] = useState("fatehpur");
  const [data, setData] = useState("");
  const [standard, setstandard] = useState(true);

  const toggleStandard = () => {
    setstandard(!standard);
  };

  const searchLocation = () => {
    let searchValue = document.getElementById("search");

    setLocation(searchValue.value);

    searchValue.value = "";
  };

  const currentLocationweather = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          "https://api.weatherapi.com/v1/forecast.json?key=2ef77168970747d282265929231602&q=" +
            latitude +
            "," +
            longitude
        )
          .then((response) => response.json())
          .then((data) => setLocation(data.location.name))
          .catch((error) => makeToast("error", error));
      },
      (error) => makeToast("error", error)
    );
  };

  const weather = async () => {
    try {
      const response = await fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=2ef77168970747d282265929231602&q=" +
          location +
          "&days=10"
      );
      if (response.status === 400) throw "Enter the valid location";
      if (response.status === 401) throw "Server Error";
      if (response.status === 403) throw "Server overloaded, try after some time";

      const json = await response.json();
      // console.log(json);
      setData(json);
    } catch (err) {
      makeToast("error", err);
    }
  };

  useEffect(() => {
    localStorage.setItem("standard", "celcius");
    currentLocationweather();
  }, []);

  useEffect(() => {
    weather();
  }, [location]);

  useEffect(() => {
    makeToast("success", "Standard Changed");
  }, [standard]);

  return (
    <div className="App">
      <Navbar toggleStandard={toggleStandard} />
      <div style={{ height: "100px" }}></div>
      <Searchbar searchLocation={searchLocation} />
      {data && (
        <div className="todayWeather">
          <h1>
            {data.location.name},{data.location.region},{data.location.country}
          </h1>

          <div className="condition">
            <img
              src={data.current.condition.icon}
              alt={data.current.condition.text}
              height={50}
              width={50}
            />
            <h3>{data.current.condition.text}</h3>
          </div>

          {localStorage.getItem("standard") === "celcius" ? (
            <h1>{data.current.temp_c} &#8451;</h1>
          ) : (
            <h1>{data.current.temp_f} &#8457;</h1>
          )}

          <div className="moreData">
            <p>Wind speed : {data.current.wind_kph}</p>
            <p>Humidity : {data.current.humidity}</p>
          </div>
        </div>
      )}
      <div className="functionality">
        <h1 className="headingForecast">Forecast for next 10 days</h1>
        <button onClick={() => currentLocationweather()}>
          Your Location's weather
        </button>
      </div>
      {data && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          {data.forecast.forecastday.map((value) => (
            <div key={value.date} className="forecastWeather">
              <h1>{value.date}</h1>
              <div className="condition">
                <img
                  src={value.day.condition.icon}
                  alt={value.day.condition.text}
                  height={50}
                  width={50}
                />
                <h3>{value.day.condition.text}</h3>
              </div>

              {localStorage.getItem("standard") === "celcius" ? (
                <h1>{value.day.avgtemp_c} &#8451;</h1>
              ) : (
                <h1>{value.day.avgtemp_f} &#8457;</h1>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
