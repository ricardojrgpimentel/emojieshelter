import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

interface EmojiSquareProps {
  text: string
  tags: string[]
}

const EmojiSquare: React.FC<EmojiSquareProps> = ({ text, tags }) => (
  <div className='col-sm-6 col-md-4 col-lg-3 fixed-padding-grid'>
    <div className='emoji-square'>
      <CopyToClipboard text={text}>
        <div className='emoji-area'>
          <p className='emoji'>{text}</p>
        </div>
      </CopyToClipboard>
      <div className='tags'>
        {tags.map((tag, idx) => (
          <span key={idx}>{tag}</span>
        ))}
      </div>
    </div>
  </div>
)

export default EmojiSquare
