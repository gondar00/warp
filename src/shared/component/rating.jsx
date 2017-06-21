// @flow

import React from 'react'
import injectSheet from 'react-jss'

import styles from '../styles/rating'

type Props = {
  classes: Object,
  isFilled: Boolean
};

const Rating = ({ classes, isFilled }: Props) => (
  <button className={classes.likeButton}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16">
      <path
        fill={isFilled ? '#ee6723' : 'none'}
        stroke="#ee6723"
        strokeOpacity=".8"
        d="M14.86 13.187c1.4-.392 2.665-1.418 3.433-2.975 1.462-2.984.582-6.758-1.947-8.426-2.07-1.37-4.627-.89-6.31.972C8.37.91 5.806.455 3.71 1.838c-2.566 1.678-3.477 5.436-2.005 8.4.776 1.547 2.052 2.566 3.464 2.955L10.02 15l4.84-1.813z"
      />
    </svg>
  </button>
)

export default injectSheet(styles)(Rating)
