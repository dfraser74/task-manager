import React from 'react';
import { Route, Switch } from 'react-router';
import PrivateRoute from './utils/requireAuthentication';
import Home from './containers/Home/Home'

const List = asyncComponent(() => import('./containers/List/List'))
const AddList = asyncComponent(() => import('./containers/AddList/AddList'))
const Login = asyncComponent(() => import('./containers/Login/Login'))
const Settings = asyncComponent(() => import('./containers/Settings/Settings'))
const NotFound = asyncComponent(() => import('./containers/NotFound'))
const TasksWeek = asyncComponent(() => import('./containers/TasksWeek/TasksWeek'))
const AddTask = asyncComponent(() => import('./containers/AddTask/AddTask'))
const TasksToday = asyncComponent(() => import('./containers/TasksToday/TasksToday'))
const EditTask = asyncComponent(() => import('./containers/EditTask'))
const EditList = asyncComponent(() => import('./containers/EditList/EditList'))
const TasksMonth = asyncComponent(() => import('./containers/TasksMonth/TasksMonth'))
const UserTaks = asyncComponent(() => import('./containers/UserTaks/UserTaks'))


function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponent().then(res => {
        const { default: component } = res
        this.setState({
          component: component
        });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)


export default (
  <Switch>
    <AppRoute exact path="/" layout={Home} component={TasksToday} />
    <AppRoute exact path="/week" layout={Home} component={TasksWeek} />
    <AppRoute exact path="/month" layout={Home} component={TasksMonth} />
    <AppRoute path="/user/:id" layout={Home} component={UserTaks} />
    <PrivateRoute path="/list/:id/edit" component={EditList} />

    <AppRoute path="/list/:id" layout={Home} component={List} />
    <PrivateRoute path="/task/:id" component={EditTask} />
    <PrivateRoute path="/add-list" component={AddList} />
    <PrivateRoute exact path="/add" component={AddTask} />
    <PrivateRoute path="/settings" component={Settings} />

    <Route path="/login" component={Login} />
    <Route path="*" component={NotFound} />
  </Switch>
);
