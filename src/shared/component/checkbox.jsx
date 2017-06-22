// @flow

import React, { Component } from 'react'

type Props = {
  isChecked: boolean,
  label: string,
  labelClass: string,
  handleCheckboxChange: Function
};

class Checkbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: props.isChecked,
    }
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this)
  }

  toggleCheckboxChange() {
    const { handleCheckboxChange } = this.props

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked,
    }))

    handleCheckboxChange()
  }
  props: Props;
  render() {
    const { label, labelClass } = this.props
    const { isChecked } = this.state
    return (
      <div style={{ color: '#fff' }}>
        <label htmlFor={label}>
          <input
            id={label}
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          <span className={labelClass} style={{ marginLeft: '10px' }}>{label}</span>
        </label>
      </div>
    )
  }
}

export default Checkbox
