export default defineAppConfig({
  pages: [
    'pages/bgi/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
  },
  networkTimeout: {
    "request": 1000000,
    "connectSocket": 100000,
    "uploadFile": 100000,
    "downloadFile": 100000
  },
})

