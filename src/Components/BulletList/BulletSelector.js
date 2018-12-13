import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquareOutline,
          mdiCircleOutline,
          mdiTriangleOutline,
          mdiMinus,
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { TimePicker } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import ReactSVG from 'react-svg'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getKeyModalState, getArchiveModalState } from '../.././Actions/actions'

// CSS
import './BulletSelector.css'

var key = require('../.././Images/Icons/key.svg')
var archive = require('../.././Images/Icons/archive.svg')

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  selector: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flexEnd',
    paddingLeft: '3px',
    paddingRight: '3px',
    width: '100%',
  },
  formStyle: {
    display: 'flex',
    float: 'left',
    overflow: 'hidden',
    alignItems: 'center',
    minWidth: 'calc(100vw - 440px)',

    [theme.breakpoints.down(768)]: {
      minWidth: 'calc(100vw - 220px)',
    },
  },
  check: {
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  dateStyle: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  dateInput: {
    fontFamily:'Nunito',
    paddingLeft: '2px',
    paddingRight: '2px',
  },
  timeInput: {
    fontFamily:'Nunito',
  },
  text_input: {
    minWidth: '100%',
    border:'none',
    background: 'transparent',
    outline: 'none',
    borderBottom: '1px solid black',
    verticalAlign: 'bottom',
  },
  typo_style: {
    display: 'flex',
  },
  nav_list: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  list_item: {
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingLeft: '0px',
  },
  selector_text: {
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  picker_container: {
    display: 'flex',
    flexDirection: 'row',
  },
  selector_datepicker_style: {
    fontSize: '0.875em',
  },
  selector_timepicker_style: {
    fontSize: '0.875em',
    width: '65px',
  },
  icon_container: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    width: '60px',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
    },
  },
  icon_style: {
    marginLeft: '10px',
  }
});

class BulletSelector extends React.Component {
  render() {
    return(
      <div className={this.props.classes.root}>
        <List className={this.props.classes.nav_list}>
          <ListItem className={this.props.classes.list_item}>
            <div className={this.props.classes.selector}>
              <FormControl>
                <Select
                  value={this.props.selected}
                  onChange={(e) => this.props.selectorChange(e)}
                  disableUnderline={true}
                >
                  <MenuItem value="mdiSquareOutline">
                    <Icon path={mdiSquareOutline} size={1} />
                  </MenuItem>
                  <MenuItem value="mdiCircleOutline">
                    <Icon path={mdiCircleOutline} size={1} />
                  </MenuItem>
                  <MenuItem value="mdiTriangleOutline">
                    <Icon path={mdiTriangleOutline} size={1} />
                  </MenuItem>
                  <MenuItem value="mdiMinus">
                    <Icon path={mdiMinus} size={1} />
                  </MenuItem>
                </Select>
              </FormControl>
              <form className={this.props.classes.formStyle}>
                 <input
                 id="bulletSelector"
                 className={this.props.classes.text_input}
                 onKeyDown={(e) => this.props.checkSubmit(e)} />
              </form>
              <div className={this.props.classes.icon_container}>
                <ReactSVG className={this.props.classes.icon_style} src={archive} svgStyle={{ width: '20px' }} onClick={() => store.dispatch(getArchiveModalState({archive_modal_status: true}))}/>
                <ReactSVG className={this.props.classes.icon_style} src={key} svgStyle={{ width: '20px' }} onClick={() => store.dispatch(getKeyModalState({key_modal_status: true}))}/>
              </div>
            </div>
          </ListItem>
          <ListItem className={this.props.classes.list_item}>
            <Checkbox
              className={this.props.classes.check}
              iconStyle={{color: 'black'}}
              checked={this.props.checkedAllDay}
              onChange={(e) => this.props.handleAllDay(e)} />
            <div className={this.props.classes.selector_text}>
              <Typography component={'span'} variant="body1">All day</Typography>
            </div>
            <Checkbox
              className={this.props.classes.check}
              iconStyle={{color: 'black'}}
              checked={this.props.checkedMultiDay}
              onChange={(e) => this.props.handleMultiDay(e)} />
            <div className={this.props.classes.selector_text}>
              <Typography component={'span'} variant="body1">Multi day</Typography>
            </div>
            <Typography component={'span'} variant="body1">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    className={this.props.classes.dateInput}
                    id="dateone"
                    type="date"
                    format="YYYY-MM-DD"
                    InputProps={{
                    classes: {
                        input: this.props.classes.selector_datepicker_style,
                      }
                    }}
                    value={moment.unix(this.props.startDate).format('YYYY-MM-DD')}
                    onChange={(e) => this.props.dateChange(e, "start")}/>
              </MuiPickersUtilsProvider>
            </Typography>
            <Typography component={'span'} variant="body1">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                  <TimePicker
                    id="timeone"
                    class="time_pick"
                    value={moment.unix(this.props.startTime)}
                    onChange={(e) => this.props.timeChange(e, "start")}
                    InputProps={{
                    classes: {
                        input: this.props.classes.selector_timepicker_style,
                      }
                    }}/>
              </MuiPickersUtilsProvider>
            </Typography>

            <div id="to_spacer">
              <Typography component={'span'} variant="body1">to</Typography>
            </div>

            <Typography component={'span'} variant="body1">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    className={this.props.classes.dateInput}
                    id="datetwo"
                    type="date"
                    format="YYYY-MM-DD"
                    InputProps={{
                    classes: {
                        input: this.props.classes.selector_datepicker_style,
                      }
                    }}
                    value={moment.unix(this.props.endDate).format('YYYY-MM-DD')}
                    onChange={(e) => this.props.dateChange(e, "end")}/>
              </MuiPickersUtilsProvider>
            </Typography>
            <Typography component={'span'} variant="body1">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                  <TimePicker
                    id="timetwo"
                    class="time_pick"
                    className={this.props.classes.timeInput}
                    value={moment.unix(this.props.endTime)}
                    onChange={(e) => this.props.timeChange(e, "end")}
                    InputProps={{
                    classes: {
                        input: this.props.classes.selector_timepicker_style,
                      }
                    }}/>
              </MuiPickersUtilsProvider>
            </Typography>


          </ListItem>
        </List>
      </div>
    );
  }
}

BulletSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletSelector);
