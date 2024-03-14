import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { fetchAllCart } from '../Redux/CartSlice';
import Skeleton from '@mui/material/Skeleton';
import Checkbox from '@mui/material/Checkbox';

const Cart = () => {
    const [carts, setCarts] = useState()
    const [checkOut, setCheckOut] = useState([]);
    const [total, setTotal] = useState({totalPrice : 0, totalQuantity : 0});
    const dispatch = useDispatch()
    const statusCart = useSelector(state => state.cart.cartStatus)

    const fetchData = async () => {
        const response = await dispatch(fetchAllCart())
        // console.log(response.payload)
        setCarts(response.payload)
    }

    const handleItemCheck = (target, cartId, product) => {
        let newCheckOut
        if(target === true){
            let data
            if(product.length > 1){
                data = product.map((prod) => {
                    prod.productCheck = true
                    return {
                        cartId,
                        'product' : prod
                    }
                }) 
                newCheckOut = [...checkOut, ...data]
            }
            else{
                product.productCheck = true
                data = {
                    cartId,
                    product
                }
                newCheckOut = [...checkOut, data]
            }
            setCheckOut(newCheckOut)
        }
        else if(target === false){
            if(product.length > 1){
                product.map((p) => {
                    p.productCheck = false
                })
                newCheckOut = []
            }
            else{
                product.productCheck = false
                newCheckOut = checkOut.filter((x) => !(x.cartId === cartId && x.product.productId === product.productId))
            }

            setCheckOut(newCheckOut)
        }

        const oldCarts = [...carts]
        const targetIndex = oldCarts.findIndex((x) => x.id === cartId)
        const areAllProductsChecked = oldCarts[targetIndex].products.every(product => product.productCheck)
        if(areAllProductsChecked === true){
            console.log('true')
            oldCarts[targetIndex].checked = true
        }
        else{
            oldCarts[targetIndex].checked= false
        }
        setCarts(oldCarts)

        const totalPrice = newCheckOut.reduce((acc, item) => {
            return acc + (item.product.quantity * item.product.data.price);
        }, 0);
        const totalQuantity = newCheckOut.reduce((acc, item) => {
            return acc + item.product.quantity;
        }, 0);
        setTotal({totalPrice, totalQuantity})
    }
     
    const handleCartCheck = (target, cartId) => {
        const oldCarts = [...carts]
        const targetIndex = oldCarts.findIndex((x) => x.id === cartId)
        if(target === true){
            oldCarts[targetIndex].checked = true
            handleItemCheck(true, cartId, oldCarts[targetIndex].products)
            setCarts(oldCarts)
        }
        else if(target === false){
            oldCarts[targetIndex].checked = false
            handleItemCheck(false, cartId, oldCarts[targetIndex].products)
            setCarts(oldCarts)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="flex flex-col py-6 px-16 bg-gray-200/60 min-h-screen">
            <p className='font-bold text-2xl mb-6'>Keranjang</p>
            <div className="flex gap-x-5">
                <div className='flex flex-col w-2/3 gap-y-2 [&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl'>
                    {carts ? carts.map((cart) => (
                        <>
                            <div className='bg-white p-4 flex gap-x-3 items-center'>
                                <Checkbox color="success" checked={cart.checked} onChange={(e) => handleCartCheck(e.target.checked, cart.id)} />
                                <p className=''>Cart ID : {cart.id}</p>
                            </div>
                            <div className='flex flex-col grow p-1 pr-0 bg-white [&>*:last-child]:border-b-0'>
                                {/* <p>Date : {cart.date}</p> */}
                                {cart.products.map((product) => (
                                    <div className='flex p-3 gap-x-3 border-b'>
                                        <Checkbox color="success" checked={product.productCheck} onChange={(e) => handleItemCheck(e.target.checked, cart.id, product)} name={`chk-${cart.id}`}/>
                                        <img src={product.data.image} className='max-h-[80px]'/>
                                        <div className="flex flex-col w-full">
                                            <div className='flex justify-between items-center'>
                                                <p className=''>{product.data.title}</p>
                                                <p className='text-lg font-bold'>${product.data.price}</p>
                                            </div>
                                            <div className="flex justify-end grow">
                                                <div className="flex items-center border border-green-500 bg-green-500 size-fit rounded self-end">
                                                    <button className=' px-2 text-white font-bold'>-</button>
                                                    <p className='bg-white px-4'>{product.quantity}</p>
                                                    <button className=' px-2 text-white font-bold'>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )): 
                        <div className="flex rounded-xl p-3 gap-x-3 bg-white">
                            <Skeleton variant="rounded" width={120} height={120} animation="wave"/>
                            <div className='flex flex-col grow'>
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                            </div>
                        </div>
                    }
                </div>

                {carts ?
                    <div className='grow rounded-lg bg-white p-6 h-fit flex flex-col gap-y-3 sticky top-5'>
                        <p className='font-bold text-lg'>Ringkasan Belanja</p>
                        <p className='flex justify-between'>
                            Total
                            <p className='font-bold text-lg'>${total.totalPrice}</p>
                        </p>
                        <button className='bg-green-600 text-white py-2 rounded-lg font-bold'>Beli {total.totalQuantity > 0 && `(${total.totalQuantity})`}</button>
                    </div> 
                :
                    <div className='grow rounded-lg bg-white p-6 h-fit flex flex-col gap-y-3'>
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" variant="rounded" height={35} />
                    </div> 
                
                }
            </div>
        </div>
    )
}
 
export default Cart;