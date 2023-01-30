import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import SingleFollow from './SingleFollow';

const Followers = () => {
    const { user, loading } = useSelector((state) => state.user)
    const { data: followers = [],refetch,isLoading } = useQuery({
        queryKey: ['followers'],
        queryFn: () => fetch(`http://localhost:7000/users/${user.username}/followers`)
            .then(res => res.json())
    })
    console.log(followers)
    return (
        <div className='px-12 py-2 bg-slate-100 h-screen'>
            {
                followers.map((follower,i)=> <SingleFollow key={follower._id} follower={follower} i={i}></SingleFollow>)
            }
        </div>
    );
};

export default Followers;