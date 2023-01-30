import React from 'react';
import { toast } from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Modal = ({refetch,isModal,setIsModal}) => {
    const { user, loading } = useSelector((state) => state.user)

    const closeModal=()=>{
        setIsModal(false)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()

        const form = e.target;
        const desc = form.desc.value;
        const img = form.img.files[0];
   
        console.log(desc, img)

        const formData = new FormData()
        formData.append('image', img)

        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG}`
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const imgUrl = data.data.display_url;

                // create user

              
                fetch(`http://localhost:7000/posts/${user._id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({desc,imgUrl})
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                //   closeModal()
                    // setLoading(false)
                    toast.success("Post added")
                    refetch()
                })
              


            })
            .catch(er => {
                console.error(er)
                // setIsModal(true)
            })
    }
    setIsModal(true)
    return (
        <div>
            <input type="checkbox" id="post" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" onClick={closeModal} className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-primary hover:border-primary">✕</label>
                    <div>
                        <div className='flex gap-4 mb-6 items-center '>
                            {
                                user?.photo ?

                                    <img src={user?.photo} className="rounded-full w-16 h-16" alt="" srcset="" />
                                    :
                                    <FaUserCircle className='w-16 h-16' />
                            }
                            <div>
                                <p className='text-lg font-semibold text-black'>{user?.username ? user?.username : "User Name"}</p>
                                <p className='text-slate-800'>{user?.email ? user?.email : "User E-mail"}</p>

                            </div>


                        </div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="" ><p className='my-2 text-black'>Write your moments</p></label>
                            <textarea name='desc' className='h- w-full text-black border-none outline-none rounded-md bg-gray-100 p-4 round' placeholder='Type here'  id="" />
                            <input name='img' type="file" class="block my-2 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-violet-50 file:text-primary hover:file:bg-violet-100" />
                            <div className='flex justify-end'>
                                <button type="submit" className='btn bg-primary text-white hover:text-primary hover:bg-white hover:outline-primary'>Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;