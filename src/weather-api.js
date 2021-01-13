const weather = (() => {
  function processWeatherJson(data) {
    try {
      const city = data.name;
      const { country } = data.sys;
      const mainWeather = data.weather[0].main;
      const { description } = data.weather[0];
      const { temp } = data.main;
      const feelsLike = data.main.feels_like;
      const high = data.main.temp_max;
      const low = data.main.temp_min;
      const { sunrise } = data.sys;
      const { sunset } = data.sys;

      return {
        city,
        country,
        mainWeather,
        description,
        temp,
        feelsLike,
        high,
        low,
        sunrise,
        sunset,
      };
    } catch (err) {
      throw Error("data undefined");
    }
  }
  async function getWeather(city, units) {
    try {
      const apiKey = "af7be5386c68edc8a11bfc3e58d4d6ac";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
      const response = await fetch(url, { mode: "cors" });
      const weatherJson = await response.json();
      return processWeatherJson(weatherJson);
    } catch (err) {
      throw Error(`city not found, ${err}`);
    }
  }

  return { getWeather };
})();

export default weather;
