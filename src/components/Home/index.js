import React from 'react';
import AppState from '../../stores/AppState';
import {observer} from 'mobx-react';
import Clock from '../Clock';

@observer
export default class Home extends React.Component {

    componentDidMount() {
    }

    render() {
        return <div>
            <Clock />
        </div>;
    }
}
