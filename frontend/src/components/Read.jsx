import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { terminal } from 'virtual:terminal'


const Read = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'username') setUsername(value)
        if (id === 'password') setPassword(value)
    }
    const fetchUser = async (event) => {
        event.preventDefault();

        const data = {
            'username': username,
            'password': password
        }

        const response = await fetch('http://localhost:8080/api/auth/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const fetchedUser = response.json();
        fetchedUser.then((obj) => {
            // console.log(obj)
            setUser(obj)
            console.log(user)
            terminal.log(`User Fetched ${user.email}`)

        })
    }

    return (
        <div>
            <h1 className='flex items-center justify-center mt-9 font-bold text-4xl'>Enter Username and Password To Fetch User</h1>
            <div className='flex flex-row mt-11 items-center justify-center'>

                <div class="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="mb-5">
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='username' onChange={handleInputChange} />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='password' onChange={handleInputChange} />
                    </div>

                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32" onClick={fetchUser} >Submit</button>
                </div>

                {user && (
                    <div className="user-details-container ">
                        <div className="user-details bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 hover:scale-110 transition-scale-110 duration-300 ease-in-out ml-28 w-96">
                            <h2 className="text-2xl font-bold mb-11 text-gray-900 dark:text-white">User Details</h2>
                            <div className="mb-4 text-gray-700 dark:text-gray-300">
                                <strong>First Name:</strong> {user.firstname} <br />
                                <strong>Last Name:</strong> {user.lastname} <br />
                                <strong>Age:</strong> {user.age} <br />
                                <strong>City:</strong> {user.city} <br />

                                <strong>Email:</strong> {user.email} <br />
                            </div>
                        </div>
                    </div>
                )}



            </div>
        </div>
    )
}

export default Read