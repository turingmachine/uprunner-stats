export default typeof window === 'undefined'
  ? require('node-fetch')
  : window.fetch
