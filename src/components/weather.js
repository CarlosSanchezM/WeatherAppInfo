import { getImages } from "../services/unplashAPI"
import { getForecast, getWeather } from "../services/weatherAPI"
import { buildImageBackground } from "./ImageBackgroundMethods"

import { buildWeatherForecastInfo, changeStateInformation } from "./WeatherForecastInfoMethods"
import { additionalInformation, clockTime, currentWeatherLocation } from "./WeatherInfoMethods"
import { ForescatInformation, GradesType } from "./helper"

let responseMainWeather = null
let responseForecast = null
let responseImage = null
let currentTemperature = GradesType.Centigrades

// const currentWeatherLocation = ({ weather, dt, main }) => {
//     const currentTemperatureDiv = document.getElementById('currentTemperature')
//     const currentDay = document.getElementById('currentDay')
//     const currentWeather = document.getElementById('currentWeather')

//     currentTemperatureDiv.innerHTML = getTemperature(main.temp, currentTemperature)

//     currentDay.innerHTML = getMainDate(dt);

//     const weatherIcon = weather[0]
//     currentWeather.innerHTML = `
//     <i class="${getIconoOpenWeather(weatherIcon.main)}"></i>
//     <div class="current-weather">${capitalizeFirstLetter(weatherIcon.description)}</div>`;

// }
// const additionalInformation = ({ main, wind }) => {
//     const informationMinMaxTemp = document.getElementById('information-minMaxTemp')
//     const informationHumidity = document.getElementById('information-humidity')
//     const informationWind = document.getElementById('information-wind')
//     const informationFeelsLike = document.getElementById('information-feelsLike')

//     informationMinMaxTemp.innerText = `${getTemperature(main.temp_min, currentTemperature)} / ${getTemperature(main.temp_max, currentTemperature)}`
//     informationHumidity.innerText = `${main.humidity} %`
//     informationWind.innerText = `${wind.speed} mph`
//     informationFeelsLike.innerText = getTemperature(main.feels_like, currentTemperature)

// }

// const clockTime = ({ dt }) => {
//     const clockCurrentTime = document.getElementById(`clockCurrentTime`)

//     clockCurrentTime.innerText = getClockHour(dt)
// }

const buildWeatherInfo = (data) => {
    console.log('buildWeatherInfo -> ', data)
    if (data === null) {
        return false
    }
    currentWeatherLocation(data, currentTemperature)
    additionalInformation(data, currentTemperature)
    changeStateInformation(ForescatInformation.Today)
    clockTime(data)
    return true
}

// const removeInfoItem = () => {

//     const infoIteam = document.querySelectorAll('.info-item')

//     infoIteam.forEach((element) => {
//         element.remove()
//     })

// }

// const buildWeatherForecastWeeks = (list) => {
//     console.log(list)
//     if (!list) {
//         console.log(list)
//         alert(`Ingresa una ciudad`)
//         return
//     }
//     let weekInfoList = list.filter((data) => data.dt_txt.includes('15:00:00'))
//     const containerInfoItems = document.getElementById('next-dates-container')

//     // week 
//     weekInfoList.forEach((item) => {
//         const infoItem = document.createElement('div')
//         infoItem.classList.add('info-item')

//         const dateItem = new Date(item.dt * 1000)
//         const dayItemName = dateItem.getDay()

//         infoItem.innerHTML = `<div class="top-info">${getDayName(dayItemName)}</div>
//         <i class="${getIconoOpenWeather(item.weather[0].main)}"></i>
//         <div class="bottom-info">${getTemperature(item.main.temp, currentTemperature)}</div>`
//         containerInfoItems.appendChild(infoItem)
//     })

// }

// const buildWeatherForecastDays = (list) => {
//     console.log(list)
//     if (!list) {
//         alert(`Ingresa una ciudad`)
//         return
//     }
//     let todayInfoList = list.filter((element, index) => index < 5)

//     const containerInfoItems = document.getElementById('next-dates-container')
//     // today 
//     todayInfoList.forEach((item) => {

//         const infoItem = document.createElement('div')
//         infoItem.classList.add('info-item')

//         const dateItem = new Date(item.dt * 1000)
//         const dayItemName = dateItem.getHours()
//         infoItem.innerHTML = `<div class="top-info">${getHourFormat(dayItemName)}</div>
//             <i class="${getIconoOpenWeather(item.weather[0].main)}"></i>
//             <div class="bottom-info">${getTemperature(item.main.temp, currentTemperature)}</div>`
//         containerInfoItems.appendChild(infoItem)
//     })
// }

// export const weekButtonClickHandler = () => {
//     if (listForecastInfo) {
//         removeInfoItem();
//         buildWeatherForecastWeeks(listForecastInfo, currentTemperature)
//         console.log("entro en el evento de click weeks")
//     }
// }

// export const todayButtonClickHandler = () => {
//     if (listForecastInfo) {
//         removeInfoItem()
//         buildWeatherForecastDays(listForecastInfo, currentTemperature)
//         console.log("entro en el evento de click days")
//     }
// }
// const buildWeatherForecastInfo = ({ list }) => {

//     listForecastInfo = list
//     removeInfoItem()
//     buildWeatherForecastDays(list, currentTemperature)
//     console.log("renovacion de evento")

// }


const getForecastComponent = async ({ coord }) => {
    responseForecast = await getForecast(coord.lat, coord.lon)
    if (responseForecast.cod === '404') {
        console.info('error getForecastComponent ->', responseForecast.message)
        return
    }
    console.log('buildWeatherForecastInfo -> ', responseForecast)
    buildWeatherForecastInfo(responseForecast, currentTemperature)
}


const getImageBackground = async (city) => {
    responseImage = await getImages(city)
    console.log("getImage", responseImage)
    if (responseImage.total === 0) {
        console.log("No Imagen")
        return
    }

    buildImageBackground(responseImage)
}
const changeStateGrades = (temp) => {
    const centigradeButton = document.getElementById('centigradeButton')
    const fahrenheitButton = document.getElementById('fahrenheitButton')
    if (temp === GradesType.Fahrenheit) {
        fahrenheitButton.classList.remove('disable')
        fahrenheitButton.classList.add('enable')
        centigradeButton.classList.remove('enable')
        centigradeButton.classList.add('disable')
    }
    if (temp === GradesType.Centigrades) {
        centigradeButton.classList.remove('disable')
        centigradeButton.classList.add('enable')
        fahrenheitButton.classList.remove('enable')
        fahrenheitButton.classList.add('disable')
    }
}

export const buildAll = (temp = GradesType.Centigrades) => {
    console.log(temp)
    // let withInformation = false
    changeStateGrades(temp)
    currentTemperature = temp
    let withInformation = buildWeatherInfo(responseMainWeather)
    if (!withInformation) {
        // alert("Ingresa una ciudad")
        return
    }
    buildWeatherForecastInfo(responseForecast, currentTemperature)
    buildImageBackground(responseImage)
}

export const searchInputComponent = async (e) => {
    if (e.key === 'Enter') {
        let text = e.target.value
        if (text.length > 3) {

            responseMainWeather = await getWeather(text)
            if (responseMainWeather.cod === '404') {
                alert('ciudad no encontrada!')
                return
            }

            buildWeatherInfo(responseMainWeather)
            await getForecastComponent(responseMainWeather)
            await getImageBackground(text)

            //Promise.all(forecast, image)
        }
    }
}


