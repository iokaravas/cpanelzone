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