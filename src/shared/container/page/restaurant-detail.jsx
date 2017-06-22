// @flow

import $ from 'jquery'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Loading from '../../component/loading'
import Input from '../../component/input'
import Button from '../../component/button'
import Rating from '../../component/rating'
import { required, integer } from '../../lib/validation'
import { APP_NAME } from '../../config'
import { getRestaurant, addReview } from '../../action/restaurant-detail'

const styles = {
  pt15: {
    paddingTop: '15px',
  },
  h2: {
    fontSize: '18px',
    letterSpacing: '3px',
    lineHeight: '1.4',
    fontWeight: '100',
    textTransform: 'uppercase',
    color: '#333',
  },
  hide: {
    display: 'none !important',
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
  reviewButton: {
    background: '#fff',
    color: 'black',
    border: '1px solid #c30',
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
  addNewReview: Function,
  fetchRestaurant: Function,
  handleSubmit: Function,
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

const yelpReviews = (classes, review) => (
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
)
const reviewForm = (classes, addNewReview, handleSubmit) => (
  <form
    id="reviewForm"
    onSubmit={handleSubmit(addNewReview)}
    className="form form-inline"
    style={{ width: '100%', margin: '10px' }}
    noValidate
  >
    <div className="col-md-4 form-group">
      <Field
        className="form-control"
        name="name"
        type="text"
        placeholder="Name"
        component={Input}
        validate={required}
      />
    </div>
    <div
      className={classNames(classes.pt15, 'col-md-4 form-group')}
    >
      <Field
        className="form-control"
        name="rating"
        type="text"
        placeholder="Enter a number from 1-5"
        component={Input}
        validate={[required, integer]}
      />
    </div>
    <div className="col-md-4 form-group">
      <Field
        className="form-control"
        name="comments"
        type="textarea"
        placeholder="Comments"
        component={Input}
        validate={required}
      />
    </div>
      <Button
        text='Submit Review'
        type="submit"
        className={classes.reviewButton}
      />
  </form>
)
const mapStateToProps = state => ({
  isFetching: state.restaurantDetail.get('isFetching'),
  restaurantData: state.restaurantDetail.get('restaurant').get('data'),
  restaurantReviews: state.restaurantDetail.get('restaurant').get('reviews'),
})
const mapDispatchToProps = dispatch => ({
  fetchRestaurant: id => dispatch(getRestaurant(id)),
  addNewReview: values => dispatch(addReview(values)),
})

class RestaurantDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { showReviewForm: false }
  }
  componentDidMount() {
    const { history, fetchRestaurant } = this.props
    // @Dont worry .match returns new string. No mutation is happening. Phew.
    const id = history.location.pathname.match(/restaurant\/(.*)/)[1]
    fetchRestaurant({ id })

    this.onWriteReview = this.onWriteReview.bind(this)
  }
  onWriteReview() {
    const { showReviewForm } = this.state
    this.setState({
      showReviewForm: !showReviewForm,
    })
  }
  props: Props;
  render() {
    const {
      isFetching,
      classes,
      handleSubmit,
      restaurantData,
      restaurantReviews,
      addNewReview,
    } = this.props
    if (isFetching) return <Loading />
    const { showReviewForm } = this.state
    return (
      <div>
        <Helmet
          meta={[
            { name: 'description', content: APP_NAME },
            { property: 'og:title', content: APP_NAME },
          ]}
        />
        {restaurantData.size > 0 && restaurantReviews.size > 0
          ? <div className="container" style={{ marginBottom: '50px' }}>
            <div className="row" style={{ marginTop: '50px' }}>
              <div className="col-md-6" style={{ maxHeight: '420px' }}>
                <img
                  src={restaurantData.get('image_url')}
                  alt={restaurantData.get('name')}
                  className="img-responsive"
                  style={{ width: '100%', height: '420px' }}
                />
              </div>
              <div
                className="col-md-6 text-center"
                style={{ marginTop: '50px' }}
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
              {showReviewForm
                  ? reviewForm(classes, addNewReview, handleSubmit)
                  : restaurantReviews.map(review =>
                      yelpReviews(classes, review),
                    )}
            </div>
            <Button
              text={showReviewForm ? 'Submit Review' : 'Write a review'}
              type="submit"
              className={showReviewForm ? classes.hide : classes.reviewButton}
              onClick={() => this.onWriteReview()}
            />
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
                    style={{ width: '100%', height: '300px' }}
                  />
                </div>
                ))}
            </div>
          </div>
          : <span>Sorry! Could not find details</span>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'restaurantDetail',
  })(injectSheet(styles)(RestaurantDetail)),
)
