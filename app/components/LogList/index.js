import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import LogListItem from 'containers/LogListItem';

function LogList({ loading, error, logs }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error) {
    let msg;
    switch (error) {
      case 'corrupted_log_file':
        msg = 'Database integrity has been compromised';
        break;
      default:
        msg = 'Something went wrong, please try again!';
    }
    const ErrorComponent = () => <ListItem item={msg} />;
    return <List component={ErrorComponent} />;
  }

  if (Array.isArray(logs)) {
    return <List items={logs} component={LogListItem} />;
  }

  return null;
}

LogList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  logs: PropTypes.array,
};

export default LogList;
