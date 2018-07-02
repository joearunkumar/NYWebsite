import React, {Component} from 'react';

class payumoney extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    //this.payumoney().then(res => this.setState({response: res})).catch(err => console.log(err));
    //this.callApi().then(res => this.setState({response: res.express})).catch(err => console.log(err));
  }

  /*payumoney() {
    //Create a Data object that is to be passed to LAUNCH method of Bolt
    var pd = {
      key: 'B3BoXcyz',
      txnid: '123456789',
      amount: '1000',
      firstname: 'Joe',
      email: 'joearun.1990@gmail.com',
      phone: '9003552289',
      productinfo: 'trust',
      surl: '',
      furl: '',
      hash: ''
    }

    // Data to be Sent to API to generate hash.
    let data = {
      'txnid': pd.txnid,
      'email': pd.email,
      'amount': pd.amount,
      'productinfo': pd.productinfo,
      'firstname': pd.firstname
    }
    let self = this;
    // API call to get the Hash value
    fetch('/NYWebsite/getHash', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(a) {
      return a.json();
    }).then(function(json) {
      pd.hash = json['hash']
      //  With the hash value in response, we are ready to launch the bolt overlay.
      //Function to launch BOLT
      self.redirectToPayU(pd);
    });
  }

  redirectToPayU(pd) {
    bolt.launch(pd, {
      responseHandler: function(response) {
        // your payment response Code goes here
        fetch('/NYWebsite/responseHash', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(response.response)
        }).then(function(a) {
          return a.json();
        }).then(function(json) {
          console.log(json);
        });
      },
      catchException: function(response) {
        // the code you use to handle the integration errors goes here
        // Make any UI changes to convey the error to the user
      }
    });
  }*/

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200)
      throw Error(body.message);

    return body;
  };

  render() {
    return (<div className="payumoney">
      <p className="App-intro">{this.state.response}</p>
    </div>);
  }
}

export default payumoney;
