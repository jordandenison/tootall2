import React from 'react'

export default class IndexPage extends React.Component {
  render () {
    return (
      <div className="ui container">
        <img className="ui centered medium image" src="/images/logo.jpg" />
        <div className="ui text container">
          <h1 className="ui inverted header">Welcome to Too Tall Enterprises /</h1>
          <h2>Earthworks Contractor and Equipment Rentals for Kelowna B.C. and area</h2>
          <div className="ui huge primary button">
            Get STarted<i className="right arrow icon"></i>
          </div>
        </div>
        <img className="ui centered large image" src="/images/bg.jpg" />
      </div>
    )
  }
}
