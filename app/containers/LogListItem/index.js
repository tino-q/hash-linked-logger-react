import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';
import Wrapper from './Wrapper';

export function LogListItem({ item }) {
  const { date, message, id } = item;
  const content = (
    <Wrapper>
      <div> {`${date}: ${message}`} </div>
    </Wrapper>
  );
  return <ListItem key={`log-list-item-${id}`} item={content} />;
}

LogListItem.propTypes = {
  item: PropTypes.object,
};

export default LogListItem;
