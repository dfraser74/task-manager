import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { AddTaskFab, Task } from '../../components';
import EmptyTasks from '../../components/EmptyTasks/EmptyTasks';
import TaskActions from '../../actions/task';
import { getTodayTasks, getPendingTasks } from '../../reducers/tasks'
import Home from '../Home/Home'
import { Subheader, List } from 'src/utils/material-ui'


class TasksToday extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    props.setAppbarTitle("Today")
    props.setFab(< AddTaskFab dispatch={ props.dispatch } />)
  }

  componentWillUnmount() { this.props.setFab(null)}

  render = () => (
    <div>
      <List>
        {this.props.tasks.length !== 0 && (
          <Subheader>Today</Subheader>
        )}
        {this.props.tasks.map(task => (
          <Task
            key={task.id}
            onComplete={this.props.actions.complete}
            {...task} />
        ))}
      </List>

      {this.props.pendingTasks.length !== 0 && (
        <Subheader>Pending Tasks</Subheader>
      )}
      {this.props.pendingTasks.map(task => (
        <Task
          key={task.id}
          onComplete={this.props.actions.complete}
          {...task} />
      ))}

      {this.todayIsEmpty() && (
        <EmptyTasks />
      )}
    </div>
  );

  todayIsEmpty() {
    return this.props.tasks.length === 0 && this.props.pendingTasks.length === 0;
  }
}


const mapStateToProps = (state) => ({
  tasks: getTodayTasks(state, state.user.id),
  pendingTasks: getPendingTasks(state, state.user.id),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({
    complete: TaskActions.complete,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksToday);