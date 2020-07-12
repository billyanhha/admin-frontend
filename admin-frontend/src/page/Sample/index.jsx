import React from 'react';
import MiniDrawer from '../../component/Drawer';
import LoadingPage from '../../component/BackDrop';


const Sample = () => {
    return (
        <div className="default-div">
            <LoadingPage />
            <MiniDrawer>
                123
            </MiniDrawer>
        </div>
    );
};

export default Sample;