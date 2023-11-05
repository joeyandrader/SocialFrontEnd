import './App.css'
import { Link, Outlet } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import MyToast from './Components/Toastify/MyToast'
import Navbar from './Components/Navbar/Navbar';
import { AiOutlinePlus } from 'react-icons/ai'
import ModalPost from './Components/ModalPost/ModalPost';

function App() {

  return (
    <>
      <MyToast />
      <Link to=""
        className='
        bg-slate-900 fixed bottom-5 right-5 p-3 rounded-full text-slate-300
        hover:bg-slate-800 duration-300 transition-colors
        '>
        <AiOutlinePlus size={30} />
      </Link>
      <Navbar />
      <Outlet />

    </>
  )
}

export default App
