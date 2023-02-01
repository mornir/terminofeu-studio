import React from 'react'

class Miro extends React.Component {
  render() {
    return (
      <div>
        <iframe
          src="https://miro.com/app/live-embed/o9J_lJUPo7Y=/?moveToViewport=217,-1095,3686,1766"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          width="100%"
          style={{ height: 'calc(100vh - 55px)' }}
        ></iframe>
      </div>
    )
  }
}

export default Miro
