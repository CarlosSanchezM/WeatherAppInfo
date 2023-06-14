import { todayButtonClickHandler, weekButtonClickHandler } from './src/components/WeatherForecastInfoMethods.js'
import { buildAll, searchInputComponent } from './src/components/weather.js'

const [searchInput, weekButton, todayButton, centigradeButton, fahrenheitButton] =
    [document.getElementById('search'),
    document.getElementById("weekButton"),
    document.getElementById("todayButton"),
    document.getElementById("centigradeButton"),
    document.getElementById("fahrenheitButton")]


searchInput.addEventListener('keypress', searchInputComponent)

weekButton.addEventListener('click', weekButtonClickHandler)
todayButton.addEventListener('click', todayButtonClickHandler)

centigradeButton.addEventListener('click', () => { buildAll('C') })
fahrenheitButton.addEventListener('click', () => { buildAll('F') })


