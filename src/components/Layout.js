import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    currentRoute: ownProps.location.pathname
  }
}

class Layout extends React.Component {
  render () {
    return (
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui container">
          <div className="ui large secondary inverted pointing menu navbar">
            <Link to="/" className={`item ${this.props.currentRoute === '/' ? 'active' : ''}`}>
              <img className="logo" src="/images/logo.jpg" />
              Home
            </Link>
            <Link to="/equipment/" className={`item ${this.props.currentRoute === '/equipment/' ? 'active' : ''}`}>
              Equipment
            </Link>
            <Link to="/gallery/" className={`item ${this.props.currentRoute === '/gallery/' ? 'active' : ''}`}>
              Gallery
            </Link>
            <Link to="/contact/" className={`item ${this.props.currentRoute === '/contact/' ? 'active' : ''}`}>
              Contact
            </Link>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Layout)
