import { useState, useRef } from "react";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState([]);
  const [button, setButton] = useState(false);
  const [readmore, setReadmore] = useState(false);
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

              <div className={`h-1 overflow-hidden ${readmore ? "h-96" : ""}`}>
                <div>
                  <div className="flex justify-between items-center mx-3.5">
                    <p className="text-5xl">{weather.current.temp_f}°F</p>
                    <p className="text-5xl">{weather.current.temp_c}°C</p>
                  </div>
                </div>

                <div className="bg-[#222222] flex justify-between items-center flex-col m-4 p-3 rounded-2xl text-white py-6 px-5">
                  <div className="w-full ">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-center items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="#fff"
                            d="M16 3c-3.227 0-6.043 2.258-6.797 5.344a5.04 5.04 0 0 0-2.785 2.672C2.922 10.758 0 13.555 0 17c0 3.309 2.691 6 6 6v-2c-2.207 0-4-1.793-4-4s1.793-4 4-4c.277 0 .566.035.883.105l.976.223l.22-.98a3 3 0 0 1 2.226-2.254l.66-.156l.098-.672C11.418 6.832 13.543 5 16 5a4.98 4.98 0 0 1 4.46 2.75l.395.781l.829-.289C22.152 8.082 22.582 8 23 8c2.207 0 4 1.793 4 4c0 .04-.008.074-.016.11l-.02.206l-.062.72l.664.284A3.99 3.99 0 0 1 30 17c0 2.207-1.793 4-4 4h-2.543q.393.434.691.938q.301.503.5 1.062H26c3.309 0 6-2.688 6-6a6 6 0 0 0-3.004-5.2A6.01 6.01 0 0 0 23 6c-.39 0-.777.043-1.172.125A6.97 6.97 0 0 0 16 3m-.5 9c-1.137 0-2.16.55-2.797 1.398l1.598 1.2A1.49 1.49 0 0 1 15.5 14c.84 0 1.5.66 1.5 1.5s-.66 1.5-1.5 1.5H9v2h6.5c1.922 0 3.5-1.578 3.5-3.5S17.422 12 15.5 12M8 21v2h3c.566 0 1 .434 1 1s-.434 1-1 1a.98.98 0 0 1-.863-.5l-1.73 1.012A3.02 3.02 0 0 0 11 27c1.645 0 3-1.355 3-3a3 3 0 0 0-.188-1H19c1.117 0 2 .883 2 2s-.883 2-2 2a2 2 0 0 1-1.887-1.336l-1.886.664A4 4 0 0 0 19 29c2.2 0 4-1.8 4-4s-1.8-4-4-4z"
                          />
                        </svg>
                        <p className="font-light">Wind Speed</p>
                      </div>
                      <p className="text-[18px] font-medium">
                        {weather.current.wind_kph} Kph
                      </p>
                    </div>
                    <hr className="mt-3" />
                  </div>
                  <div className="w-full pt-3">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-center items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none" stroke="#fff" stroke-width="1">
                            <path
                              stroke-linecap="round"
                              d="M20.693 17.33a9 9 0 1 0-17.386 0"
                            />
                            <path d="M12.766 15.582c.487.71.144 1.792-.766 2.417c-.91.626-2.043.558-2.53-.151c-.52-.756-2.314-5.007-3.403-7.637c-.205-.495.4-.911.79-.542c2.064 1.96 5.39 5.157 5.909 5.913Z" />
                            <path
                              stroke-linecap="round"
                              d="M12 6v2m-6.364.636L7.05 10.05m11.314-1.414L16.95 10.05m3.743 7.28l-1.931-.518m-15.455.518l1.931-.518"
                            />
                          </g>
                        </svg>
                        <p className="font-light">Pressure</p>
                      </div>
                      <p className="text-[18px] font-medium">
                        {weather.current.pressure_mb} mb
                      </p>
                    </div>
                    <hr className="mt-3" />
                  </div>
                  <div className="w-full pt-3">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-center items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            color="#fff"
                          >
                            <path d="M3.5 13.678c0-4.184 3.58-8.319 6.094-10.706a3.463 3.463 0 0 1 4.812 0C16.919 5.36 20.5 9.494 20.5 13.678C20.5 17.78 17.281 22 12 22s-8.5-4.22-8.5-8.322" />
                            <path d="M4 12.284c1.465-.454 4.392-.6 7.984 1.418c3.586 2.014 6.532 1.296 8.016.433" />
                          </g>
                        </svg>
                        <p className="font-light">Humidity</p>
                      </div>
                      <p className="text-[18px] font-medium">
                        {weather.current.humidity} g/m³
                      </p>
                    </div>
                    <hr className="mt-3" />
                  </div>
                  <div className="w-full pt-3">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-center items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#fff"
                            d="M6.5 19q-1.871 0-3.185-1.306Q2 16.39 2 14.517q0-1.719 1.175-3.051t2.921-1.431q.337-2.185 2.01-3.61T12 5q2.502 0 4.251 1.749T18 11v1h.616q1.436.046 2.41 1.055T22 15.5q0 1.471-1.014 2.486Q19.97 19 18.5 19zm0-1h12q1.05 0 1.775-.725T21 15.5t-.725-1.775T18.5 13H17v-2q0-2.075-1.463-3.538T12 6T8.463 7.463T7 11h-.5q-1.45 0-2.475 1.025T3 14.5t1.025 2.475T6.5 18m5.5-6"
                          />
                        </svg>
                        <p className="font-light">Cloud</p>
                      </div>
                      <p className="text-[18px] font-medium">
                        {weather.current.cloud} Okta
                      </p>
                    </div>
                    <hr className="mt-3" />
                  </div>
                  <div className="w-full pt-3">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-center items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="#fff"
                            d="M23.5 22h-15A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22M16 4a7 7 0 0 0-6.94 6.14L9 11h-.86a4.5 4.5 0 0 0 .36 9h15a4.5 4.5 0 0 0 .36-9H23l-.1-.82A7 7 0 0 0 16 4m-2 26a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 14 30m6 0a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 20 30M8 30a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 8 30"
                          />
                        </svg>
                        <p className="font-light">Precip</p>
                      </div>
                      <p className="text-[18px] font-medium">
                        {weather.current.precip_mm} mm
                      </p>
                    </div>
                    <hr className="mt-3" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center w-full">
                <button
                  className={`flex justify-center items-center gap-1 pt-7 cursor-pointer font-medium ${
                    readmore ? "hidden" : ""
                  }`}
                  id="btn"
                  onClick={() => setReadmore(true)}
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
                <button
                  className={`flex justify-center items-center gap-1 pt-7 cursor-pointer font-medium ${
                    readmore ? "" : "hidden"
                  }`}
                  id="btn"
                  onClick={() => setReadmore(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className={readmore ? "rotate-180" : ""}
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="#000"
                        d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"
                      />
                    </g>
                  </svg>{" "}
                  Close
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
