// @flow

import $ from 'jquery'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Checkbox from '../../component/checkbox'
import Button from '../../component/button'
import { isEmpty } from '../../lib/validation'
import { getRestaurants } from '../../action/restaurant-list'

import { APP_NAME } from '../../config'

const styles = {
  bg: {
    backgroundImage: 'url(/static/img/background.jpg)',
  },
  h1: {
    fontSize: '18px',
    color: 'white',
    letterSpacing: '3px',
    lineHeight: '1.4',
    fontWeight: '100',
    textTransform: 'uppercase',
  },
  h3: {
    fontSize: '12px',
    color: 'white',
    letterSpacing: '3px',
    lineHeight: '1.4',
    fontWeight: '100',
    textTransform: 'uppercase',
  },
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
  mt50: {
    marginTop: '50px',
  },
}

type Props = {
  classes: Object,
  history: Object
};
const mapStateToProps = state => ({
  restaurants: state.restaurantList.get('restaurants'),
})
const mapDispatchToProps = dispatch => ({
  fetchRestaurants: params => dispatch(getRestaurants(params)),
})
class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      longitude: '',
      latitude: '',
      setDefaultLocation: false,
      showLocationErr: false,
    }
    this.onFindClicked = this.onFindClicked.bind(this)
    this.toggleDefaultLocation = this.toggleDefaultLocation.bind(this)
  }
  componentDidMount() {
    const { classes } = this.props
    $('body').addClass(classes.bg)
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      })
    })
  }
  componentWillUnmount() {
    const { classes } = this.props
    $('body').removeClass(classes.bg)
  }
  onFindClicked() {
    const { history } = this.props
    const { setDefaultLocation } = this.state
    let latitude
    let longitude
    if (setDefaultLocation) {
      // Defaults the location to San Francisco. As we are using Yelp so yelp
      // reviews are not globally available.
      longitude = '-122.42058'
      latitude = '37.80587'
    } else {
      longitude = this.state.longitude
      latitude = this.state.latitude
    }
    if (isEmpty(longitude) || isEmpty(latitude)) {
      this.setState({
        showLocationErr: true,
      })
      return
    }
    history.push({
      pathname: '/restaurants',
      search: `?lat=${latitude}&long=${longitude}`,
    })
  }
  toggleDefaultLocation() {
    const { setDefaultLocation } = this.state
    this.setState({
      setDefaultLocation: !setDefaultLocation,
    })
  }

  props: Props;
  render() {
    const { classes } = this.props
    const { showLocationErr, setDefaultLocation } = this.state
    return (
      <div>
        <Helmet
          meta={[
            { name: 'description', content: APP_NAME },
            { property: 'og:title', content: APP_NAME },
          ]}
        />
        <div className="container text-center">
          <div className={classes.middle}>
            <h1 className={classes.h1}>{APP_NAME}</h1>
            <div className="container">
              <form
                className="row  d-flex align-items-center"
                onSubmit={this.onFindClicked}
                noValidate
              >
                <div
                  className={classNames(classes.mt10, 'col-md-12 text-center')}
                >
                  <Button text="Find Nearby Restaurants" type="submit" />
                  <div className={classNames(classes.mt50, 'text-center')}>
                    <Checkbox
                      label="Set Default Location to San Fransico Bay."
                      labelClass={classes.h3}
                      isChecked={setDefaultLocation}
                      handleCheckboxChange={this.toggleDefaultLocation}
                    />
                  </div>
                </div>
              </form>
              <h3
                className={classNames(classes.h3, 'text-center')}
                style={{ display: showLocationErr ? 'block' : 'none' }}
              >
                User has not shared his location :|
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(HomePage),
)
