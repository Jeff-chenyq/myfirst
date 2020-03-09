import React,{ Component } from 'react';
import App from './App';
import Admin from './admin'
import { HashRouter as Router,Route,Switch,Redirect } from 'react-router-dom';
import Home from './Page/Home';
import Chart from './Page/chart';
import Control from './Page/control';
import History from './Page/history';


export default class Routers extends Component{
  render(){
    return<App>
      <Router>
          <Route path="/" render={()=>
            <Admin>
              <Switch>
                <Route path='/home' component={Home} />
                <Route path="/control" component={Control}/>
                <Route path="/chart" component={Chart}/>
                <Route path="/history" component={History}/>
                <Redirect to="/home" />
              </Switch>
            </Admin>
          }></Route>
      </Router>
    </App>
  }
}
