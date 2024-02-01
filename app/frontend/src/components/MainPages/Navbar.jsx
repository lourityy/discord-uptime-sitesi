const Navbar = () => {
    return (
        <div>
            <div className="flex">
                <span className=" top-20 left-20 right-20 shadow-[0_0_1000px_50px_#4f47e4]"></span>
                <div className="container mx-auto py-4">
                    <div className="flex justify-around items-center">
                        <div>
                            <a href="#" className="font-bold text-2xl">UpDash</a>
                        </div>

                        <a href="https://discord.com/api/oauth2/authorize?client_id=1199712383518642323&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcallback&scope=identify"
                            className="bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 duration-300 rounded-md py-2 px-4 font-semibold">Giriş
                            yap</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar