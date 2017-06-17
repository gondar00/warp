// @flow

import injectSheet from 'react-jss'
import classNames from 'classnames'
import React from 'react'
import styles from '../styles/input'
import { isEmpty } from '../lib/validation'

type Props = {
  classes: Object,
  className: string,
  input: Object,
  name: string,
  type: string,
  value: string,
  placeholder: string,
  shouldAutocomplete: boolean,
  isDisabled: boolean,
  meta: Object,
  onChange: Function
};

const Input = ({
  classes,
  className,
  input,
  name,
  type,
  value,
  placeholder,
  shouldAutocomplete,
  isDisabled,
  meta,
  onChange,
}: Props) => (
  <div>
    <input
      {...input}
      className={
        className ? classNames(classes.input, className) : classes.input
      }
      id={name}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={shouldAutocomplete ? null : 'off'}
      disabled={isDisabled ? 'disabled' : ''}
    />
    {!isEmpty(meta)
      ? <p className={classes.error}>
        {meta.touched && (meta.error && <span>{meta.error}</span>)}
      </p>
      : null}
  </div>
)

Input.defaultProps = {
  shouldAutocomplete: true,
  meta: {},
}

export default injectSheet(styles)(Input)
