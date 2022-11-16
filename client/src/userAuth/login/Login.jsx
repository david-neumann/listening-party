import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../userAuthContext';
import LoginForm from './LoginForm';

const Login = () => {
  const { userAuthState, login, errMsg, resetAuthErr } =
    useContext(UserAuthContext);

  const { token } = userAuthState;

  return (
    <>
      <header className='p-6 flex flex-col justify-center items-center max-w-[500px] mt-8 mx-auto'>
        <h2 className='text-xl font-bold mb-6 max-w-max text-transparent bg-clip-text bg-gradient-to-tr from-green-300 to-green-600'>
          Listening Party 🎵
        </h2>
        <h4>Please sign in to continue.</h4>
      </header>
      <main className='p-6 max-w-[500px] mx-auto'>
        <LoginForm
          token={token}
          login={login}
          errMsg={errMsg}
          resetAuthErr={resetAuthErr}
        />
        <p className='mt-6 text-center'>
          Dont' have an account?{' '}
          <span className='text-green-300 underline decoration-2'>
            <Link to='/'>Sign up.</Link>
          </span>
        </p>
      </main>
    </>
  );
};

export default Login;
