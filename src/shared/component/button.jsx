// @flow

import injectSheet from 'react-jss'
import classNames from 'classnames'
import React, { PropTypes } from 'react'
import styles from '../styles/button'

type Props = {
  classes: PropTypes.Object,
  className: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
};

const Button = (
  {
    classes,
    className,
    text,
    type,
    onClick,
  }: Props,
) => (
  <button
    className={
      className ? classNames(classes.button, className) : classes.button
    }
    type={type}
    onClick={onClick}
  >
    {text}
  </button>
)

Button.defaultPropTypes = {
  type: 'submit',
  enabled: true,
}

export default injectSheet(styles)(Button)
