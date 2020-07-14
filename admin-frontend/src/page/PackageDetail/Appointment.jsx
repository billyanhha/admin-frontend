import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppointmentByPackage } from '../../redux/package';
import { withRouter } from 'react-router-dom';
import package_appointment_status from "../../config/package_appointment_status"
import slot from "../../config/slot";
import moment from "moment";
import { Chip, Button } from '@material-ui/core';
import appointment_status from "../../config/appointment_status"
import CancelAppointment from './CancelAppointment';

const Appointment = (props) => {

    const index = props?.tabIndex;
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const { packageData } = useSelector(state => state.package);
    const [dialogVisible, setdialogVisible] = useState(false);
    const [currentAppointmentId, setcurrentAppointmentId] = useState('');

    useEffect(() => {

        dispatch(getAllAppointmentByPackage(id))

    }, []);

    
    const openDialog = (id) => {
        setdialogVisible(true)
        setcurrentAppointmentId(id)
    }

    const closeDialog = () => {
        setdialogVisible(false)
    }

    const renderCanceAppointmentlButton  = (value) => {
        if(
            (value?.status_id === appointment_status.pending)
            ||
            (value?.status_id === appointment_status.dueDate)

        ) {
            return (
                <div className="package-detail-header-operator">
                <Button onClick = {() => openDialog(value.id)} variant="outlined" color="secondary">
                    Hủy cuộc hẹn
                </Button>
            </div>
            )
        }
    }

    const renderAppointment = packageData?.appointments?.map((value, index) => (
        <div className="package-appointment-list-item"
            id={value?.id}
            style={{ borderLeft: `10px solid ${package_appointment_status?.[`${value?.status_id}`]?.color}` }}
            key={value?.id}>
            <Chip
                variant="outlined"
                style ={{color : package_appointment_status?.[`${value?.status_id}`]?.color
            ,
            border: `1px solid ${ package_appointment_status?.[`${value?.status_id}`]?.color }`
            
            }}
                size="large"
                label={value?.status_name}
                color="primary"
            />
            <p className="highlight">
                {moment(value?.date).format("DD - MM - YYYY")}
            </p>
            <p> Slot : {value?.slot_id} từ ( {slot?.[`${value?.slot_id}`]?.from} - {slot?.[`${value?.slot_id}`]?.to}  ) </p>
            <p> Địa chỉ : <span className="highlight"> {value?.address} </span></p>
            <p> Số điện thoại : <span className="highlight">{value?.phone}</span> </p>
            <div>
                Note : {value?.note ?? 'Không có ghi chú gì'}
            </div>
            <br/>
            {renderCanceAppointmentlButton(value)}
        </div >
    ))

    return (index === 0) && (
        <div className = "appointment-list">
            {renderAppointment}
            <CancelAppointment
               appointmentId = {currentAppointmentId}
              dialogVisible = {dialogVisible} closeDialog = {closeDialog} openDialog = {openDialog}/>
        </div>
    );
};

export default withRouter(Appointment);