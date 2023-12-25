import { useEffect, useState } from "react"

import MovingBlobBackground from "../../components/MovingBlobBackground/MovingBlobBackground"
import TimePicker from "./components/TimePicker/TimePicker"


function useWeatherAPIForecast(city: string) {
  const [data,setData] = useState(null)
  const [error,setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7e113a5ae1f64b26b1a130055232412&q=${city}&days=1&aqi=no&alerts=no&lang=ru`)
        let json = await response.json()
        console.log(json)
        setData(json?.forecast.forecastday[0])
      }
      catch (error: any) {
        setError(error)
      }
      finally {
        setLoading(false)
      }
    }

    getData()
  }, [city])

  return { data, error, loading }
}


function kmph2mps(kmph: number) {
  return (kmph / 3.6).toFixed(1)
}


function Weather() {
  const [city, setCity] = useState('Москва')
  const [hour, setHour] = useState(new Date().getHours())
  const { data, error, loading } = useWeatherAPIForecast(city)

  const handleNextHour = (hour: number) => {
    setHour(hour)
  }

  return (
    <div className="
      h-[100vh] w-[100vw] absolute z-10 flex justify-center items-center
      font-['Inter'] text-white font-light overflow-clip
    ">
      <div className="flex flex-row items-center absolute z-20">  
        <TimePicker handleNextHour={handleNextHour} />

        <input
          className="
            ml-44 w-96
            text-5xl
            bg-transparent focus:outline-none
          "
          autoFocus
          defaultValue={city}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              setCity(event.target.value)
            }
          }}
        />

        <div className="flex space-x-10 ml-10">
          <h1 className="text-5xl">{
            loading ?
              '' :
              `${data?.hour[hour].temp_c}°C`
          }</h1>

          <h1 className="text-5xl">{
            loading ?
              '' :
              `${kmph2mps(data?.hour[hour].wind_kph)} м/с`
          }</h1>

          <h1 className="text-5xl">{
            loading ?
            '' :
            `${data?.hour[hour].condition.text}`
          }</h1>
        </div>
      </div>

      <MovingBlobBackground />
    </div>
  )
}


export default Weather
