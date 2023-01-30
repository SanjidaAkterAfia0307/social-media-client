import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddPost from './AddPost';
import Modal from './Modal';
import Post from './Post';

const Home = () => {
    const { user, loading } = useSelector((state) => state.user)
    const [isModal,setIsModal]=useState(true)
    const { data: posts = [],refetch,isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetch("http://localhost:7000/posts")
            .then(res => res.json())
    })
    console.log(posts)
    return (
        <div className='px-12 py-2 bg-slate-100'>
            <AddPost setIsModal={setIsModal}></AddPost>
            <div>
            {
                posts.map(post=><Post key={post._id} post={post}></Post>)
            }
        </div>
            { user && isModal &&
                <Modal refetch={refetch} setIsModal={setIsModal} isModal={isModal}></Modal>
             
            }
        </div>
    );
};

export default Home;