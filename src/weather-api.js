const weather = (() => {
  function utcToLocalTime(utc) {
    const d = new Date(utc * 1000);
    let correctedHours = d.getHours();
    let correctedMinutes = d.getMinutes();
    let sign = "am";
    if (d.getHours() > 12) {
      correctedHours = d.getHours() % 12;
      sign = "pm";
    }
    if (d.getMinutes() < 10) {
      correctedMinutes = `0${correctedMinutes}`;
    }
    return `${correctedHours}:${correctedMinutes} ${sign}`;
  }

  async function processWeatherJson(data) {
    try {
      const city = data.name;
      const { country } = data.sys;
      const mainWeather = data.weather[0].main;
      const { description } = data.weather[0];
      let { temp } = data.main;
      temp = Math.trunc(temp);
      let feelsLike = data.main.feels_like;
      feelsLike = Math.trunc(feelsLike);
      let high = data.main.temp_max;
      high = Math.trunc(high);
      let low = data.main.temp_min;
      low = Math.trunc(low);
      let { sunrise } = data.sys;
      sunrise = utcToLocalTime(sunrise);
      let { sunset } = data.sys;
      sunset = utcToLocalTime(sunset);
      const iconCode = data.weather[0].icon;
      const response = await fetch(
        `http://openweathermap.org/img/wn/${iconCode}@2x.png`,
        { mode: "cors" }
      );
      const iconUrl = response.url;

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
        iconUrl,
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
