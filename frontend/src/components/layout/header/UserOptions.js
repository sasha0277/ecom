import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from "../../../actions/userAction";
import './Header.css';


const UserOptions = ({user}) => {

    const [open, setOpen]= useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=>state.cart)
    
    const options = [
        {icon:<ListAltIcon/>,name:"Orders",func:orders},
        {icon:<PersonIcon/>,name:"Profile",func:account},
        {icon:<ShoppingCartIcon style={{color:cartItems.length>0 ?"Green":"unset"}}/>,name:`Cart(${cartItems.length})`,func:cart},
        {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser},
    ];

    if(user.role==='admin'){
        options.unshift({icon:<DashboardIcon/>,name:"DashBoard",func:dashboard})
    }

    function dashboard() {
        history.push("/admin/dashboard");
    }

    function orders() {
        history.push("/orders");

    }

    function account(){
        history.push("/account");
    }

    function cart(){
        history.push("/cart");
    }

    function logoutUser() {
        dispatch(logout());
       alert.success("Logout successful");
    }



  return (
      <Fragment>
      <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      onClose={()=>setOpen(false)}
      onOpen={()=>setOpen(true)}
      style={{zIndex:11}}
      open={open}
      direction="down"
      className="speedDial"
      icon={
        <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
      }

      >
      { options.map((item)=>(
        <SpeedDialAction 
        key={item.name} 
        icon={item.icon} 
        tooltipTitle={item.name} 
        onClick={item.func}
            // tooltipOpen={window.innerWidth<=600? true:false}
             tooltipOpen
        />
       ))}
   

      </SpeedDial>

      </Fragment>
  );
};

export default UserOptions;
