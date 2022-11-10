import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff } from 'react-feather';

const LoginForm = ({ token, login, errMsg, resetAuthErr }) => {
  const initInputs = {
    username: '',
    password: '',
  };

  const [formInputs, setFormInputs] = useState(initInputs);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormInputs(prevFormInputs => ({
      ...prevFormInputs,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    login(formInputs);
    if (token) navigate('/home');
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleLogin}
      className='flex flex-col gap-y-6 justify-center'
    >
      <div className='flex flex-col gap-y-1'>
        <label className='font-light'>Username</label>
        <input
          type='text'
          placeholder='Enter your username.'
          name='username'
          value={formInputs.username}
          onChange={handleChange}
          className='py-2 px-3 rounded-2xl text-gray-800 text-lg'
        />
      </div>
      <div className='flex flex-col gap-y-1 relative'>
        <label className='font-light'>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Enter your password.'
          name='password'
          value={formInputs.password}
          onChange={handleChange}
          className='py-2 pl-3 pr-10 rounded-2xl text-gray-800 text-lg'
        />
        {showPassword ? (
          <EyeOff
            size={24}
            color='#1f2937'
            onClick={() => setShowPassword(false)}
            className='absolute bottom-[10px] right-3 cursor-pointer'
          />
        ) : (
          <Eye
            size={24}
            color='#1f2937'
            onClick={() => setShowPassword(true)}
            className='absolute bottom-[10px] right-3 cursor-pointer'
          />
        )}
      </div>
      <button className='mt-4 py-2 text-xl font-bold rounded-2xl bg-green-300 text-gray-800'>
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
