Implements the Seafile Web API with Promises for Node.js.  
https://manual.seafile.com/develop/web_api.html  
Only a subset of API calls was tested. **Use with caution!**  

Usage example:

````javascript
const Seafile = require('./Seafile.class.js');
const sf = new Seafile('https://seafile.myserver.com', '<mysecrettoken>');

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
    return sf.uploadOverwriteFile(JSON.parse(res).repo_id, '/some/directory/on/my/machine/funny.jpg', '/some/directory/in/my/seafile/lib/funny.jpg');
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
