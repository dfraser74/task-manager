const path = require('path');

module.exports =  {
  "background_color": "#ffffff",
  "display": "standalone",
  "name": "Task manager",
  "orientation": "portrait",
  "scope": "/",
  "short_name": "Task",
  "start_url": "/",
  "theme_color": "#2196F3",
  icons: [
    {
      src: path.resolve('src/images/icons/pwa-512x512.png'),
      sizes: [192, 256, 512] // multiple sizes
    },
  ]
}