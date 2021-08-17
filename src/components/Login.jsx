import React, {useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Link } from "react-router-dom";
import logo from "../download.png"
import { TextField, Grid, Button, Paper, Card, CardContent, CardActions, Container, CardMedia, Typography, makeStyles } from '@material-ui/core';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    let {login} = useContext(AuthContext);

    const handleLogin = async(e) => {
        
        // email, password

        try {
            await login(email, password);
            props.history.push("/");
        } catch (error) {
            setMessage(error.message);
            setEmail("");
            setPassword("");
        }
    };

    let useStyles = makeStyles({
        centerDivs: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            width: "100vw",
        },

        carousal :{height: "10rem", backgroundColor: "lightgray"},

        fullWidth : {
            width:"100%",
        },

        centerElements :{
            display:"flex",
            flexDirection: "column",
        },

        mb: {
            marginBottom: "1rem",

        },
        
        mt: {
            marginTop: "7rem",
        },
        padding:{
            paddingTop:"1rem",
            paddingBottom: "1rem",
        },

        alignCenter: {
            justifyContent:"center",
        },
    });

    let classes = useStyles();
    return ( <>
        <div>
            <Container>
                <Grid container spacing={2}>
                    {/*Carousel */}
                    <Grid item sm={5} style={{marginTop: "7rem"}}>
                        <Paper className={classes.carousal}>Carousel</Paper>
                    </Grid>
                    <Grid item sm={3}>
                        <Card variant="outlined" style={{marginTop: "7rem"}}className={classes.mb}>
                            <CardMedia
                            image = {logo}
                            style={{height: "5rem", backgroundSize: "contain"}}></CardMedia>
                            <CardContent className={classes.centerElements}>
                                <TextField
                                className={classes.mb}
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                size="small"
                                onChange={(e) => setEmail(e.target.value)}
                                ></TextField>
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    size="small"
                                    onChange={(e)=>setPassword(e.target.value)}
                                ></TextField>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLogin}

                                >Login</Button>
                            </CardActions>
                        </Card>
                        <Card variant="outlined" className={classes.padding}>
                            <Typography style={{textAlign:"center"}}>
                                Don't have an account?
                                <Button variant="contained" color="primary">
                                    <Link style={{color:"white"}} to="/signup">
                                        SignUp
                                    </Link>
                                </Button>
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    </> );
}
 
export default Login;