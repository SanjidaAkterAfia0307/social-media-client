import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess } from '../../redux/userSlice';


const Login = () => {

    const { user, loading } = useSelector((state) => state.user)
    const dispatch = useDispatch()


    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"
    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.target;
        const username = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(username, email, password)


        // logIn()
        dispatch(loginStart())
        fetch("http://localhost:7000/users/signin", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email, password, username })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch(loginSuccess(data))
                toast.success("User login successfully!")
                navigate(from, { replace: true });
            })



    }
    return (
        <div className='lg:grid grid-cols-3 pt-24  relative'>
            <div className='hidden lg:block'>
                <img src="{lockPhone}" alt="" />
            </div>

            <div className='lg:my-auto lg:p-12 p-10 mt-12 md:mt-0 md:p-20'>
                <h2 className='text-center text-3xl md:text-4xl font-bold pb-12 '>Log In to join Now !</h2>
                <form onSubmit={handleSubmit} className=' shadow-lg rounded-2xl p-4 md:p-20'>


                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2  font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                        <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E-mail" required="" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2  font-medium text-gray-900 dark:text-gray-300">Your E-mail</label>
                        <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E-mail" required="" />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2  font-medium text-gray-900 dark:text-gray-300">Your password</label>
                        <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required="" />
                    </div>

                    <button type="submit" className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                    <p className='text-center my-5'><span>New To Sociala ?</span> <Link className='text-orange-400' to="/register">Sign Up</Link></p>
                </form>
            </div>

            <div className='hidden lg:block'>
                <img src="{personComputer}" alt="" />
            </div>
        </div>
    );
};

export default Login;