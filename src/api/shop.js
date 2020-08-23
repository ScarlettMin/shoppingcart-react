/**
 * Mocking client-server processing
 */
const _products = [
    {"id": 1, "title": "iPad 4 Mini 111", "price": 500.01, "inventory": 2},
    {"id": 2, "title": "iPad 4 Mini 222", "price": 500.02, "inventory": 10},
    {"id": 3, "title": "iPad 4 Mini 333", "price": 500.03, "inventory": 5}
  ]
  
  export default {
    getProducts (cb) {
      setTimeout(() => cb(_products), 3000)
    },
  
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.webdriver)
          ? cb()
          : errorCb()
      }, 100)
    }
  }