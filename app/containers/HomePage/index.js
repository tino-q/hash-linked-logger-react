/* eslint-disable no-unused-expressions */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectLogs,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadLogs, createLogEntry } from 'containers/App/actions';
// import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import H3 from 'components/H3';
import LogList from 'components/LogList';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import messages from './messages';
// import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({ loading, error, logs, onNeedLogs, onSubmitForm }) {
  // useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [draftMessage, setDraftMessage] = useState('');

  useEffect(() => {
    if (error) {
      alert(error);
    } else if (logs === null) {
      onNeedLogs();
    }
  }, []);

  const logListProps = {
    loading,
    error,
    logs,
  };

  return (
    <article>
      <Helmet>
        <title> Home </title>
        <meta
          name="description"
          content="Hash linked logger application home page"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H3>
            <FormattedMessage {...messages.enterLog} />
          </H3>
        </CenteredSection>

        <Form
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              if (!e.shiftKey) {
                onSubmitForm(draftMessage);
              } else {
                setDraftMessage(`${draftMessage}\n`);
              }
            }
          }}
          // onSubmit={e => {
          //   debugger;
          //   e && e.preventDefault && e.preventDefault();
          //   onSubmitForm(draftMessage);
          // }}
        >
          <label htmlFor="username">
            <Input
              id="username-search"
              type="text"
              placeholder="type your message here"
              value={draftMessage}
              onChange={i => setDraftMessage(i.target.value)}
            />
          </label>
        </Form>

        <LogList {...logListProps} />
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  logs: PropTypes.array,
  onNeedLogs: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onChangeDraftMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  logs: makeSelectLogs(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onNeedLogs: () => dispatch(loadLogs()),
    onSubmitForm: msg => dispatch(createLogEntry(msg)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
