import SignUpForm from '../components/SignUpForm';

const UserAuthLandingPage = () => {
  return (
    <>
      <header className='p-6 flex flex-col justify-center items-center max-w-[500px] mt-8 mx-auto'>
        <h2 className='text-xl font-bold mb-6 max-w-max text-transparent bg-clip-text bg-gradient-to-tr from-green-300 to-green-600'>
          Listening Party 🎵
        </h2>
        <h1 className='text-2xl text-center font-medium'>
          Sign up to start sharing music with your friends today!
        </h1>
      </header>
      <main className='p-6 max-w-[500px] mx-auto'>
        <SignUpForm />
      </main>
    </>
  );
};

export default UserAuthLandingPage;
