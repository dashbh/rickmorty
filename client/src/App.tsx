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

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
});

export const UserContext = React.createContext({});

const initialState = {
  user: {
    isAuth: false
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loginUser':
      return {
        ...state,
        auth: action.payload.token,
        name: action.payload.user,
        isAuth: true
      };
    case 'logoutUser':
      return {
        ...state,
        auth: '',
        name: '',
        isAuth: false
      };
    default:
      return state;
  }
};

const UserContextProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState.user);

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleLogin: (data) => API.login(data).then((response: any) => {
          dispatch({
            type: 'loginUser',
            payload: {
              auth: response.token,
              user: response.user
            }
          });
        }),
        handleRegister: (data) => API.register(data),
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
