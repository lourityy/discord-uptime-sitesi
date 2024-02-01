import { callback_url } from '../../../config.json';

const Header = () => {
    return (
        <div>
            <div className="p-20">
                <div className="flex justify-center">
                    <h1 className="text-5xl sm:text-6xl text-center nunito-font"><span className="glitch-style">Proje </span>
                        linklerinizi<br /><span className="text-5xl sm:text-7xl">7/24 aktif tutun!</span></h1>
                </div>
                <div className="flex justify-center mt-8">
                    <a href={callback_url}
                        className="duration-300 bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 rounded-md py-2 px-8 font-semibold">Giriş
                        yap</a>
                </div>

                <div className="gap-4 mt-60 justify-center grid grid-cols-1 sm:grid-cols-3">
                    <div className="shadow-lg p-8 rounded-lg text-center">
                        <i className="bi bi-speedometer text-4xl text-indigo-500"></i>
                        <p className="text-gray-400 text-md mt-2">Glitch linklerinizi kısa aralıklarla ziyaret<br />ederek sürekli
                            aktif
                            tutarız.</p>
                    </div>

                    <div className="shadow-lg p-8 rounded-lg text-center">
                        <i className="bi bi-archive-fill text-4xl text-indigo-500"></i>
                        <p className="text-gray-400 text-md mt-2">Linklerinizi güvenli bir depolama<br />alanı olan MongoDB
                            üzerinde
                            depoluyoruz.</p>
                    </div>

                    <div className="shadow-lg p-8 rounded-lg text-center">
                        <i className="bi bi-emoji-smile-fill text-4xl text-indigo-500"></i>
                        <p className="text-gray-400 text-md mt-2">Kullanıcı dostu panelimiz ile<br />sizlere harika bir deneyim
                            sunuyoruz.</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-12 text-xl sm:text-lg nunito-font">
                <span>Developed by Lourity</span>
            </div>
            <div className="flex justify-end">
                <span className="top-20 left-20 right-20 shadow-[0_0_1000px_35px_#4f47e4]"></span>
            </div>
        </div>
    )
}

export default Header
