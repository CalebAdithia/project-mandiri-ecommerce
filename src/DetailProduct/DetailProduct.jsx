import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { fetchSingleProducts } from "../Redux/ProductSlice";
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const DetailProduct = () => {
    const {id} = useParams()
    const [product, setProduct] = useState();
    const dispatch = useDispatch()

    const fetchData = async () => {
        const response = await dispatch(fetchSingleProducts(Number(id)))
        setProduct(response.payload.data)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
        {product ? 
            <div className="flex py-4 px-16 min-h-screenw gap-x-12">
                <div className="flex items-center justify-center size-96 p-2 border">
                    <img src={product.image} alt="" srcset="" className=''/>
                </div>
                <div className='flex flex-col'>
                    <p className="text-xl truncate font-bold">{product.title}</p>
                    <div className='flex items-center gap-x-2 '>
                        <p className=''>Terjual <span className="text-gray-500">{product.rating.count}</span></p>
                        <div className="size-1 rounded-full bg-gray-500"></div>
                        <p className='flex items-center gap-x-1'>
                            <StarRoundedIcon fontSize='small' className='text-yellow-500'/> {product.rating.rate} 
                            <span className="text-gray-500"> ({product.rating.count} rating)</span>
                        </p> 
                    </div>
                    <p className="text-2xl font-bold">${product.price}</p>
                </div>
            </div>
        :
        <div>loading</div>
        }

        </>
    );
}
 
export default DetailProduct;