import {
  ForescatInformation,
  getDayName,
  getHourFormat,
  getIconoOpenWeather,
  getTemperature
} from './helper'

let listForecastInfo = null
let currentTemperatureWeather = null

export const removeInfoItem = () => {
  const infoIteam = document.querySelectorAll('.info-item')

  infoIteam.forEach((element) => {
    element.remove()
  })
}

export const buildWeatherForecastWeeks = (list, currentTemperatureWeather) => {
  console.log(list)
  if (!list) {
    console.log(list)
    alert('Ingresa una ciudad')
    return
  }
  const weekInfoList = list.filter((data) => data.dt_txt.includes('15:00:00'))
  const containerInfoItems = document.getElementById('next-dates-container')

  // week
  weekInfoList.forEach((item) => {
    const infoItem = document.createElement('div')
    infoItem.classList.add('info-item')

    const dateItem = new Date(item.dt * 1000)
    const dayItemName = dateItem.getDay()

    infoItem.innerHTML = `<div class="top-info">${getDayName(dayItemName)}</div>
        <i class="${getIconoOpenWeather(item.weather[0].main)}"></i>
        <div class="bottom-info">${getTemperature(
          item.main.temp,
          currentTemperatureWeather
        )}</div>`
    containerInfoItems.appendChild(infoItem)
  })
}

export const buildWeatherForecastDays = (list, currentTemperatureWeather) => {
  console.log(list)
  if (!list) {
    alert('Ingresa una ciudad')
    return
  }
  const todayInfoList = list.filter((element, index) => index < 5)

  const containerInfoItems = document.getElementById('next-dates-container')
  // today
  todayInfoList.forEach((item) => {
    const infoItem = document.createElement('div')
    infoItem.classList.add('info-item')

    const dateItem = new Date(item.dt * 1000)
    const dayItemName = dateItem.getHours()
    infoItem.innerHTML = `<div class="top-info">${getHourFormat(
      dayItemName
    )}</div>
            <i class="${getIconoOpenWeather(item.weather[0].main)}"></i>
            <div class="bottom-info">${getTemperature(
              item.main.temp,
              currentTemperatureWeather
            )}</div>`
    containerInfoItems.appendChild(infoItem)
  })
}
export const changeStateInformation = (state) => {
  const weekButton = document.getElementById('weekButton')
  const todayButton = document.getElementById('todayButton')
  if (state === ForescatInformation.Week) {
    weekButton.classList.remove('disable')
    weekButton.classList.add('enable')
    todayButton.classList.remove('enable')
    todayButton.classList.add('disable')
  }
  if (state === ForescatInformation.Today) {
    todayButton.classList.remove('disable')
    todayButton.classList.add('enable')
    weekButton.classList.remove('enable')
    weekButton.classList.add('disable')
  }
}

export const weekButtonClickHandler = () => {
  if (listForecastInfo) {
    removeInfoItem()
    changeStateInformation(ForescatInformation.Week)
    buildWeatherForecastWeeks(listForecastInfo, currentTemperatureWeather)
    console.log('entro en el evento de click weeks')
  }
}

export const todayButtonClickHandler = () => {
  if (listForecastInfo) {
    removeInfoItem()
    changeStateInformation(ForescatInformation.Today)
    buildWeatherForecastDays(listForecastInfo, currentTemperatureWeather)
    console.log('entro en el evento de click days')
  }
}

export const buildWeatherForecastInfo = ({ list }, currentTemperature) => {
  console.log('currentTemperature ', currentTemperature)
  currentTemperatureWeather = currentTemperature
  listForecastInfo = list
  removeInfoItem()
  console.log('tempForecastInfo ', currentTemperatureWeather)
  buildWeatherForecastDays(listForecastInfo, currentTemperatureWeather)
  console.log('renovacion de evento')
}
