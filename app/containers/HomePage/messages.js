/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'hashLinkedLogger.containers.HomePage';

export default defineMessages({
  enterLog: {
    id: `${scope}.enter_your_log`,
    defaultMessage: 'Create a log entry',
  },
});
