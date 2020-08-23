import React, { useEffect } from 'react';
import "./style.css"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle, Button, Avatar, CircularProgress } from '@material-ui/core';
import { LoadingBar } from 'react-redux-loading-bar';
import { useSelector } from 'react-redux';
import gender from "../../config/gender";
import moment from "moment"

const PatientDialog = (props) => {

    const { currentCustomer } = props;
    const { patients } = useSelector(state => state.customer);
    const { isLoad } = useSelector(state => state.ui);

    const renderPatient = patients.map((value, index) => {
        return (
            <div className="patient-card">
                <div className="service-category-field">
                    <Avatar style={{ width: '100px', height: '100px' }} alt={value?.fullname} src={value?.avatarurl} />
                    <div className="patient-card-data">
                        <h3 className="highlight">
                            {value?.fullname}
                        </h3>
                        <h4>
                            <span className="highlight"> Địa chỉ: </span>{value?.address}
                        </h4>
                        <h4>
                            <span className="highlight"> Ngày sinh: </span>{moment(value?.dateofbirth).format("DD-MM-YYYY")}
                        </h4>
                        <h4>
                            <span className="highlight"> Giới tính: </span>{gender[value?.gender]}
                        </h4>
                        <h4>
                            {value?.type !== 'INDEPENDENT' ?
                                <span>Quan hệ với <span className="highlight">{currentCustomer.fullname}: <i>{value?.type}</i> </span>  </span>
                                : (<div>
                                    Chủ tài khoản
                                </div>)
                            }
                        </h4>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            {isLoad ? <CircularProgress />
                : (<Dialog open={props.dialogVisible} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Bệnh nhân liên quan của
                <span className="highlight"> {currentCustomer.fullname}</span>
                    </DialogTitle>
                    <DialogContent>
                        {renderPatient}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.closeDialog} color="primary">
                            Hủy
                </Button>
                    </DialogActions>
                </Dialog>)}
        </div>
    );
};

export default PatientDialog;