import React, { useState, useEffect } from 'react';
import MiniDrawer from '../../component/Drawer';
import LoadingPage from '../../component/BackDrop';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, makeStyles, Chip } from '@material-ui/core';
import './style.css';
import Pagination from '@material-ui/lab/Pagination';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import packageStatus from "../../config/packageStatus";
import { userLogin } from '../../redux/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getPackage } from '../../redux/package';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const itemsPage = 3;

const Home = () => {

  const dispatch = useDispatch();
  const { packages } = useSelector(state => state.package);
  const { control, handleSubmit } = useForm();
  const [status, setstatus] = useState("-1");
  const [query, setquery] = useState('');
  const [page, setpage] = useState(1);

  useEffect(() => {

    getPackageData(query, status, page)


  }, []);

  const getPackageData = (query, status, page) => {

    const data = {
      query: query,
      page: page,
      status: status === '-1' ? '' : status,
      itemsPage: itemsPage
    };
    dispatch(getPackage(data))
  }

  const handleChange = (event) => {
    setstatus(event.target.value);
    setpage(1);
    getPackageData(query, event.target.value, 1)
  };


  const onSubmit = data => {
    setquery(data.query)
    setpage(1);
    getPackageData(data.query, status, 1)

  };

  const renderStatus =  packageStatus.status.map((value, index) => {
    return (
      <MenuItem value={value.id}>{value.msg}</MenuItem>
    )
  })

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
    getPackageData(query, status, newPage)
  };

  const renderPackage = packages.length > 0 ?  packages.map((value, index) => (
    <div className="package-data-item" key={value.id}>
      <div className="package-data-item-user package-data-top">
        <h3>Người đặt gói : <span className="highlight">{value?.customer_name}</span></h3>
        <div>
          <Chip
            variant="outlined"
            size="small"
            label={value?.status_name}
            color="primary"
          />
        </div>
      </div>
      <div className="package-data-item-user">
        <h4>Bệnh nhân : <span className="highlight">{value?.patient_name}</span></h4>
        <h4>Bác sĩ : <span className="highlight">{value?.doctor_name}</span> - <span className="highlight">{value?.doctor_phone}</span></h4>
      </div>
      <div className="package-data-item-info">
        <h4>Địa chỉ : <span className="highlight">{value?.address}</span></h4>
        <h4>Liên hệ cho bệnh nhân : <span className="highlight">{value?.package_phone}</span></h4>
        <h4>Lý do : <span className="highlight">{value?.reason}</span></h4>
      </div>
      <div className="highlight"><p>Xem thêm</p></div>
    </div>
  )) : <div>Không có dữ liệu</div>

  const classes = useStyles();

  return (
    <div>
      <LoadingPage />
      <MiniDrawer>
        <div>
          <div className="package-search">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                as={TextField}
                variant="outlined"
                className="packge-search-input"
                label="Tìm kiếm"
                placeholder="Tên bệnh nhân , bác sĩ , số điện thoại ..."
                name="query"
                autoFocus
                control={control}
                defaultValue=""
              />
            </form>
            <FormControl className={classes.formControl}>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={status}
                onChange={handleChange}
              >
                {renderStatus}
              </Select>
            </FormControl>
          </div>
          <div className="package-data">
            {renderPackage}
          </div>
          <br />
          {
            packages?.[0]?.full_count ? (
              <Pagination
                page={page}
                onChange={handleChangePage}
                count={Number(packages?.[0]?.full_count) / itemsPage}
                rowsPerPage={3}
                color="primary" />
            ) : ''
          }

        </div>
      </MiniDrawer>
    </div>
  );
};

export default Home;