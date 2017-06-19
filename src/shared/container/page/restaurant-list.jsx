// @flow

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import classNames from 'classnames'
import queryString from 'query-string'
import { APP_NAME } from '../../config'
import Loading from '../../component/loading'
import Restaurant from '../../component/restaurant'
import { getRestaurants } from '../../action/restaurant-list'

const styles = {
  mt50: {
    marginTop: '50px',
  },
}

type Props = {
  restaurants: Immutable.List,
  classes: Object,
  history: Object,
  isFetching: boolean,
  fetchRestaurants: Function
};

const mapStateToProps = state => ({
  isFetching: state.restaurantList.get('isFetching'),
  restaurants: state.restaurantList.get('restaurants'),
})

const mapDispatchToProps = dispatch => ({
  fetchRestaurants: params => dispatch(getRestaurants(params)),
})

class RestaurantList extends Component {
  componentDidMount() {
    const { history, fetchRestaurants } = this.props
    const parsedSearch = queryString.parse(history.location.search)
    const location = {
      latitude: parsedSearch.lat,
      longitude: parsedSearch.long,
    }
    fetchRestaurants(location)
  }
  props: Props;
  render() {
    const { isFetching, classes, restaurants } = this.props
    if (isFetching) return <Loading />
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
            {restaurants.size > 0
              ? restaurants.map(restaurant => (
                <Restaurant
                  key={restaurant.get('id')}
                  restaurant={restaurant}
                />
                ))
              : <span>No Restaurants </span>}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(RestaurantList),
)
