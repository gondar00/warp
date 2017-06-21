// @flow

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Loading from '../../component/loading'
import Rating from '../../component/rating'
import { APP_NAME } from '../../config'
import { getRestaurant } from '../../action/restaurant-detail'

const styles = {
  h2: {
    fontSize: '18px',
    letterSpacing: '3px',
    lineHeight: '1.4',
    fontWeight: '100',
    textTransform: 'uppercase',
    color: '#333',
  },
  icon: {
    textAlign: 'center',
    lineHeight: '45px',
    minHeight: '54px',
    background: '#fffbfb',
    border: '1px solid #ebebeb',
  },
  iconText: {
    letterSpacing: '2px',
    lineHeight: '52px',
  },
  dotted: {
    border: 'none',
    borderTop: '1px dotted #000',
    color: '#fff',
    backgroundColor: '#fff',
    height: '1px',
  },
  wrapStarRatings: {
    width: '100%',
    margin: '0 0 0.5em 0',
    display: 'inline-block',
    fontSize: '13px',
  },
  wrapReviewHeaderByline: {
    fontStyle: 'italic',
    fontSize: '13px',
    opacity: 0.5,
    display: 'inline-block',
    margin: '0 0 1em 0',
  },
  wrapReviewContentBody: {
    fontSize: '13px',
    lineHeight: '20px',
    margin: 0,
    padding: 0,
  },
}

type Props = {
  isFetching: Boolean,
  classes: Object,
  history: Object,
  fetchRestaurant: Function,
  restaurantData: Immutable.List,
  restaurantReviews: Immutable.List
};

const times = x => (f) => {
  // Idea dint work
  // The component dint render. Do the dirty way for now :()
  if (x > 0) {
    f()
    times(x - 1)(f)
  }
}

const range = x => [...Array(x).keys()]

const mapStateToProps = state => ({
  isFetching: state.restaurantDetail.get('isFetching'),
  restaurantData: state.restaurantDetail.get('restaurant').get('data'),
  restaurantReviews: state.restaurantDetail.get('restaurant').get('reviews'),
})
const mapDispatchToProps = dispatch => ({
  fetchRestaurant: id => dispatch(getRestaurant(id)),
})

class RestaurantDetail extends Component {
  componentDidMount() {
    const { history, fetchRestaurant } = this.props
    // @Dont worry .match returns new string. No mutation is happening. Phew.
    const id = history.location.pathname.match(/restaurant\/(.*)/)[1]
    fetchRestaurant({ id })
  }
  props: Props;
  render() {
    const {
      isFetching,
      classes,
      restaurantData,
      restaurantReviews,
    } = this.props
    if (isFetching) return <Loading />
    return (
      <div>
        <Helmet
          meta={[
            { name: 'description', content: APP_NAME },
            { property: 'og:title', content: APP_NAME },
          ]}
        />
        <div className="container" style={{ marginBottom: '50px' }}>
          <div className="row">
            <div className="col-md-6">
              <img
                src={restaurantData.get('image_url')}
                alt={restaurantData.get('name')}
                className="img-responsive"
                style={{ width: '100%', height: '480px' }}
              />
            </div>
            <div
              className="col-md-6 text-center"
              style={{ marginTop: '200px' }}
            >
              <h2 className={classes.h2}>
                {restaurantData.get('name')}
              </h2>
              <div className="row">
                <div className={classNames(classes.icon, 'col-md-4')}>
                  {restaurantData.get('is_closed')
                    ? <span className={classes.iconText}>CLOSE</span>
                    : <span className={classes.iconText}>OPEN</span>}
                </div>
                <div className={classNames(classes.icon, 'col-md-4')}>
                  <span className={classes.iconText}>
                    {restaurantData.get('price')}
                  </span>
                </div>
                <div className={classNames(classes.icon, 'col-md-4')}>
                  <span className={classes.iconText}>
                    {range(
                      parseInt(restaurantData.get('rating'), 10),
                    ).map(x => <Rating key={x} isFilled />)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr className={classes.dotted} />
          <h2
            className={classNames(classes.h2, 'text-center')}
            style={{ width: '100%', marginTop: '20px' }}
          >
            REAL REVIEWS FROM REAL CUSTOMERS
          </h2>
          <div className="row" style={{ marginBottom: '30px' }}>
            {restaurantReviews.map(review => (
              <div className="col-md-4">
                <div className={classes.wrapReviewHeader}>
                  <span className={classes.wrapStarRatings}>
                    {range(parseInt(review.get('rating'), 10)).map(x => (
                      <Rating key={x} isFilled />
                    ))}
                  </span>
                  <span className={classes.wrapReviewHeaderByline}>
                    <strong>{review.get('user').get('name')}</strong>
                    <span>&nbsp;on&nbsp;</span>
                    <strong>{review.get('time_created')}</strong>
                  </span>
                </div>
                <div className={classes.wrapReviewContent}>
                  <p className={classes.wrapReviewContentBody}>
                    {review.get('text')}
                    &nbsp;
                    {' '}
                    <Link to={review.get('url')} target="_blank">
                      Read more
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <hr className={classes.dotted} />
          <h2
            className={classNames(classes.h2, 'text-center')}
            style={{ width: '100%', marginTop: '20px' }}
          >
            Pictures
          </h2>
          <div className="row">
            {restaurantData.get('photos').map(photo => (
              <div className="col-md-4">
                <img
                  src={photo}
                  alt="restaurant"
                  className="img-responsive"
                  style={{ width: '100%', height: '400px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(RestaurantDetail),
)
