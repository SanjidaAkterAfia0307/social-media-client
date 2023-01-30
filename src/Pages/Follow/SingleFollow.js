import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const SingleFollow = ({follower,i}) => {
    return (
        <div>
             <div className='flex gap-6 mb-3 text-black h-20 items-center bg-white p-3 rounded-md '>
                <p>{i+1}.</p>
                    {
                        follower?.photo ?

                        <img src={follower?.photo} className="rounded-full w-16 h-16" alt="" srcset="" />
                        :
                        <FaUserCircle className='w-16 text-gray-400 h-16'/>
                    }
                    <div>
                        <p className='text-lg font-semibold '>{follower?.username ? follower?.username : "User Name"}</p>
                        <p >{follower?.email ? follower?.email : "User E-mail"}</p>
                        
                    </div>

                </div>
        </div>
    );
};

export default SingleFollow;