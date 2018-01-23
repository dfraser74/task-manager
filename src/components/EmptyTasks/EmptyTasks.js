import React from 'react'
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import './emptyTasks.sass'

const ICON_SIZE = 200;

const EmptyTasks = () => (
  <div className="empty-tasks">
    <div className="empty-tasks__icon-wrapper">
      <NavigationCheck color="rgba(0,0,0,0.3)" style={{ width: ICON_SIZE, height: ICON_SIZE }} />
    </div>
    <p className="empty-tasks__text">
      Without tasks
    </p>
  </div>
)


export default EmptyTasks;