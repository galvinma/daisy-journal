import React from 'react'
import moment from 'moment'
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@mdi/react'
import Typography from '@material-ui/core/Typography';
import ReactSVG from 'react-svg'
import {  mdiClose,
          mdiDotsHorizontal } from '@mdi/js'

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import { getEntriesModalState, getEntriesModalID, getEditEntriesModalState, getCurrentEntry } from '../.././Actions/actions'


// functions
import { convertToIcon } from '../.././Utils/convertoicon'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  close: {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '10px',
    paddingBottom: '0px',
  },
  close_container: {
    textAlign: 'right',
  },
  entries_icon: {
    display: 'inline-block',
    verticalAlign: 'sub',
    paddingRight: '2px',
    paddingLeft: '0px',
  },
  list_item_container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

class CalendarEntries extends React.Component {
  constructor(props)
  {
    super(props);

    this.mapList = this.mapList.bind(this)
    this.convertToIcon = convertToIcon.bind(this);
    this.dispatchEditModal = this.dispatchEditModal.bind(this)

  }

  dispatchEditModal(entry_id, type, status)
  {
    if (type !== 'habit')
    {
      store.dispatch(getEntriesModalState({
        entries_modal_status: false
      }))

      axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/return_one`, {
        params: {
          user: localStorage.getItem('user'),
          entry_id: entry_id
        }
      })
      .then((response) => {

        store.dispatch(getEntriesModalID({
          entries_modal_id: entry_id
        }))

        store.dispatch(getCurrentEntry({
          current_entry: response.data.entry
        }))

        store.dispatch(getEditEntriesModalState({
          edit_entries_modal_status: true
        }))
      })
    }
  }

  mapList()
  {
    let entries = store.getState().calendar_entries.calendar_entries
    var row = []
     Object.keys(entries).map((k, index) => {
      if (k === this.props.entries_modal_id.entries_modal_id)
        {
          entries[k].forEach(entry => {
            if (entry.type !== 'note')
            {
                var p = this.convertToIcon(entry)
                row.push(
                  <ListItem key={entry+entry.entry_id}>
                    <ListItemText>
                        <div className={this.props.classes.list_item_container}>
                          <img
                            className={this.props.classes.entries_icon}
                            src={p}
                            svgStyle={{ height: '20px' }} />
                          <div onClick={() => this.dispatchEditModal(entry.entry_id, entry.type, entry.status)}>
                            <Typography variant="body1">{entry.title}</Typography>
                          </div>
                        </div>
                    </ListItemText>
                  </ListItem>
                )
            }
          })
        }
    })
    return row
  }

  render() {
    if (store.getState().calendar_entries.calendar_entries)
    {
      var list = this.mapList()
    }
    return(
      <div>
        <Dialog onEnter={this.mapList} open={this.props.entries_modal_status.entries_modal_status} onClose={this.props.handleModalClose}>
          <div className={this.props.classes.close_container}>
            <Icon
              path={mdiClose}
              size={1}
              className={this.props.classes.close}
              onClick={() => this.props.handleModalClose("view")}/>
          </div>
          <DialogTitle>
            {this.props.entries_modal_id.entries_modal_id}
          </DialogTitle>
          <DialogContent>
              <List dense={true}>
                {list}
              </List>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

CalendarEntries.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    entries_modal_status: state.entries_modal_status,
    entries_modal_id: state.entries_modal_id
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CalendarEntries));
