import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { message } from "antd";
import config from "../../../../config.json";

const Actions = () => {
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
            const response = await axios.post(`${config.api_url}/uptime_all`, { userId });

            setDataSource(response.data.data);
        } catch (error) {
            console.log("Veri hatası:", error);
        }
    }, [userId]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const linkDelete = async (link) => {
        try {
            await axios.post(`${config.api_url}/uptime_delete`, { userId, link });
            fetchLinks();
        } catch (error) {
            console.error('Error delete link', error);
        }
    };
{/* Lourity - discord.gg/altyapilar */}
    return (
        <div className="flex flex-col md:flex-col lg:flex-row">
            <form onSubmit={onSubmit} className='sm:p-5 flex flex-col justify-start w-full sm:w-96 2xl:ml-96'>
                <div className='sm:mt-4 flex flex-col'>
                    <label className='text-gray-400 font-semibold' htmlFor='uptimeName'>Uptime adı:</label>
                    <input
                        id='uptime_name'
                        name="uptime_name"
                        type='text'
                        onChange={handleInputChange}
                        placeholder='Link adı'
                        required
                        className='duration-300 shadow-md rounded-md bg-gray-800 text-white px-2 h-8 w-full outline-none focus:ring-2 ring-indigo-600 mb-4 sm:mb-0'
                    />
                </div>
                <div className='sm:mt-4 flex flex-col'>
                    <label className='text-gray-400 font-semibold' htmlFor='uptimeLink'>Uptime linki:</label>
                    <input
                        id='uptime_link'
                        name="uptime_link"
                        type='text'
                        onChange={handleInputChange}
                        required
                        placeholder='https://ravendev.xyz/'
                        className='duration-300 shadow-md rounded-md bg-gray-800 text-white px-2 h-8 w-full outline-none focus:ring-2 ring-indigo-600 mb-4 sm:mb-0'
                    />
                </div>
                <div className='sm:mt-4'>
                    <button
                        type='submit'
                        className='btn border-none btn-sm w-full sm:w-0 sm:px-12 bg-indigo-600 hover:bg-indigo-700 text-white active:ring-1 ring-indigo-700'
                    >
                        Ekle
                    </button>
                </div>
            </form>
            <div className="overflow-x-auto mt-12 bg-indigo-600 ring-indigo-600 ring-2 rounded-md">
                <table className="w-full bg-indigo-600 table-auto">
                    <thead>
                        <tr>
                            <th className="py-2 p-1 text-sm sm:text-md">İsim</th>
                            <th className="py-2 p-1 text-sm sm:text-md px-4">Link</th>
                            <th className="py-2 p-1 text-sm sm:text-md px-2">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource && dataSource.length !== 0 ? (
                            dataSource.map((project, index) => (
                                <tr className="hover" key={index}>
                                    <td className="py-2 text-sm sm:text-md p-1">{project.project_name}</td>
                                    <td className="py-2 text-sm sm:text-md p-1 px-4">{project.uptime_link}</td>
                                    <td className="py-2 text-sm sm:text-md px-4">
                                        <span onClick={() => linkDelete(project.uptime_link)} className="cursor-pointer border-none hover:underline text-red-400">
                                            Sil
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : ''}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Actions;
