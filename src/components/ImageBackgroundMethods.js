export const buildImageBackground = (responseImage) => {
  const randomNumber = Math.floor(Math.random() * 10)
  const image = responseImage.results[randomNumber].urls.regular
  const body = document.getElementById('weatherBody')
  const additionalInformationContainer = document.getElementsByClassName(
    'additional-information-background'
  )

  body.style.backgroundImage = `url(${image})`
  additionalInformationContainer[0].style.backgroundImage = `url(${image})`
}
