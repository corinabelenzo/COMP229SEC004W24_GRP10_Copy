import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dentalclinicImg from './../assets/images/dentalclinic.jpg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        padding: theme.spacing(3),
        marginTop: theme.spacing(20),
        textAlign: 'center',
    },
    card: {
        width: 'calc(50% - 16px)',
        maxWidth: '50%', 
        marginLeft: 50,
    },
    card2:{
        padding: theme.spacing(0, 5, 2),
        marginRight: 10,
    },
    title: {
        padding: theme.spacing(8, 2.5, 2),
        color: theme.palette.openTitle,
    },
    media: {
        minHeight: 400,
    },
    button: {
        margin: theme.spacing(1),
    },
    texts:{
        textAlign: 'left',
    },
    bullets:{
        marginLeft: '2em',
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>

                <CardMedia className={classes.media} image={dentalclinicImg} title="Dental Clinic" />
                <CardContent>
                    <Typography variant="body2" component="p">
                        Welcome to the Dental Clinic Appointment home page.
                    </Typography>
                </CardContent>
            </Card>

            <div>
                <Card className={classes.card2}>
                    <Typography variant="h4" className={classes.title}>
                        Welcome to the Appointment Booking System
                    </Typography>
                    <div className={classes.texts}>
                        <Typography>
                            At our clinic, we provide a wide range of services to cater to your dental needs. Our services include:
                        </Typography>
                        <br />
                        <Typography className={classes.bullets}>
                                &bull; <strong>Cleaning</strong>: Keep your teeth and gums healthy with regular professional cleanings.
                        </Typography>
                        <Typography className={classes.bullets}>
                                &bull;  <strong>Extraction</strong>: Expert extraction services for damaged or problematic teeth.
                        </Typography>
                        <Typography className={classes.bullets}>
                                &bull; <strong>Filling</strong>: Restore your teeth with high-quality fillings for a natural look and feel.
                        </Typography>
                        <Typography className={classes.bullets}>
                                &bull; <strong>And more</strong>: We offer comprehensive dental care to address various dental concerns.
                        </Typography>
                        <br />
                        <Typography>
                            To schedule an appointment and experience our exceptional dental care services, 
                            <br/>please log in or sign up below.
                        </Typography>
                    </div>
                    
                    <div>
                        <Link to="/signup"> 
                            <Button color="primary" variant="contained" className={classes.button}>
                                Sign-up
                            </Button>
                        </Link>
                        <Link to="/signin">
                            <Button color="primary" variant="contained" className={classes.button}>
                                Sign-in
                            </Button>
                        </Link>
                    </div>
                </Card>
                
            </div>
        </div>
    );
}
