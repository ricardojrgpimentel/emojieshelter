import React from 'react'
import EmojiSquare from './emojiSquare'
import DATA from './emojis.json'
import $ from 'jquery'
import AdSense from 'react-adsense'

class SiteBody extends React.Component{

  constructor(){
    super()
    this.state = {
      selected: []
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  selectCategory(cat){
    this.setState({
      ...this.state,
      selected: [cat]
    })
  }

  renderAll(){
    return this.shuffleArray(DATA.emojis).map((emoji, idx) => {
      return(
        <EmojiSquare
          key={idx}
          text={emoji.text}
          tags={emoji.tags}
        />
      )
    })
  }

  renderOneCat(cat){
    let OneCatEmojis = []
    // eslint-disable-next-line
    DATA.emojis.map((emoji, idx) => {
      // eslint-disable-next-line
      emoji.tags.map((tag, idx) => {
        if(tag === cat[0])
          OneCatEmojis.push(emoji)
      })
    })
    return this.shuffleArray(OneCatEmojis).map((emoji, idx) => {
      return(
        <EmojiSquare
          key={idx}
          text={emoji.text}
          tags={emoji.tags}
        />
      )
    })
  }

  handleSelectedClass(e){
    $('.list-menu li').removeClass('active')
    $(`.list-menu #${e}`).addClass('active')
  }

  render(){
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <ul className='list-menu'>
              <li id='li-all' className='active' onClick={(e) => {this.handleSelectedClass(e.target.id); this.setState({selected: []})}}>All</li>
              <li id='li-happy' onClick={(e) => {this.handleSelectedClass(e.target.id); this.selectCategory("happy")}}>Happy</li>
              <li id='li-pun' onClick={(e) => {this.handleSelectedClass(e.target.id); this.selectCategory("pun")}}>Pun</li>
              <li id='li-sad' onClick={(e) => {this.handleSelectedClass(e.target.id); this.selectCategory("sad")}}>Sad</li>
              <li id='li-confuse' onClick={(e) => {this.handleSelectedClass(e.target.id); this.selectCategory("confuse")}}>Confuse</li>
              <li id='li-angry' onClick={(e) => {this.handleSelectedClass(e.target.id); this.selectCategory("angry")}}>Angry</li>
            </ul>
          </div>
          <div className='col-12'>
            <AdSense.Google
              client='ca-pub-7848143041008345'
              slot='6907634896' 
            />
          </div>
          {this.state.selected.length <= 0 ? this.renderAll() : this.renderOneCat(this.state.selected) }

        </div>
      </div>
    )
  }
}

export default SiteBody
