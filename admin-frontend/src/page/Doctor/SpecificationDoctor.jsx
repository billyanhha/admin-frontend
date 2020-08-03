import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import _ from "lodash";

import {Done, Add} from "@material-ui/icons";
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Chip, CircularProgress} from "@material-ui/core";
import {updateDoctorLanguage, updateDoctorLanguageSuccessful} from "../../redux/staff";

const SpecificationDoctor = props => {
    let typeSpec = props.type ?? 1;

    const {isLoad} = useSelector(state => state.ui);
    const experience = useSelector(state => state.doctor.experience);
    const language = useSelector(state => state.doctor.language);
    const allLanguage = useSelector(state => state.doctor.allLanguage);
    const status = useSelector(state => state.doctor.updateStatus);

    const dispatch = useDispatch();
    const [specData, setSpecData] = useState([{}]);
    const [langPool, setLangPool] = useState([{}]);

    const handleCloseDialog = () => {
        props.closeDialog();
        setSpecData([{}]);
        setLangPool([{}]);
    };

    const handleSubmit = () => {
        if (typeSpec === 1) {
            let submitExp = {exps: []};
            // if (!_.isEmpty(specData))
            //     specData.forEach(data => {
            //         submitExp.exps.push({content: data.???});
            //     });

            // dispatch(updateDoctorLanguage(props.doctorID, submitExp));
        } else if (typeSpec === 2) {
            let submitLang = {languages: []};
            if (!_.isEmpty(specData))
                specData.forEach(data => {
                    submitLang.languages.push({language_id: data.language_id});
                });

            dispatch(updateDoctorLanguage(props.doctorID, submitLang));
        }
    };

    const createLanguagePool = () => {
        if (_.isEmpty(allLanguage)) {
            setLangPool(null);
        } else {
            let pool = allLanguage;

            //set addable == action where: language_id (specData) << NOT MATCH >> id (allLanguage)
            let compareData = allLanguage.filter(({id: id1}) => !props.data.some(({language_id: id2}) => id2 === id1));
            pool.map(data => {
                compareData.map(compare => {
                    if (compare.id === data.id) data.addable = true;
                });
            });
            setLangPool(pool);
        }
    };

    const updateLanguagePool = (isAddAble, language_id) => {
        let pool = langPool;
        for (const data of pool) {
            if (data.id === language_id) {
                data.addable = isAddAble;
                break;
            }
        }
        setLangPool(pool);
    };

    const handleDeleteLanguage = deleteLang => {
        setSpecData(data => data.filter(currentData => currentData.language_id !== deleteLang.language_id));
        updateLanguagePool(true, deleteLang.language_id);
    };

    const handleAddLanguage = addLang => {
        if (addLang.addable) {
            setSpecData(specData => [...specData, {language_id: addLang.id, language_name: addLang.name}]);
            updateLanguagePool(false, addLang.id);
        }
    };

    const renderSpec = _.isEmpty(specData) ? (
        <div>Chưa có dữ liệu</div>
    ) : typeSpec === 1 ? (
        specData?.map(data => (
            <div key={data.id}>
                <TextField label="Helper text" defaultValue={data.content ?? ""} variant="outlined" />
            </div>
        ))
    ) : (
        specData?.map(data => (
            <div className="doctor-spec-chip" key={data.language_id}>
                <Chip
                    className="spec-chip"
                    variant="outlined"
                    label={data.language_name ?? ""}
                    onDelete={() => handleDeleteLanguage(data)}
                    color="secondary"
                />
            </div>
        ))
    );

    const renderLanguagePool = _.isEmpty(langPool)
        ? "Không có dữ liệu"
        : langPool.map(data => (
              <div key={data.id} className="doctor-spec-chip">
                  {!data.addable ? (
                      <Chip
                          className="spec-chip chip-added"
                          label={data.name}
                          deleteIcon={<Done style={{color: "#fff"}} />}
                          onClick={() => handleAddLanguage(data)}
                          onDelete={() => handleAddLanguage(data)}
                      />
                  ) : (
                      <Chip
                          variant="outlined"
                          className="spec-chip"
                          label={data.name}
                          deleteIcon={<Add />}
                          onClick={() => handleAddLanguage(data)}
                          onDelete={() => handleAddLanguage(data)}
                      />
                  )}
              </div>
          ));

    useEffect(() => {
        if (status) {
            handleCloseDialog();
            dispatch(updateDoctorLanguageSuccessful(false));
        }
    }, [status]);

    useEffect(() => {
        setSpecData(props.data);
        if (typeSpec === 2) createLanguagePool();
    }, [props.data, props.type, allLanguage]);

    return (
        <Dialog fullWidth={true} maxWidth="md" open={props.dialogVisible} onClose={() => handleCloseDialog()} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{typeSpec === 1 ? "Cập nhật kinh nghiệm" : "Chỉnh sửa khả năng ngôn ngữ"}</DialogTitle>
            <DialogContent>
                <div className="doctor-spec-wrapper">
                    <div className="doctor-spec-language-added">
                        <div className="doctor-specification-name">Khả năng ngôn ngữ hiện tại</div>
                        <div className="doctor-spec-content">{renderSpec}</div>
                    </div>
                    <div className="doctor-spec-language">
                        <div className="doctor-specification-name">
                            Danh sách ngôn ngữ<b>*</b>
                        </div>
                        <div className="doctor-spec-content">{renderLanguagePool}</div>
                        <p>
                            <b>*</b>: Được chấp nhận bởi hệ thống
                        </p>
                    </div>
                </div>
                <div className="doctor-specification-button">
                    <Button disabled={isLoad} variant="outlined" onClick={() => handleSubmit()} color="primary">
                        {isLoad ? <CircularProgress size={20} /> : ""} ­ Cập nhật
                    </Button>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseDialog()} color="secondary">
                    Huỷ chỉnh sửa và đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(SpecificationDoctor);
