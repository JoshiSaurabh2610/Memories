import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles ,AppBar , Tab , Tabs} from '@material-ui/core';
import {VpnKey, AccountCircle} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SignUp from '../components/Signup';
import SignIn from '../components/SignIn';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Auth() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Login " icon={<VpnKey />} {...a11yProps(0)} />
                            <Tab label="Register " icon={<AccountCircle/>}  {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
            <TabPanel value={value} index={0}>
                <SignIn />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SignUp />
            </TabPanel>

        </div>
    );
}
