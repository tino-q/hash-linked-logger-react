import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import LogListItem from 'containers/LogListItem';

function LogList({ loading, error, logs }) {
  console.log({ logList: { loading, error, logLength: logs && logs.length } });
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
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
