import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    // use http://localhost:8080 for local deployment
    const fetchAll = async () => {
        try {
            toast.loading('Retrieving Data', { id: 'fetch-toast' });
            const response = await fetch('http://localhost:8080/api/auth/fetchall', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const fetchedAllUsers = await response.json();
            setAllUsers(fetchedAllUsers);
            toast.success('Data Fetched', { id: 'fetch-toast' });
        } catch (error) {
            toast.error('Some Error Occurred', { id: 'fetch-toast' });
            console.error('Fetch error:', error);
        }
    };

    const deleteUser = async (id) => {
        try {

            const response = await fetch(`http://localhost:8080/api/auth/delete/${id}`, {
                method: 'DELETE',
            })
            const a = response.json();
            console.log(a)
            if (!response.ok) return toast.error('Some Error Occured')

            toast.success("User deleted.")
            fetchAll();

        } catch (error) {
            console.log(error)
            toast.error('Failed to delete user.')
        }
    }

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold mt-9'>All Users</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[1000px] flex justify-center mx-auto mt-11 mb-11">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">First Name</th>
                            <th scope="col" className="px-6 py-3">Last Name</th>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Email ID</th>
                            <th scope="col" className="px-6 py-3">Age</th>
                            <th scope="col" className="px-6 py-3">City</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Delete</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((item, index) => {
                            const { firstname, lastname, username, age, email, city } = item;
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-900">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {firstname}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {lastname}
                                    </th>
                                    <td className="px-6 py-4">{username}</td>
                                    <td className="px-6 py-4">{email}</td>
                                    <td className="px-6 py-4">{age}</td>
                                    <td className="px-6 py-4">{city}</td>
                                    <td className="px-6 py-4 text-right">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer" onClick={deleteUser} >Delete</a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
