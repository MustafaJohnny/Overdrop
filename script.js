"use strict";

// Selecting all our project elements so we can manipulate the DOM and change the UI.
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const app = document.querySelector(".app");
const btnUsing = document.querySelector(".using");
const spinner = document.querySelector(".spinner");
const content = document.querySelector(".content");
const searchBtn = document.querySelector(".search");
const myAPIKey = "00907512e9e294dff0c12892e975e960";

// Our main async function that will send the request to this API, and then get us back the data that we want about the weather.
const getWeatherInfo = async function (city) {
  try {
    const respon = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}`
    );

    // If the there is something wrong with the recived data we throw a manual error.
    if (!respon.ok)
      throw new Error(
        "Please Enter A Valid City Name Again In Any Language You Prefer!"
      );

    const result = await respon.json();

    // We call this function with the recived data of the request that we sent to the server in the async function.
    showWeatherOnThePage(result);

    // Simple error handling using the try/catch method.
  } catch (theError) {
    alert(theError);
  }
};

// Very simple function to change degress from kelvin to celsius, This app is not for Americans, hahaaah.
const kelvinToCelsius = (k) => Math.floor(k - 273.15) + "°C";

// This function is responsible of updating the UI and manipulating the DOM, we called it before with the recived data.
const showWeatherOnThePage = function (data) {
  const weatherTemperature = kelvinToCelsius(data.main.temp);

  const weatherElement = document.createElement("div");

  weatherElement.innerHTML = `<div class="content"> <small>${data.sys.country}:${data.name}</small> <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${weatherTemperature} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
  <small>${data.weather[0].main}</small> </div>`;

  main.innerHTML = "";

  main.appendChild(weatherElement);
};

// The trigger function when the user start using the app.
btnUsing.addEventListener("click", function (e) {
  e.preventDefault();

  // Hide the start using app button.
  btnUsing.classList.add("hidden");

  // Hide any result from the UI
  main.classList.add("hidden");

  // Show a spinner
  spinner.classList.add("show-spinner");

  // Set the focus on the input.
  search.focus();

  setTimeout(() => {
    // Show the input form to the user after almost 1 second
    form.classList.remove("hidden");

    // Remove the spinner!
    spinner.classList.remove("show-spinner");
  }, 700);
});

// Our main function call when the user enter a city and then hit enter to search for a result.
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // If the user submit without a value we return.
  if (search.value.trim() === "") return;

  // We show the result to the user.
  main.classList.remove("hidden");

  // Unhide the start using app button.
  btnUsing.classList.remove("hidden");

  // We hide our form input from the user.
  form.classList.add("hidden");

  // We add a really nice spinner!
  spinner.classList.add("show-spinner");

  setTimeout(() => {
    // Remove the spinner after 2 seconds
    spinner.classList.remove("show-spinner");

    // Get the entered city by the user.
    const chosenCity = search.value;

    // Pass the enterd city to our async function to wrap the whole thing and make the app work.
    getWeatherInfo(chosenCity);

    // Some UI changing.
    search.value = "";
  }, 2000);
  main.innerHTML = "";
  search.blur();
});
