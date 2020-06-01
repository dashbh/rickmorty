import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Message from '../Message';

class Register extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confPassword: '',
            submitted: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e, user) => {
        e.preventDefault();

        user.handleRegister({
            username: this.state.username,
            password: this.state.password
        });
    }

    render() {
        const { username, password, confPassword } = this.state;
        return (
            <UserContext.Consumer>
                {(user: any) => (
                    <div className="container loginWrapper">
                        { user.status && (<Message status={user.status} />) }
                        <h2>Register</h2>
                        <form name="form" onSubmit={(e) => this.handleSubmit(e, user)}>
                            <div className="form-group">
                                <label>Username</label>
                                <input required type="text" name="username" value={username} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input required type="password" name="password" value={password} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Confirm</label>
                                <input required type="password" name="confPassword" value={confPassword} onChange={this.handleChange} />
                            </div>
                            <div className="form-action">
                                <button type="submit" className="button">Register</button>
                                <Link to="/login">Login</Link>
                            </div>
                        </form>
                    </div>
                )}
            </UserContext.Consumer>
        );
    }
}

export default Register;
