import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import TextBox from '../Components/TextBox';
import Button from '../Components/Button';
import { useSelector } from 'react-redux';

const Login = () => {

  const {user} = useSelector((state) => state.auth);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  
  const submitHandler = async (data) => {

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login', 
        data,
        { withCredentials: true } 
      );
      if (response.status === 200) {
        alert('Login successful!');
        Cookies.set('token', response.data.token, { expires: 30, secure: true }); // Store token in cookies
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

//     console.log("submit")
//   }
//   console.log(user);
//   useEffect(() => {
//     user && navigate("/dashboard");
//   }, [user]

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* Left side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Manage all your tasks in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>
          </div>
        </div>
        {/* Right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div>
              <p className="text-blue-600 text-3xl font-bold text-center">Welcome Back!</p>
              <p className="text-center text-base text-gray-700">Keep all your credentials safe.</p>
            </div>
            <div className="flex flex-col gap-y-5">
              <TextBox
                placeholder="Email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register('email', {
                  required: 'Email Address is required',
                })}
                error={errors.email ? errors.email.message : ''}
              />
              <TextBox
                placeholder="Your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register('password', {
                  required: 'Password is required',
                })}
                error={errors.password ? errors.password.message : ''}
              />
              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                Forget Password
              </span>
              <Button
                type="submit"
                label={loading ? 'Submitting...' : 'Submit'}
                className={`w-full h-10 ${
                  loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-700'
                } text-white rounded-full`}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
