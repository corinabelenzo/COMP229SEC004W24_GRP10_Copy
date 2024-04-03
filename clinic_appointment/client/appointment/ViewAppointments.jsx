import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import { list } from './api-appointment.js'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import DeleteAppointment from './DeleteAppointment.jsx'
import UpdateButton from './components/UpdateButton.jsx'
import UpdateAppointment from './UpdateAppointment.jsx'

const useStyles = makeStyles(theme => ({
    card: {
        // Define your card styles here
    },
    textField: {
        // Define your text field styles here
    },
    error: {
        // Define your error icon styles here
    },
    submit: {
        // Define your submit button styles here
    },
    title: {
        // Define your title styles here
    },
    root: {
        // Define your root styles here
    },
}));


export default function ViewAppointments() {
    const [appointments, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        list(signal).then((data) => {
            console.log(data)
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                setList(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const onUpdateAppointment = (appointment) => {
        navigate('/update-appointment', { state: appointment });
    }

    const removeAppointments = (appoint) => {
        const updatedAppointments = [...appointments]
        const index = updatedAppointments.indexOf(appoint)
        updatedAppointments.splice(index, 1)
        setList(updatedAppointments)
    }

    const classes = useStyles()
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Schedule of Appointments
            </Typography>
            <List dense>
                {appointments.map((item, i) => {
                    return <span key={i}>

                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Patient Name: " + item.firstName + " " + item.lastName}
                                secondary={"Date: " + item.date + " Time: " + item.time}
                            />
                            <ListItemText
                                primary={"Procedure: " + item.procedure}
                            />
                            <ListItemText
                                primary={"Status: " + item.status}
                            />
                            <ListItemSecondaryAction>
                              <UpdateButton appointment={item} onUpdateAppointment={onUpdateAppointment} />
                              <DeleteAppointment appointment={item} onRemove={removeAppointments}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </span>
                })}
            </List>
        </Paper>
    )
}
