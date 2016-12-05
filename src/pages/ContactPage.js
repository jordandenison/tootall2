import React from 'react'

export default class ContactPage extends React.Component {
  render () {
    return (
      <div className="contact ui container">
        <h1>Contact</h1>
        <div className="contact ui centered grid">
          <div className="twelve wide tablet eight wide computer column">
            <form className="ui inverted form" method="post">
              <div className="field"><label>Name</label><input name="name" placeholder="Name" type="text" /></div>
              <div className="field"><label>E-mail Address</label><input name="email" placeholder="E-mail Address" type="text" /></div>
              <div className="field"><label>Phone Number</label><input name="phone" placeholder="Phone Number (Optional)" type="text" /></div>
              <div className="field"><label>Message</label><textarea name="message" placeholder="Message"></textarea></div>
              <div className="field ui centered grid"><button className="ui button" type="submit">Send E-mail</button></div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
