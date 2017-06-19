// @flow

import React from 'react'
import injectSheet from 'react-jss'

import styles from '../styles/loading'

type Props = {
  classes: Object,
}

const LoadingSpinner = ({ classes }: Props) => (
  <div className={classes.loadingSpinnerWrap}>
    <svg
      className={classes.loadingSpinner}
      width="60"
      height="20"
      viewBox="0 0 60 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={classes.circle} cx="7" cy="15" r="4" />
      <circle className={classes.circle} cx="30" cy="15" r="4" />
      <circle className={classes.circle} cx="53" cy="15" r="4" />
    </svg>
  </div>
)

export default injectSheet(styles)(LoadingSpinner)
