import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/user';
import MenuAppBar from './Nav';
import route from "../../config/route";
import { Link, withRouter } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const MiniDrawer = (props) => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const auth = useSelector(state => state.auth);
  const {currentUser} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getUser(auth?.token))

  }, []);



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const renderRoute = Object.keys(route).map((value, index) => {
    if (route[value]?.visible && route[value]?.role !== 'admin') {
      return (
        <Link className="no-active" to={value}>
          <ListItem
            selected={value === props.location.pathname}
            button key={index}>
            <ListItemIcon>{route[value].icon}</ListItemIcon>
            <ListItemText primary={route[value].label} />
          </ListItem>
        </Link>
      )
    }
    else if (route[value]?.visible && route[value]?.role === 'admin') {
      if(currentUser?.role === route[value]?.role){
        return (
          <Link className="no-active" to={value}>
            <ListItem
              selected={value === props.location.pathname}
              button key={index}>
              <ListItemIcon>{route[value].icon}</ListItemIcon>
              <ListItemText primary={route[value].label} />
            </ListItem>
          </Link>
        )
      }
    }
  })

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <MenuAppBar handleDrawerOpen={handleDrawerOpen} />
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <div><ChevronLeftIcon /></div>}
            </IconButton>
          </div>
          <Divider />
          <List curre>
            {renderRoute}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>

    </div>
  );
};

export default withRouter(MiniDrawer);