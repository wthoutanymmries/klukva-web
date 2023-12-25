import './TimePicker.css'
import { useState } from "react"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"


function TimePicker(props) {
  const [state, setState] = useState(new Date().getHours())

  return (
    <div className="
    h-auto w-auto absolute z-20
    text-5xl flex items-center
    ">
      <Swiper
        direction="vertical"
        slidesPerView={3}
        slideToClickedSlide
        freeMode={{sticky: true}}
        loop
        loopAdditionalSlides={5}
        style={{height: "10rem"}}
        initialSlide={state}
        centeredSlides
        onSlidePrevTransitionEnd={(swiper) => {props.handleNextHour(swiper.realIndex)}}
        onSlideNextTransitionEnd={(swiper) => {props.handleNextHour(swiper.realIndex)}}
      >
        <SwiperSlide style={{height: '3rem'}}>00:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>01:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>02:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>03:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>04:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>05:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>06:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>07:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>08:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>09:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>10:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>11:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>12:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>13:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>14:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>15:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>16:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>17:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>18:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>19:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>20:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>21:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>22:00</SwiperSlide>
        <SwiperSlide style={{height: '3rem'}}>23:00</SwiperSlide>
      </Swiper>
    </div>
  )
}


export default TimePicker