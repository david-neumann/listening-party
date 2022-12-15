import { useContext, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PageTitle from '../utils/PageTitle';
import { UserAuthContext } from '../userAuth/userAuthContext';
import { UserContext } from '../userContext';
import { LogOut, Menu, Camera, AlertCircle, Eye, EyeOff } from 'react-feather';

const EditProfile = () => {
  const { setShowOverlayNav } = useOutletContext();
  const { logout, editUser, editPassword, userAuthState } =
    useContext(UserAuthContext);
  const { user } = userAuthState;

  // Username change
  const [newUsername, setNewUsername] = useState(user.username);
  const [showUsernameInput, setShowUsernameInput] = useState(false);

  const handleUsernameChange = e => {
    const { value } = e.target;
    setNewUsername(value);
  };

  const submitUsernameChange = e => {
    e.preventDefault();
    const userObj = { username: newUsername };
    editUser(userObj);
    setShowUsernameInput(false);
  };

  // Password change
  const initInputs = {
    password: '',
    confirmPassword: '',
  };
  const [newPassword, setNewPassword] = useState(initInputs);
  const [passwordError, setPasswordError] = useState(initInputs);
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = e => {
    const { name, value } = e.target;
    setPasswordError(prevErr => {
      const errObj = { ...prevErr, [name]: '' };

      switch (name) {
        case 'password':
          if (!value) {
            errObj[name] = 'Please enter a password.';
          } else if (
            newPassword.confirmPassword &&
            value !== newPassword.confirmPassword
          ) {
            errObj.confirmPassword = 'Passwords do not match.';
          } else {
            errObj.confirmPassword = newPassword.confirmPassword
              ? ''
              : passwordError.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            errObj[name] = 'Please enter your password again.';
          } else if (newPassword.password && value !== newPassword.password) {
            errObj[name] = 'Passwords do not match';
          }
          break;

        default:
          break;
      }

      return errObj;
    });
  };

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setNewPassword(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
    validateInputs(e);
  };

  const submitPasswordChange = e => {
    e.preventDefault();
    console.log(newPassword.password);
    editPassword(newPassword);
    setShowPasswordInputs(false);
  };

  return (
    <>
      <header className='flex justify-between items-center mb-8'>
        <PageTitle>Edit Profile</PageTitle>
        <LogOut
          color='#f9fafb'
          onClick={logout}
          className='cursor-pointer md:hidden'
        />
        <Menu
          size={44}
          strokeWidth={2}
          color='#f9fafb'
          onClick={() => setShowOverlayNav(true)}
          className='bg-gray-700 p-2 rounded-xl hover:bg-gray-900 cursor-pointer hidden md:inline xl:hidden'
        />
      </header>
      <main>
        {/* <div className='mb-12 cursor-pointer'>
          <figure className='bg-gray-300 bg-cover bg-center w-28 aspect-square rounded-full relative mx-auto'>
            <Camera
              size={44}
              color='#1f2937'
              strokeWidth={2}
              className='absolute inset-0 m-auto'
            />
          </figure>
        </div> */}
        <form>
          <div className='flex items-center gap-x-3 p-3 border-b border-gray-700'>
            <label className='font-semibold text-lg'>Username:</label>
            {showUsernameInput ? (
              <input
                type='text'
                name='newUsername'
                value={newUsername}
                placeholder={user.username}
                onChange={handleUsernameChange}
                className='text-gray-800 text-lg py-1 px-2 rounded-lg'
              />
            ) : (
              <span className='text-lg font-light'>{user.username}</span>
            )}
            {showUsernameInput ? (
              <span
                onClick={submitUsernameChange}
                className='text-green-300 text-lg cursor-pointer ml-auto hover:underline'
              >
                Save
              </span>
            ) : (
              <span
                onClick={() => setShowUsernameInput(true)}
                className='text-green-300 text-lg cursor-pointer ml-auto hover:underline'
              >
                Change
              </span>
            )}
          </div>
          <div className='p-3'>
            {!showPasswordInputs && (
              <span
                onClick={() => setShowPasswordInputs(true)}
                className='text-green-300 text-lg cursor-pointer ml-auto hover:underline'
              >
                Change Password
              </span>
            )}
            {showPasswordInputs && (
              <>
                <div className='flex flex-col gap-y-1 relative mb-6'>
                  <label className='font-semibold text-lg'>Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Create a password.'
                    name='password'
                    value={newPassword.password}
                    onChange={handlePasswordChange}
                    onBlur={validateInputs}
                    className='py-2 pl-3 pr-10 rounded-lg text-gray-800 text-lg'
                  />
                  {showPassword ? (
                    <EyeOff
                      size={24}
                      color='#1f2937'
                      onClick={() => setShowPassword(false)}
                      className={`absolute bottom-[${
                        passwordError.password ? 46 : 10
                      }px] right-3 cursor-pointer`}
                    />
                  ) : (
                    <Eye
                      size={24}
                      color='#1f2937'
                      onClick={() => setShowPassword(true)}
                      className={`absolute bottom-[${
                        passwordError.password ? 46 : 10
                      }px] right-3 cursor-pointer`}
                    />
                  )}
                  {passwordError.password && (
                    <div className='flex mt-2 items-center gap-x-2'>
                      <AlertCircle size={20} color='#ef4444' />
                      <p className='text-red-500'>{passwordError.password}</p>
                    </div>
                  )}
                </div>
                <div className='flex flex-col gap-y-1 relative mb-6'>
                  <label className='font-semibold text-lg'>
                    Confirm password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password again.'
                    name='confirmPassword'
                    value={newPassword.confirmPassword}
                    onChange={handlePasswordChange}
                    onBlur={validateInputs}
                    className='py-2 pl-3 pr-10 rounded-lg text-gray-800 text-lg'
                  />
                  {showPassword ? (
                    <EyeOff
                      size={24}
                      color='#1f2937'
                      onClick={() => setShowPassword(false)}
                      className={`absolute bottom-[${
                        passwordError.confirmPassword ? 46 : 10
                      }px] right-3 cursor-pointer`}
                    />
                  ) : (
                    <Eye
                      size={24}
                      color='#1f2937'
                      onClick={() => setShowPassword(true)}
                      className={`absolute bottom-[${
                        passwordError.confirmPassword ? 46 : 10
                      }px] right-3 cursor-pointer`}
                    />
                  )}
                  {passwordError.confirmPassword && (
                    <div className='flex mt-2 items-center gap-x-2'>
                      <AlertCircle size={20} color='#ef4444' />
                      <p className='text-red-500'>
                        {passwordError.confirmPassword}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
            {showPasswordInputs && (
              <span
                onClick={submitPasswordChange}
                className='text-green-300 text-lg cursor-pointer ml-auto hover:underline'
              >
                Save Password
              </span>
            )}
          </div>
        </form>
      </main>
    </>
  );
};

export default EditProfile;
