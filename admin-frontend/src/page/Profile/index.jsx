import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import AvatarEditor from "react-avatar-editor";
import InputMask from "react-input-mask";
import Select from "react-select";

import {editStaffProfile, setStatus} from "../../redux/staff";
import {getUser} from "../../redux/user";

import MiniDrawer from "../../component/Drawer";
import LoadingPage from "../../component/BackDrop";

import {Modal, CircularProgress, Button} from "@material-ui/core";
import {EditTwoTone, CropOriginalTwoTone, CachedTwoTone} from "@material-ui/icons";

import DefaultAvatar from "../../assets/image/hhs-default_avatar.jpg";
import "./style.css";

const ProfileStaff = () => {
    const {register, handleSubmit, watch, errors, control, reset} = useForm({validateCriteriaMode: "all"});
    const dispatch = useDispatch();
    const {isLoad} = useSelector(state => state.ui);
    const token = useSelector(state => state.auth.token);
    const {currentUser} = useSelector(state => state.user);
    const uploadStatus = useSelector(state => state.staff.updateStatus);

    const [avatarImg, setAvatarImg] = useState({preview: "", raw: ""});
    const [avatarVisible, setAvatarVisible] = useState(false);
    const [avatarRef, setAvatarRef] = useState(null);
    const [avatarName, setAvatarName] = useState("");

    const [createNew, setCreateNew] = useState(false);

    const [avatarProperty, setAvatarProperty] = useState({
        scale: 1,
        preview: null,
    });

    const options = [
        {value: "Male", label: "Nam"},
        {value: "Female", label: "Nữ"},
    ];

    const onSubmit = data => {
        let phone = data.phone.replace(/\s+/g, "").substring(1);
        let staffEdit = {
            fullname: data.fullname,
            phone: phone,
            address: data.address,
            gender: data.gender.value,
            // dateofbirth: moment(data.Datepicker).format('YYYY-MM-DD')
        };
        dispatch(editStaffProfile(token, currentUser?.id, staffEdit));
    };

    //Avatar handle function
    const handleAvatarChange = e => {
        if (e.target.files.length) {
            setAvatarImg({
                preview: "",
                raw: URL.createObjectURL(e.target.files[0]),
            });
            setAvatarName(e.target.files?.[0].name);
        }
    };

    const handleAvatarScale = e => {
        const scale = parseFloat(e.target.value);
        setAvatarProperty({scale: scale});
    };

    const saveEditedAvatar = editor => {
        if (editor) {
            setAvatarRef(editor);
        }
    };

    const handleAvatarUpload = async e => {
        e.preventDefault();

        if (avatarRef) {
            const canvas = avatarRef.getImageScaledToCanvas();
            let file;
            canvas.toBlob(blob => {
                file = new File([blob], avatarName == "" ? "noname.jpg" : avatarName);

                const formData = new FormData();
                formData.append("staffAvatar", file);
                dispatch(editStaffProfile(token, currentUser?.id, formData));
            });
        } else {
            console.log("Upload Fail");
        }
    };

    const convertImageToBlobURL = () => {
        if (avatarRef) {
            const canvas = avatarRef.getImageScaledToCanvas().toDataURL();
            fetch(canvas)
                .then(res => res.blob())
                .then(blob => setAvatarImg({preview: window.URL.createObjectURL(blob)}));
        } else {
            console.log("Nothing to preview!");
        }
    };

    const resetAvatar = () => {
        setAvatarImg({preview: null, raw: null});
        setAvatarRef(null);
        setAvatarVisible(false);
    };

    useEffect(() => {
        if (uploadStatus) {
            resetAvatar();
            dispatch(setStatus(false));
            dispatch(getUser(token));
        }
    }, [uploadStatus]);

    useEffect(() => {
        //  Update defaultValue/value
        const needReset = {
            gender: currentUser?.gender === "Male" ? {value: "Male", label: "Nam"} : {value: "Female", label: "Nữ"},
            phone: currentUser?.phone ?? null,
            // Datepicker: currentUser?.dateofbirth ? new Date(currentUser?.dateofbirth) : null
        };
        reset(needReset); // reset gender and dob form values
    }, [currentUser]);

    return (
        <div>
            <LoadingPage />
            <MiniDrawer>
                <div className="profile-content">
                    <div className="dashboard-component-header">Trang cá nhân</div>
                    <div className={`profile-form ${currentUser?.role === "admin" ? "" : "profile-form-disable-edit"}`}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="profile-form-update">
                                <div className="profile-info">
                                    <div className="profile-avatar">
                                        <div className="avatar-wrapper">
                                            <img id="Avatar-profile" src={currentUser?.avatarurl ?? DefaultAvatar} alt="Avatar" />
                                        </div>
                                        <div className={currentUser?.role === "admin" ? "profile-form-end avatar-action" : "profile-display-none"}>
                                            <EditTwoTone id="Avatar-icon" twoToneColor="#00BC9A" onClick={() => setAvatarVisible(true)} />
                                            <div className="avatar-note">Đổi ảnh đại diện</div>
                                        </div>
                                    </div>
                                    <Modal open={avatarVisible} onClose={() => resetAvatar()}>
                                        <div className="profile-modal">
                                            <div className="avatar-title">Cập nhật ảnh đại diện</div>
                                            <div className="avatar-editor">
                                                <div className="avatar-editor-zone">
                                                    {avatarImg?.raw ? (
                                                        <div className="avatar-crop">
                                                            <AvatarEditor
                                                                ref={saveEditedAvatar}
                                                                borderRadius={200}
                                                                height={250}
                                                                width={250}
                                                                scale={parseFloat(avatarProperty.scale)}
                                                                image={avatarImg.raw}
                                                            />
                                                            <div>
                                                                <input
                                                                    name="scale"
                                                                    type="range"
                                                                    onChange={handleAvatarScale}
                                                                    min="1"
                                                                    max="2"
                                                                    step="0.01"
                                                                    defaultValue="1"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : !avatarImg.preview ? (
                                                        <div className="avatar-editor-message">
                                                            <label htmlFor="upload-from-device">
                                                                <CropOriginalTwoTone />
                                                                <br />
                                                                Nhấn và chọn một hình ảnh
                                                            </label>
                                                        </div>
                                                    ) : (
                                                        <img className="avatar-editor-preview" src={avatarImg.preview} />
                                                    )}
                                                </div>
                                                <div className="avatar-editor-upload">
                                                    {avatarImg.raw || avatarImg.preview ? (
                                                        <div className="avatar-editor-message">
                                                            <label htmlFor="upload-from-device">Chọn một ảnh khác</label>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="upload-from-device"
                                                        accept="image/png, image/jpeg, image/jpg"
                                                        style={{display: "none"}}
                                                        onChange={handleAvatarChange}
                                                    />
                                                </div>
                                                {avatarRef ? (
                                                    <div
                                                        className={
                                                            !avatarImg.preview ? "avatar-editor-submit custom-display-flex" : "avatar-editor-submit"
                                                        }
                                                    >
                                                        {!avatarImg.preview ? (
                                                            <div className="avatar-button-preview" onClick={() => convertImageToBlobURL()}>
                                                                Xem trước
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {/* <button disabled={isLoad} className={isLoad ? "upload-disable-button" : ""} onClick={handleAvatarUpload}>{isLoad ? <CachedTwoTone /> : ""} Cập nhật</button> */}
                                                        <Button disabled={isLoad} variant="contained" color="primary" onClick={handleAvatarUpload}>
                                                            {isLoad ? <CircularProgress size={20} /> : ""} Cập nhật
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                                <div className="main-form">
                                    <p className="profile-form-label">Họ và tên</p>
                                    <input
                                        type="text"
                                        className="profile-form-input"
                                        name="fullname"
                                        defaultValue={currentUser?.fullname}
                                        autoComplete="off"
                                        ref={register({
                                            required: "Bạn hãy điền tên đầy đủ ",
                                            pattern: {
                                                value: /^([^0-9]*)$/,
                                                message: "Tên không được chứa số!",
                                            },
                                            minLength: {
                                                value: 4,
                                                message: "Họ tên của bạn quá ngắn  ",
                                            },
                                            maxLength: {
                                                value: 25,
                                                message: "Họ tên không quá 25 kí tự ",
                                            },
                                        })}
                                    />
                                    <ErrorMessage errors={errors} name="fullname">
                                        {({messages}) =>
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <span className="error-text" key={type}>
                                                    {message}
                                                </span>
                                            ))
                                        }
                                    </ErrorMessage>

                                    <div className="profile-indentify">
                                        <div className="indentify-item">
                                            <p className="profile-form-label">Giới tính</p>
                                            {currentUser?.role === "admin" ? (
                                                <Controller
                                                    as={<Select placeholder="Giới tính" options={options} />}
                                                    name="gender"
                                                    control={control}
                                                    theme={theme => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary25: "#eef1ff",
                                                            primary: "#3f51b5",
                                                        },
                                                    })}
                                                    className="profile-form-gender"
                                                    rules={{required: "Hãy chọn giới tính"}}
                                                    onChange={([selected]) => {
                                                        return selected;
                                                    }}
                                                    defaultValue={null}
                                                />
                                            ) : (
                                                <span className="role-not-admin">{currentUser?.gender === "Male" ? "Nam" : "Nữ"}</span>
                                            )}

                                            <ErrorMessage errors={errors} name="gender">
                                                {({messages}) =>
                                                    messages &&
                                                    Object.entries(messages).map(([type, message]) => (
                                                        <span className="error-text" key={type}>
                                                            {message}
                                                        </span>
                                                    ))
                                                }
                                            </ErrorMessage>
                                        </div>
                                    </div>

                                    <p className="profile-form-label">Số điện thoại</p>
                                    <Controller
                                        as={InputMask}
                                        className="profile-form-input"
                                        name="phone"
                                        control={control}
                                        mask="+84 999 999 999"
                                        placeholder="+84 912 345 678"
                                        autoComplete="off"
                                        maskChar={null}
                                        rules={{required: "Bạn hãy điền số điện thoại "}}
                                    />
                                    <ErrorMessage errors={errors} name="phone">
                                        {({messages}) =>
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <span className="error-text" key={type}>
                                                    {message}
                                                </span>
                                            ))
                                        }
                                    </ErrorMessage>

                                    <p className="profile-form-label">Địa chỉ</p>
                                    <input
                                        type="text"
                                        className="profile-form-input"
                                        name="address"
                                        defaultValue={currentUser?.address}
                                        ref={register({
                                            required: "Bạn hãy điền địa chỉ ",
                                        })}
                                    />
                                    <ErrorMessage errors={errors} name="address">
                                        {({messages}) =>
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <span className="error-text" key={type}>
                                                    {message}
                                                </span>
                                            ))
                                        }
                                    </ErrorMessage>
                                    <div className={currentUser?.role === "admin" ? "profile-form-end" : "profile-display-none"}>
                                        <Button disabled={isLoad} variant="outlined" color="primary" type="submit">
                                            {isLoad ? <CircularProgress size={20} /> : ""} ­ Cập nhật thông tin
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </MiniDrawer>
        </div>
    );
};

export default ProfileStaff;
