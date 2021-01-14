const domController = (() => {
  async function populateWeatherData(obj, u) {
    const icon = document.getElementById("icon");
    icon.src = await obj.iconUrl;
    let sign;
    if (u === "metric") sign = "<span>&#176;</span>C";
    else sign = "<span>&#176;</span>F";
    document.getElementById(
      "cityName"
    ).textContent = `${obj.city}, ${obj.country}`;
    document.getElementById("mainData").innerHTML = `${obj.temp}${sign}`;
    document.getElementById(
      "subData"
    ).innerHTML = `Feels like ${obj.feelsLike}${sign} | ${obj.description} | High ${obj.high}${sign} | Low ${obj.low}${sign} | Sunrise ${obj.sunrise} | Sunset  ${obj.sunset}`;
  }
  return { populateWeatherData };
})();

export default domController;
