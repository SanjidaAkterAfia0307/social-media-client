import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import SingleFollow from './SingleFollow';

const Followings = () => {
    const { user, loading } = useSelector((state) => state.user)
    const { data: followings = [],refetch,isLoading } = useQuery({
        queryKey: ['followings'],
        queryFn: () => fetch(`http://localhost:7000/users/${user.username}/following`)
            .then(res => res.json())
    })
    console.log(followings)
    return (
        <div className='px-12 py-2 bg-slate-100 h-screen'>
            {
                followings.map((follower,i)=> <SingleFollow key={follower._id} follower={follower} i={i}></SingleFollow>)
            }
        </div>
    );
};

export default Followings;