import React from 'react'
import MaterialUiCalendar from 'material-ui/DatePicker/Calendar'
import EventListener from 'react-event-listener';
import transitions from 'material-ui/styles/transitions';
import CalendarActionButtons from 'material-ui/DatePicker/CalendarActionButtons';
import CalendarMonthMaterialUl from 'material-ui/DatePicker/CalendarMonth';
import CalendarToolbar from 'material-ui/DatePicker/CalendarToolbar';
import DateDisplay from 'material-ui/DatePicker/DateDisplay';
import SlideInTransitionGroup from 'material-ui/internal/SlideIn';
import { localizedWeekday } from 'material-ui/DatePicker/dateUtils';


class CalendarMonth extends CalendarMonthMaterialUl {

  styles = {
    week: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 34,
      margin: '4px 0',
    },
  };

  getWeekElements() {
    const weekArray = this.props.utils.getWeekArray(this.props.displayDate, this.props.firstDayOfWeek);

    return weekArray.map((week, i) => {
      return (
        <div key={i} style={this.styles.week}>
          {this.getDayElements(week, i)}
        </div>
      );
    }, this);
  }
}

const daysArray = [...Array(7)];

class Calendar extends MaterialUiCalendar {

  render() {
    const { prepareStyles } = this.context.muiTheme;
    const { hideCalendarDate } = this.props;
    const toolbarInteractions = this.getToolbarInteractions();

    const styles = this.getStyles( hideCalendarDate);

    const weekTitleDayStyle = prepareStyles(styles.weekTitleDay);

    const {
      cancelLabel,
      DateTimeFormat,
      firstDayOfWeek,
      locale,
      okLabel,
      onClickCancel, // eslint-disable-line no-unused-vars
      onClickOk, // eslint-disable-line no-unused-vars
      utils,
    } = this.props;

    return (
      <div style={prepareStyles(styles.root)}>
        <EventListener
          target="window"
          onKeyDown={this.handleWindowKeyDown}
        />
        {!hideCalendarDate &&
          <DateDisplay
            DateTimeFormat={DateTimeFormat}
            disableYearSelection={this.props.disableYearSelection}
            onClickMonthDay={this.handleClickDateDisplayMonthDay}
            onClickYear={this.handleClickDateDisplayYear}
            locale={locale}
            monthDaySelected={this.state.displayMonthDay}
            mode={this.props.mode}
            selectedDate={this.state.selectedDate}
          />
        }
        <div style={prepareStyles(styles.calendar)}>
          {this.state.displayMonthDay &&
            <div style={prepareStyles(styles.calendarContainer)}>
              <CalendarToolbar
                DateTimeFormat={DateTimeFormat}
                locale={locale}
                displayDate={this.state.displayDate}
                onMonthChange={this.handleMonthChange}
                prevMonth={toolbarInteractions.prevMonth}
                nextMonth={toolbarInteractions.nextMonth}
              />
              <div style={prepareStyles(styles.weekTitle)}>
                {daysArray.map((event, i) => (
                  <span key={i} style={weekTitleDayStyle}>
                    {localizedWeekday(DateTimeFormat, locale, i, firstDayOfWeek)}
                  </span>
                ))}
              </div>
              <SlideInTransitionGroup direction={this.state.transitionDirection} style={styles.transitionSlide}>
                <CalendarMonth
                  DateTimeFormat={DateTimeFormat}
                  locale={locale}
                  displayDate={this.state.displayDate}
                  firstDayOfWeek={this.props.firstDayOfWeek}
                  key={this.state.displayDate.toDateString()}
                  minDate={this.getMinDate()}
                  maxDate={this.getMaxDate()}
                  onClickDay={this.handleClickDay}
                  ref={(ref) => this.calendarRefs.calendar = ref}
                  selectedDate={this.state.selectedDate}
                  shouldDisableDate={this.props.shouldDisableDate}
                  utils={utils}
                />
              </SlideInTransitionGroup>
            </div>
          }
          {!this.state.displayMonthDay &&
            <div style={prepareStyles(styles.yearContainer)}>
              {this.yearSelector()}
            </div>
          }
          {okLabel &&
            <CalendarActionButtons
              autoOk={this.props.autoOk}
              cancelLabel={cancelLabel}
              okLabel={okLabel}
              onClickCancel={onClickCancel}
              onClickOk={onClickOk}
            />
          }
        </div>
      </div>
    );
  }


  getStyles() {
    const isLandscape = this.props.mode === 'landscape';
    const { calendarTextColor } = this.context.muiTheme.datePicker;
    const { hideCalendarDate } = this.props;

    const CHANGED_BY_ME = {
      root: {
        // fontFamily: 'Roboto, sanf-serif',
        width: '100%',
      },
      calendarContainer: {
        fontSize: 14,
      }
    }

    
    const styles = {
      root: {
        color: calendarTextColor,
        userSelect: 'none',
        width: (!hideCalendarDate && isLandscape) ? 479 : 310,
        ...CHANGED_BY_ME.root,
      },
      calendar: {
        display: 'flex',
        flexDirection: 'column',
      },
      calendarContainer: {
        display: 'flex',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column',
        fontSize: 12,
        fontWeight: 400,
        padding: '0px 8px',
        transition: transitions.easeOut(),
        ...CHANGED_BY_ME.calendarContainer,
      },
      yearContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 272,
        marginTop: 10,
        overflow: 'hidden',
        width: 310,
      },
      weekTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: '500',
        height: 20,
        lineHeight: '15px',
        opacity: '0.5',
        textAlign: 'center',
      },
      weekTitleDay: {
        width: 42,
      },
      transitionSlide: {
        height: 228,
      },
    };
    return styles;
  }
}

export default Calendar