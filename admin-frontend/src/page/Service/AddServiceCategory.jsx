import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { DialogTitle } from '@material-ui/core';


const AddServiceCategory = (props) => {

    const { control, handleSubmit, register } = useForm();
    const dispatch = useDispatch()
    const [imgFile, setfile] = useState({});

    const onSubmit = data => {

        props.setpage(1)

    };


    useEffect(() => {
        
        setfile({})
        
    }, [props.dialogVisible]);

    const _handleFileChange = (e) => {
        try {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.readAsDataURL(file || '')
            reader.onloadend = () => {
                file = {...file , src: reader.result}
                setfile(file);
            }
        } catch (error) {

        }
        return;
    }



    return (
        <Dialog open={props.dialogVisible} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Thêm hạng mục dịch vụ</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            as={TextField}
                            margin="normal"
                            fullWidth
                            label='Tên hạng mục'
                            name="name"
                            control={control}
                            defaultValue=""
                            required
                        />
                        <textarea required defaultValue={''} placeholder="Chú thích" name="description" className="form-text-area" />
                        {imgFile?.src ? <a href={imgFile?.src} target="_blank"><img className="img-preview" src={imgFile?.src} /></a> :
                            <img className="img-preview" src={imgFile?.src} />
                        }
                        <br />
                        <input type="file"
                            accept=".jpg, .gif ,.png, .jpeg, .svg"
                            onChange={_handleFileChange}
                            required />
                        <br />                    <br />
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

export default withRouter(AddServiceCategory);