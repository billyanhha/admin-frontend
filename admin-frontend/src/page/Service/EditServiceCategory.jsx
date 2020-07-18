import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { DialogTitle, Select, MenuItem } from '@material-ui/core';
import { addServiceCategory, editService, editServiceCategory } from '../../redux/service';


const EditServiceCategory = (props) => {

    const currentCategory = props?.currentCategory

    const { control, handleSubmit, register, reset } = useForm(currentCategory);
    const dispatch = useDispatch()
    const [imgFile, setfile] = useState(null);
    const [src, setSrc] = useState('')

    const onSubmit = data => {

        props.setpage(1)
        data = { ...data, image: imgFile, id: currentCategory?.id }
        dispatch(editServiceCategory(data));
        props.closeDialog()
    };


    useEffect(() => {

        setfile({})
        reset(props?.currentCategory)
        setSrc(props?.currentCategory?.image)

    }, [props.dialogVisible]);

    const _handleFileChange = (e) => {
        try {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.readAsDataURL(file || '')
            reader.onloadend = () => {
                setSrc(reader.result)
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
                        <textarea required defaultValue={''} placeholder="Chú thích" name="description" ref={register} className="form-text-area" />
                        {src ? <a href={src} target="_blank"><img className="img-preview" src={src} /></a> :
                            <img className="img-preview" src={src} />
                        }
                        <br />
                        <input type="file"
                            accept=".jpg, .gif ,.png, .jpeg, .svg"
                            onChange={_handleFileChange}
                        />
                        <br />                    <br />
                        <section>
                            <Controller
                                as={
                                    <Select
                                    >
                                        <MenuItem value={true}>Hoạt động</MenuItem>
                                        <MenuItem value={false}>Ngưng hoạt động</MenuItem>
                                    </Select>
                                }
                                name="active"
                                control={control}
                            />
                        </section>
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sửa
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

export default withRouter(EditServiceCategory);