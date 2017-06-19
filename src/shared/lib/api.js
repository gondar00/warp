// @flow
/* eslint-disable no-console*/

/**
 * API Functions
 *
 */

// Consts and Libs
import 'isomorphic-fetch'
import { isEmpty } from './validation'
import {
  isProd,
  APP_NAME,
  ERROR_MESSAGES,
  API_ENDPOINTS,
  API_OPTIONS,
} from '../config'

import { token } from '../util'
// TODO: this is used to prevent the error that absolute urls are not supported
const HOSTNAME = API_OPTIONS.clientOrigin
// Config
const ENDPOINTS = API_ENDPOINTS.endpoints

// Enable debug output when in Debug mode
const DEBUG_MODE = !isProd

// Number each API request (used for debugging)
let requestCounter = 0

/* Helper Functions ==================================================================== */
/**
  * Debug or not to debug
  */
function debug(str, title) {
  if (DEBUG_MODE && (title || str)) {
    if (title) {
      console.log(`=== DEBUG: ${title} ===========================`)
    }
    if (str) {
      console.log(str)
      console.log('%c ...', 'color: #CCC')
    }
  }
}

/**
  * Sends requests to the API
  */
function handleError(err) {
  let error = ''
  if (typeof err === 'string') error = err
  else if (err && err.message) error = err.message

  if (!error) error = ERROR_MESSAGES.default
  return error
}

/**
  * Convert param object into query string
  * eg.
  *   {foo: 'hi there', bar: { blah: 123, quux: [1, 2, 3] }}
  *   foo=hi there&bar[blah]=123&bar[quux][0]=1&bar[quux][1]=2&bar[quux][2]=3
  */
function serialize(obj, prefix) {
  const str = []

  Object.keys(obj).forEach((p) => {
    const k = prefix ? `${prefix}[${p}]` : p
    const v = obj[p]

    str.push(
      v !== null && typeof v === 'object'
        ? serialize(v, k)
        : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
    )
  })

  return str.join('&')
}

/**
  * Sends requests to the API
  */
function fetcher(method, inputEndpoint, inputParams, body) {
  let endpoint = inputEndpoint

  const params = inputParams
  return new Promise(async (resolve, reject) => {
    requestCounter += 1
    const requestNum = requestCounter

    // After x seconds, let's call it a day!
    const timeoutAfter = 10
    const apiTimedOut = setTimeout(
      () => reject(ERROR_MESSAGES.timeout),
      timeoutAfter * 1000,
    )

    if (!method || !endpoint) return reject('Missing params (AppAPI.fetcher).')

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': `${APP_NAME}`,
    }
    // Build request
    const req = {
      method: method.toUpperCase(),
      headers: token
        ? { ...headers, 'Authorization': `Bearer ${token}` }
        : headers,
    }

    // Add Endpoint Params
    let urlParams = ''
    if (params) {
      // Object - eg. /products?title=this&cat=2
      if (typeof params === 'object') {
        // Replace matching params in API routes eg. /products/{param}/foo
        Object.keys(params).forEach((param) => {
          if (endpoint.includes(`{${param}}`)) {
            if (params[param] === undefined) params[param] = ''
            endpoint = endpoint.split(`{${param}}`).join(params[param])
            delete params[param]
          }
        })
        // TODO: Remove the /{}

        // Add the rest of the params as a query string
        if (!isEmpty(params)) urlParams = `?${serialize(params)}`

        // String or Number - eg. /products/23
      } else if (typeof params === 'string' || typeof params === 'number') {
        urlParams = `/${params}`

        // Something else? Just log an error
      } else {
        debug(
          "You provided params, but it wasn't an object!",
          endpoint + urlParams,
        )
      }
    }

    // Add Body
    if (body) req.body = JSON.stringify(body)

    const thisUrl = HOSTNAME + endpoint + urlParams
    debug('', `API Request #${requestNum} to ${thisUrl}`)
    // Make the request
    return fetch(thisUrl, req)
      .then(async (rawRes) => {
        // API got back to us, clear the timeout
        clearTimeout(apiTimedOut)

        let jsonRes = {}

        try {
          jsonRes = await rawRes.json()
        } catch (error) {
          const err = { error, message: ERROR_MESSAGES.invalidJson }
          throw err
        }

        // Only continue if the header is successful
        if (rawRes && rawRes.status === 200) {
          return jsonRes
        }

        throw jsonRes
      })
      .then((res) => {
        debug(res, `API Response #${requestNum} from ${thisUrl}`)
        return resolve(res)
      })
      .catch((err) => {
        // API got back to us, clear the timeout
        clearTimeout(apiTimedOut)

        debug(err, endpoint + urlParams)
        return reject(err)
      })
  })
}

/* Create the API Export ==================================================================== */
/**
  * Build services from Endpoints
  */
const AppAPI = {
  handleError,
}

ENDPOINTS.forEach((endpoint, key) => {
  AppAPI[key] = {
    get: (params, payload) => fetcher('GET', endpoint, params, payload),
    post: (params, payload) => fetcher('POST', endpoint, params, payload),
    patch: (params, payload) => fetcher('PATCH', endpoint, params, payload),
    put: (params, payload) => fetcher('PUT', endpoint, params, payload),
    delete: (params, payload) => fetcher('DELETE', endpoint, params, payload),
  }
})

/* Export ==================================================================== */
export default AppAPI

/* eslint-enable no-console*/
