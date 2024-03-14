import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Link } from 'react-router-dom';

const ProductCart = ({product}) => {
    return (
        <Link to={`/product/${product.id}`}>
            <div className="flex flex-col p-3 shadow-lg h-full gap-y-2">
                <div className="grow flex items-center justify-center h-[180px] p-2">
                    <img src={product.image} alt="" srcset="" className='max-h-[180px]'/>
                </div>
                <div className='flex flex-col'>
                    <p className="text-sm truncate font-medium">{product.title}</p>
                    <p className="text-sm font-bold">${product.price}</p>
                    <div className='flex items-center gap-x-2 text-sm'>
                        <div className='flex items-center'><StarRoundedIcon fontSize='small' className='text-yellow-500'/> {product.rating.rate}</div> 
                        <span className='border-l pl-1 '>Terjual {product.rating.count}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
 
export default ProductCart;