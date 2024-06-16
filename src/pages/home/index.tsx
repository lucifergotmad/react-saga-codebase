import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="my-4">Hello Worlds!</h1>
      <Link to="/admin">
        <Button>Admin</Button>
      </Link>
    </div>
  );
};

export default Home;
