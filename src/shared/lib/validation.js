// @flow

export const isEmpty = value => value === undefined || value === null || value === ''

export function email(value) {
  // Let's not start a debate on email regex. @gandharv
  if (
    !isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return 'Invalid email address'
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required'
  }
}
