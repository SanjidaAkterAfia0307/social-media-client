import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess } from '../../redux/userSlice';
// import { AuthContext } from '../../Contexts/AuthProvider';

const Register = () => {
    const {user,loading}= useSelector((state)=>state.user)
    const dispatch=useDispatch()
    console.log(user)
    const navigate = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault()

        const form = e.target;
        const username = form.name.value;
        const email = form.email.value;
        const photof = form.photo.files[0];
        const password = form.password.value;
        // const role = form.role.value;
        console.log(username, email, photof, password)

        const formData = new FormData()
        formData.append('image', photof)

        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG}`
        dispatch(loginStart())
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const photo = data.data.display_url;

                // create user

              
                fetch("http://localhost:7000/users/signup", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({email, password,username,photo})
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    dispatch(loginSuccess(data))
                 toast.success("User created successfully!")
                 navigate("/")
                })
              


            })
            .catch(er => console.error(er))
    }
    return (
        <div className='lg:w-1/2 mx-auto pt-24 pb-56 '>


        <div className='lg:my-auto lg:p-12 p-10 md:p-20'>
            <h2 className='text-center text-3xl md:text-4xl font-bold pb-12 '>Sign up</h2>
            <form onSubmit={handleSubmit} className=' shadow-lg rounded-2xl p-4 md:p-20'>

                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2  font-medium text-gray-900 dark:text-gray-300">Your Full Name</label>
                    <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2  font-medium text-gray-900 dark:text-gray-300">Your E-mail</label>
                    <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E-mail" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="photo" className="block mb-2  font-medium text-gray-900 dark:text-gray-300">Your PhotoURL</label>
                    <input type="file" name="photo" className="file-input file-input-bordered w-full max-w-xs" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2  font-medium text-gray-900 dark:text-gray-300">Your password</label>
                    <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                </div>

        
                <div className='flex gap-3 my-5'>
                    <input type="radio" name="radio-1" className="radio" />
                    <p>Accept rules</p>
                </div>
                {/* <p className='text-xl text-yellow-400 py-3'>{error}</p> */}
                <button type="submit" className="text-white block bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

             
                <p className='text-center my-2'><span>Already Have An Account ?</span> <Link className='text-orange-400' to="/login">Log In</Link></p>
            </form>
        </div>


    </div>
);
};

export default Register;