Usage example:

````javascript
const Seafile = require('./Seafile.class.js');
const sf = new Seafile('https://cloud.uk-essen.de', '<mysecrettoken>');

sf.getServerInformation()
  .then(res => {
    console.log(JSON.parse(res));
  })
  .catch(err => {
    console.log("HTTP Status: " + err.statusCode);
    console.log(JSON.parse(err.error));
  });

sf.getDefaultLibrary()
  .then(res => {
    return sf.uploadFile(JSON.parse(res).repo_id, p='/', '/some/directory/on/my/machine/funny.jpg');
  })
  .then(res => {
    console.log('File upload was successful.');
    console.log(res);
  })
  .catch(err => {
    try {
      let jsn = JSON.parse(err.error);
      console.log("An API error occured.");
      console.log("HTTP Status: " + err.statusCode);
      console.log(jsn);
    }
    catch (e) {
      console.log(err);
    }
  });
```
