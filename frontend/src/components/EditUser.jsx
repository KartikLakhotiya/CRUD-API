import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        age: '',
        city: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://crud-api-oxuk.onrender.com/api/auth/fetch/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const user = await response.json();
                setUserData(user);
            } catch (error) {
                console.error('Fetch user error:', error);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://crud-api-oxuk.onrender.com/api/auth/edit/editeduser/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            toast.success('User updated successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to update user');
            console.error('Update user error:', error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center bg-[#1F2937] px-5 py-5 w-[50%] m-auto rounded-lg mt-4 shadow'>
            <h1 className='text-4xl font-bold mt-3 text-white'>Edit User</h1>
            <form onSubmit={handleSubmit} className='w-full max-w-lg'>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='firstname'>
                        First Name
                    </label>
                    <input
                        type='text'
                        name='firstname'
                        id='firstname'
                        value={userData.firstname}
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='lastname'>
                        Last Name
                    </label>
                    <input
                        type='text'
                        name='lastname'
                        id='lastname'
                        value={userData.lastname}
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='username'>
                        Username
                    </label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        value={userData.username}
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={userData.email}
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='age'>
                        Age
                    </label>
                    <input
                        type='number'
                        name='age'
                        id='age'
                        value={userData.age}
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='city'>
                        City
                    </label>
                    <input
                        type='text'
                        name='city'
                        id='city'
                        value={userData.city}
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-auto mt-5'
                    >
                        Update User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
