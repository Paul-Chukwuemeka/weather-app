import { useState, useEffect } from "react";
import { WiCloudy } from "weather-icons-react";
import { MdSearch } from "react-icons/md";
import { FaWind, FaWater } from "react-icons/fa";
import "./App.css";

function App() {
  const [info, setinfo] = useState([]);
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = useState([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const apiKey =
    "at_eGmsiLn6QROiQkRg8mik1BcXzc47Z";

  const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=`;
  useEffect(() => {
    fetch(apiUrl)
      .then(async (res) => await res.json())
      .then(async (data) => {
        await setResult(data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    console.log(result)
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=7d7a4054d2fc408cb6e120053242511&q=${
        result ? result?.location?.city : search
      }`
    )
      .then((res) => res.json())
      .then(async (data) => {
        await setinfo(data);
      })
      .catch((err) => console.log(err));
  }, [result]);


  useEffect(() => {
    setWeather(info.current);
    setLocation(info.location);
  }, [info]);

  function fetchInfo() {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=7d7a4054d2fc408cb6e120053242511&q=${search}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        await setinfo(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="container w-[370px] min-h-20 p-6 flex flex-col gap-4 justify-center items-end rounded-2xl bg-gradient-to-br from-[#0cbdbd] from-5% to-[#031d1d]">
        <h1 className="text-center flex items-center  m-auto text-2xl font-extrabold text-white ">
          Weather App <WiCloudy className=" text-3xl" />
        </h1>
        <form
          className=" w-full p-1 px-3 flex justify-between items-center"
          onSubmit={(e) => {
            e.preventDefault();
            fetchInfo();
            setSearch("");
          }}
        >
          <input
            type="text"
            placeholder="Search"
            className="p-2 px-6 rounded-3xl"
            onInput={(e) =>
              setSearch(e.target.value)
            }
            value={search}
          />
          <button className="bg-white p-2 rounded-full text-gray-500">
            <MdSearch className="text-2xl" />
          </button>
        </form>
        {weather?.condition && location && (
          <div className="w-full p-0 flex flex-col justify-center items-center">
            <img
              src={weather.condition.icon}
              alt={weather.condition.text}
              className="m-auto w-32"
            />
            <h1 className="text-white text-center text-3xl">
              <span className="text-5xl font-bold">
                {weather.temp_c}
              </span>
              °C
            </h1>
            <h1 className="text-white font-bold p-1">
              {weather.condition.text}
            </h1>
            <h1 className="text-3xl w-[85%] text-center text-white font-semibold mb-14">
              {`${location.name}, ${location.region}, ${location.country}`}
            </h1>
            <div className="w-full flex justify-around items-center gap-">
              <div className="w-[45%] h-[55px] py-4 flex justify-around items-center">
                <h3>
                  <FaWater className="text-white text-[40px]" />
                </h3>
                <div>
                  <h3 className="text-white text-md font-normal">
                    {`${weather.humidity}%`}
                  </h3>
                  <h3 className="text-white text-lg font-semibold">
                    Humidity
                  </h3>
                </div>
              </div>
              <div className="w-[45%] h-[55px] py-4 flex justify-around items-center">
                <FaWind className="text-white text-[40px]" />
                <div>
                  <h3 className="text-white text-md font-normal">
                    {` ${weather.wind_kph} km/h`}
                  </h3>
                  <h3 className="text-white text-lg font-semibold">
                    Wind
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <h3 className="p-3 text-center text-white">
        {" "}
        Powered by{" "}
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
          className="text-blue-500 underline"
        >
          WeatherAPI.com 
        </a>
         {" "} & <a href="https://geo.ipify.org" title="Ipify" className="text-blue-500 underline">Ipify</a>
      </h3>
    </>
  );
}

export default App;
