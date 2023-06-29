const unplashAPI = '5CU7DP2v5fXQN0OjE78CaEtjEFxPcFwo_mw6R-UqpSA'
const unplashURL = 'https://api.unsplash.com/search/photos/'

export const getImages = async (city) => {
  try {
    const response = await fetch(
      `${unplashURL}?query=${city}&client_id=${unplashAPI}`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`getImages error -> ${error}`)
  }
}
