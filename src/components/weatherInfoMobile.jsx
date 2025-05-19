import axios from "axios";
import { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function WeatherInfoMobile() {
  const [weather, setWeather] = useState(null);
  const [button, setButton] = useState(false);
  const showPrompt = useRef();
  const apikey = import.meta.env.VITE_KEY;

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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
          `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${input}&days=3&aqi=yes&alerts=no`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        // const dataWeather = api.data;
        setWeather(api.data);
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
      <div
        className={`px-1 absolute top-[30%] bottom-[30%] left-0 right-0 xl:hidden`}
      >
        <div
          className={`absolute left-0 right-0 bottom-0 top-0 flex justify-center items-center ${
            button ? "-z-10" : "z-10"
          }`}
        >
          <button
            onClick={showPrompt.current}
            className={`bg-white py-3 px-6 rounded-md font-medium cursor-pointer shadow-[0px_7px_0px_0px_rgba(12,_140,_233,_0.8)] transition-all active:shadow-[0px_0px_0px_0px_rgba(12,_140,_233,_0.5)] active:transform-[translateY(10px)] ${
              button ? "hidden" : ""
            }`}
          >
            Search my location..
          </button>
        </div>
        <Slider {...settings}>
          {button &&
            weather &&
            weather.forecast.forecastday.map((cuaca) => (
              <div className=" flex justify-center items-center" id="weather">
                <div className="bg-white rounded-2xl py-1 md:w-6/12 xl:w-20/12">
                  <div className="bg-[#222222] flex justify-between items-center m-4 p-3 rounded-2xl">
                    <img src={cuaca.day.condition.icon} alt="" />
                    <div className="flex justify-end items-end flex-col text-white mr-3">
                      <p>Condition : {cuaca.day.condition.text}</p>
                      <p>Date : {cuaca.date}</p>
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

                  <div className={`h-[270px] overflow-hidden`}>
                    <div>
                      <div className="flex justify-between items-center mx-3.5">
                        <p className="text-5xl">{cuaca.day.maxtemp_c}°C</p>
                        <p className="text-5xl">{cuaca.day.mintemp_c}°C</p>
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
                            {cuaca.day.maxwind_kph} Kph
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
                            {cuaca.day.avghumidity} g/m³
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
                            {cuaca.day.totalprecip_mm} mm
                          </p>
                        </div>
                        <hr className="mt-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
}

export default WeatherInfoMobile;
