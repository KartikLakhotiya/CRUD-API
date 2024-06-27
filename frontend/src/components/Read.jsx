import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { terminal } from 'virtual:terminal'
// import { Link } from 'react-router-dom';

const Read = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'username') setUsername(value)
        if (id === 'password') setPassword(value)
    }

    const checkUsernameExists = async (username) => {
        const response = await fetch('https://crud-api-oxuk.onrender.com/api/auth/fetchall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const allUsers = await response.json();
        return allUsers.some(user => user.username === username);
    };

    const fetchUser = async (event) => {
        event.preventDefault();
        toast.loading('Fetching User', { id: 'user-fetch-toast' });


        // vallidations
        if (username === "") return toast.error("Username Cannot be Empty.", { id: 'user-fetch-toast' })
        if (password === "") return toast.error("Password Cannot be Empty.", { id: 'user-fetch-toast' })

        // username
        const usernameExists = await checkUsernameExists(username)
        if (usernameExists) { }
        else return toast.error('Invalid Username.', { id: 'user-fetch-toast' })



        const data = {
            'username': username,
            'password': password
        }


        // use http://localhost:8080 for local deployment
        const response = await fetch('https://crud-api-oxuk.onrender.com/api/auth/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (response.ok) toast.success('User Found', { id: 'user-fetch-toast' });
        else toast.error('Invalid Credentials.', { id: 'user-fetch-toast' })

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
            <h1 className='flex items-center justify-center mt-9 font-bold text-4xl'>Fetch User</h1>
            <div className='flex flex-row mt-11 items-center justify-center'>

                <div class="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="email" name="username" id="username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} />
                        <label for="username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="password" name="password" id="password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} />
                        <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>

                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32" onClick={fetchUser} >Submit</button>
                </div>

                {user && (
                    <div className="user-details-container cursor-pointer ">
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

            {/* <Link><button type="submit" class="text-white flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32 m-auto mt-11" >Back To Home</button></Link> */}
        </div>
    )
}

export default Read