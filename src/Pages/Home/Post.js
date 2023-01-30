import React from 'react';
import { toast } from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/userSlice';

const Post = ({ post }) => {
    const { user, loading } = useSelector((state) => state.user)
    const { _id, userId, photo, img, desc, imgUrl, email, username } = post
 const dispatch=useDispatch()
    const isIdExists = user?.followings.find(id => id === userId)
    // console.log(user.username)
    // console.log(user.followings)
    // console.log(post)
    // console.log(_id)
    console.log(isIdExists)
    // console.log(isIdExists)

    const handleFollow = () => {
        fetch(`http://localhost:7000/users/${user.username}/follow`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ userId })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // const following=user.followings.filter(id=> id !==userId)
                // console.log(following)
                // user.followings=[...following]
                dispatch(loginSuccess({...user,followings:[...user.followings,userId]}))
                toast.success("You are following the user")
            })

    }
    const handleUnfollow = () => {
        console.log(user.username,user._id)
        console.log(userId)
        fetch(`http://localhost:7000/users/${user.username}/unfollow`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ userId })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const following=user.followings.filter(id=> id !==userId)
                console.log(following)
                // user.followings=[...following]
                dispatch(loginSuccess({...user,followings:[...following]}))
                toast.success("You are unfollowing the user")
            })

    }
    return (
        <div className='bg-white my-4 p-5 rounded-md relative'>
            {
                isIdExists ?
                user?._id !== userId && 
                 <RiUserUnfollowLine onClick={handleUnfollow} className='absolute cursor-pointer w-8 h-8 right-16 top-6'></RiUserUnfollowLine>
                :
                user?._id !== userId && 
                 <RiUserFollowLine onClick={handleFollow} className='absolute cursor-pointer w-8 h-8 right-16 top-6'></RiUserFollowLine>

            }
            <div className='flex gap-6 mb-6 items-center '>
                {
                    photo ?

                        <img src={photo} className="rounded-full w-10 h-10" alt="" srcset="" />
                        :
                        <FaUserCircle className='w-10 h-10' />
                }
                <div>
                    <p className='text-lg font-semibold text-black'>{username ? username : "User Name"}</p>
                    <p className='text-slate-800'>{email ? email : "User E-mail"}</p>

                </div>

            </div>
            <div className='px-8'>
                <p className='text-black'>{desc}</p>
                <img src={imgUrl} className='w-56 h-56 my-2' alt="" srcset="" />
            </div>
        </div >
    );
};

export default Post;