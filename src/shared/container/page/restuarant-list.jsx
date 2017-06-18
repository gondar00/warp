// @flow

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { APP_NAME } from '../../config'

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#000000',
    opacity: 0.5,
    transition: 'all 200ms ease-out',
  },
  text: {
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'normal',
    margin: '0 20px',
    position: 'relative',
    zIndex: 2,
    transition: 'all 200ms ease-out',
  },
  h2: {
    fontSize: '18px',
    color: '#FFFFFF',
    marginTop: '5px',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    transition: 'all 200ms ease-out',
  },
  restuarantHolder: {
    lineHeight: '200px',
  },
  mt50: {
    marginTop: '50px',
  },
}

type Props = {
  classes: Object
};

// const mapDispatchToProps = dispatch => ({
//   onFindClicked: (values) => {
//     console.log('gg', values)
//   },
// })

class RestuarantList extends Component {
  onComponentDidMount() {}
  props: Props;
  render() {
    const { classes } = this.props
    return (
      <div>
        <Helmet
          meta={[
            { name: 'description', content: APP_NAME },
            { property: 'og:title', content: APP_NAME },
          ]}
        />
        <div className={classNames(classes.mt50, 'container text-center')}>
          <div className="row">
            <div className={classNames(classes.restuarantHolder, 'col-md-4')}>
              <div
                className={classes.bg}
                style={{
                  backgroundImage: 'url(http://www.pygmy-elephant.com/resize/medias/travel/36/overview_image/c746x424+wmax-1+hmax-1/img-4373.jpg)',
                }}
              />
              <div className={classes.overlay} />
              <div className={classes.text}>
                <h2 className={classes.h2}>
                  Gandharv Garg
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(injectSheet(styles)(RestuarantList))
