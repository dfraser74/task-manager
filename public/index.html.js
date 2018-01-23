module.exports = function (templateParams) {
  // var manifestSource = templateParams.compilation.assets['manifest.json'].source();

  // // remove manifest.json from assets so it won't be written to disk
  // delete templateParams.compilation.assets['manifest.json'];
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>${templateParams.htmlWebpackPlugin.options.title}</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
    </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <script type="text/javascript">window.webpackManifest;</script>
  </body>
</html>`;
};