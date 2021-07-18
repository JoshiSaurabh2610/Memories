import classes from "./Navitem.module.css";
import { NavLink } from "react-router-dom";

const Navitem=(props)=>{
    return(
            <NavLink
                className={classes.NavItem}
                to={props.link}
                activeClassName={classes.active}
                onClick={props.onClick}>
                {props.children}
            </NavLink>
    )
};
export default Navitem;