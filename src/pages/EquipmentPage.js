import React from 'react'
import equipment from '../data/equipment'

export default class EquipmentPage extends React.Component {
  render () {
    return (
      <div className="equipment ui container">
        <h1>Equipment</h1>
        <div className="ui two column stackable grid">
          {equipment.map((item, i) =>
            <div className="column" key={i}>
              <div className="ui items">
                <div className="item">
                  <div className="image"><img src={item.image} /></div>
                  <div className="content">
                    <div className="header">{item.title}</div>
                    <div className="description">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
