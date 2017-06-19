// @flow

import React from 'react'
import classNames from 'classnames'
import injectSheet from 'react-jss'

import styles from '../styles/restaurant'

type Props = {
  classes: Object,
  restaurant: Immutable.List
};

const getUrl = url => `url(${url})`
const Restaurant = ({ classes, restaurant }: Props) => (
  <div className={classNames(classes.restaurantHolder, 'col-md-4')}>
    <div
      className={classes.bg}
      style={{
        backgroundImage: getUrl(restaurant.get('image_url')),
      }}
    />
    <div className={classes.overlay} />
    <div className={classes.text}>
      <h2 className={classes.h2}>
        {restaurant.get('name')}
      </h2>
    </div>
  </div>
)

export default injectSheet(styles)(Restaurant)
