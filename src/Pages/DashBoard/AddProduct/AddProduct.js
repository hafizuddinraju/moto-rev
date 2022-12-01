import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthDataContext } from '../../../AuthContext/AuthContext';
import MediumSpinner from '../../../components/Spinner/MediumSpinner';
import SmallSpinner from '../../../components/Spinner/SmallSpinner';

const AddProduct = () => {
    const {user} = useContext(AuthDataContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgHost = process.env.REACT_APP_IMGBB_KEY;
    const [value, onChange] = useState(new Date());
    const [spinner ,setSpinner] = useState(false)
    
    const navigate = useNavigate()
    //get data
    const {data: categories, isLoading } = useQuery({
        queryKey:['categories'],
        queryFn: async ()=>{
            const res = await fetch('https://server-bike.vercel.app/categories');
            const data = await res.json();
            return data.data;
        }
    })
// set data
    const handleAddProduct = (data)=>{
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image',image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHost}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                // console.log(imgData.data.url);
                const product = {
                    seller_Name: user?.displayName, 
                    seller_email: user?.email,
                    product_Name: data.name,
                    location: data.location,
                    resalePrice : data.resalePrice,
                    originalPrice : data.originalPrice,
                    year_of_use : data.yearUse,
                    phone: data.phone,
                    description:data.description,
                    category: data.categories,
                    conditions: data.condition,
                    image: imgData.data.url,
                    time_post: value,
                    quantity:1
                }
                fetch('https://server-bike.vercel.app/products', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                        authorization: `bearer ${localStorage.getItem('moto-token')}`
                    },
                    body: JSON.stringify(product)
                })
                .then(res => res.json())
                .then(result =>{
                    if(result.success){
                        setSpinner(false)
                        toast.success(result.message, {autoClose:500})
                        navigate('/dashboard/seller/myproduct')
                    }
                    
                    
                })
                .catch(error =>{
                    setSpinner(false)
                    toast.error(error.error, {autoClose:500})
                })
            }
            })

    }
    if(isLoading){
        return <MediumSpinner></MediumSpinner>
    }
    const handleSpinner = ()=>{
        setSpinner(true)
    }
    return (
        <div className=' p-7  '>
            <h2 className="text-4xl text-center font-bold">Add A Product</h2>
            <div className='text-center mt-3'>
            <DateTimePicker className='rounded-md' disabled onChange={onChange} value={value} />
            </div>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className='grid py-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text" placeholder='Product Name' {...register("name", {
                        required: "Name is Required"
                        
                    })} className="input input-bordered " />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Location</span></label>
                    <input type="location" placeholder='Enter your Location'  {...register("location", {
                        required: true
                    })} className="input input-bordered w-full " />
                    {errors.location&& <p className='text-red-500'>{errors.location.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Categories</span></label>
                    <select 
                    {...register('categories')}
                    className="select input-bordered w-full ">
                        {
                            categories?.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }
                        
                        
                    </select>
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Condition</span></label>
                    <select 
                    {...register('condition')}
                    className="select input-bordered w-full ">
                         <option>Good</option>
                         <option>Fair</option>
                         <option>Excellent</option>
                        
                        
                        
                    </select>
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered py-2 w-full " />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Resale Price</span></label>
                    <input type="number"  {...register("resalePrice", {
                        required: "Resale Price is Required"
                        
                    })} className="input input-bordered w-full " />
                    {errors.resalePrice && <p className='text-red-500'>{errors.resalePrice.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Original Price</span></label>
                    <input type="number"  {...register("originalPrice", {
                        required: "Resale Price is Required"
                        
                    })} className="input input-bordered w-full" />
                    {errors.originalPrice && <p className='text-red-500'>{errors.originalPrice.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Year of use</span></label>
                    <input type="number"  {...register("yearUse", {
                        required: "yearUse is Required"
                        
                    })} className="input input-bordered w-full " />
                    {errors.yearUse && <p className='text-red-500'>{errors.yearUse.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Phone Number</span></label>
                    <input type="number"  {...register("phone", {
                        required: "Phone is Required"
                        
                    })} className="input input-bordered w-full " />
                    {errors.phone&& <p className='text-red-500'>{errors.phone.message}</p>}
                </div>
                
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Description</span></label>
                    <textarea type="text"  {...register("description", {
                        required: "Description is Required"
                        
                    })} className="input input-bordered h-3 w-full " />
                    {errors.description&& <p className='text-red-500'>{errors.description.message}</p>}
                </div>
                
                </div>
                <button onClick={handleSpinner } className='btn  bg-sky-500 border-none w-1/3 mx-auto mt-4' type="submit" >{spinner? <SmallSpinner></SmallSpinner> : 'Add A Product'}</button>
                
            </form>
        </div>
    );
};

export default AddProduct;