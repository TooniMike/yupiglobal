import React from 'react';
import avatar from '../assets/avatar.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { heroSlides } from '../data';
import complan from "../assets/yupi anglais.pdf"
import Categories from './Categories';
import HeroCategories from './HeroCategories';


const Hero = () => {
    return (
        <div className='px-4'>
            {/* flex flex-col lg:flex-row gap-5 p-5 md:px-[130px] bg-blue-100 */}
            <div className='grid md:grid-cols-7 gap-4 bg-white border border-[#e6ecf2] p-5'>
                <div className='col-span-2'>
                    <HeroCategories />
                </div>
                {/* h-[200px] md:h-[373px] w-full lg:w-[684px] md:col-span-3 */}
                <div className='col-span-4'>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        modules={[Autoplay, Navigation, Pagination]}
                        navigation
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        className='h-full'
                    >
                        {heroSlides && heroSlides.map((slide, index) => (
                            <SwiperSlide
                                key={index}
                                className='h-full'
                            >
                                <div
                                    className='bg-contain h-full flex flex-col justify-center items-center'
                                    style={{ background:  index === 2 ?  `linear-gradient(${slide.gradient}), url(${slide.img})` : `url(${slide.img})`}}>
                                    {index === 2 &&
                                        <>
                                            <span className='uppercase text-white text-center md:text-[30px] md:font-[600] md:p-[4rem]'>{slide.text}</span>
                                            <button className='bg-[#9d5bc5] text-white border-none rounded-[6px] px-[10px] p-[10px]'>{slide.button}</button>
                                        </>
                                     }
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div>
                    You may like
                </div>
                {/* <div className='flex flex-col gap-[10px]'>
                    <div className='bg-[#9d5bc5] md:h-[145px] p-[20px]'>
                        <div className="flex justify-evenly items-center mb-[1rem]">
                            <img src={avatar} alt='' />
                            <span className='text-[#ffffff] font-[600]'>Become a Distributor</span>
                        </div>

                        <div className='flex flex-col gap-[10px]'>
                            <button className='bg-[#51b7d5] text-white border-none rounded-[6px] p-[10px]'>
                                <a href='https://www.yupiaffiliate.com' className='text-white no-underline'>Join now</a>
                            </button>

                            <button className='bg-[#ffffff] border-none rounded-[6px] px-[10px] p-[10px]'>
                                <a href='https://www.yupiaffiliate.com/Default.aspx' className='text-black no-underline'>Login</a>
                            </button>
                        </div>
                    </div>
                    <div className='bg-[#51b7d5] md:h-[139px] flex flex-col gap-5 p-[20px] justify-center items-center'>
                        <span className='text-center text-white text-[18px]'>Earn bonus when you make purchase as a distributor</span>
                        <button className='bg-[#9d5bc5] border-none rounded-[6px] px-[10px] p-[10px] text-white'><a href={complan} className="no-underline text-white" download>Learn more</a></button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Hero