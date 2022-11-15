import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff } from 'react-feather';
import { useEffect } from 'react';

const SignUpForm = ({ token, signup, errMsg, resetAuthErr }) => {
  const initInputs = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const [formInputs, setFormInputs] = useState(initInputs);
  // const [profileImg, setProfileImg] = useState('');
  const [formError, setFormError] = useState(initInputs);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
    validateInputs(e);
  };

  const validateInputs = e => {
    const { name, value } = e.target;
    setFormError(prevErr => {
      const errObj = { ...prevErr, [name]: '' };

      switch (name) {
        case 'username':
          if (!value) {
            errObj[name] = 'Please enter a username.';
          }
          break;

        case 'password':
          if (!value) {
            errObj[name] = 'Please enter a password.';
          } else if (
            formInputs.confirmPassword &&
            value !== formInputs.confirmPassword
          ) {
            errObj.confirmPassword = 'Passwords do not match.';
          } else {
            errObj.confirmPassword = formInputs.confirmPassword
              ? ''
              : formError.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            errObj[name] = 'Please enter your password again.';
          } else if (formInputs.password && value !== formInputs.password) {
            errObj[name] = 'Passwords do not match';
          }
          break;

        default:
          break;
      }

      return errObj;
    });
  };

  const navigate = useNavigate();

  const handleSignup = async e => {
    e.preventDefault();
    await signup(formInputs);
    // if (token) navigate('/spotify');
  };

  useEffect(() => {
    if (token) {
      navigate('/spotify');
    }
  }, [token]);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSignup}
      className='flex flex-col gap-y-6 justify-center'
    >
      <div className='flex flex-col gap-y-1'>
        <label className='font-light'>Username</label>
        <input
          type='text'
          placeholder='Enter a username.'
          name='username'
          value={formInputs.username}
          onChange={handleChange}
          onBlur={validateInputs}
          className='py-2 px-3 rounded-2xl text-gray-800 text-lg'
        />
        {formError.username && (
          <div className='flex mt-2 items-center gap-x-2'>
            <AlertCircle size={20} color='#ef4444' />
            <p className='text-red-500'>{formError.username}</p>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-y-1 relative'>
        <label className='font-light'>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Create a password.'
          name='password'
          value={formInputs.password}
          onChange={handleChange}
          onBlur={validateInputs}
          className='py-2 pl-3 pr-10 rounded-2xl text-gray-800 text-lg'
        />
        {showPassword ? (
          <EyeOff
            size={24}
            color='#1f2937'
            onClick={() => setShowPassword(false)}
            className={`absolute bottom-[${
              formError.password ? 46 : 10
            }px] right-3 cursor-pointer`}
          />
        ) : (
          <Eye
            size={24}
            color='#1f2937'
            onClick={() => setShowPassword(true)}
            className={`absolute bottom-[${
              formError.password ? 46 : 10
            }px] right-3 cursor-pointer`}
          />
        )}
        {formError.password && (
          <div className='flex mt-2 items-center gap-x-2'>
            <AlertCircle size={20} color='#ef4444' />
            <p className='text-red-500'>{formError.password}</p>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-y-1 relative'>
        <label className='font-light'>Confirm password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Enter your password again.'
          name='confirmPassword'
          value={formInputs.confirmPassword}
          onChange={handleChange}
          onBlur={validateInputs}
          className='py-2 pl-3 pr-10 rounded-2xl text-gray-800 text-lg'
        />
        {showPassword ? (
          <EyeOff
            size={24}
            color='#1f2937'
            onClick={() => setShowPassword(false)}
            className={`absolute bottom-[${
              formError.confirmPassword ? 46 : 10
            }px] right-3 cursor-pointer`}
          />
        ) : (
          <Eye
            size={24}
            color='#1f2937'
            onClick={() => setShowPassword(true)}
            className={`absolute bottom-[${
              formError.confirmPassword ? 46 : 10
            }px] right-3 cursor-pointer`}
          />
        )}
        {formError.confirmPassword && (
          <div className='flex mt-2 items-center gap-x-2'>
            <AlertCircle size={20} color='#ef4444' />
            <p className='text-red-500'>{formError.confirmPassword}</p>
          </div>
        )}
      </div>
      {/* <div className='flex flex-col gap-y-1'>
        <label className='font-light'>Upload a profile image (optional):</label>
        <input
          type='file'
          accept='image/*'
          capture='user'
          name='profileImg'
          value={profileImg}
          // onChange={handleChange}
          className='file:border-0 file:font-sans file:bg-gray-50 file:text-gray-800 file:text-sm file:font-medium file:py-2 file:px-4 file:rounded-xl file:mr-4'
        />
      </div> */}
      <button className='mt-4 py-2 text-xl font-bold rounded-2xl bg-green-300 text-gray-800'>
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
