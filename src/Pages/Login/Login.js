import { async } from "@firebase/util";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import ApiToken from "../../ApiToken/ApiToken";
import {AuthDataContext} from '../../AuthContext/AuthContext'
import { saveUserMongodb } from "../../components/AllFunction/MongoF";
import SmallSpinner from "../../components/Spinner/SmallSpinner";




const Login = () => {
  const {UserLogin, googleLogin} = useContext(AuthDataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [spinner ,setSpinner] = useState(false)
  const [loginUserEmail, setLoginUserEmail] = useState('');
  
  const [token] = ApiToken(loginUserEmail);
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  if (token) {
    navigate(from, { replace: true });
}
  const providerGoogle = new GoogleAuthProvider();
  // user Login
  const handleLogin = (data) => {
    // console.log(data);
    UserLogin (data.email, data.password)
      .then((result) => {
        const user = result.user;
        setLoginUserEmail(user?.email);
        setSpinner(false)
        
        toast.success("Login Successfull", { autoClose: 500 });
        
      })
      .catch((error) => {
        setSpinner(false)
        toast.error(error, { autoClose: 500 });
      });
  };
  // google login
  const handleGoogle = ()=>{
    googleLogin(providerGoogle)
    .then(result =>{
        const user = result.user;
        const  sp = {
            specialty: 'BUYER'
        }             
            saveUserMongodb(user?.displayName, user?.email, sp.specialty)
            setLoginUserEmail(user?.email);
            toast.success('Google Login',{autoClose:500})
            
        
        
    })
    .catch(error =>{
        toast.error(`${error}`, {autoClose:500})
    })
}
const handleSpinner = ()=>{
    setSpinner(true)
}
  
  
  return (
    <div>
      <div className=" w-full md:w-1/3 mx-auto p-8 space-y-3 rounded-xl my-8 bg-gray-200 text-gray-900">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <label htmlFor="Email" className="block text-gray-900">
              Email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              id="email"
              placeholder="abc@gmail.com"
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-gray-900 focus:border-violet-400"
            />
            {errors.email && errors.email.type === "required" && (
              <span className="text-center text-red-500" role="alert">
                Email must be required
              </span>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-900">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-gray-900 focus:border-violet-400"
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-center text-red-500" role="alert">
                password must be required
              </span>
            )}
            
          </div>
          <button
          onClick={handleSpinner}
            type="submit"
            className="block  btn w-full font-semibold p-3 text-center rounded-sm text-gray-100 bg-red-600 hover:bg-red-700"
          >
            {spinner? <SmallSpinner></SmallSpinner> : 'Sign in'}
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogle}
            aria-label="Log in with Google"
            className="p-3 rounded-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>

         
        </div>
        <p className="text-xs text-center sm:px-6 text-gray-400">
          Don't have an account?
          <Link
            rel="noopener noreferrer"
            to="/signup"
            className="underline text-red-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
