import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodayIcon from 'material-ui/svg-icons/action/today';
import WeekIcon from 'material-ui/svg-icons/action/view-week';
import MonthIcon from 'material-ui/svg-icons/action/view-module';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Home from '../Home/Home'
import { Task } from '../../components';
import EmptyTasks from '../../components/EmptyTasks/EmptyTasks';
import Calendar from 'src/components/Calendar'
import { BottomNavigation, BottomNavigationItem, Paper, IconButton, MenuItem } from 'src/utils/material-ui/index.js'
import { getTodayTasks, getWeekTasks } from '../../reducers/tasks'
import Week from 'src/components/Week';


class UserTaks extends React.Component {
  state = {
    tasks: [],
    selectedTab: 0,
    EXPERIMENT: 'BOTTOM_TOP',
  }

  componentWillUnmount() {
    this.props.setIconElementRight(null);
  }

  render = () => this.state.EXPERIMENT === "BOTTOM_TOP" ?
    this.renderExperimentTop() : this.renderExperimentNav()


  renderExperimentTop = () => {
    this.props.setIconElementRight(this.rightElements());
    this.props.setAppbarTitle(this.props.user.name);
    
    return (
      <div>
        {this.renderSelectedTab()}
      </div>
    )
  }

  rightElements = () => (
    <IconMenu
      iconButtonElement={
        <IconButton><TodayIcon /></IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem primaryText="Today" leftIcon={<TodayIcon />} onClick={this.select.bind(this, 0)} />
      <MenuItem primaryText="Week" leftIcon={<WeekIcon />} onClick={this.select.bind(this, 1)} />
      <MenuItem primaryText="Month" leftIcon={<MonthIcon />} onClick={this.select.bind(this, 2)} />
    </IconMenu>
  );

  renderExperimentNav = () => (
    <div>
      {this.renderSelectedTab()}
      <Paper zDepth={1} style={{ position: 'fixed', bottom: 0 }} transitionEnabled={false}>
        <BottomNavigation selectedIndex={this.state.selectedTab}>
          <BottomNavigationItem
            label="Today"
            icon={<TodayIcon />}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Week"
            icon={<WeekIcon />}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Month"
            icon={<MonthIcon />}
            onClick={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    </div>
  )

  select = (index) => this.setState({ selectedTab: index });

  renderSelectedTab = () => [
    this.today,
    this.week,
    this.month
  ][this.state.selectedTab]();

  today = () => (
    <div>
      {this.props.todayTasks.map(task => (
        <Task {...task} key={task.id} />
      ))}
      {this.props.todayTasks.length === 0 && (
        <EmptyTasks />
      )}
    </div>
  )

  week = () => (
    <Week tasks={this.props.weekTasks} />
  )

  month = () => (
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
    </div>
  )
}


const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.match.params.id],
  todayTasks: getTodayTasks(state, ownProps.match.params.id),
  weekTasks: getWeekTasks(state, ownProps.match.params.id),
});

export default connect(mapStateToProps)(UserTaks);
