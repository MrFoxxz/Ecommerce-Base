import React from 'react';
import { Switch, Route} from 'react-router-dom';
//pages
import Homepage from './page/Homepage';
import Registration from './page/Registration';
import Login from './page/Login'
//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'
import './default.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=> (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )} />

        <Route path="/registration" render={()=> (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />

        <Route path="/login" render={()=> (
          <MainLayout>
            <Login />
          </MainLayout>
        )} />
      </Switch>
    </div>
  );
}
 
export default App;