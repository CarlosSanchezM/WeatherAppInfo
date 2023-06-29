import {
  capitalizeFirstLetter,
  getClockHour,
  getIconoOpenWeather,
  getMainDate,
  getTemperature
} from './helper'

export const currentWeatherLocation = (
  { weather, dt, main },
  currentTemperature
) => {
  const currentTemperatureDiv = document.getElementById('currentTemperature')
  const currentDay = document.getElementById('currentDay')
  const currentWeather = document.getElementById('currentWeather')

  currentTemperatureDiv.innerHTML = getTemperature(
    main.temp,
    currentTemperature
  )

  currentDay.innerHTML = getMainDate(dt)

  const weatherIcon = weather[0]
  currentWeather.innerHTML = `
    <i class="${getIconoOpenWeather(weatherIcon.main)}"></i>
    <div class="current-weather">${capitalizeFirstLetter(
      weatherIcon.description
    )}</div>`
}

export const additionalInformation = ({ main, wind }, currentTemperature) => {
  const informationMinMaxTemp = document.getElementById(
    'information-minMaxTemp'
  )
  const informationHumidity = document.getElementById('information-humidity')
  const informationWind = document.getElementById('information-wind')
  const informationFeelsLike = document.getElementById('information-feelsLike')

  informationMinMaxTemp.innerText = `${getTemperature(
    main.temp_min,
    currentTemperature
  )} / ${getTemperature(main.temp_max, currentTemperature)}`
  informationHumidity.innerText = `${main.humidity} %`
  informationWind.innerText = `${wind.speed} mph`
  informationFeelsLike.innerText = getTemperature(
    main.feels_like,
    currentTemperature
  )
}

export const clockTime = ({ dt }) => {
  const clockCurrentTime = document.getElementById('clockCurrentTime')

  clockCurrentTime.innerText = getClockHour(dt)
}
