import * as React from "react";
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import moment from 'moment';
import {ClockView} from './ClockView';

@observer
export default class Clock extends React.Component {

    @observable time = moment();

    constructor(props) {
        super(props);
        this.interval = setInterval(() => this.clockTick(), 1000);
    }

    @action clockTick(newTime = moment()) {
        this.time = newTime;
    }

    render() {
        const props = this.props;
        return <ClockView
                hours={this.time.hours()}
                minutes={this.time.minutes()}
                seconds={this.time.seconds()}
                {...props}
                />
    }
}

Clock.propTypes = {
    clockColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    size: PropTypes.string
};