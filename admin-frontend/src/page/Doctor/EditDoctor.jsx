import React, {useState, useRef, useEffect, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import AvatarEditor from "react-avatar-editor";
import {isEmpty} from "lodash";
import {NotificationManager} from "react-notifications";

import {
    CallOutlined,
    HomeOutlined,
    ContactMailOutlined,
    AccountCircleOutlined,
    CardMembership,
    EditOutlined,
    CropOriginalTwoTone,
    Star,
    SignalCellularNullRounded
} from "@material-ui/icons";
import {CircularProgress, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Modal} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import {updateDoctor, updateDoctorSuccessful, getDoctorExperience, getDoctorLanguage, getDoctorDegree} from "../../redux/staff";
import DefaultAvatar from "../../assets/image/hhs-default_avatar.jpg";

const EditDoctor = props => {
    const {isLoad} = useSelector(state => state.ui);
    const {control, handleSubmit, register, reset} = useForm(props.data);

    const dispatch = useDispatch();
    const updateStatus = useSelector(state => state.doctor.updateStatus);
    const experienceData = useSelector(state => state.doctor.experience);
    const languageData = useSelector(state => state.doctor.language);
    const degreeData = useSelector(state => state.doctor.degree);

    const [forceLoading, setForceLoading] = useState(true);
    const [experience, setExperience] = useState(null);
    const [language, setLanguage] = useState(null);
    const [degree, setDegree] = useState(null);

    const [needEdit, setNeedEdit] = useState(false);

    const [avatarImg, setAvatarImg] = useState({preview: "", raw: ""});
    const [avatarVisible, setAvatarVisible] = useState(false);
    const [avatarRef, setAvatarRef] = useState(null);
    const [avatarName, setAvatarName] = useState("");
    const [avatarProperty, setAvatarProperty] = useState({
        scale: 1,
        preview: null
    });

    const resetAvatar = () => {
        setAvatarImg({preview: null, raw: null});
        setAvatarRef(null);
        setAvatarVisible(false);
        setAvatarName("");
    };

    const resetState = () => {
        setExperience(null);
        setLanguage(null);
        setDegree(null);
        setForceLoading(true);
        setNeedEdit(false);
        resetAvatar();
    };

    const handleCloseDialog = () => {
        props.closeDialog();
        resetState();
    };

    const handleUpdateDoctor = data => {
        let req = {
            id: data.id,
            fullname: data.fullname,
            email: data.email,
            gender: data.gender,
            address: data.address,
            phone: data.phone,
            license: data.license,
            doctorAvatar: data.avatarurl
        };

        dispatch(updateDoctor(data.id, req));
    };

    //Avatar handle function
    const handleAvatarChange = e => {
        if (e.target.files.length) {
            setAvatarImg({
                preview: "",
                raw: URL.createObjectURL(e.target.files[0])
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
                file = new File([blob], avatarName === "" ? "noname.jpg" : avatarName);

                const formData = new FormData();
                formData.append("doctorAvatar", file);
                dispatch(updateDoctor(props.data.id, formData));
            });
        } else {
            NotificationManager.error("Không thể xác nhận được ảnh tải lên.", "", 3000);
        }
    };

    const convertImageToBlobURL = () => {
        if (avatarRef) {
            const canvas = avatarRef.getImageScaledToCanvas().toDataURL();
            fetch(canvas)
                .then(res => res.blob())
                .then(blob => setAvatarImg({preview: window.URL.createObjectURL(blob)}));
        } else {
            NotificationManager.error("Không thể mở chế độ xem trước.", "", 3000);
        }
    };

    const renderExperience = forceLoading ? (
        <Skeleton variant="rect" width={450} height={150}>
            Đang lấy dữ liệu...
        </Skeleton>
    ) : isEmpty(experience) ? (
        <div>Chưa có dữ liệu</div>
    ) : (
        experience?.map(data => <div key={data.id}>{data.content}</div>)
    );

    const renderLanguage = forceLoading ? (
        <Skeleton variant="rect" width={450} height={50}>
            Đang lấy dữ liệu...
        </Skeleton>
    ) : isEmpty(language) ? (
        <div>Chưa có dữ liệu</div>
    ) : (
        language?.map(data => (
            <div key={data.language_id}>
                <b>{data.language_name}</b>
            </div>
        ))
    );

    const renderDegree = forceLoading ? (
        <Skeleton variant="rect" width={450} height={50}>
            Đang lấy dữ liệu...
        </Skeleton>
    ) : isEmpty(degree) ? (
        <div>Chưa có dữ liệu</div>
    ) : (
        degree?.map(data => (
            <div key={data.degree_id}>
                <b>{data.degree_name}</b>
            </div>
        ))
    );

    useLayoutEffect(() => {
        setExperience(experienceData);
        setLanguage(languageData);
        setDegree(degreeData);
    }, [experienceData, languageData, degreeData]);

    useLayoutEffect(() => {
        if (experience && language && degree && !isLoad) {
            setTimeout(() => {
                setForceLoading(false);
            }, 1000); //1s: estimate for "degree.map()" function that render degree done.
        }
    }, [experience, language, degree]);

    // useEffect(() => {
    //     console.log(forceLoading)
    // }, [forceLoading]);

    useEffect(() => {
        if (props.dialogVisible && props.data.id) {
            dispatch(getDoctorExperience(props.data.id));
            dispatch(getDoctorLanguage(props.data.id));
            dispatch(getDoctorDegree(props.data.id));
        }
    }, [props.dialogVisible]);

    useEffect(() => {
        reset(props.data);
    }, [props.data]);

    useEffect(() => {
        if (updateStatus) {
            handleCloseDialog();
            dispatch(updateDoctorSuccessful(false));
        }
    }, [updateStatus]);

    return (
        <Dialog fullWidth={true} maxWidth="lg" open={props.dialogVisible} onClose={() => handleCloseDialog()} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{needEdit ? "Chỉnh sửa thông tin Bác sĩ" : "Thông tin Bác sĩ"}</DialogTitle>
            <DialogContent>
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
                            {avatarRef && (
                                <div className={!avatarImg.preview ? "avatar-editor-submit custom-display-flex" : "avatar-editor-submit"}>
                                    {!avatarImg.preview && (
                                        <div className="avatar-button-preview" onClick={() => convertImageToBlobURL()}>
                                            Xem trước
                                        </div>
                                    )}
                                    <Button disabled={isLoad} variant="contained" color="primary" onClick={handleAvatarUpload}>
                                        {isLoad && <CircularProgress size={20} />} Cập nhật
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
                <div className="doctor-detail-dialog">
                    <div className="doctor-basic-session">
                        <div className="doctor-profile-info">
                            <div className="profile-avatar">
                                <div className="avatar-wrapper">
                                    <img id="Avatar-profile" src={props.data?.avatarurl ?? DefaultAvatar} alt="Avatar" />
                                </div>
                                <div className="avatar-action">
                                    <EditOutlined id="Avatar-icon" fontSize="small" onClick={() => setAvatarVisible(true)} />
                                    <div className="avatar-note">Đổi ảnh đại diện</div>
                                </div>
                            </div>
                            <div className="doctor-basic-name">{props.data?.fullname}</div>
                            <div className="show-description">
                                <div className="doctor-basic-showoff">
                                    <p className={props.data?.active ? "showoff-status-active" : "showoff-status-deactive"}>
                                        {props.data?.active ? "Hoạt động" : "Ngừng hoạt động"}
                                    </p>
                                    <span></span>
                                    <p>
                                        <CardMembership color="primary" style={{fontSize: 14}} /> {props.data?.license}
                                    </p>
                                    {props.data?.average_rating != 0 && (
                                        <>
                                            <span></span>
                                            <p>
                                                <Star style={{fontSize: 16, color: "#fadb14"}} /> ­ {props.data?.average_rating}
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className="doctor-basic-showoff showoff-description">
                                    <p>Trạng thái</p>
                                    <p>Giấy phép</p>
                                    {props.data?.average_rating != 0 && <p>Đánh giá TB</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="doctor-profile-session">
                        <div className="doctor-specification-name">Thông tin cơ bản</div>
                        <div className={!needEdit || isLoad ? "doctor-form-disable-edit" : ""}>
                            <form onSubmit={handleSubmit(handleUpdateDoctor)}>
                                <Controller
                                    as={TextField}
                                    margin="normal"
                                    label="Tên đầy đủ"
                                    name="fullname"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleOutlined />
                                            </InputAdornment>
                                        )
                                    }}
                                    control={control}
                                    defaultValue=""
                                    required
                                />
                                <Controller
                                    as={TextField}
                                    margin="normal"
                                    // label={needEdit ? "Email (không thể thay đổi)" : "Email"}
                                    label="Email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ContactMailOutlined />
                                            </InputAdornment>
                                        )
                                        // readOnly: true
                                    }}
                                    control={control}
                                    defaultValue=""
                                    required
                                />
                                <div className="doctor-sex-session">
                                    Giới tính
                                    {needEdit ? (
                                        <select className="staff-gender-select" name="gender" ref={register}>
                                            <option value="Female">Nữ</option>
                                            <option value="Male">Nam</option>
                                        </select>
                                    ) : (
                                        <span>{props.data.gender === "Male" ? " Nam" : " Nữ"}</span>
                                    )}
                                </div>
                                <Controller
                                    as={TextField}
                                    margin="normal"
                                    name="address"
                                    fullWidth
                                    multiline
                                    label="Địa chỉ"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HomeOutlined />
                                            </InputAdornment>
                                        )
                                    }}
                                    control={control}
                                    defaultValue=""
                                    required
                                />
                                <Controller
                                    as={TextField}
                                    margin="normal"
                                    name="phone"
                                    label="Số điện thoại"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CallOutlined />
                                            </InputAdornment>
                                        )
                                    }}
                                    type="number"
                                    control={control}
                                    defaultValue=""
                                    required
                                />
                                <Controller
                                    as={TextField}
                                    margin="normal"
                                    name="license"
                                    label="Giấy phép hành nghề"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CardMembership />
                                            </InputAdornment>
                                        )
                                    }}
                                    control={control}
                                    defaultValue=""
                                    required
                                />

                                <div className="doctor-submit-session">
                                    {needEdit ? (
                                        <Button disabled={isLoad} type="submit" size="small" variant="contained" color="primary">
                                            {isLoad ? <CircularProgress size={20} /> : ""} ­ Lưu chỉnh sửa
                                        </Button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </form>
                            {needEdit ? (
                                ""
                            ) : (
                                <div className="doctor-specification-button">
                                    <Button disabled={isLoad} variant="outlined" color="primary" onClick={() => setNeedEdit(true)}>
                                        <EditOutlined /> ­ Chỉnh sửa thông tin
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="doctor-specification-session">
                        <div className="doctor-specification-name">Kinh nghiệm</div>
                        <div className="doctor-exp">{renderExperience}</div>
                        <div className="doctor-specification-button">
                            <Button
                                disabled={isLoad || forceLoading}
                                variant="outlined"
                                size="small"
                                color="primary"
                                onClick={() => props.openSpecification(1, experienceData)}
                            >
                                Cập nhật kinh nghiệm
                            </Button>
                        </div>
                        <div className="doctor-specification-name">Khả năng ngôn ngữ</div>
                        <div>
                            <div className="doctor-specification-language">{renderLanguage}</div>
                            <div className="doctor-specification-button">
                                <Button
                                    disabled={isLoad || forceLoading}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    onClick={() => props.openSpecification(2, languageData)}
                                >
                                    Cập nhật
                                </Button>
                            </div>
                        </div>
                        <div className="doctor-specification-name">Bằng cấp & Chứng chỉ</div>
                        <div>
                            <div className="doctor-specification-language">{renderDegree}</div>
                            <div className="doctor-specification-button">
                                <Button
                                    disabled={isLoad || forceLoading}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    onClick={() => props.openSpecification(3, degreeData)}
                                >
                                    Cập nhật
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseDialog()} color="secondary">
                    {needEdit ? "Huỷ chỉnh sửa và đóng" : "Đóng"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(EditDoctor);
