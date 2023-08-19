import React, { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import Button from '../Button'
import { useRouter } from "next/navigation";
import Bg1 from "@/assets/bg1.jpg"
import Bg2 from "@/assets/bg2.jpg"
import Bg3 from "@/assets/bg3.jpg"
import Bg4 from "@/assets/bg4.jpg"
import CryptImage from '@/assets/cryp.png'
import InvestImg from '@/assets/invest5.svg'


  
const carouselData = [
  {
      id: 1,
      heroImg: Bg1,
      title: 'Welcome to AveStock',
      text: 'Are you ready to take control of your financial destiny? With AveStock by your side, you have the tools, expertise, and guidance you need to harness your trading potential and achieve your financial goals.',
  },
  {
      id: 2,
      heroImg: Bg2,
      title: 'Trade with Confidence',
      text: 'Experience the thrill of trading with unwavering confidence. At AveStock, we provide you with the knowledge and support required to navigate the markets successfully, ensuring every trade you make is a step towards financial prosperity.'
  },  
  {
      id: 3,
      heroImg: Bg3,
      title: 'Your Journey Starts Here',
      text: "Embark on a transformative journey into the world of trading with AveStock. Whether you're an experienced trader or just starting, our platform equips you with personalized strategies and comprehensive resources to kickstart your journey towards profitability.",
  },
  {
      id: 4,
      heroImg: Bg4,
      title: 'Transform Your Future',
      text: "Empower yourself to shape a brighter future through trading with AveStock. We're not just a platform; we're your dedicated partner in building wealth, providing you with cutting-edge tools and a supportive community as you forge your path to financial freedom",
  },
]

const Hero = () => {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const carouselInnerRef = React.useRef<HTMLDivElement[]>([])
  const router = useRouter()

  
  const handleClick = (id: any) => {
    router.push(`/products/${id}`)
  }
  
 
  useEffect(() => {  
    // fade in and out carousel automatically
    const handleCarousel = () => {
      const carousel = carouselRef.current;
      if (!carousel) return
      const carouselItems = carouselInnerRef.current;
      if (!carouselItems) return
      
      let counter = 0
      const timer = setInterval(() => {
          // console.log("fired", counter, carouselItems.length)
          carouselItems?.forEach(item => {
              item.classList.remove('active')
          })
          carouselItems[counter].classList.add('active')
          counter++
          // console.log({counter})
          if (counter > carouselItems.length - 1) {
              counter = 0
          }
      }, 7000)
      return timer
    }

    const timer = handleCarousel()

    return () => {
      clearInterval(timer)
    }

  }, [carouselRef])


  return (
    <div className='box-border relative w-full min-h-screen p-8 overflow-hidden text-white bg-center bg-cover lg:h-screen'>
          
      {carouselData.map((item, index) => (
          <div key={index} ref={carouselRef} className="box-border absolute top-0 left-0 z-0 w-full h-full min-h-screen">
            <div ref={(el: HTMLDivElement) => (carouselInnerRef.current[index] = el)} className={`box-border absolute top-0 left-0 w-full h-full carousel-item ${index===0 && "active"}`}>
              <>
                {
                  !item.heroImg ?  (
                    <div className="absolute inset-0 w-full h-full bg-center bg-cover">
                    </div>
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-center bg-cover">
                      <div className="absolute inset-0 w-full h-full bg-black opacity-10"></div>
                      <Image src={item.heroImg} alt="" className="object-cover w-full h-full" />
                    </div>
                  )
                }
              </>
              <div className="backdrop-blur-[1.5px] bg-black/60 absolute w-full h-full flex flex-col md:flex-row justify-center items-center text-xl md:text-3xl box-border pt-48 md:pt-20">
                <div className='flex flex-col items-center justify-center flex-1 gap-4 p-8 pt-0 lg:items-start'>
                  <h1 className='mb-3 text-4xl font-extrabold text-center text-white capitalize lg:text-left sm:text-4xl md:text-6xl'>{item.title}</h1>
                  <p className='text-sm text-center text-gray-400 lg:text-left md:text-lg'>{item.text}</p>
                  {/* <Button onClick={() => router.push(`/products`)} className={`mt-2 py-2 pb-2.5 px-6 md:text-lg text-blue font-semibold bg-gold rounded-full cursor-pointer text-sm`}>
                    Learn More
                  </Button> */}
                  <button data-aos="slide-up" className='p-4 px-6 mt-2 text-sm text-white rounded-full lg:rounded-md w-fit bg-primary'>Get Started</button>
                </div>
                <div className="relative flex-1 w-full h-full p-8 lg:flex">
                  <Image src={InvestImg} alt="" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </div>
      ))}
    </div>
  )
}

export default Hero