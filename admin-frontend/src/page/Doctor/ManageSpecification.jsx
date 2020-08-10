import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "lodash";

import {Translate, CardMembership, Done, Add, Clear, CancelRounded, DeleteOutline} from "@material-ui/icons";
import {Button, TextField, Chip, CircularProgress, Tooltip, Collapse, Snackbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import {
    getAllLanguage,
    createLanguage,
    updateLanguage,
    deleteLanguage,
    updateLanguageSuccessful,
    getAllDegree,
    updateDegreeSuccessful,
    createDegree,
    updateDegree,
    deleteDegree
} from "../../redux/staff";

const ManageSpecification = () => {
    const dispatch = useDispatch();
    const textRef = useRef();
    const degreeRef = useRef();
    const {isLoad} = useSelector(state => state.ui);
    const allLanguage = useSelector(state => state.doctor.allLanguage);
    const allDegree = useSelector(state => state.doctor.allDegree);
    const statusApiLang = useSelector(state => state.doctor.manageLang);
    const statusApiDegree = useSelector(state => state.doctor.manageDegree);

    const [language, setLanguage] = useState([{}]);
    const [addInput, setAddInput] = useState(false);
    const [editLang, setEditLang] = useState(false);
    const [updateLang, setUpdateLang] = useState({id: null, name: null, status: false});

    const [degree, setDegree] = useState([{}]);
    const [addInputDegree, setAddInputDegree] = useState(false);
    const [editDegree, setEditDegree] = useState(false);
    const [degreeID, setDegreeID] = useState(null);

    const [openAlert, setOpenAlert] = useState(false);
    const [openToast, setOpenToast] = useState(false);

    const hint = Math.floor(Math.random() * 10) + 1;

    /*
        ========================================
        type →  0: Language
                1: Degree
                2: License
        ========================================
    */
    const toggleView = type => {
        if (type === 0) {
            if (editLang) {
                setEditLang(false);
                if (openAlert && (!editLang || !editDegree)) setOpenAlert(false);
            } else {
                setEditLang(true);
                setOpenAlert(true);
            }
        } else {
            if (editDegree) {
                setEditDegree(false);
                if (openAlert && (!editLang || !editDegree)) setOpenAlert(false);
            } else {
                setEditDegree(true);
                setOpenAlert(true);
            }
        }
    };

    const handleCancelUpdate = type => {
        if (type === 0) {
            setAddInput(false);
            setUpdateLang({id: null, name: null, status: false});
        } else if (type === 1) {
            setAddInputDegree(false);
            setDegreeID(null);
        }
    };

    const handleManagementLanguage = () => {
        if (textRef.current.value) {
            let data = {name: textRef.current.value};
            if (!updateLang.status) {
                dispatch(createLanguage(data));
            } else {
                dispatch(updateLanguage(updateLang.id, data));
            }
        }
    };

    const handleUpdateLanguage = data => {
        if (!isLoad) {
            if (!addInput && !updateLang.status) {
                setUpdateLang({id: data.id, name: data.name, status: true});
            } else {
                setOpenToast(true);
            }
        }
    };

    const handleDeleteLanguage = deleteLang => {
        if (!isLoad) dispatch(deleteLanguage(deleteLang.id));
    };

    const handleManagementDegree = (action, id) => { 
        if (degreeRef?.current?.value) {
            let data = {name: degreeRef.current.value};
            if (action === 0) {
                //Create
                dispatch(createDegree(data));
            } else if (action === 1) {
                //Update
                dispatch(updateDegree(degreeID, data));
            }
        }
        if (action === 2 && !isLoad) {
            //Delete
            dispatch(deleteDegree(id));
        }
    };

    const renderLanguage = isEmpty(language) ? (
        isLoad ? (
            <div>
                <CircularProgress size={20} /> ­ Đang lấy dữ liệu...
            </div>
        ) : (
            <div>Chưa có dữ liệu</div>
        )
    ) : (
        language?.map(data => (
            <div key={data.id}>
                {!editLang ? (
                    <Chip className="spec-chip" variant="outlined" label={data.name ?? ""} color="primary" />
                ) : (
                    <Chip
                        disabled={isLoad}
                        className="spec-chip"
                        variant="outlined"
                        label={data.name ?? ""}
                        onClick={() => handleUpdateLanguage(data)}
                        onDelete={() => handleDeleteLanguage(data)}
                        color="secondary"
                    />
                )}
            </div>
        ))
    );

    const renderDegree = isEmpty(degree) ? (
        isLoad ? (
            <div>
                <CircularProgress size={20} /> ­ Đang lấy dữ liệu...
            </div>
        ) : (
            <div>Chưa có dữ liệu</div>
        )
    ) : (
        degree?.map(data => (
            <div key={data.id}>
                {!editDegree ? (
                    <div className="doctor-all-degree">{data.name}</div>
                ) : (
                    <div>
                        {degreeID === data.id ? (
                            <div className="doctor-all-degree-input">
                                <TextField
                                    inputRef={degreeRef}
                                    disabled={isLoad}
                                    defaultValue={data.name}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                                <Tooltip title={isLoad ? "Đang gửi yêu cầu" : "Xác nhận"}>
                                    <Button color="primary" size="small" onClick={() => handleManagementDegree(1)}>
                                        {isLoad ? <CircularProgress size={20} /> : <Done />}
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Huỷ">
                                    <Button color="secondary" size="small" disableElevation onClick={() => handleCancelUpdate(1)}>
                                        <Clear />
                                    </Button>
                                </Tooltip>
                            </div>
                        ) : (
                            <div className="doctor-all-degree-input">
                                <Tooltip title={!degreeID && !addInputDegree ? "Nhấn để chỉnh sửa" : ""}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        disabled
                                        value={data.name ?? ""}
                                        onClick={() => {
                                            if (!degreeID && !addInputDegree) setDegreeID(data.id);
                                            else {
                                                if (!openToast) setOpenToast(true);
                                            }
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title={"Xoá " + data.name}>
                                    <Button color="secondary" size="small" disableElevation onClick={() => handleManagementDegree(2, data.id)}>
                                        <DeleteOutline />
                                    </Button>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                )}
            </div>
        ))
    );

    useEffect(() => {
        if (statusApiLang) {
            dispatch(updateLanguageSuccessful());
            handleCancelUpdate(0);
        }
        if (statusApiDegree) {
            dispatch(updateDegreeSuccessful());
            handleCancelUpdate(1);
        }
    }, [statusApiLang, statusApiDegree]);

    useEffect(() => {
        if (allLanguage) setLanguage(allLanguage);
    }, [allLanguage]);

    useEffect(() => {
        if (allDegree) setDegree(allDegree);
    }, [allDegree]);

    useEffect(() => {
        dispatch(getAllLanguage());
        dispatch(getAllDegree());
    }, []);

    return (
        <div>
            <Snackbar open={openToast} autoHideDuration={5000} onClose={() => setOpenToast(false)}>
                <Alert severity="info" onClose={() => setOpenToast(false)}>
                    Xin hãy nhấn <Clear color="secondary" fontSize="inherit" /> (Huỷ) trước khi chọn sửa <b>Ngôn ngữ</b> hoặc <b>Bằng cấp</b> khác!
                </Alert>
            </Snackbar>
            <Collapse in={openAlert}>
                <Alert
                    severity="warning"
                    action={
                        <Button color="inherit" size="small" onClick={() => setOpenAlert(false)}>
                            <b>Tôi hiểu</b>
                        </Button>
                    }
                >
                    Chú ý: Đang trong chế độ <b>chỉnh sửa</b> {editLang && editDegree ? "Ngôn ngữ và Bằng cấp" : editDegree ? "Bằng cấp" : "Ngôn ngữ"}
                </Alert>
            </Collapse>
            {hint === 3 ? <div className="doctor-spec-hint">Mẹo: Nhấn tổ hợp phím CTRL F (hoặc F3) để tìm kiếm trong trang.</div> : " "}
            <div className="doctor-accepted-spec">
                <div className="doctor-accepted-spec-title">
                    <div>
                        <Translate fontSize="small" /> ­ ­Ngôn ngữ
                    </div>
                    {!editLang ? (
                        <div className="doctor-accepted-edit" onClick={() => toggleView(0)}>
                            Chỉnh sửa
                        </div>
                    ) : (
                        <div className="doctor-accepted-cancel" onClick={() => toggleView(0)}>
                            Về chế độ xem
                        </div>
                    )}
                </div>
                {!editLang ? (
                    <>
                        <div className="doctor-spec-desc">Những Ngôn ngữ được hệ thống chấp nhận</div>
                        <div className="doctor-accepted-language">{renderLanguage}</div>
                    </>
                ) : (
                    <>
                        <div className="doctor-spec-desc">
                            <b>Nhấn vào thẻ ngôn ngữ để sửa nội dung.</b> | Nhấn <CancelRounded style={{fontSize: "16px", color: "#f50057"}} /> để xoá
                            ngôn ngữ tương ứng khỏi hệ thống.
                        </div>
                        <div className="doctor-accepted-language">
                            {renderLanguage}
                            {addInput || updateLang.status ? (
                                ""
                            ) : (
                                <Button disabled={isLoad} size="small" color="primary" onClick={() => setAddInput(true)} variant="outlined">
                                    <Add /> ­ ­ Thêm
                                </Button>
                            )}
                        </div>
                        <div className="doctor-language-edit">
                            {addInput || updateLang.status ? (
                                <div className="doctor-language-add">
                                    <TextField
                                        inputRef={textRef}
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        label={updateLang.status ? "Sửa " + updateLang.name : "Thêm ngôn ngữ"}
                                        defaultValue=""
                                    />
                                    <Tooltip title={isLoad ? "Đang gửi yêu cầu" : "Xác nhận"}>
                                        <Button color="primary" size="small" onClick={() => handleManagementLanguage()}>
                                            {isLoad ? <CircularProgress size={20} /> : <Done />}
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Huỷ">
                                        <Button color="secondary" size="small" disableElevation onClick={() => handleCancelUpdate(0)}>
                                            <Clear />
                                        </Button>
                                    </Tooltip>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className="doctor-accepted-spec">
                <div className="doctor-accepted-spec-title">
                    <div>
                        <CardMembership fontSize="small" /> ­ ­ Bằng cấp / Chứng chỉ
                    </div>
                    {!editDegree ? (
                        <div className="doctor-accepted-edit" onClick={() => toggleView(1)}>
                            Chỉnh sửa bằng cấp
                        </div>
                    ) : (
                        <div className="doctor-accepted-cancel" onClick={() => toggleView(1)}>
                            Đóng chỉnh sửa
                        </div>
                    )}
                </div>
                {!editDegree ? (
                    <>
                        <div className="doctor-spec-desc">Những Bằng cấp / Chứng chỉ được hệ thống chấp nhận</div>
                        <div className="doctor-accepted-language">{renderDegree}</div>
                    </>
                ) : (
                    <>
                        <div className="doctor-spec-desc">
                            <b>Nhấn vào Bằng cấp để sửa nội dung tương ứng</b>
                        </div>
                        <div className="doctor-accepted-degree">
                            {renderDegree}
                            {addInputDegree || degreeID ? (
                                ""
                            ) : (
                                <Button
                                    disabled={isLoad}
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                        if (!degreeID) setAddInputDegree(true);
                                        else {
                                            if (!openToast) setOpenToast(true);
                                        }
                                    }}
                                    variant="outlined"
                                >
                                    <Add /> ­ ­ Thêm bằng cấp
                                </Button>
                            )}
                            {addInputDegree ? (
                                <div className="doctor-all-degree-input">
                                    <TextField inputRef={degreeRef} variant="outlined" fullWidth size="small" label="Thêm Bằng cấp" defaultValue="" />
                                    <Tooltip title={isLoad ? "Đang gửi yêu cầu" : "Xác nhận"}>
                                        <Button color="primary" size="small" onClick={() => handleManagementDegree(0)}>
                                            {isLoad ? <CircularProgress size={20} /> : <Done />}
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Huỷ">
                                        <Button color="secondary" size="small" disableElevation onClick={() => handleCancelUpdate(1)}>
                                            <Clear />
                                        </Button>
                                    </Tooltip>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageSpecification;
