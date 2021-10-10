import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
export class Logout extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  async componentDidMount(){
      localStorage.removeItem('token')
      localStorage.removeItem('refresh')
      localStorage.removeItem('username')
      //window.location.reload();
      this.props.history.push('/')
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default withRouter(Logout)
