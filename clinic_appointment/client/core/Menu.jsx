import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from '../signin/auth-helper'
import { Link, useNavigate, useLocation } from 'react-router-dom';


const isActive = (...paths) => {
  return paths.some((path) => location.pathname === path) ? { color: '#ff4081' } : { color: '#ffffff' };
};
export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Ten Software Dental Clinic
        </Typography>
        {
          !auth.isAuthenticated() && (<span>
            {/* Links to show when not signed in */}
            <Link to="/">
              <IconButton aria-label="Home" style={isActive(location, "/")}>
                <HomeIcon />
              </IconButton>
            </Link>
          </span>)
        }
        {
          auth.isAuthenticated() && (<span>
            {/* Links to show when signed in */}
            <Link to="/appointments">
              <Button style={isActive(location, "/appointments")}>My Appointments
              </Button>
            </Link>
            <Link to="/book-appointment">
              <Button style={isActive(location, "/book-appointment")}>Book Appointment
              </Button>
            </Link>
            <Button color="inherit" onClick={() => {
              auth.clearJWT(() => navigate('/'));
            }}>Sign out</Button>
          </span>)
        }
      </Toolbar>
    </AppBar>
  );
}



