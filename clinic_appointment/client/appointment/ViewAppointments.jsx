import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import { list } from './api-appointment.js'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward';
import DeleteAppointment from './DeleteAppointment.jsx'

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
    const [appointments, setList] = useState([])
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
                              <DeleteAppointment appointment={item} onRemove={removeAppointments}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </span>
                })}
            </List>
        </Paper>
    )
}
