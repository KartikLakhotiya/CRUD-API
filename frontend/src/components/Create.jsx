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

    const checkEmailExists = async (email) => {
        const response = await fetch('https://crud-api-oxuk.onrender.com/api/auth/fetchall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const allUsers = await response.json();
        return allUsers.some(user => user.email === email);
    };



    const submit = async (event) => {
        event.preventDefault();
        toast.loading('Inserting Data', { id: 'insert-toast' });


        // Validations

        // All
        if (firstname === "") return toast.error("Firstname Cannot be Empty.");
        if (lastname === "") return toast.error("Lastname Cannot be Empty.");
        if (username === "") return toast.error("Username Cannot be Empty.");
        if (email === "") return toast.error("Email Cannot be Empty.");
        if (password === "") return toast.error("Password Cannot be Empty.");
        if (age === "") return toast.error("Age Cannot be Empty.");
        if (city === "") return toast.error("City Cannot be Empty.");

        //username
        /*
        const lower = /^[a-z]$/.test(username)
        console.log("username validation", lower)
        if (!lower) return toast.error("Username cannot contain upper case letters.")
        */

        //email
        var atIdx = email.indexOf("@")
        var dotIdx = email.indexOf(".")
        if (atIdx > 0 && dotIdx > atIdx + 1 && email.length > dotIdx) { }
        else {
            toast.error('Invalid Email Format.')
            return
        }

        //age
        const ageValidation = /[0-9]/.test(age)
        if (!ageValidation) return toast.error('Age must be a number.')



        // Checking if username already exists in the database.
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            return toast.error('Username Already Exists.');
        }

        // Checking email already exists.
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return toast.error('Email Already Exists.');
        }

        // Inserting data
        const data = {
            'firstname': firstname,
            'lastname': lastname,
            'username': username,
            'email': email,
            'password': password,
            'age': age,
            'city': city
        };

        // Use http://localhost:8080 for local deployment
        const response = await fetch('https://crud-api-oxuk.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            toast.success('Data Inserted', { id: 'insert-toast' });

        } else {
            toast.error("Form Not Submitted.", { id: 'insert-toast' });
        }
    };



    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold mt-10'>Registration Form</h1>
            <div class="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-12 py-12 mt-11">
                <div class="grid md:grid-cols-2 md:gap-6 mb-2">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="firstname" id="firstname" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} />
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="lastname" id="lastname" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} />
                        <label for="lastname" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input type="email" name="username" id="username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} />
                    <label for="username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} />
                    <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" id="password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} />
                    <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="age" id="age" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} />
                        <label for="age" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="city" id="city" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} />
                        <label for="city" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                    </div>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-28 mt-5" onClick={submit} >Submit</button>
            </div>
            {/* <button onClick={click}>Click Fn</button> */}
        </div>

    )
}

export default Create