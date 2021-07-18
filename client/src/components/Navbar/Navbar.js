import classes from "./Navbar.module.css";
import Navitem from "./Navitem";
import { NavItemsData } from './NavData';
import Sidedrawer from "./Sidedrawer";
import { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
const Navbar = () => {
    const history = useHistory();
    const [sideDrawer, setSideDrawer] = useState(false);
    const [Background, setBackground] = useState(false);
    const sideDrawerHandler = () => {
        setSideDrawer(false);
    }

    const onScroll = () => {
        if (window.scrollY > 56) {
            setBackground(true);
        } else {
            setBackground(false);
        }
    }

    window.addEventListener('scroll', onScroll);
    let attachedClasses = [classes.NavBar];
    if (Background) {
        attachedClasses = attachedClasses.concat(classes.active);
    }
    return (
        <>
            <Sidedrawer sideDrawer={sideDrawer} setSideDrawer={sideDrawerHandler} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Hamburger} onClick={() => setSideDrawer(true)}><Menu fontSize="large" /></div>
                <div className={classes.NavItems}>
                    {
                        NavItemsData.map((item, index) => <Navitem link={item.path} key={index}>{item.icon}<span style={{ 'marginLeft': '5px' }}>{item.title}</span></Navitem>)
                    }
                </div>
                <div className={classes.loginBtn}><Button color="secondary" variant="contained" onClick={() => { history.push('/auth') }} > Login / Sign Up </Button></div>
                <div className={classes.loginBtn2}><Button color="secondary" variant="contained" onClick={() => { history.push('/auth') }} > Login / Sign Up </Button></div>
            </div>
            <div style={{ width: "100%", height: "60px" }}></div>
        </>
    )
};
export default Navbar;