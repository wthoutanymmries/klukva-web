import { Link } from 'wouter'
import MovingBlobBackground from "../../components/MovingBlobBackground/MovingBlobBackground"


function WelcomePage() {
  return (
    <div className="h-[100vh] w-[100vw] absolute z-10 flex justify-center items-center">
      <div className="absolute z-20 font-['Inter'] font-extrabold text-white text-9xl">
        WASTED
      </div>
      <div className="absolute z-20 font-['Inter'] font-extrabold text-9xl ml-[36rem] mt-44 text-green-300">
        WONDER
      </div>

      <button className="
        absolute z-20  -mt-[30rem] ml-[30rem]
        font-['Inter'] font-bold text-white hover:text-green-300
        border-green-300 border-2 rounded-lg
        px-5 py-3
        shadow-xl shadow-green-300
      ">
        <Link href="/grapheditor">
          <a>Редактор графов</a>
        </Link>
      </button>

      <button className="
        absolute z-20  mt-[30rem] -ml-[30rem]
        font-['Inter'] font-bold text-white hover:text-green-300
        border-white border-2 rounded-lg
        px-5 py-3
        shadow-xl shadow-white
      ">
        <Link href="/about">
          <a>Обо мне</a>
        </Link>
      </button>

      <button className="
        absolute z-20  mt-[40rem] -ml-[10rem]
        font-['Inter'] font-bold text-white hover:text-green-300
        border-green-300 border-2 rounded-lg
        px-5 py-3
        shadow-xl shadow-green-300
      ">
        <Link href="/weather">
          <a>Погода</a>
        </Link>
      </button>

      <MovingBlobBackground />
    </div>
  )
}


export default WelcomePage