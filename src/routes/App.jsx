import React from 'react'
import { BrowserRouter as Router, Route as DefaultRoute, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import MainLayouts from '../container/MainLayouts'
import EmptyLayouts from '../container/EmptyLayouts'
import EmptyDarkLayouts from '../container/EmptyDarkLayouts'
import Feed from '../components/Feed'
import Profile from '../components/Profile'
import SingleProject from '../components/SingleProject'
import FormAddProject from '../components/FormAddProject'
import FormUpdateProject from '../components/FormUpdateProject'
import FormUpdateUser from '../components/FormUpdateUser'
import PageNotFound from '../components/PageNotFound'
import ProtectedRoute from '../components/ProtectedRoute'
import Messenger from '../components/Messenger'

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
        <Route exact path={"/"} component={Home} layout={EmptyLayouts} />
        <Route exact path={"/register"} component={Register} layout={EmptyLayouts} />
        <Route exact path={"/login"} component={Login} layout={EmptyLayouts} />

        <ProtectedRoute exact path={"/feed"} component={Feed} layout={MainLayouts} />
        <Route exact path={"/user/:username"} component={Profile} layout={MainLayouts} />
        <ProtectedRoute path={"/update-user/:username"} component={FormUpdateUser} layout={MainLayouts} />

        <ProtectedRoute path={"/add-project/"} component={FormAddProject} layout={MainLayouts} />
        <ProtectedRoute path={"/update-project/:url"} component={FormUpdateProject} layout={MainLayouts} />
        <Route path={"/project/:url"} component={SingleProject} layout={MainLayouts} />

        {/* <ProtectedRoute path={"/messenger/:socket/:room/:username"}  component={Messenger} layout={EmptyLayouts} /> */}
        <ProtectedRoute path={"/messenger/:username"}  component={Messenger} layout={EmptyDarkLayouts} />

        <Route component={PageNotFound} layout={EmptyLayouts} />
      </Switch>
    </Router>
  )
}

export default App
