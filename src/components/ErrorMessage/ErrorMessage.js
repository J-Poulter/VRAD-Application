import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

const ErrorMessage = (props) => {
  const { error } = props;
console.log(error);
  return (
    <p className="error">
      Error:
      {' '}
      {error.message}
    </p>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
