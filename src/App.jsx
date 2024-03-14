import { useState } from 'react'
import Navbar from './Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Cart from './Cart/Cart'
import DetailProduct from './DetailProduct/DetailProduct'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className='grow'>
        <Routes>

          <Route path='/'>
            <Route index element={<Home></Home>} />
            <Route path='cart' element={<Cart/>}></Route>
            <Route path='product'>
              <Route path=':id' element={<DetailProduct/>}/>
            </Route>
          </Route>

        </Routes>      
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
