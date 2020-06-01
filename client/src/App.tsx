import React from 'react';
import RickMorty from './components/RickMorty';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  Title, Main,
} from './App.styled';
import { PrivateRoute } from './PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import API from './utils/api';
import reducer from './reducer';

const client = new ApolloClient({
  uri: '/api/graphql',
});

export const UserContext = React.createContext({});

const initialState = {
  user: {
    isAuth: false,
    status: null
  }
};

const UserContextProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState.user);

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleLogin: (data) => API.login(data).then((response: any) => {
          if (response.error) {
            dispatch({ type: 'loginError', payload: response });
          } else {
            dispatch({ type: 'loginSuccess', payload: response });
          }
        }),

        handleRegister: (data) => API.register(data).then((response: any) => {
          if (response.error) {
            dispatch({ type: 'registrationFailed', payload: response });
          } else {
            dispatch({ type: 'registrationSuccess', payload: response });
          }
        }),

        handleLogout: () => {
          localStorage.removeItem('user');
          dispatch({
            type: 'logoutUser'
          });
        }
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <header>
        <Title>Rick & Morty</Title>
      </header>
      <Main>
        <UserContextProvider>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={RickMorty} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </UserContextProvider>
      </Main>
    </ApolloProvider>
  );
}

export default App;
