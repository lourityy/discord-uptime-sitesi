import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../../config.json'

const Account = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${config.api_url}/get_user`, {
          type: "discord",
          token: localStorage.getItem("token"),
        });

        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
{/* Lourity - discord.gg/altyapilar */}
    fetchData();
  }, []);

  return (
    <div>
      <div className='flex gap-4 items-center ml-0 sm:ml-4'>
        {userData ? <img className="h-10 w-10 rounded-full" src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`} alt="avatar" /> : <i class="animate-pulse bi bi-person-circle text-4xl text-gray-400"></i>}
        <div>
          {userData ? <span className='text-gray-300 font-semibold bg-gray-800 py-1 px-4 rounded-lg'>{userData.global_name}</span> : <span className='animate-pulse bg-gray-800 py-1 px-4 rounded-lg'><span className='invisible'>lourityy</span></span>}
        </div>
      </div>
    </div>
  )
}

export default Account
