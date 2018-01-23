import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Calendar from 'src/components/Calendar'
import { Paper } from 'src/utils/material-ui/index.js'

import { Task } from '../../components';
import TaskActions from '../../actions/task';
import { getDayTasks } from '../../reducers/tasks'


class TasksMonth extends React.Component {
  state = {
    tasks: [],
    currentDate: new Date(),
  }

  static contextTypes = {
    store: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);

    this.unsubscribe = context.store.subscribe(this.onStoreChange);
    props.setAppbarTitle("Month")
  }

  onStoreChange = () => {
    this.setTasksByDayToState()
  }

  render = () => (
    <div>
      <Paper zDepth={1}>
        <Calendar
          hideCalendarDate={true}
          open={true}
          mode="portrait"
          firstDayOfWeek={1}
          onClickDay={this.onClickDay}
        />
      </Paper>
      {this.state.tasks.map(task => (
        <Task
          key={task.id}
          onComplete={this.completeTask}
          {...task} />
      ))}
    </div>
  );

  componentDidMount() {
    this.setTasksByDayToState()
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClickDay = (event, date) => {
    if (this.state.currentDate.getTime() === date.getTime()) return;
    this.setTasksByDayToState(date);
  }

  setTasksByDayToState(date) {
    const state = this.context.store.getState();
    this.setState({
      currentDate: date || this.state.currentDate,
      tasks: getDayTasks(
        state,
        date || this.state.currentDate,
        state.user.id
      ),
    })
  }

  completeTask = (...args) => {
    this.context.store.dispatch(
      TaskActions.complete.apply(this, args)
    )
  }

}


export default TasksMonth;