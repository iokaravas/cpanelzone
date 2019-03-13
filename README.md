# cpanelzone

A [Node](http://nodejs.org/) module that allows the update of a DNS entry in a CPanel dashboard.

Please note that this is a personal side project, I work on during my free time.
I may use weird/uncommon ways of doing stuff just for learning purposes.
As it stands though, the software is fully functional and I'm pushing only working prototypes.

If you wish you can always drop me a line with suggestions/issues in [issues](https://github.com/iokaravas/cpanelzone/issues) or at [@karavas](https://twitter.com/karavas).

### Dependencies

cpanelzone has the following dependencies:
- [node-fetch](https://www.npmjs.com/package/node-fetch)

### Quick Start
You can install this module using [npm](http://github.com/isaacs/npm):

`npm install https://github.com/iokaravas/cpanelzone.git --save`

### Example usage (example.js)

In general how to use it is pretty self-explanatory , except for the value of 'line'.
Unfortunately that's a required value from the cPanel API and you need to get it by
visiting your cPanel and inspecting the record element itself on the page.

You can simply inspect it (right click inspect element) and you'll find the line number in the name.

![In this example line value is 22](example_record_inspect.png?raw=true "In this example line value is 22")

```js
const cpanelzone = require('cpanelzone')

let myZoneUpdater = new cpanelzone({
  creds: {
    user:'your_username',
    pass:'your_password'
  },
  domain: 'the_cpanel_domain.net:port_if_any'
})

let entry = {
  domain: 'karavas.me',
  ttl:'3600',
  line:'22', // This is the only catch. Please read the documentation
  address: '127.0.0.1'
}

// Run the update and get the response object
myZoneUpdater.updateEntry(entry).then((jsonResp)=>{
  console.log(JSON.stringify(jsonResp))
})
```

### Authors

* **Ioannis (John) Karavas** - *Initial work* - [iokaravas](https://github.com/iokaravas)

See also the list of [contributors](https://github.com/cpanelzone/contributors) who participated in this project.

****DISCLAIMER:****

The login process is pretty "simplistic", thus fragile.
I created this because I needed to fake a DDNS service, and it works smoothly :)

***The software is provided AS-IS, I take no responsibility if your host denies you service if you use it.***

### TODO
Several things could be added and/or improved, including :

* Forward more advanced headers faking a real user interaction
* Get the line variable automatically by asking the API for the DNS entry
* Handle specific errors that may occur, although you still can catch what is thrown currently
* Handle even more DNS related stuff
* Better name for this project? :)
