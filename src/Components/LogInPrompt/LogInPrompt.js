import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

// email val
var validator = require("email-validator");

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  helper: {
    color: '#E53935',
  }
});

class LoginPrompt extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    email: "",
    password: "",
    email_validation_text: "",
    password_validation_text: "",
    reset: false
  };

  this.handleChange = this.handleChange.bind(this);
  this.checkLogin = this.checkLogin.bind(this);
  this.resetRedirect = this.resetRedirect.bind(this);
}

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  loginUser() {
    // reset validators
    this.setState({
      email_validation_text: "",
      password_validation_text: "",
    })

    if (this.state.email === "")
    {
      this.setState({ email_validation_text: "Enter a valid email address"})
      return
    }

    if (this.state.password === "")
    {
      this.setState({ password_validation_text: "Enter a valid password"})
      return
    }

    if (validator.validate(this.state.email) === false)
    {
      this.setState({ email_validation_text: "Invalid email address"})
      return
    }

    axios.post('http://127.0.0.1:5002/api/login', {
      params: {
        email: this.state.email,
        password: this.state.password,
      }
    })
    .then((response) => {
      if (response.data.allow === true)
      {
        var token = response.data.token
        var user = response.data.user
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', user);

        store.dispatch(getAuthStatus({
          auth_status: true,
        }))
        store.dispatch(getCurrentUser({
          user: response.data.user,
        }))
      }
      else
      {
        this.setState({ password_validation_text: "Incorrect email or password"})
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  checkLogin(event)
  {
    if (event.keyCode === 13) {
        this.loginUser()
    }
  }

  resetRedirect() {
    this.setState({
      reset: true
    })
  }

  render() {
    if (store.getState().auth_status.auth_status === true) {
      return <Redirect to='/journal' />
    }
    if (this.state.reset === true) {
      return <Redirect to='/reset' />
    }

    return (
      <div>
        <div className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
            <Typography variant="headline">Sign In</Typography>
             <form className={this.props.classes.form}>
               <FormControl
                    margin="normal"
                    required fullWidth
                    value={this.state.email}
                    onChange={this.handleChange}
                    onKeyDown={(e) => this.checkLogin(e)}
                    >
                 <InputLabel style={{color: 'rgba(0, 0, 0, 0.87)'}} htmlFor="email">Email Address</InputLabel>
                 <Input id="email" name="email" autoComplete="email" autoFocus />
                 <FormHelperText className={this.props.classes.helper}>{this.state.email_validation_text}</FormHelperText>
               </FormControl>
               <FormControl margin="normal" required fullWidth value={this.state.password} onChange={this.handleChange}>
                 <InputLabel style={{color: 'rgba(0, 0, 0, 0.87)'}} htmlFor="password">Password</InputLabel>
                 <Input
                   name="password"
                   type="password"
                   id="password"
                   autoComplete="current-password"
                   onKeyDown={(e) => this.checkLogin(e)}
                 />
                 <FormHelperText className={this.props.classes.helper}>{this.state.password_validation_text}</FormHelperText>
                 <FormHelperText onClick={this.resetRedirect}>forgot?</FormHelperText>
               </FormControl>
               <Button
                 fullWidth
                 className={this.props.classes.submit}
                 onClick={() => this.loginUser()} >Sign In
               </Button>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

LoginPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(LoginPrompt));
