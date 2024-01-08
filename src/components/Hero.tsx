
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../utils/API.js';
// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ButtonComponent from './ButtonComponent.js';


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
        <section className='my-11 text-zinc-900 flex flex-col justify-center items-center h-[600px] bg-slate-50'>
            <h3 className='text-4xl font-bold mb-5 py-10'>Rediscover this stories this week </h3>
            <Swiper
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
            //swiper modules
            modules={[Pagination, Navigation]}
            spaceBetween={40}
            slidesPerView={3}
            navigation={true}
            pagination={{ clickable: true }}
            //onSlideChange={() => console.log('slide change')}
            //onSwiper={(swiper) => console.log(swiper)}
            className='max-w-[90%] h-[65%]'>
                {/* <!-- Slides --> */}
                    {random.length > 0 ?
                            random.map((manga) =>(
                            <SwiperSlide key={manga.id}>
                                <div className='group flex justify-center shadow-xl rounded items-center w-[400px] h-[450px] overflow-hidden  cursor-pointer'>
                                    <Link to={`/manga/${manga.id}`}>
                                    <img  src={`${manga.picture}`} className="swiper-slide relative object-cover rounded w-[400px] h-[450px] group-hover:opacity-70"/>
                                    </Link>

                                </div>
                            </SwiperSlide>
                        )) : <div>Loading ...</div>
                    }
            </Swiper>

        </section>
    )
}
