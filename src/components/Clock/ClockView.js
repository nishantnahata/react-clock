import * as React from "react";
import PropTypes from 'prop-types';

export class ClockView extends React.Component {

    constructor(props) {
        super(props);
        this.ctx = null;
        this.radius = null;
    }

    setValues = (ctx, radius) => {
        this.ctx = ctx;
        this.radius = radius;
    };

    drawFace = (ctx, radius) => {
        let grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2*Math.PI);
        ctx.fillStyle = this.props.clockColor;
        ctx.fill();
        grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
        grad.addColorStop(0, this.props.backgroundColor);
        grad.addColorStop(0.5, this.props.clockColor);
        grad.addColorStop(1, this.props.backgroundColor);
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius*0.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
        ctx.fillStyle = this.props.backgroundColor;
        ctx.fill();
    };

    drawNumbers = (ctx, radius) => {
        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for(let num = 1; num < 13; num++) {
            let ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius*0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius*0.85);
            ctx.rotate(-ang);
        }
    };

    drawHand = (ctx, pos, length, width) => {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    };

    drawTime = (ctx, radius) => {
        let hour = this.props.hours;
        let minute = this.props.minutes;
        let second = this.props.seconds;
        //hour
        hour=hour%12;
        hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
        this.drawHand(ctx, hour, radius*0.5, radius*0.07);
        //minute
        minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
        this.drawHand(ctx, minute, radius*0.8, radius*0.07);
        // second
        second=(second*Math.PI/30);
        this.drawHand(ctx, second, radius*0.9, radius*0.02);
    };

    setUpClock = (canvas) => {
        if(this.ctx === null && canvas) {
            const ctx = canvas.getContext("2d");
            let radius = (canvas.height / 2);
            ctx.translate(radius, radius);
            radius = 0.9 * radius;
            this.setValues(ctx, radius);
        }
        this.drawFace(this.ctx, this.radius);
        this.drawNumbers(this.ctx, this.radius);
        this.drawTime(this.ctx, this.radius);
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if(this.ctx !== null && this.radius !== null) {
            this.drawTime(this.ctx, this.radius);
        }
    }

    render() {
        return <div>
            <canvas id="clock" ref={(ref) => this.setUpClock(ref)}
                    height='400' width='400' style={{backgroundColor: this.props.backgroundColor}} />
        </div>;
    }
}

ClockView.protoTypes = {
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    clockColor: PropTypes.string.isRequired
};

ClockView.defaultProps = {
    backgroundColor: '#333',
    clockColor: 'white'
};