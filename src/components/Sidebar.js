import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { user, loading } = useSelector((state) => state.user)
    console.log(user)

    return (
        <div>
            {/* Branding & Profile Info */}
            <div className=''>
                <h2 className='text-3xl cursor-pointer font-semibold text-center text-primary '>
                    <Link to='/'>BookRestore</Link>
                </h2>
                <div className='flex flex-col items-center mt-6 -mx-2'>

                    {
                        user?.photo ?

                            <img
                                className='object-cover w-24 h-24 mx-2 my-6 rounded-full'
                                src={user?.photo}
                                alt='avatar'
                                referrerPolicy='no-referrer'
                            />
                            :
                            <FaUserCircle className='object-cover w-24 h-24 mx-2 my-6 rounded-full' />
                    }


                    <h4 className='mx-2 mt-2 font-medium text-primary text-xl  hover:underline'>
                        {user?.username}
                    </h4>


                    <p className='mx-2 mt-1 text-sm font-medium text-primary  hover:underline'>
                        {user?.email}
                    </p>

                </div>
            </div>

            {/* Nav Items */}
            <div className='flex flex-col justify-between flex-1 mt-6'>
                <nav>
                    <li className="text-primary font-semibold text-xl hover:text-indigo-400">
                        <Link to="/follower">Followers</Link>
                    </li>
                    <li className="text-primary font-semibold text-xl hover:text-indigo-400">
                        <Link to="/following">Following</Link>
                    </li>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;