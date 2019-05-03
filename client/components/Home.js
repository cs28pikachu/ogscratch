import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../actions/actions';

import ArtUnit from './ArtUnit.jsx';

const mapStateToProps = store => ({
  error: store.userTraffic.error,
  art: store.userTraffic.art,
  verified: store.userTraffic.verified,
});

const mapDispatchToProps = dispatch => ({
  getArt: () => {dispatch(actions.getArt())},
  logout: () => {dispatch(actions.logout())}
});


class Home extends Component {
  constructor(props) {
    super(props)
  }
  
  // console.log('in didmount')
  componentDidMount(){
      this.props.getArt()
  }
    
    
    render() {
      if(this.props.verified === false){
        return <Redirect to="/signin" />
      }


      let displayArt = [];
      let art = this.props.art;
      art.forEach((item,i) => {
            displayArt.push(<ArtUnit 
            key={i}
            image={item.image} 
            title={item.title} 
            description={item.description}
            material={item.material}
            price={item.price}
            />)
        })
      
    return (
      <div className="home">
        <h2 id="currentArt">C
          u
          r
          r
          e
          n
          t
           


           A
           r
           t</h2>
        {displayArt}
      </div>
    )
  }
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(Home);