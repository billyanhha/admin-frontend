import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from "react-hook-form";
import LoadingPage from '../../component/BackDrop';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const SystemLogin = () => {
    const { control, handleSubmit } = useForm();
    const classes = useStyles();
        
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [disable, setdisable] = useState(false);

    const onSubmit = data => {
        setdisable(true)
        dispatch(userLogin(data))
        setTimeout(() => {
            setdisable(false)
        }, 1000);
    };

    if (auth.isLoggedIn) {
        return <Redirect to="/" />
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <LoadingPage disable = {disable}/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        autoFocus
                        control={control}
                        defaultValue=""
                    />
                    <Controller
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        control={control}
                        defaultValue=""
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Đăng nhập
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default SystemLogin;
