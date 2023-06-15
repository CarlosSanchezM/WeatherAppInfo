
export const ForescatInformation = {
    Today: 'today',
    Week: 'week'
}

export const GradesType = {
    Fahrenheit: 'F',
    Centigrades: 'C'
}

export const getDayName = (dayName) => {

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    return days[dayName]
}

const getMonthName = (month) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return months[month]
}

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getHourFormat = (hour) => {
    let hoursFormat = hour % 12
    if (hoursFormat === 0) {
        hoursFormat = 12;
    }
    const period = hour >= 12 ? 'PM' : 'AM';
    return `${hoursFormat.toString()}${period}`
}

export const getClockHour = (dt) => {
    const dateForHour = new Date(dt * 1000)
    const hours = dateForHour.getHours().toString().padStart(2, '0');
    const minutes = dateForHour.getMinutes().toString().padStart(2, '0');
    const seconds = dateForHour.getSeconds().toString().padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';

    return ` ${hours}:${minutes}:${seconds} ${period}`
}

export const getTemperature = (temp, type = 'C') => {
    //console.log(`GetTemperature temp: ${temp} type: ${type}`)
    if (type === 'C') {
        return `${Math.round(temp - 273.15)}°`
    }
    return `${Math.round((temp - 273.15) * 9 / 5 + 32)}°`
}

export const getMainDate = (dt) => {

    const date = new Date(dt * 1000)

    const dayName = date.getDay()
    const day = date.getDate()
    const month = date.getMonth()

    return `${getDayName(dayName)}/${getMonthName(month)} ${day}`;
}

export const getIconoOpenWeather = (weather) => {
    const icons = {
        Clear: 'fas fa-sun sunny',
        Clouds: 'fas fa-cloud',
        Drizzle: 'fas fa-cloud-showers-heavy gray',
        Rain: 'fas fa-cloud-rain gray',
        Thunderstorm: 'fas fa-bolt sunny',
        Snow: 'fas fa-snowflake cold',
        Mist: 'fas fa-smog',
        Smoke: 'fas fa-smog',
        Haze: 'fas fa-smog',
        Dust: 'fas fa-smog',
        Fog: 'fas fa-smog',
        Sand: 'fas fa-wind',
        Ash: 'fas fa-smog',
        Squall: 'fas fa-wind gray',
        Tornado: 'fas fa-tornado gray'
    }

    return icons[weather] || 'fas fa-question'
}