import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectLogs,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadLogs, createLogEntry } from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import LogList from 'components/LogList';
import CorruptedLogFileError from 'components/CorruptedLogFileError';
import Form from './Form';
import Input from './Input';
import saga from './saga';

const key = 'home';

export function HomePage({ loading, error, logs, onNeedLogs, onSubmitForm }) {
  useInjectSaga({ key, saga });

  const [draftMessage, setDraftMessage] = useState('');

  useEffect(() => {
    if (!error && logs === null) {
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
        {error === 'corrupted_log_file' ? (
          <CorruptedLogFileError />
        ) : (
          <div style={{ marginTop: '20px' }}>
            <Form
              onKeyDown={e => {
                if (e.key === 'Enter' && draftMessage.length) {
                  e.preventDefault();
                  e.stopPropagation();
                  onSubmitForm(draftMessage);
                  setDraftMessage('');
                }
              }}
            >
              <label htmlFor="username">
                <Input
                  id="username-search"
                  type="text"
                  placeholder="type your message here and press enter to send"
                  value={draftMessage}
                  onChange={i => setDraftMessage(i.target.value)}
                  autoComplete="off"
                />
              </label>
            </Form>
            <LogList {...logListProps} />
          </div>
        )}
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
