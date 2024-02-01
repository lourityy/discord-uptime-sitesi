import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import config from "../../../../config.json";
import { message } from "antd";

const Dashboard = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uptime_name: "",
    uptime_link: "",
  });
  const [dataSource, setDataSource] = useState([]);
  const userId = localStorage.getItem("userId");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = { ...formData, userId };

      const response = await axios.post(`${config.api_url}/uptime_set`, formDataToSend);

      if (response.data.message === 'project_limit') {
        return message.error(`${config.link_limit} linkten fazla link eklenemez`)
      }

      if (response.data.message === 'link_error') {
        return message.error(`Bu link zaten bulunuyor`)
      }

      if (!formData.uptime_link.startsWith("https://")) {
        return message.error("Linkiniz 'https://' ile başlamalıdır");
      }

      if (response.status === 200) {
        fetchLinks();
        message.success("Linkiniz eklendi");
      } else {
        message.error("Linkiniz eklenemedi");
      }
    } catch (error) {
      console.log("Uptime oluşturma hatası:", error);
    }
  };

  const fetchLinks = useCallback(async () => {
    try {
      const response = await axios.post(`${config.api_url}/uptime_all`, {
        userId: localStorage.getItem("userId")
      });

      setDataSource(response.data);
    } catch (error) {
      console.log("Veri hatası:", error);
    }
  }, [config.api_url]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <>
      <div className='sm:px-4 lg:px-28'>
        <div className='sm:py-10 sm:px-36 flex flex-col'>
          <div className="rounded-2xl bg-gradient-to-b sm:bg-gradient-to-r from-indigo-600 to-gray-800 py-10 px-4 sm:py-20 sm:px-36 flex flex-col">
            <div className='flex flex-col sm:flex-row items-center'>
              <div className='sm:w-full mb-8 sm:mb-0'>
                <h2 className='text-2xl sm:text-4xl nunito-font text-gray-100 mb-4 sm:mb-6'>Hemen projelerini aktif tut!</h2>
                <p className='inter-font text-gray-300 mb-4 sm:mb-6'>Güvenli depolama alanımıza sende linklerini<br />ücretsiz ekle, projelerini aktif tutmaya başla.</p>
                <div className='sm:inline sm:justify-start flex justify-center'>
                  <button onClick={() => navigate('/panel/actions')} className='btn border-none bg-gray-800 hover:bg-gray-900 active:ring-1 ring-gray-900'>Link Ekle</button>
                </div>
              </div>
              <div className='flex gap-4 sm:ml-6'>
                <div>
                  <img className='p-2 img-rotate' width={120} src="/angle.png" alt="angle" />
                </div>
                <div className='mt-2 sm:mt-8'>
                  <img src="/smile.png" width={120} alt="smile" />
                </div>
                <div>
                  <img className='p-2 img-rotate-two' width={120} src="/love.png" alt="love" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Lourity - discord.gg/altyapilar */}
      <div className='sm:px-4 lg:px-28 mt-12'>
        <span className=" top-20 left-20 right-20 shadow-[0_0_1000px_50px_#4f47e4]"></span>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-xl mb-4 sm:mb-0'>Hızlı link ekle</h2>
          <span onClick={() => navigate('/panel/actions')} className='cursor-pointer text-md hover:underline mb-4 sm:mb-0'>Sayfaya git <i className="bi bi-arrow-right-short"></i></span>
        </div>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col sm:flex-row mt-4 gap-0 sm:gap-4'>
            <input
              id='uptime_name'
              name="uptime_name"
              type="text"
              onChange={handleInputChange}
              required
              placeholder='Link adı' className='duration-300 shadow-md rounded-md bg-gray-800 text-white px-2 h-8 outline-none focus:ring-2 ring-indigo-600 mb-4 sm:mb-0 ml-0 sm:ml-4' />
            <input
              id='uptime_link'
              name="uptime_link"
              type='text'
              onChange={handleInputChange}
              required
              placeholder='https://ravendev.xyz/' className='duration-300 shadow-md rounded-md bg-gray-800 text-white px-2 lg:w-80 h-8 outline-none focus:ring-2 ring-indigo-600 mb-4 sm:mb-0 ml-0 sm:ml-4' />
            <button type='submit' className='border-none btn btn-sm w-full sm:w-0 sm:px-12 bg-indigo-600 hover:bg-indigo-700 active:ring-1 ring-indigo-700 text-white ml-0 sm:ml-2'>Ekle</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;