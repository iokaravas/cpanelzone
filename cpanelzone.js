let fetch = require('node-fetch')

class CpanelZone {

  /***
   * Constructor expects at least the credentials & domain
   * entry is optional and can be given directly to method updateEntry
   * @param opts
   */
  constructor(opts) {

    this.creds = opts.creds
    this.domain = opts.domain
    this.entry = opts.entry

    if ( !(opts.creds && opts.domain) ) {
      t
    }

    // Headers required for request. It's enhanced by cookies during the process
    this.basicHeaders = {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-requested-with': 'XMLHttpRequest'
    }

    // Create required uris or parts
    this.updateRoute = '/json-api/cpanel'
    this.updateBody = `cpanel_jsonapi_apiversion=2&cpanel_jsonapi_module=ZoneEdit&cpanel_jsonapi_func=edit_zone_record`
    this.loginRoute = 'login/?login_only=1'
    this.loginBody = `user=${this.creds.user}&pass=${this.creds.pass}&goto_uri=%2F`
    this.reqURI = `https://${this.domain}/`
  }

  createQueryString(obj) {
    let qStr = ''

    Object.entries(obj).map((entry)=>{
      qStr += `&${entry[0]}=${entry[1]}`
    })

    return qStr
  }

  login() {

    return fetch(this.reqURI+this.loginRoute, this.reqOpts).then((resp)=>{
      try {
        let cpsRegex = /(cpsession=.+?)(?=;)/ // Find session cookie
        this.reqOpts.headers['Cookie'] = cpsRegex.exec(resp.headers.get('set-cookie'))[0] // Add cookie to headers
      }
      catch(err) {
        throw new TypeError(`Couldn't parse the headers for cookie`)
      }
      return resp.json()
    })

  }

  update(jsonResp) {

    let reqURI = this.reqURI + jsonResp.security_token + this.updateRoute
    this.reqOpts.body = this.updateBody + this.updateBodyEntry

    return fetch(reqURI, this.reqOpts).then((resp)=>{
      return resp.json()
    }).then((resp)=>{
      return resp
    })

  }

  updateEntry(entry = this.entry) {

    this.updateBodyEntry = this.createQueryString(entry)

    this.reqOpts = {
      credentials : 'include',
      headers : this.basicHeaders,
      body: this.loginBody,
      method : 'POST',
      mode : 'cors'
    }

    ;(async()=> {
      try {
        const login = await this.login()
        const updateEntry = await this.update(login)
      }
      catch(err) {
        throw err // Forward whatever error
      }
    })()

  }

}

module.exports = CpanelZone