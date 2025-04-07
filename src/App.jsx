import { useState, useRef } from "react";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState([]);
  const [button, setButton] = useState(false);
  const showPrompt = useRef();
  const apikey = import.meta.env.VITE_KEY;

  showPrompt.current = () => {
    const input = prompt("Masukan Lokasi Mu");
    if (input) {
      setButton(true);
    } else {
      alert("Masukan lokasi anda");
    }

    async function run() {
      try {
        const api = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${input}&aqi=no`
        );
        const dataWeather = api.data;
        setWeather(dataWeather);
      } catch (error) {
        console.log(error);
        alert("Gagal mengambil data cuaca. Periksa konsol untuk detail.");
        setButton(false);
      }
    }
    run();
  };

  return (
    <>
      <div>
        <nav className=" flex justify-around items-center pt-7 absolute top-0 left-0 right-0 z-10">
          <h1 className="text-3xl text-white font-bold [text-shadow:_5px_5px_2px_#0c8ce9]">
            {" "}
            Weather{" "}
          </h1>
          <a href="https://github.com/Naitzz12/weather-app.git">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
              ></path>
            </svg>
          </a>
        </nav>

        <div className="absolute left-0 right-0 bottom-0 top-0 flex justify-center items-center">
          <button
            onClick={showPrompt.current}
            className={`bg-white py-3 px-6 rounded-md font-medium cursor-pointer shadow-[0px_7px_0px_0px_rgba(12,_140,_233,_0.8)] transition-all active:shadow-[0px_0px_0px_0px_rgba(12,_140,_233,_0.5)] active:transform-[translateY(10px)] ${
              button ? "hidden" : ""
            }`}
          >
            Search my location..
          </button>
        </div>

        {button && weather && weather.location && weather.current && (
          <div
            className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center"
            id="weather"
          >
            <div className="bg-white rounded-2xl py-1 md:w-6/12 xl:w-3/12">
              <div className="bg-[#222222] flex justify-between items-center m-4 p-3 rounded-2xl">
                <img src={weather.current.condition.icon} alt="" />
                <div className="flex justify-end items-end flex-col text-white mr-3">
                  <p>Condition : {weather.current.condition.text}</p>
                  <p className="text-[13px]">
                    Latitude : {weather.location.lat} | Longtitude :{" "}
                    {weather.location.lon}
                  </p>
                </div>
              </div>

              <div
                className="flex justify-between items-start mx-3.5"
                id="location"
              >
                <h3 className="font-bold text-[18px] w-56 text-start">
                  {weather.location.name}, {weather.location.country}
                </h3>
                <p className="w-36 text-end">{weather.location.region}</p>
              </div>

              <div className="flex justify-center items-center w-full">
                <button
                  className="flex justify-center items-center gap-1 pt-7 cursor-pointer font-medium"
                  id="btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="#000"
                        d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"
                      />
                    </g>
                  </svg>{" "}
                  Read More
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="absolute bottom-0 left-0 right-0 flex justify-center items-center text-white font-light text-[10px]">
          <p>Created With 💖 by Naitzz12</p>
        </footer>
      </div>
    </>
  );
}

export default App;
