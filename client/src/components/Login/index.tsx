import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { Redirect } from 'react-router-dom';

class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e, user) => {
        e.preventDefault();

        user.handleLogin({
            username: this.state.username,
            password: this.state.password
        });
    }

    render() {
        const { username, password, redirect } = this.state;
        return (
            <UserContext.Consumer>
                {(user: any) => (<div className="container loginWrapper">
                    {user.isAuth ? (
                        <Redirect to='/' />
                    ) : (
                            <React.Fragment>
                                <h2>Login</h2>
                                <form name="form" onSubmit={(e) => this.handleSubmit(e, user)}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input required type="text" name="username" value={username} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input required type="password" name="password" value={password} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-action">
                                        <button type="submit" className="button">Login</button>
                                        <Link to="/register">Register</Link>
                                    </div>
                                </form>
                                {user.isAuth && (<span>Authenticated</span>)}
                            </React.Fragment>
                        )
                    }
                </div>
                )}
            </UserContext.Consumer>
        );
    }
}

export default Login;
