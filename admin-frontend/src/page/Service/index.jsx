import React, { useState, useEffect } from 'react';
import MiniDrawer from '../../component/Drawer';
import './style.css'
import { Select, Avatar } from '@material-ui/core';
import ServiceCategory from './ServiceCategory';
import ServiceList from './ServiceList';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentServicePage } from '../../redux/service';


const Service = () => {

    const {currentServicePage} = useSelector(state=> state.service)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setCurrentServicePage(e.target.value))
    }

    return (
        <div>
            <MiniDrawer>
                <Select
                    native
                    value={currentServicePage}
                    onChange={handleChange}
                >
                    <option value={1}>Dịch vụ</option>
                    <option value={2}>Hạng mục dịch vụ</option>
                </Select>
                <div className = "service-content">
                     <React.Fragment>
                         <ServiceList />
                         <ServiceCategory />
                     </React.Fragment>
                </div>
            </MiniDrawer>
        </div>
    );
};

export default Service;