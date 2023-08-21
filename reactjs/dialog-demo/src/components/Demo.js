import React from 'react'

import Dialog from 'rc-dialog'
import 'rc-dialog/assets/index.css';

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            name : ''
        }
        this.onClick = this.onClick.bind()
    }

    onClick = (e) => {
        this.setState({visible : !this.state.visible})
    }
    onChange =(e) => {
       this.setState({
           [e.target.name] : e.target.value
       })
    }

    render() {
        const dialog =
            <Dialog
                visible={this.state.visible}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.onClick}
                forceRender
                style={{width:600}}
            >
                <p>basic modal</p>
                <p><button onClick={this.onClick}>Close Dialog</button></p>
                <label>Label: </label> <input name='name' value={this.state.name} onChange={this.onChange}/>
                <div style={{ height: 50 }} />
            </Dialog>
        return (

            <div>
                <label>Name: </label><input name='name' value={this.state.name} readOnly={true}/>
                &nbsp; &nbsp;<button onClick={this.onClick}> Open dialog</button>
                {dialog}
            </div>
        );
    }
}

export  default Demo