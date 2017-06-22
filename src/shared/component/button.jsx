// @flow

import injectSheet from 'react-jss'
import classNames from 'classnames'
import React from 'react'
import styles from '../styles/button'

type Props = {
  classes: Object,
  className: string,
  text: string,
  type: string,
  onClick: Function
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

export default injectSheet(styles)(Button)
