import React from 'react'

class ListModal extends React.Component {
    render() {
        let dialogClass=""
        let foolProofClass = ""
        if(this.props.showModal===true){
            dialogClass += "is_visible slide_in"
            foolProofClass += "is_visible"
        }else if(this.props.showModal===false) {
            dialogClass += "slide_out"
            foolProofClass += "is_not_visible"
        }else if(this.props.showModal==="INVISIBLE") {
            dialogClass += "is_not_visible"
            foolProofClass += "is_not_visible"
        }
        return (
            <div>
                <div id="modal_yes_no_dialog" className={dialogClass}>
                    <div id="dialog_text">
                        <p>Delete the list?</p>
                        <p><strong>Are you sure to delete this list?</strong></p>
                        <button id="yes" onClick={this.props.handleClickYes}>Yes</button>
                        <button id="no" onClick={this.props.handleClickNo}>No</button>
                        <p>The list will not be retrivable.</p>
                    </div>
                </div>
                <div id="modal_fool_proof" className={foolProofClass}>
                </div>
            </div>
        )
    }
    
}

export default ListModal