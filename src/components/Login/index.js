import React, {Component} from 'react';
import PropTypes from 'prop-types';
import User from '../User';
import firebase, { auth, provider } from '../../utils/base';
import { loginStrings } from '../../utils/localized';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

class Login extends Component {

    constructor(props){
        super(props);

        loginStrings.setLanguage('he');

        this.state = {
            user: null,
            accessToken: null
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.createUser = this.createUser.bind(this);
        this.getUserData = this.getUserData.bind(this);
    }

    componentDidMount(){   
        auth.onAuthStateChanged((user) => {
            if (user) {
                const currentUser = localStorage.getItem('currentUser');
                const accessToken = localStorage.getItem('accessToken');

                if(currentUser && accessToken){
                    const state = {...this.state};
                    state.user = JSON.parse(currentUser);
                    state.accessToken = accessToken;
                    this.setState({...state});
                }
            }
        });
    }

    render(){
        const classes = this.props.classes;
        const facebookLogin = <Button onClick={() => this.login()} raised color="primary" className={classes.button}>Facebook Login</Button>;
        const logoutButton = <Button  onClick={() => this.logout()} color="accent" className={[classes.button, classes.logout, 'no-bg'].join(' ')}>{loginStrings.logout}</Button>

        if(this.state.user){
            return ( 
                <div className={classes.row}>
                   { logoutButton }
                   <User data={this.state.user}/>
                </div>
            ); 
        }

        return (
            <div>
                { this.state.user ? 
                    <User data={this.state.user} /> 
                    : facebookLogin
                }
            </div>
        );
    }

    login(){
        let uid = undefined;

        auth.signInWithPopup(provider)
            .then((result) => {
                
                const { accessToken } = result.credential;
                uid = result.user.uid;

                localStorage.setItem('accessToken', accessToken);

                return this.getUserData(accessToken);
            })
            .then((data) => data.json())
            .then((userData) => {
                return this.createUser(uid, userData);
            })
            .then((user) => {
                localStorage.setItem('currentUser', JSON.stringify(user.snapshot));
        });
    }

    logout() {
        auth.signOut().then(() => {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('accessToken');
            this.setState({user: null, accessToken: null});
        });
    }

    getUserData(token){
        const facebookFields = ['id','first_name','last_name','gender','locale','picture','email']
        return fetch(`https://graph.facebook.com/me?fields=${facebookFields.toString()}&access_token=${token}`);
    }

    createUser(uid, userData){    
        return firebase.database()
            .ref('users')
            .child(uid)
            .transaction((currentUserData) =>  {
                if (currentUserData === null)
                return userData;
            },(error, committed) => {
                console.log(committed);
        });
    };

}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  logout: {
    fontSize: '12px',
    backgroundColor: 'transparent'
  },
  input: {
    display: 'none',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  }
});

export default withStyles(styles)(Login);