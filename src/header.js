import React from 'react'

class Header extends React.Component{
  render(){
    return(
      <div className='main-header'>
        <div className='container dead-center'>
          <div className='row'>
            <div className='col-12'>
              <h1 className='header-title'>EmojieShelter.<span>Club</span></h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
