import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
  ListItemText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { update } from "./api-appointment";
import auth from '../signin/auth-helper.js'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: "center",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  selectField:{
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  error: {
    color: "red",
  },
  submit: {
    margin: "0 auto",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 18,
  },
}));

export default function UpdateAppointment() {
  const { state } = useLocation();
  const jwt = auth.isAuthenticated();

  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: state.firstName,
    lastName: state.lastName,
    date: state.date,
    time: state.time,
    procedure: state.procedure,
    dentist: state.dentist,
  });

  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    const appointment = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      date: values.date || undefined,
      time: values.time || undefined,
      procedure: values.procedure || undefined,
      dentist: values.dentist || undefined,
    };
    update(
      { appointmentId: state._id, appointment },
      { t: jwt.token }
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
      }
    });
  };

  UpdateAppointment.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Update Appointment
          </Typography>

          <TextField
            id="firstName"
            label="First Name"
            className={classes.textField}
            value={values.firstName}
            onChange={handleChange("firstName")}
            margin="normal"
          />
          <TextField
            id="lastName"
            label="Last Name"
            className={classes.textField}
            value={values.lastName}
            onChange={handleChange("lastName")}
            margin="normal"
          />
          <TextField
            id="date"
            label="Date"
            className={classes.textField}
            value={values.date}
            onChange={handleChange("date")}
            margin="normal"
          />
          <Select
            id="time"
            label="Time"
            value={values.time}
            onChange={handleChange("time")}
            className={classes.selectField}
            margin="normal"
            renderValue={(selected) => (
              <ListItemText
                primary={selected}
                style={{
                  color: selected === "Select Time" ? "#757575" : "#000000",
                  textAlign: "left",
                }}
              />
            )}
          >
            <MenuItem value="Select Time" disabled>
              Select Time
            </MenuItem>
            <MenuItem value="09:00 AM">09:00 AM</MenuItem>
            <MenuItem value="10:00 AM">10:00 AM</MenuItem>
            <MenuItem value="11:00 AM">11:00 AM</MenuItem>
            <MenuItem value="12:00 PM">12:00 PM</MenuItem>
            <MenuItem value="01:00 PM">01:00 PM</MenuItem>
            <MenuItem value="02:00 PM">02:00 PM</MenuItem>
            <MenuItem value="03:00 PM">03:00 PM</MenuItem>
            <MenuItem value="04:00 PM">04:00 PM</MenuItem>
            <MenuItem value="05:00 PM">05:00 PM</MenuItem>
          </Select>
          <TextField
            id="procedure"
            label="Procedure"
            className={classes.textField}
            value={values.procedure}
            onChange={handleChange("procedure")}
            margin="normal"
          />
          <TextField
            id="dentist"
            label="Dentist"
            className={classes.textField}
            value={values.dentist}
            onChange={handleChange("dentist")}
            margin="normal"
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={onSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Updated Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Appointment successfully updated.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/appointments">
            <Button
              color="primary"
              autoFocus
              variant="contained"
              onClick={handleClose}
            >
              Close
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
