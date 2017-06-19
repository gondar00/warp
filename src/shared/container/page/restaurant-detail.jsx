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
}

type Props = {
  classes: Object
};

// const mapDispatchToProps = dispatch => ({
//   onFindClicked: (values) => {
//     console.log('gg', values)
//   },
// })

class RestaurantDetail extends Component {
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
        <div className="container">

        </div>
      </div>
    )
  }
}

export default connect(null, null)(injectSheet(styles)(RestaurantDetail))
