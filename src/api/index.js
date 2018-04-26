const fetch = require('isomorphic-fetch')

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
