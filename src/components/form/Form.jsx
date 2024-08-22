import React from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

function Form({ handleSubmit, children }) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]),
};

export default Form;
