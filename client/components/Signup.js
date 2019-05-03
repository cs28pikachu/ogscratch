import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';

let homeAfterSignupLoaded = false;

const mapStateToProps = store => ({
  username: store.userTraffic.username,
  password: store.userTraffic.password,
  userCreated: store.userTraffic.userCreated,
  failedSignup: store.userTraffic.failedSignup,
});

const mapDispatchToProps = dispatch => ({
  loginUsername: (event) => {dispatch(actions.loginUsername(event.target))},
  loginPassword: (event) => {dispatch(actions.loginPassword(event.target))},
  createuser: (username, password) => {dispatch(actions.createuser(username, password))}
})

class Signup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      if (this.props.userCreated === true) {
        console.log('User Created - redirect to home');
        homeAfterSignupLoaded = true;
        return <Redirect to="/Home"></Redirect>
      }

      const hideMe = "hideMe"
      if(this.props.failedSignup) hideMe = '';

      return (
        <div className="sign-up">
        <h3>Signup</h3>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={(e) => this.props.loginUsername(e)} id="username" placeholder="username"></input>
        <label htmlFor="password">Password</label>
        <input type="password" onChange={(e) => this.props.loginPassword(e)} id="password" placeholder="password"></input>
        <button onClick={(e) => { e.preventDefault(); this.props.createuser(this.props.username, this.props.password)}}>Create Account</button>
        <span id="failedLogin" className={hideMe}>Sign up failed</span>
        </div>
    )
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(Signup);