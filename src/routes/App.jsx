import React from 'react'
import { BrowserRouter as Router, Route as DefaultRoute, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import MainLayouts from '../container/MainLayouts'
import EmptyLayouts from '../container/EmptyLayouts'
import Feed from '../components/Feed'
import Profile from '../components/Profile'
import SingleProject from '../components/SingleProject'
import FormAddProject from '../components/FormAddProject'

const Route = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <DefaultRoute {...rest} render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} layout={EmptyLayouts} />
        <Route exact path="/register" component={Register}  layout={EmptyLayouts}/>
        <Route exact path="/login" component={Login} layout={EmptyLayouts}/>

        <Route exact path="/feed" component={Feed} layout={MainLayouts}/>
        <Route exact path="/profile" component={Profile} layout={MainLayouts}/>

        <Route path="/add-project/" component={FormAddProject} layout={MainLayouts}/>
        <Route path="/project/:url" component={SingleProject} layout={MainLayouts}/>
      </Switch>
    </Router>
  )
}

export default App
