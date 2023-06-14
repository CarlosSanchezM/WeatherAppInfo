const OpenWeatherKey = 'e8c2ee9f2b2bdff9014d457728cea6fd'
const OpenWeatherURL = 'https://api.openweathermap.org/data/2.5/'

export const getWeather = async (city) => {
    try {
        const response = await fetch(`${OpenWeatherURL}weather?q=${city}&appid=${OpenWeatherKey}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('getWeather API error -> ', error)
    }

}

export const getForecast = async (lat, lon) => {
    try {
        const response = await fetch(`${OpenWeatherURL}forecast?lat=${lat}&lon=${lon}&appid=${OpenWeatherKey}`)
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error('getForecast API error -> ', error)
    }
}