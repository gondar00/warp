// @flow

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames'
import Input from '../../component/input'
import Button from '../../component/button'
import { required, email } from '../../lib/validation'

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

type Props = {
  classes: Object,
  handleSubmit: Function,
  onFindClicked: Function,
}

const mapDispatchToProps = dispatch => ({
  onFindClicked: (values) => {
    console.log('gg', values)
  },
})

class HomePage extends Component {
  onComponentDidMount() {}
  props: Props
  render() {
    const { classes, handleSubmit, onFindClicked } = this.props
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
            <h2 className={classes.h2}>{APP_NAME}</h2>
            <div className="container">
              <form className="row" onSubmit={handleSubmit(onFindClicked)} noValidate>
                <div className="col-md-4 text-center">
                  <Field
                    className="form-control"
                    name="location"
                    type="text"
                    placeholder="Location"
                    component={Input}
                    validate={required}
                  />
                </div>
                <div className="col-md-4 text-center">
                  <Field
                    className="form-control"
                    name="restuarant"
                    type="text"
                    placeholder="Search for restuarants..."
                    component={Input}
                    validate={required}
                  />
                </div>
                <div
                  className={classNames(classes.mt10, 'col-md-4 text-center')}
                >
                  <Button text="FIND" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: 'searchForm',
  })(injectSheet(styles)(HomePage)),
)
