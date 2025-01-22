import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import TextBox from '../Components/TextBox';
import Button from '../Components/Button';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log('Signup Data:', data);
    // Implement your signup logic here
    navigate('/dashboard'); // Redirect to the dashboard after successful signup
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* Left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600 '>
              Join us and manage your tasks effortlessly!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
              <span>Create Your</span>
              <span>Account Today</span>
            </p>
            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
          >
            <div className="">
              <p className='text-blue-600 text-3xl font-bold text-center'>
                Create an Account
              </p>
              <p className='text-center text-base text-gray-700'>
                Sign up to start managing your tasks.
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <TextBox
                placeholder="Your Name"
                type="text"
                name="name"
                label="Full Name"
                className="w-full rounded-full"
                register={register('name', {
                  required: 'Full Name is required',
                })}
                error={errors.name ? errors.name.message : ''}
              />
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
              <TextBox
                placeholder="Confirm your password"
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                className="w-full rounded-full"
                register={register('confirmPassword', {
                  required: 'Please confirm your password',
                })}
                error={errors.confirmPassword ? errors.confirmPassword.message : ''}
              />
              <Button
                type="submit"
                label="Sign Up"
                className="w-full h-10 bg-blue-700 text-white rounded-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
