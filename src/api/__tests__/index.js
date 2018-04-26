// 1. Import the required dependencies
const api = require('../index')
// fetch is only availabe in browsers by default, so I have to import one here
const fetch = require('isomorphic-fetch')

// mock data
const mockData = {
  msg: "Test Data"
}

// 2. Mock the behavior of fetchStuff with the following stubs defining
// what happens when it is called the first time and second time
api.fetchStuff = jest.fn()
  .mockImplementationOnce((pageNo) => {
    return new Promise((resolve, reject) => {
      return resolve(mockData)
    })
  })
  .mockImplementationOnce((pageNo) => {
    return new Promise((resolve, reject) => {
      reject(new Error('404 Request'))
    })
  })

// 3. (Not related to the problem,
// I just found this way of faking modules quite interesting,
// so I included it here)
// fetchStuff and postStuff use 'isomorphic-fetch', here it says 'mock',
// but what I'm actually doing here is attaching jest to 'isomorphic-fetch'
// so jest can spy on it
// note that I didn't stub the behavior of fetch here
jest.mock('isomorphic-fetch', () => {
  const originalModule = require.requireActual('isomorphic-fetch');

  // Mock the name export
  return jest.fn(originalModule);
});


describe('3rd -Party API', () => {

  // 4. For complete's sake, testing if it can get the correct output
  // note that the fetchStuff executed here is the one mocked in Step 2
  it('returns an object if status code is ok', () => {
    expect(api.fetchStuff(1)).resolves.toEqual(mockData)
  })

  // 5. This is where you should look at
  // note that the fetchStuff executed here is the one mocked in Step 2
  it('throws an error if status code is not ok', () => {
    expect(api.fetchStuff(1)).rejects.toEqual(Error('404 Request'))
  })


  // 6. Just testing whether what I did in Step 3 actually works
  // if so, I can inspect the arguments fetch uses
  it('fetch is called with the correct params', async () => {
    const url = `https://jsonplaceholder.typicode.com/posts`

    const expected = [
      url,
      {
        method: 'POST',
        body: JSON.stringify(mockData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ]

    await api.postStuff(mockData)
    expect(fetch).toHaveBeenCalledWith(...expected)
  })
})
