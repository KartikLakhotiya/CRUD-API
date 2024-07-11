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
                const response = await fetch(`https://crud-api-production-05cf.up.railway.app/api/auth/fetch/${id}`);
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

    const checkUsernameExists = async (username) => {
        const response = await fetch('https://crud-api-production-05cf.up.railway.app/api/auth/fetchall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const allUsers = await response.json();
        return allUsers.some(user => user.username === username);
    };

    const checkEmailExists = async (email) => {
        const response = await fetch('https://crud-api-production-05cf.up.railway.app/api/auth/fetchall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const allUsers = await response.json();
        return allUsers.some(user => user.email === email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.loading('Updating User', { id: 'user-update-toast' });
        const { firstname, lastname, username, email, age, city } = userData
        // validations
        if (userData.firstname === "") return toast.error("Firstname Cannot be Empty.", { id: 'user-update-toast' });
        if (userData.lastname === "") return toast.error("Lastname Cannot be Empty.", { id: 'user-update-toast' });
        if (userData.username === "") return toast.error("Username Cannot be Empty.", { id: 'user-update-toast' });
        if (userData.email === "") return toast.error("Email Cannot be Empty.", { id: 'user-update-toast' });
        if (userData.age === "") return toast.error("Age Cannot be Empty.", { id: 'user-update-toast' });
        if (userData.city === "") return toast.error("City Cannot be Empty.", { id: 'user-update-toast' });


        // Checking if username already exists in the database.
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            return toast.error('Username Already Exists.', { id: 'user-update-toast' });
        }

        // Checking email already exists.
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return toast.error('Email Already Exists.', { id: 'user-update-toast' });
        }

        try {
            const response = await fetch(`https://crud-api-production-05cf.up.railway.app/api/auth/edit/editeduser/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            toast.success('User Updated', { id: 'user-update-toast' });
            navigate('/allusers');
        } catch (error) {
            toast.error('Failed to update user');
            console.error('Update user error:', error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold mt-10'>Update User</h1>
            <div class="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-12 py-12 mt-11">
                <div class="grid md:grid-cols-2 md:gap-6 mb-2">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="firstname" id="firstname" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} value={userData.firstname} />
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="lastname" id="lastname" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} value={userData.lastname} />
                        <label for="lastname" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input type="email" name="username" id="username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} value={userData.username} />
                    <label for="username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} value={userData.email} />
                    <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="age" id="age" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} value={userData.age} />
                        <label for="age" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="city" id="city" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} value={userData.city} />
                        <label for="city" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                    </div>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-28 mt-5" onClick={handleSubmit} >Submit</button>
            </div>
            {/* <button onClick={click}>Click Fn</button> */}
        </div>
    );
};

export default EditUser;
