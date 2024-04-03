import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, TextField, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { create } from './api-user';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: '0 auto',
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    textField: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    error: {
        color: 'red',
    },
    submit: {
        margin: '0 auto',
        marginBottom: theme.spacing(2),
    },
    title: {
        fontSize: 18,
    },
    formControl: {
        width: '100%',
        marginBottom: theme.spacing(2),
        textAlign: 'left',
    },
}));

export default function Signup() {
    const classes = useStyles();
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        usertype: '',
        birthday: '',
        age: '',
        gender: '',
        contactNumber: '',
        address: '',
        allergies: '',
    });
    const [open, setOpen] = useState(false);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickSubmit = () => {
        const user = {
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            usertype: values.usertype || undefined,
            birthday: values.birthday || undefined,
            age: values.age || undefined,
            gender: values.gender || undefined,
            contactNumber: values.contactNumber || undefined,
            address: values.address || undefined,
            allergies: values.allergies || undefined,
        };
        create(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setOpen(true);
            }
        });
    };

    Signup.propTypes = {
        open: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
    };

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign Up
                    </Typography>

                    <TextField
                        id="firstName"
                        label="First Name"
                        className={classes.textField}
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                        margin="normal"
                    />
                    <TextField
                        id="lastName"
                        label="Last Name"
                        className={classes.textField}
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                        margin="normal"
                    />
                    <TextField
                        id="email"
                        label="Email"
                        className={classes.textField}
                        value={values.email}
                        onChange={handleChange('email')}
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        value={values.password}
                        onChange={handleChange('password')}
                        type="password"
                        margin="normal"
                    />
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">User Type</FormLabel>
                        <RadioGroup aria-label="usertype" name="usertype" value={values.usertype} onChange={handleChange('usertype')}>
                            <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                            <FormControlLabel value="dentist" control={<Radio />} label="Dentist" />
                            <FormControlLabel value="receptionist" control={<Radio />} label="Receptionist" />
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        </RadioGroup>
                    </FormControl>
                    {values.usertype === 'patient' && (
                        <div>
                            <TextField
                                id="birthday"
                                label="Birthday"
                                className={classes.textField}
                                value={values.birthday}
                                onChange={handleChange('birthday')}
                                margin="normal"
                            />
                            <TextField
                                id="age"
                                label="Age"
                                className={classes.textField}
                                value={values.age}
                                onChange={handleChange('age')}
                                margin="normal"
                            />
                            <TextField
                                id="gender"
                                label="Gender"
                                className={classes.textField}
                                value={values.gender}
                                onChange={handleChange('gender')}
                                margin="normal"
                            />
                            <TextField
                                id="contactNumber"
                                label="Contact Number"
                                className={classes.textField}
                                value={values.contactNumber}
                                onChange={handleChange('contactNumber')}
                                margin="normal"
                            />
                            <TextField
                                id="address"
                                label="Address"
                                className={classes.textField}
                                value={values.address}
                                onChange={handleChange('address')}
                                margin="normal"
                            />
                            <TextField
                                id="allergies"
                                label="Allergies"
                                className={classes.textField}
                                value={values.allergies}
                                onChange={handleChange('allergies')}
                                margin="normal"
                            />
                        </div>
                    )}
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={clickSubmit}
                        className={classes.submit}>
                        Submit
                    </Button>
                </CardActions>
            </Card>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/Signin">
                        <Button color="primary" autoFocus variant="contained" onClick={handleClose}>
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}
