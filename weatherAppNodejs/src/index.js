const http = require("http");
const fs = require("fs");
const requests = require("requests");
const dotenv = require("dotenv");

dotenv.config();
const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal;

  if (orgVal && orgVal.main && orgVal.weather && orgVal.weather.length > 0) {
    temperature = temperature.replace("{%tempval%}", orgVal.main.temp.toFixed(1));
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min.toFixed(1));
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max.toFixed(1));
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].description);
  } else {
    console.log("Weather data array is empty or undefined");
    temperature = temperature.replace("{%tempval%}", "N/A");
    temperature = temperature.replace("{%tempmin%}", "N/A");
    temperature = temperature.replace("{%tempmax%}", "N/A");
    temperature = temperature.replace("{%location%}", "N/A"); 
    temperature = temperature.replace("{%country%}", "N/A");
    temperature = temperature.replace("{%tempstatus%}", "N/A");
  }

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    requests(`http://api.openweathermap.org/data/2.5/weather?q=surat&units=metric&appid=37fc5e7f3f77a8c35ea296fa0c586059`)
      .on("data", (chunk) => {
        const weatherData = JSON.parse(chunk);
        const realTimeData = replaceVal(homeFile, weatherData);
        res.write(realTimeData);
      })
      .on("end", (err) => {
        if (err) console.error("Error fetching weather data:", err);
        res.end();
      });
  } else {
    res.end("File not found");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});
