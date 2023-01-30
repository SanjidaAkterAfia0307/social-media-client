import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Modal from './Modal';

const AddPost = ({setIsModal}) => {
    const { user, loading } = useSelector((state) => state.user)
    console.log(user)
    return (
        <>

            <div className='shadow-md rounded-xl px-6 py-3 bg-white my-6'>
                <div className='flex gap-6 mb-6 items-center '>
                    {
                        user?.photo ?

                        <img src={user?.photo} className="rounded-full w-16 h-16" alt="" srcset="" />
                        :
                        <FaUserCircle className='w-16 h-16'/>
                    }
                    <div>
                        <p className='text-lg font-semibold text-black'>{user?.username ? user?.username : "User Name"}</p>
                        <p className='text-slate-800'>{user?.email ? user?.email : "User E-mail"}</p>
                        
                    </div>

                </div>
                <div className='grid' >
                    {/* <input className='h- w-full border-none outline-none bg-slate-50 p-4 round' placeholder='Type here' name="" id="" /> */}
                    <label onClick={()=>setIsModal(true)} htmlFor="post" className=' h-16'>Type here...</label>
                </div>
            </div>
            
        </>
    );
};

export default AddPost;