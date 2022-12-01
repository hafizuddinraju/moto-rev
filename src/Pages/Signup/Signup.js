import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthDataContext } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import SmallSpinner from '../../components/Spinner/SmallSpinner';
import { saveUserMongodb } from '../../components/AllFunction/MongoF';
import ApiToken from '../../ApiToken/ApiToken';


const Signup = () => {
    const {CreateSignUp,profileUpdate,setSign,googleLogin, LogOut} = useContext(AuthDataContext);
    const imgHost = process.env.REACT_APP_IMGBB_KEY;
    const [createUserEmail, SetCreateuserEmail] = useState('');
    // console.log(createUserEmail);
    const [loading, setLoading ] = useState(false)
    const [token] = ApiToken(createUserEmail)
    const navigate = useNavigate()
    const {register, handleSubmit,formState: { errors }} = useForm();
    const providerGoogle = new GoogleAuthProvider();
   

    // if(token){
    //     navigate('/')
    // }
    const handleSignUp = (data)=>{
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
                CreateSignUp(data.email, data.password)
        .then(result =>{
            const user = result.user;
            
            const userInfo = {
                displayName: data.fullName,
                photoURL:imgData.data.url
            }
            profileUpdate(userInfo)
            .then(()=>{
                saveUserMongodb(user?.displayName, user?.email, data.specialty)
                SetCreateuserEmail(user?.email)
                setSign(userInfo)
                LogOut()
                navigate('/')
                if(user){
                    
                    setLoading(false)
                   
                }
                
            })
            .catch(error =>{
                setLoading(false)
                toast.error(`${error.message}`,{autoClose:500})
            })
            toast.success('Create user SuccessFull..!',{autoClose:500})
            
            
        })
        .catch(error =>{
            setLoading(false)
            toast.error(`${error.message}`,{autoClose:500})
        })
                
            }
            })
        

    }
    const handleGoogle = ()=>{
        googleLogin(providerGoogle)
        .then(result =>{
            const user = result.user;
            const  sp = {
                specialty: 'BUYER'
            }             
                saveUserMongodb(user?.displayName, user?.email, sp.specialty)
                SetCreateuserEmail(user?.email);
                
                toast.success('Google Login',{autoClose:500})
            
            
        })
        .catch(error =>{
            toast.error(`${error}`, {autoClose:500})
        })
    }
   
 const spinner = ()=>{
    setLoading(true)
 }
    
    
    
    return (
        <div >
        <div className=" w-full md:w-1/3 mx-auto p-8 space-y-3 rounded-xl my-8 bg-gray-200 text-gray-900">
  <h1 className="text-2xl font-bold text-center">Sign Up</h1>
  <form onSubmit={handleSubmit(handleSignUp)}  className="space-y-6 ng-untouched ng-pristine ng-valid">
      <div className="space-y-1 text-sm">
          <label htmlFor="fullName" className="block text-gray-900">Full Name</label>
          <input type="text" {...register("fullName", { required: true})} id="fullName" placeholder="Enter Your Name" className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-gray-900 focus:border-violet-400" />
          {errors.fullName && errors.fullName.type === "required" && (
      <span className='text-center text-red-500' role="alert">Full Name must be required</span>
    )}
      </div>
      <div className="space-y-1 text-sm">
          <label htmlFor="Email" className="block text-gray-900">Email</label>
          <input type="text" {...register("email", { required: true})} id="email" placeholder="abc@gmail.com" className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-gray-900 focus:border-violet-400" />
          {errors.email && errors.email.type === "required" && (
      <span className='text-center text-red-500' role="alert">Email must be required</span>
    )}
      </div>
      <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Specialty</span></label>
                    <select 
                    {...register('specialty')}
                    className="select input-bordered font-semibold py-2 rounded-md px-2 w-full ">
                        
                           <option>BUYER</option>
                           <option>SELLER</option>
                        
                        
                        
                    </select>
                </div>
      <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered py-2 w-full max-w-xs" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
      <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-900">Password</label>
          <input type="password" {...register("password", 
          { 
            required: 'Password must be required',
            minLength:{value:6, message:'password must be 6 Digits'},
          
          })} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-gray-900 focus:border-violet-400" />
          {errors.password && (
      <span className='text-center text-red-500' role="alert">{errors.password.message}</span>
    )}
          
      </div>
      <button onClick={spinner} type='submit' className="block btn w-full font-semibold p-3 text-center rounded-sm text-gray-100 bg-red-600 hover:bg-red-700">{loading? <SmallSpinner></SmallSpinner> : 'Sign up'}</button>
  </form>
  <div className="flex items-center pt-4 space-x-1">
      <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
      <p className="px-3 text-sm text-gray-400">Signup with social accounts</p>
      <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
  </div>
  <div className="flex justify-center space-x-4">
      <button onClick={handleGoogle} aria-label="Log in with Google" className="p-3 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
      </button>
      
     
  </div>
  <p className="text-xs text-center sm:px-6 text-gray-400">All ready have an account?
      <Link rel="noopener noreferrer" to='/login' className="underline text-red-700">Log In</Link>
  </p>
</div>
      </div>
    );
};

export default Signup;