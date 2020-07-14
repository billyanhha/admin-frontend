import React from 'react';
import MiniDrawer from '../../component/Drawer';
import LoadingPage from '../../component/BackDrop';

const NoMatch = () => {
    return (
        <div>
            <LoadingPage />
            <MiniDrawer>
                <h3>
                    404 Không tìm thấy trang bạn yêu cầu
                </h3>
            </MiniDrawer>
        </div>
    );
};

export default NoMatch;