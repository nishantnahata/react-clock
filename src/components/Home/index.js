import React from 'react';
import { observer } from 'mobx-react';
import Clock from '../Clock';

@observer
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Clock clockColor="black" backgroundColor="white" />
      </div>
    );
  }
}
