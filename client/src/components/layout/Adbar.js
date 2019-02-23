// import React, { Component } from 'react';
// //import AdSense from 'react-adsense';

// export default class Adbar extends Component {
//   render() {
//     return (
//       <AdSense.Google
//   client='ca-pub-7292810486004926'
//   slot='7806394673'
//   style={{ width: 500, height: 300, float: 'left' }}
//   format=''
//       />
//     )
//   }
// }


import React, { Component } from 'react';
import AdSense from 'react-adsense';

export default class Adbar extends Component {
  render() {
    return (
      <AdSense.Google
        client='ca-pub-7292810486004926'
        slot='7806394673'
        style={{ width: 500, height: 300, float: 'top' }}
        format=''
      />
    )
  }
}
