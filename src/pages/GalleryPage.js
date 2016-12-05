import React from 'react'
import equipment from '../data/equipment'
import gallery from '../data/gallery'

const images = gallery.map(image => '/images/gallery/' + image).concat(equipment.map(item => item.image))

export default class GalleryPage extends React.Component {
  render () {
    return (
      <div className="gallery ui container">
        <h1>Gallery</h1>
        <div className="ui doubling stackable four column grid">
          {images.map((image, i) =>
            <div className="column" key={i}>
              <img className="ui medium rounded centered image" src={image} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
