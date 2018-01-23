import React from 'react';
import PropTypes from 'prop-types';

import { Subheader } from 'src/utils/material-ui'
import Task from 'src/components/Task/Task';
import EmptyTasks from 'src/components/EmptyTasks/EmptyTasks';


class Week extends React.Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    onTaskComplete: PropTypes.func,
  };

  static weekDays = ['Monday', 'Tuesday', 'Wensday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  render = () => {
    const week = this.tasksToObjectWeek();
    console.log(week)
    if (this.props.tasks.length === 0) 
      return (<EmptyTasks />)

    return Object.keys(week).map(key => (
      <div key={key}>
        <Subheader>{this.constructor.weekDays[key]}</Subheader>
        {week[key].map(task => (
          <Task
            key={task.id}
            onComplete={this.setOnComplete()}
            {...task} />
        ))
        }
      </div>
    ))
  }

  setOnComplete = () => {
    if(this.props.onTaskComplete) return this.props.onTaskComplete;
    return null;
  }

  // I don't like it
  tasksToObjectWeek() {
    let tasks = {};
    this.props.tasks.forEach((t) => {
      const d = (new Date(t.date).getDay() || 7) - 1;
      (tasks[d] = tasks[d] || []).push(t); // push or create
    });
    return tasks
  }

}

export default Week;
