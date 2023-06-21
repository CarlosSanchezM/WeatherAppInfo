import { todayButtonClickHandler, weekButtonClickHandler } from './src/components/WeatherForecastInfoMethods.js'
import { GradesType } from './src/components/helper.js'
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

centigradeButton.addEventListener('click', () => { buildAll(GradesType.Centigrades) })
fahrenheitButton.addEventListener('click', () => { buildAll(GradesType.Fahrenheit) })
const screenElement = document.getElementById("screen")
screenElement.innerHTML = `w:${screen.width} h:${screen.height}`
