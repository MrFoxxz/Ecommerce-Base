import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect} from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

//hoc
import WithAuth from './hoc/withAuth';

//pages
import Homepage from './page/Homepage';
import Registration from './page/Registration';
import Login from './page/Login';
import Recovery from './page/Recovery';
import Dashboard from './page/Dashboard';

//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'

import './default.scss';

const App = props => {

  const { setCurrentUser, currentUser } = props;

  useEffect(() => {

    const authListener = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }

      setCurrentUser(userAuth);

    });

    return() => {

      authListener();

    };
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=> (
          <HomepageLayout >
            <Homepage />
          </HomepageLayout>
        )} />

        <Route path="/registration" 
        render={()=> ( /* Comprueba si hay usuario en sesion y redirecciona */
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />

        <Route path="/login"
        render={()=> ( /* Comprueba si hay usuario en sesion y redirecciona */
          <MainLayout>
            <Login />
          </MainLayout>
        )} />

        <Route exact path="/Recovery" render={()=> (  
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />

        <Route exact path="/Dashboard" render={()=> (  
          <WithAuth>
            <MainLayout>
              <Dashboard/>
            </MainLayout>
          </WithAuth>
        )} />

      </Switch>
    </div>
  );
  
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect( mapStateToProps, mapDispatchToProps)(App);