import MovingBlobBackground from "../../components/MovingBlobBackground/MovingBlobBackground"


function About() {
  return (
    <div className="h-[100vh] w-[100vw] absolute z-10 flex justify-center items-center">
     <div className="absolute z-20 font-['Inter'] font-extrabold text-white text-9xl">
        ПРИВЕТ
      </div>
      <div className="
      absolute z-20 font-['Inter'] font-extrabold text-9xl ml-[36rem] mt-44 text-green-300">
        Я - WASTED
      </div>
      <div className="
        absolute z-20 mt-[30rem] -ml-[30rem]
        font-['Inter'] font-extrabold text-xl text-white
      ">
        C++
      </div>
      <div className="
        absolute z-20 -mt-[30rem] ml-[30rem]
        font-['Inter'] font-extrabold text-3xl text-white
      ">
        JavaScript
      </div>
      <div className="
        absolute z-20 -mt-60 mr-[30rem]
        font-['Inter'] font-extrabold text-4xl text-white
      ">
        SQL
      </div>
      <div className="
        absolute z-20 mt-[34rem] ml-[30rem]
        font-['Inter'] font-extrabold text-4xl text-white
      ">
        React
      </div>
      <div className="
        absolute z-20 mt-[45rem] ml-[60rem]
        font-['Inter'] font-extrabold text-xl text-white
      ">
        Python
      </div>
      <div className="
        absolute z-20 -mt-[44rem] -ml-[10rem]
        font-['Inter'] font-extrabold text-xl text-white
      ">
        Java
      </div>
      <div className="
        absolute z-20 mt-[5rem] -ml-[70rem]
        font-['Inter'] font-extrabold text-3xl text-white
      ">
        C#
      </div>

      <MovingBlobBackground />
    </div>
  )
}


export default About
