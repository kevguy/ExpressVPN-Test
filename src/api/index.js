const fetch = require('isomorphic-fetch')

/**
 * Get data from placeholder API using fetch
 * @param {number} pageNo the page number
 * @returns {Object | Error} retrieved data or error
 */
async function fetchStuff(pageNo) {
  const url = `https://jsonplaceholder.typicode.com/posts/${pageNo}`

  const response = await fetch(url)

  if (response.status >= 400) {
    if (response.status === 404) {
      throw(new Error(`404 Request`))
    }

    if (response.status === 500) {
      throw(new Error(`Internal Server Error`))
    }

    throw(new Error('Request Error'))

  } else{
    return await response.json()
  }
}

/**
 * Post data to placeholder API using fetch
 * @param {Object} item the data-to-be-sent
 * @returns {Object | Error} response or error
 */
async function postStuff(item) {
  const url = `https://jsonplaceholder.typicode.com/posts`

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status >= 400) {
    if (response.status === 404) {
      throw(new Error(`404 Request`))
    }

    if (response.status === 500) {
      throw(new Error(`Internal Server Error`))
    }

    throw(new Error('Request Error'))

  } else{
    return await response.json()
  }
}

module.exports = {
  fetchStuff,
  postStuff
}
