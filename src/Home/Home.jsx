import {useDispatch, useSelector} from 'react-redux'
import {fetchAllCategory} from '../Redux/CategorySlice'
import {fetchProducts} from '../Redux/ProductSlice'
import { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import ProductCart from './ProductCard';

const Home = () => {
    const dispatch = useDispatch()
    const [category, setCategory] = useState();
    const [products, setProducts] = useState();
    const fetchData = async () => {
        const response = await dispatch(fetchAllCategory())
        setCategory(response.payload)
        const response2 = await dispatch(fetchProducts())
        setProducts(response2.payload)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="min-h-screen py-4 px-16 flex flex-col gap-y-6">
            <div className="w-full h-[250px] border rounded-xl border-green-500 font-bold flex items-center justify-center text-xl bg-green-700">Banner</div>

            <div className="flex flex-col gap-y-3 w-full rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4">
                <p className="font-bold text-xl">Kategori Pilihan</p>
                <div className="flex gap-x-3">
                    {category ? category.map((cate, id) => (
                        <div className='border text-lg py-8 px-4 rounded-lg' key={id}>
                            {cate}
                        </div>
                    )):
                        <>
                            <Skeleton variant="rounded" width={120} height={100} animation="wave"/>
                            <Skeleton variant="rounded" width={120} height={100} animation="wave"/>
                            <Skeleton variant="rounded" width={120} height={100} animation="wave"/>
                        </>
                    }
                </div>
            </div>

            <div className='grid grid-cols-6 gap-4'>
                {products ? products.map((product) => (
                    <ProductCart product={product} key={product.id}></ProductCart>
                )):
                    <>
                        <Skeleton variant="rounded" height={200} animation="wave" className='w-full'/>
                        <Skeleton variant="rounded" height={200} animation="wave" className='w-full'/>
                        <Skeleton variant="rounded" height={200} animation="wave" className='w-full'/>
                        <Skeleton variant="rounded" height={200} animation="wave" className='w-full'/>
                        <Skeleton variant="rounded" height={200} animation="wave" className='w-full'/>
                        <Skeleton variant="rounded" height={200} animation="wave" className='w-full'/>

                    </>
                }
            </div>
        </div>
    );
}
 
export default Home;