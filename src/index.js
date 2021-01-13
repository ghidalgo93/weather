import "./style.css";
import weather from "./weather-api";

const form = document.getElementById("citySearch");
const div = document.createElement("div");
document.body.appendChild(div);

form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const plainFormData = Object.fromEntries(formData.entries());
  weather.getWeather(plainFormData.city, "imperial").then(function (data) {
    populateWeatherData(data);
  });
  e.target.reset();
};

function populateWeatherData(obj) {
  document.getElementById(
    "cityName"
  ).textContent = `${obj.city}, ${obj.country}`;
  document.getElementById("graphic").textContent = `${obj.temp}`;
  document.getElementById(
    "subData"
  ).textContent = `Feels like ${obj.feelsLike} | ${obj.description} | High ${obj.high} | Low ${obj.low}`;
}
