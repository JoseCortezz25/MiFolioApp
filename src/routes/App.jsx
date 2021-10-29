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
import FormUpdateProject from '../components/FormUpdateProject'
import FormUpdateUser from '../components/FormUpdateUser'
import PageNotFound from '../components/PageNotFound'
import ProtectedRoute from '../components/ProtectedRoute'

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
        <Route exact path={process.env.PUBLIC_URL + "/"} component={Home} layout={EmptyLayouts} />
        <Route exact path={process.env.PUBLIC_URL + "/register"} component={Register} layout={EmptyLayouts} />
        <Route exact path={process.env.PUBLIC_URL + "/login"} component={Login} layout={EmptyLayouts} />

        <ProtectedRoute exact path={process.env.PUBLIC_URL + "/feed"} component={Feed} layout={MainLayouts} />
        <Route exact path={process.env.PUBLIC_URL + "/user/:username"} component={Profile} layout={MainLayouts} />
        <ProtectedRoute path={process.env.PUBLIC_URL + "/update-user/:username"} component={FormUpdateUser} layout={MainLayouts} />

        <ProtectedRoute path={process.env.PUBLIC_URL + "/add-project/"} component={FormAddProject} layout={MainLayouts} />
        <ProtectedRoute path={process.env.PUBLIC_URL + "/update-project/:url"} component={FormUpdateProject} layout={MainLayouts} />
        <Route path={process.env.PUBLIC_URL + "/project/:url"} component={SingleProject} layout={MainLayouts} />

        <Route component={PageNotFound} layout={EmptyLayouts} />
      </Switch>
    </Router>
  )
}

export default App
