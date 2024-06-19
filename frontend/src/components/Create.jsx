import React, { useState } from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import toast from 'react-hot-toast';

const Create = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(0);
    const [city, setCity] = useState("");

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'firstname') setFirstname(value)
        if (id === 'lastname') setLastname(value)
        if (id === 'email') setEmail(value)
        if (id === 'username') setUsername(value)
        if (id === 'password') setPassword(value)
        if (id === 'age') setAge(value)
        if (id === 'city') setCity(value)





    }

    const submit = async (event) => {
        event.preventDefault();


        // validations
        if (firstname === "") return toast.error("Firstname Cannot be Empty.")
        if (lastname === "") return toast.error("Lastname Cannot be Empty.")
        if (username === "") return toast.error("Username Cannot be Empty.")
        if (email === "") return toast.error("Email Cannot be Empty.")
        if (password === "") return toast.error("Password Cannot be Empty.")
        if (age === "") return toast.error("Age Cannot be Empty.")
        if (city === "") return toast.error("City Cannot be Empty.")

        console.log(firstname, lastname, username, age, city)
        const data = {
            'firstname': firstname,
            'lastname': lastname,
            'username': username,
            'email': email,
            'password': password,
            'age': age,
            'city': city
        }

        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        console.log(response)

        if (response.ok) toast.success("Form Submitted.")
        else toast.error("Form Not Submitted.")
    }



    return (
        <div className='flex flex-col items-center justify-center mt-14'>
            <h1 className='text-4xl mb-4 font-bold text-black'>Registration Form</h1>
            <div class="w-96 space-y-3">
                <input type="text" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none mt-4" placeholder="Enter Your Firstname" name='firstname' id='firstname' onChange={handleInputChange} />
            </div>

            <div class="w-96 space-y-3">
                <input type="text" class="py-3 mt-4 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter Your Lastname" name='lastname' id='lastname' onChange={handleInputChange} />
            </div>

            <div class="w-96 space-y-3">
                <input type="text" class="py-3 px-4 mt-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter Your Username" name='username' id='username' onChange={handleInputChange} />
            </div>

            <div class="w-96 space-y-3">
                <input type="text" class="py-3 px-4 mt-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter Your Email" name='email' id='email' onChange={handleInputChange} />
            </div>

            <div class="w-96 space-y-3">
                <input type="password" class="py-3 px-4 mt-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter Your Password" name='password' id='password' onChange={handleInputChange} />
            </div>

            <div class="w-96 space-y-3">
                <input type="number" class="py-3 px-4 block mt-4 w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter Your Age" name='age' id='age' onChange={handleInputChange} />
            </div>

            <div class="w-96 space-y-3">
                <input type="text" class="py-3 px-4 mt-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter Your City" name='city' id='city' onChange={handleInputChange} />
            </div>


            {/* Button */}
            <input type="submit" name="" id="" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none mt-10 w-60" onClick={submit} />
        </div>
    )
}

export default Create