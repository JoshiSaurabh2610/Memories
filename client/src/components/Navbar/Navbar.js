import classes from "./Navbar.module.css";
import Navitem from "./Navitem";
import { NavItemsData } from './NavData';
import Sidedrawer from "./Sidedrawer";
import { useContext, useEffect, useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useLocation, useHistory } from "react-router-dom";
const Navbar = () => {
    console.log("Navbar Rendered");
    const history = useHistory();
    const location = useLocation();
    const [sideDrawer, setSideDrawer] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const sideDrawerHandler = () => {
        setSideDrawer(false);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(user);
        setUser(JSON.parse(localStorage.getItem("user")));
    }, [location])

    // const onScroll = () => {
    //     if (window.scrollY > 56) {
    //         setBackground(true);
    //     } else {
    //         setBackground(false);
    //     }
    // }
    // window.addEventListener('scroll', onScroll);

    let attachedClasses = [classes.NavBar];
    // if (Background) {
    //     attachedClasses = attachedClasses.concat(classes.active);
    // }
    console.log(user);
    return (
        <>
            <Sidedrawer sideDrawer={sideDrawer} setSideDrawer={sideDrawerHandler} user={user ? true : false} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Hamburger} onClick={() => setSideDrawer(true)}><Menu fontSize="large" /></div>
                <div className={classes.NavItems}>
                    {
                        NavItemsData.map((item, index) => {
                            if (item.auth && !user) {
                                return null;
                            }
                            else {
                                return <Navitem link={item.path} key={index}>{item.icon}<span style={{ 'marginLeft': '5px' }}>{item.title}</span></Navitem>
                            }
                        })
                    }
                </div>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar alt={user.name} src={user.imageUrl}>{user?.name.charAt(0)}</Avatar>
                            <Button style={{ margin: "0 5px 0 10px" }} variant="contained" color="secondary" onClick={()=>{ localStorage.clear(); history.push('/')}}>Logout</Button>
                        </div>
                    ) : <div className={classes.loginBtn}><Button color="secondary" variant="contained" onClick={() => { history.push('/auth') }} > Login / Sign Up </Button></div>
                }
            </div>
            <div style={{ width: "100%", height: "60px" }}></div>
        </>
    )
};
export default Navbar;