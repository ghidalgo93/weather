import "./style.css";
import weather from "./weather-api";
import domController from "./domController";

const app = (() => {
  if (!localStorage.getItem("city")) {
    localStorage.setItem("city", "boulder");
  }
  const form = document.getElementById("citySearch");
  const unitsCheck = document.getElementById("units");

  function checkUnits(bool) {
    const u = bool ? "imperial" : "metric";
    return u;
  }

  window.onload = () => {
    const units = checkUnits(unitsCheck.checked);
    weather.getWeather(localStorage.getItem("city"), units).then((data) => {
      domController.populateWeatherData(data, units);
    });
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const units = checkUnits(unitsCheck.checked);
    weather.getWeather(plainFormData.city, units).then((data) => {
      domController.populateWeatherData(data, units);
    });
    localStorage.setItem("city", e.target.city.value);
    e.target.city.value = "";
  };

  unitsCheck.onchange = () => {
    const units = checkUnits(unitsCheck.checked);
    weather.getWeather(localStorage.getItem("city"), units).then((data) => {
      domController.populateWeatherData(data, units);
    });
    form.city.value = "";
  };
})();
