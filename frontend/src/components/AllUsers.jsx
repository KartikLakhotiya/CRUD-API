import React, { useState } from 'react'

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([]);

    // use http://localhost:8080 for local deployment
    const fetchAll = async () => {
        const response = await fetch('https://crud-api-s3e6.onrender.com/api/auth/fetchall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const fetchedAllUsers = response.json();
        fetchedAllUsers.then((obj) => {
            setAllUsers(obj)
            console.log(obj)
            console.log('All Users', allUsers)
        })

    }


    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold mt-9'>All Users</h1>
            <button type="submit" class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32" onClick={fetchAll} >Fetch All Users</button>


            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[900px] flex justify-center mx-auto mt-11">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Age
                            </th>
                            <th scope="col" class="px-6 py-3">
                                City
                            </th>


                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((item, index) => {
                                const { firstname, lastname, username, age, email, city } = item;
                                return (
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {firstname}
                                        </th>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {lastname}
                                        </th>
                                        <td class="px-6 py-4">
                                            {username}
                                        </td>
                                        <td class="px-6 py-4">
                                            {email}
                                        </td>
                                        <td class="px-6 py-4">
                                            {age}
                                        </td>
                                        <td class="px-6 py-4">
                                            {city}
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AllUsers