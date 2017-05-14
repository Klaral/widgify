import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Note from './Note'
import Notepad from './Notepad'
import TestData from './Test'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Container from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';
injectTapEventPlugin();


class App extends Component {
    constructor(){
        super();
        this.state = {
            uid: false,
            authPopup: false,
            username: ''
        }
    }
    //handle auth

    popupAction = () => {
        this.setState({authPopup: !this.state.authPopup});
    };

    handleLogin=(i)=> {
        let provider;
        switch (i) {
            case 0: provider =  new firebase.auth.GithubAuthProvider(); break;
            case 1: provider =  new firebase.auth.GoogleAuthProvider(); break;
            case 2: provider =  new firebase.auth.FacebookAuthProvider(); break;
            default: provider =  new firebase.auth.TwitterAuthProvider();
        }
        firebase.auth().signInWithPopup(provider).then(this.setState({authPopup:false}));
    };

    handleSignOut=()=>{
        firebase.auth().signOut().then(function() {
            console.log('Signed out!');
        }).catch(function(error) {
            console.log(`Could't sign out!`);
            console.log(error);
        });
    };

    componentWillMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log(user);
            if (user) {
                console.log('user logged in');
                this.setState({uid: user.uid, username: user.displayName});
            } else {
                console.log('no user logged in');
                this.setState({uid: false, username: ''});
            }
        }.bind(this));

    }

    render() {
            return (
            <Container muiTheme={getMuiTheme()}>
                <Grid fluid>
                    <Dialog open={this.state.authPopup} titleStyle={{textAlign: 'center'}} actions={ <RaisedButton fullWidth={true}  label="Close" primary={true} onTouchTap={this.popupAction}/>} title="Log in with one of the following providers" >
                        <FlatButton fullWidth={true} label="Github" onTouchTap={()=>this.handleLogin(0)}/>
                        <FlatButton fullWidth={true} label="Google" onTouchTap={()=>this.handleLogin(1)}/>
                        <FlatButton fullWidth={true} label="Facebook" onTouchTap={()=>this.handleLogin(2)}/>
                        <FlatButton fullWidth={true} label="Twitter" onTouchTap={()=>this.handleLogin()}/>
                    </Dialog>
                    <Row around="xs"  middle="xs">
                        <Col className="widget" xs={12}>
                            <Header popupAction={this.popupAction} signOut={this.handleSignOut} uid={this.state.uid} />
                        </Col>
                        <Col className="widget " xs={12}  md={6} lg={8}>
                            <Notepad uid={this.state.uid} username={this.state.username} popupAction={this.popupAction}/>
                        </Col>

                        <Col className="widget" xs={12}  md={6} lg={4}>
                            <Note uid={this.state.uid}/>
                        </Col>
                        <Col className="widget" xs={12}  md={6} lg={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={12}  md={6} lg={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={12}  md={6} lg={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={12}  md={6} lg={12}>
                            <TestData />
                        </Col>
                    </Row>
                </Grid>
            </Container>
        );
    }

}




export default App;