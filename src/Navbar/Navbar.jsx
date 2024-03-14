import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import {useDispatch, useSelector} from 'react-redux'
import { fetchAllCart } from "../Redux/CartSlice";
import { useState, useEffect } from 'react';


const Navbar = () => {
    const [cartQuantity, setCartQuantity] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchData = async () => {
        const response = await dispatch(fetchAllCart())
        const totalQuantity = response.payload.reduce((cartsAccumulator, cart) => {
            const cartQuantity = cart.products.reduce((cartAccumulator, product) => {
              return cartAccumulator + product.quantity;
            }, 0);
            return cartsAccumulator + cartQuantity;
          }, 0);
        setCartQuantity(totalQuantity)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="border border-b-1 p-4 flex items-center gap-x-6">
             <Link className="font-bold text-green-500 text-2xl" to={'/'}>TOKOPEDOT</Link>
             {/* <NavLink to={'/home'}>Home</NavLink>
             <NavLink to={'/product'}>Product</NavLink>
             <NavLink to={'/cart'}>Cart</NavLink> */}
             <p>Kategori</p>
             <div className="grow">
                <SearchBar></SearchBar>
             </div>
             <div className="flex gap-x-6 h-fit items-center">
                <button onClick={() => {navigate('/cart')}}>
                    <Badge badgeContent={cartQuantity} color="success">
                        <ShoppingCartOutlinedIcon className=""></ShoppingCartOutlinedIcon>
                    </Badge>
                </button>
                <Divider orientation="vertical" flexItem />
                <div className="flex gap-x-3">
                    <button className="px-3 py-1 border border-green-500 rounded-lg font-bold text-green-500 text-sm">Masuk</button>
                    <button className="px-3 py-1 border border-green-500 rounded-lg bg-green-500 text-white font-bold text-sm">Daftar</button>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;