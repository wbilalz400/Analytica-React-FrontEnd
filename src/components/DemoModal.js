import React,{Component} from 'react'
import ModalVideo from 'react-modal-video'

import "./DemoModal.css"

export class DemoModal extends Component {

  constructor () {
    super()
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }

  openModal () {
    this.setState({isOpen: true})
  }

  render () {
    return (
    <div>
      <div>
        <ModalVideo channel='youtube' 
        isOpen={this.state.isOpen} 
        videoId='nqcawNVuNOk'
        onClose={() => this.setState({isOpen: false})}
         />
        <button onClick={this.openModal}>Demo</button>
      </div>
      </div>
    );
  }
}
export default DemoModal;