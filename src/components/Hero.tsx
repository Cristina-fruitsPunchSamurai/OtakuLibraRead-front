
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../utils/API.js';
// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



export default function HeroCarousel() {

    const [random, setRandom] = useState([]);

    const fetchRandomImages = async() => {
        const result = await axios.get(`${BASE_URL}/mangas/random`);
        setRandom(result.data)
    }

    useEffect(() => {
        fetchRandomImages();
    }, [])


    return (
        <section className='slider'>
            <div className='mt-20 mx-auto text-zinc-900 flex flex-col py-7 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
                <div className='w-full'>
                    {random && <Swiper
                    breakpoints={{
                    340: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    },
                    700: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    }}
                    loop={true}
                    initialSlide={1}
                    effect='coverflow'
                    coverflowEffect={{
                            rotate: 30,
                            stretch: 80,
                            depth: 200,
                            modifier: 1,
                            slideShadows: false,
                        }}
                    centeredSlides={true}
                    //swiper modules
                    modules={[Pagination, EffectCoverflow]}
                    spaceBetween={40}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    className='swiper-container'
                    >
                        {/* <!-- Slides --> */}
                            {random.length > 0 ?
                                    random.map((manga) =>(
                                    <SwiperSlide key={manga.id} className=''>
                                        <div className='bg-gray-900 w-[300px] h-[350px] overflow-hidden'>
                                            <Link to={`/manga/${manga.id}`}>
                                                <img  src={`${manga.picture}`} className="swiper-slide rounded w-[300px] h-[350px] transition-transform duration-300 transform hover:scale-105"/>
                                            </Link>
                                            </div>
                                    </SwiperSlide>
                                )) : <div>Loading ...</div>
                            }
                    </Swiper>}
                </div>
            </div>
        </section>
    )
}
