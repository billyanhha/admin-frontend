import React, { useState, useEffect, useRef } from 'react';
import MiniDrawer from '../../component/Drawer';
import LoadingPage from '../../component/BackDrop';
import "./style.css"
import { Select, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getForm, editForm } from '../../redux/form';
import JoditEditor from "jodit-react";

const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
}


const Form = () => {

    const editor = useRef(null)

    const dispatch = useDispatch();
    const { currentForm } = useSelector(state => state.form)

    const [content, setContent] = useState(currentForm?.content ?? '');
    const [currentFormIndex, setcurrentForm] = useState('package_result_form');

    useEffect(() => {

        dispatch(getForm(currentFormIndex))

    }, []);

    useEffect(() => {

        setContent(currentForm?.content ?? '')

    }, [currentForm]);

    const handleChange = (e) => {
        setcurrentForm(e.target.value)
        dispatch(getForm(e.target.value))
    }

    const changeForm = () => {
        if(currentForm?.id){
            dispatch(editForm({name: currentFormIndex, content: content, id: currentForm?.id}))

        }

    }

    return (
        <div>
            <LoadingPage />
            <MiniDrawer>
                <Select
                    native
                    value={currentFormIndex}
                    onChange={handleChange}
                >
                    <option value={'package_result_form'}>Văn bản kết quả gói</option>
                    <option value={'appointment_result_form'}>Văn bản kết quả cuộc hẹn</option>
                </Select>
                <div className="edit-form">
                    <JoditEditor
                        required
                        ref={editor}
                        value={content}
                        config={config}
                        zIndex={1}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    // onChange={newContent => console.log(newContent)}
                    />
                    <br />
                    <Button variant = "outlined" onClick={changeForm} color="primary">
                        Sửa form
                    </Button>
                </div>
            </MiniDrawer>
        </div>
    );
};

export default Form;