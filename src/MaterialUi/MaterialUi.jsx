import { Container, Grid, makeStyles } from '@material-ui/core';
import React, { useState} from 'react';

const MaterialUi = () => {

    let useStyles = makeStyles({
        align: {
            textAlign: "center",
        }
    })

    let classes = useStyles();
    return ( <div>
        <Container>
            <Grid container className={classes.align}>
                <Grid item xs={5} sm={2} md={6}>item 1</Grid>
                <Grid item xs={5} sm={2} md={6}>item 2</Grid>
                <Grid item xs={5} sm={8} >item 3</Grid>
            </Grid>
        </Container>
    </div> );
}
 
export default MaterialUi;