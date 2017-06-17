// @flow

import React from 'react'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Input from '../input'
import Button from '../button'

import { APP_NAME } from '../../config'

const styles = {
  middle: {
    verticalAlign: 'middle',
    lineHeight: 'normal',
    margin: '140px 20px',
    position: 'relative',
  },
  h2: {
    textTransform: 'uppercase',
    fontSize: '38px',
    marginBottom: '40px',
  },
  mt10: {
    marginTop: '10px',
  },
}

const HomePage = ({ classes }: { classes: Object }) => (
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'Hello App is an app to say hello' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <div className="container text-center">
      <div className={classes.middle}>
        <h2 className={classes.h2}>{APP_NAME}</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center">
              <Input
                name="location"
                className="form-control"
                type="text"
                placeholder="Location"
              />
            </div>
            <div className="col-md-4 text-center">
              <Input
                name="restuarant"
                className="form-control"
                type="text"
                placeholder="Search for restuarants..."
              />
            </div>
            <div className={classNames(classes.mt10, 'col-md-4 text-center')}>
              <Button text="FIND" type="submit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default injectSheet(styles)(HomePage)
