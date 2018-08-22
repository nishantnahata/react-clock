import {observable, action} from 'mobx';
import moment from 'moment';

export default class AppState {
    @observable message = 'Hello World!!!!';
    @observable time = moment();

    constructor(period = 1000) {
        this.interval = setInterval(() => this.clockTick(), period);
    }

    @action clockTick(newTime = moment()) {
        this.time = newTime;
    }
}
