import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Redirect } from 'react-router-dom';
// import test1 from './Test1';
// import MainContainer from './containers/MainContainer.jsx';

let loaded = false;

const mapStateToProps = store => ({
//   username: store.userTraffic.username,
//   password: store.userTraffic.password,
  verified: store.userTraffic.verified,
  error: store.userTraffic.error
});

const mapDispatchToProps = dispatch => ({
  checkSession: () => {dispatch(actions.checkSession())},
  logout: () => {dispatch(actions.logout())}
  
});




class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.checkSession()
  }

  render() {
    
    let hiddenClass = 'hideMe';
    if(this.props.verified) hiddenClass = '';

    if (this.props.verified != true && loaded === false) {
        loaded = true;
        console.log(`Redirecting from /main comp`);
        return <Redirect to="/signin"></Redirect>
    }
    // if (this.props.verified === true && loaded === false) {
    //   loaded = true;
    //   return <Redirect to="/test2"></Redirect>
    // }

    return (
      <div className="MainContainer">
        <h1 className="welcomeText"><span id="welcomeText">Welcome</span><span id='fixedTitle'>  <span id="the">THE</span> Artful Collective</span></h1>
        <button id="logoutButton" className={hiddenClass} onClick={this.props.logout}>Logout</button>

      </div>
    )
    
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(MainContainer);