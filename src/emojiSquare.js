import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

class EmojiSquare extends React.Component{

  handleTags(tags){
    return tags.map((tag, idx) => {
      return (
        <span key={idx}>{tag}</span>
      )
    })
  }

  render(){
    return(
      <div className='col-sm-6 col-md-4 col-lg-3 fixed-padding-grid'>
        <div className='emoji-square'>
          <CopyToClipboard text={this.props.text}>
            <div className='emoji-area'>
              <p className='emoji'>{this.props.text}</p>
            </div>
          </CopyToClipboard>
          <div className='tags'>
            {this.handleTags(this.props.tags)}
          </div>
        </div>
      </div>
    )
  }
}

export default EmojiSquare
