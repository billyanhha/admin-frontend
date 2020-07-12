import React from 'react';
import MiniDrawer from '../../component/Drawer';
import LoadingPage from '../../component/BackDrop';

const Home = () => {
  return (
    <div>
      <LoadingPage />
      <MiniDrawer />
    </div>
  );
};

export default Home;