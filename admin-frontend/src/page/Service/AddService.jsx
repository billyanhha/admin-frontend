import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import AsyncPaginate from "react-select-async-paginate";
import { DialogTitle, Avatar } from '@material-ui/core';
import sService from '../../service/sService';
import { NotificationManager } from 'react-notifications';
import { addService } from '../../redux/service';

const AddService = (props) => {

    const { control, handleSubmit, register } = useForm();
    const dispatch = useDispatch()

    const [category_id, setcategory_id] = useState('');

    const onSubmit = data => {
        if(!category_id) {
            NotificationManager.error('Vui lòng chọn loại dịch vụ', 'Thông báo')

        } else {
            props.setPage();
            data = {...data, category_id: category_id}
            dispatch(addService(data))
            props.closeDialog()
        }
    };

    const loadOptions = async (search, loadedOptions, { page }) => {
        try {
            const data = {query: search, active: true}
            const response = await sService.getServiceCategory(data);
            return {
                options: response?.categorires,
                hasMore: false,
                additional: {
                    page: page + 1,
                },
            };
        } catch (error) {
            console.log(error);
        }
    }

    const Option = (props) => {
        const option = { ...props?.data };


        return (
            <div className = "select-category service-category-field" ref={props.innerRef} {...props.innerProps}>
                <Avatar style={{ width: '80px', height: '80px' }} alt={option.name} src={option.image} />
                <h4>
                    {option.name}
                </h4>
            </div>
        )
    }

    const onChange = (value) => {
        setcategory_id(value?.id)
    }

    return (
        <Dialog open={props.dialogVisible} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Thêm dịch vụ</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div >
                            <AsyncPaginate
                                loadOptions={loadOptions}
                                isClearable={true}
                                debounceTimeout={300}
                                components={{ Option }} 
                                additional={{
                                    page: 1,
                                }}
                                placeholder={'Loại dịch vụ'}
                                getOptionLabel={({ name }) => name}
                                defaultOptions
                                cacheOptions
                                required
                                onChange={onChange}
                            />
                        </div>
                        <Controller
                            as={TextField}
                            margin="normal"
                            fullWidth
                            label='Tên dịch vụ'
                            name="name"
                            control={control}
                            defaultValue=""
                            required
                        />
                        <textarea required defaultValue={''} placeholder="Chú thích" name="description" ref={register} className="form-text-area" />
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Thêm
                    </Button>
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="primary">
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(AddService);