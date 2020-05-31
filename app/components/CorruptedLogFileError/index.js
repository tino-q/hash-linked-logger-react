import React from 'react';
// import PropTypes from 'prop-types';
import exclamation from './exclamation.png';
import Img from './Img';
import Wrapper from './wrapper';

const CorruptedLogFileError = () => (
  <Wrapper>
    <Img src={exclamation} alt="hash linked logger banner" />
    <div> CORRUPTED LOG FILE </div>
    <Img src={exclamation} alt="hash linked logger banner" />
  </Wrapper>
);

CorruptedLogFileError.propTypes = {};

export default CorruptedLogFileError;
