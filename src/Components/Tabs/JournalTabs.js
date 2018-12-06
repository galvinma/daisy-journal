import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@mdi/react'
import {  mdiSquareOutline,
          mdiCircleOutline,
          mdiTriangleOutline,
          mdiMinus
        } from '@mdi/js'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  app_bar:
  {
    backgroundColor: '#ffffff',
  },
  icon: {
    paddingLeft: '5px',
    paddingRight: '15px',
  },
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flexStart',
    alignItems: 'center',
  },
  tabRoot: {
    width: '12.5vw',
    minWidth: '12.5vw',
    fontWeight: '600',
    textTransform: 'none',
  },
});

class JournalTabs extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = {
      value: 0,
      page: 0,
      rowsPerPage: 5,
    }

    this.createList = this.createList.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChangePage = (event, page) => {
  this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  createList(i)
  {
    return (
    <TableRow key={i}>
      <TableCell onClick={(e) => this.props.changeSelectedMonth(i)}>
        <Typography variant="body1">
          {i}
        </Typography>
      </TableCell>
    </TableRow>
  )
  }

  render() {
    const { classes, theme } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.navigatorMonths.length - page * rowsPerPage);
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static" color="default" className={this.props.classes.app_bar}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Archive" classes={{root: this.props.classes.tabRoot}}/>
            <Tab label="Key" classes={{root: this.props.classes.tabRoot}} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer className={this.props.classes.month} dir={theme.direction}>
              <Table>
                <TableBody>
                  {this.props.navigatorMonths.map(this.createList)}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={this.props.navigatorMonths.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <List className={this.props.classes.nav_list}>
              <ListItem>
                <ListItemText>
                  <div className={this.props.classes.icon_container}>
                    <Icon className={this.props.classes.icon} path={mdiSquareOutline} size={0.75} />
                    <Typography variant="body1">Task</Typography>
                  </div>
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>
                  <div className={this.props.classes.icon_container}>
                    <Icon className={this.props.classes.icon} path={mdiCircleOutline} size={0.75} />
                    <Typography variant="body1">Event</Typography>
                  </div>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <div className={this.props.classes.icon_container}>
                    <Icon className={this.props.classes.icon} path={mdiTriangleOutline} size={0.75} />
                    <Typography variant="body1">Appointment</Typography>
                  </div>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <div className={this.props.classes.icon_container}>
                    <Icon className={this.props.classes.icon} path={mdiMinus} size={0.75} />
                    <Typography variant="body1">Note</Typography>
                  </div>
                </ListItemText>
              </ListItem>
            </List>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}


JournalTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(JournalTabs);
;
