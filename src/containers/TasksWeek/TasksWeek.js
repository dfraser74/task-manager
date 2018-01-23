import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { AddTaskFab } from '../../components';
import Week from 'src/components/Week';
import TaskActions from '../../actions/task';
import { getWeekTasks } from 'src/reducers/tasks'
import Home from '../Home/Home'


class TasksWeek extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    props.setAppbarTitle("Week")
  }

  render = () => (
    <Week
      tasks={this.props.tasks}
      onTaskComplete={this.props.actions.complete} />
  )

}


const mapStateToProps = (state) => ({
  tasks: getWeekTasks(state, state.user.id),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({
    complete: TaskActions.complete,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksWeek);