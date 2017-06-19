// @flow
import Storage from './lib/storage'

export const token = Storage.get('y_a')
// eslint-disable-next-line import/prefer-default-export
export const isProd = process.env.NODE_ENV === 'production'
