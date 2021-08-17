import { Grid, Card, CardMedia, makeStyles } from '@material-ui/core';
import { AccountCircle, Home } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { shadows } from '@material-ui/system';
import logo from "../download.png"
const Header = () => {

    const useStyles = makeStyles({
        header: {
            height: "5rem",
            display:"flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        icons: {
            fontSize: "3rem",
            marginRight: "2rem",
        }
    })

    const classes = useStyles();
    return ( <Grid>
        <Card  variant="contained" className={classes.header}>
            <CardMedia image={logo} style={{height: "6rem", backgroundSize: "contain", width: "30rem"}}></CardMedia>
            <div>
                <Home className={classes.icons}></Home>
                <AccountCircle className={classes.icons} ></AccountCircle>
            </div>
        </Card>
    </Grid> );
}
 
export default Header;