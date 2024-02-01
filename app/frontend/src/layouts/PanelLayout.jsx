import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Proptypes from "prop-types"

const PanelLayout = ({ children }) => {
    const currentURL = window.location.pathname;
    const navigate = useNavigate();
    const [mobileMenu, setMobileMenu] = useState(false);

    const mobileMenuToggle = () => {
        if (mobileMenu === false) {
            setMobileMenu(true);
        } else {
            setMobileMenu(false);
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href = '/';
    };

    if (localStorage.getItem("token")) {
        return (
            <div>
                <div className='flex flex-col p-8'>
                    <div className='flex justify-between'>
                        <span className="font-bold text-2xl">U/D</span>
                        <div className='hidden sm:block'>
                            <span className='rounded-xl shadow-md font-semibold py-2 px-12 bg-gray-800'>{currentURL === '/panel' ? 'Uptime Panel' : currentURL === '/panel/actions' ? 'İşlemler' : currentURL === '/links' ? 'Linkler' : 'Panel'}</span>
                        </div>
                        <div className='flex gap-3'>
                            <a href='https://discord.gg/altyapilar' target='_blank' className="duration-300 bi bi-discord text-xl rounded-lg bg-gray-800 py-1 px-2 hover:bg-blue-600"></a>
                            <i onClick={logOut} className={`cursor-pointer duration-300 text-xl rounded-lg bg-gray-800 py-1 px-2 bi-box-arrow-right hover:bg-red-500`}></i>
                            <i onClick={mobileMenuToggle} className={`duration-300 block sm:hidden cursor-pointer text-xl rounded-lg bg-gray-800 py-1 px-2 ${mobileMenu ? 'bi bi-x-lg' : 'bi bi-list-nested'} hover:bg-gray-700`}></i>
                        </div>
                    </div>

                    {mobileMenu === true && (
                        <div className='flex justify-end'>
                            <div className='flex flex-row bg-gray-800 py-1 px-2 mt-3 rounded-l-lg rounded-b-lg gap-3 justify-center'>
                                <div>
                                    <i onClick={() => navigate('/panel')} className={`cursor-pointer duration-300 text-xl rounded-lg py-1 px-2 ${currentURL === '/panel' ? 'bi bi-house-door-fill bg-indigo-600 box-sh' : 'bi bi-house-door text-gray-500 hover:text-gray-300'}`}></i>
                                </div>
                                <div>
                                    <i onClick={() => navigate('/panel/actions')} className={`cursor-pointer duration-300 text-xl rounded-lg py-1 px-2 ${currentURL === '/panel/actions' ? 'bi bi-kanban-fill bg-indigo-600 box-sh' : 'bi-kanban text-gray-500 hover:text-gray-300'}`}></i>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='sm:flex sm:gap-6'>
                        <div className='mt-56 hidden sm:block'>
                            <div className='sm:flex flex-col sm:gap-6'>
                                <div>
                                    <i onClick={() => navigate('/panel')} className={`cursor-pointer duration-300 text-xl rounded-lg py-1 px-2 ${currentURL === '/panel' ? 'bi bi-house-door-fill bg-indigo-600 box-sh' : 'bi bi-house-door text-gray-500 hover:text-gray-300'}`}></i>
                                </div>
                                <div>
                                    <i onClick={() => navigate('/panel/actions')} className={`cursor-pointer duration-300 text-xl rounded-lg py-1 px-2 ${currentURL === '/panel/actions' ? 'bi bi-kanban-fill bg-indigo-600 box-sh' : 'bi-kanban text-gray-500 hover:text-gray-300'}`}></i>
                                </div>
                            </div>
                        </div>
                        <div className='mt-12'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        window.location.href = "/";
    }
}

export default PanelLayout

PanelLayout.propTypes = {
    children: Proptypes.node
}