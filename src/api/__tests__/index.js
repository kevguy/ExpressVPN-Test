const api = require('../index')
const fetch = require('isomorphic-fetch')

api.fetchStuff = jest.fn()
  .mockImplementationOnce((pageNo) => {
    return new Promise((resolve, reject) => {
      return resolve({
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
      })
    })
  })
  .mockImplementationOnce((pageNo) => {
    return new Promise((resolve, reject) => {
      reject(new Error('404 Request'))
    })
  })

jest.mock('isomorphic-fetch', () => {
  const originalModule = require.requireActual('isomorphic-fetch');

  // Mock the name export
  return jest.fn(originalModule);
});

describe('3rd -Party API', () => {

  it('returns an object if status code is ok', () => {
    expect(api.fetchStuff(1)).resolves.toEqual({
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    })
  })

  it('throws an error if status code is not ok', () => {
    expect(api.fetchStuff(1)).rejects.toEqual(Error('404 Request'))
  })

  it('fetch is called with the correct params', async () => {
    const url = `https://jsonplaceholder.typicode.com/posts`

    const item = {
      message: `Simply for testing fetch`
    }

    const expected = [
      url,
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ]

    await api.postStuff(item)
    expect(fetch).toHaveBeenCalledWith(...expected)
  })
})
