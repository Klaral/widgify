/* eslint-disable */
import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase';


class Note extends Component {
    constructor(){
        super()
        this.state = {
			text: ' '
		} 
    }
    
    
/** firebase, här lagras och hanteras textändringen som gjorts **/
    
    handleChange=(e)=>{
        this.setState({notes: e.target.name});
        firebase.database().ref(`users/${this.props.uid}/notes`).update({
           text: e.target.value
        });
    };



/** updateNotes till user id **/

   componentWillMount() {
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) this.updateNotes();
            else this.setState({text: ' '});
        });
    }


/** text lagras till id och uppdateras till handleChange **/

    updateNotes = () => {
            firebase.database().ref(`users/${this.props.uid}/notes`).child('text').on('value', s=>{
                this.setState({text: s.val()});
            });
        };
    
    render() {
        return (<Card>
            <CardHeader title="Note" subtitle={`Make a note`} />
            
            
            
            /*<CardText>
                    <TextField name='text' value={this.state.text?this.state.text:''} rows={11} rowsMax={11} fullWidth={true} multiLine={true} hintText={`what's on your mind ${this.props.uid?',': ' '} ${this.props.username}?`} onChange={this.props.uid?this.handleChange:null}/>
            </CardText>*/
            
           
            
        </Card>
            )
    }


}


export default Note;















