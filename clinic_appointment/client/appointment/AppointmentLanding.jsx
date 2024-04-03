import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "87vh",
    padding: theme.spacing(2),
    background: "#f0f0f0",
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  buttonContainer:{
    display: "inline-flex",
  },
  button:{
    margin: theme.spacing(1),
  },
}));

const InitialPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Welcome to the Appointment Booking System
      </Typography>
      <Typography>
        The Dental Clinic offers services like cleaning, extraction, filling, etc. Login to book an appointment
      </Typography>
      <div>
        <Link to="/signup"> 
        <Button color="primary" variant="contained" className={classes.button}>
            Signup
            </Button>
        </Link>
        <Link to="/signin">
            <Button color="primary" variant="contained" className={classes.button}>
                Signin
            </Button>
        </Link>
        <Link to="/add-appointment">
            <Button color="primary" variant="contained" className={classes.button}>
                Placeholder
            </Button>
        </Link>
      </div>
      
    </div>
  );
};

export default InitialPage;
