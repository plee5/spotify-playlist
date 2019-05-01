import React from 'react';

import { Direction, Slider } from 'react-player-controls';

const WHITE_SMOKE = '#eee'
const GRAY = '#878c88'
const GREEN = '#72d687'

const SliderBar = ({ direction, value, style }) => (
    <div
      style={Object.assign({}, {
        position: 'absolute',
        background: GRAY,
        borderRadius: 4,
      }, direction === Direction.HORIZONTAL ? {
        top: 0,
        bottom: 0,
        left: 0,
        width: `${value * 100}%`,
      } : {
        right: 0,
        bottom: 0,
        left: 0,
        height: `${value * 100}%`,
      }, style)}
    />
  )
  
  // A handle to indicate the current value
  const SliderHandle = ({ direction, value, style }) => (
    <div
      style={Object.assign({}, {
        position: 'absolute',
        width: 16,
        height: 16,
        background: GREEN,
        borderRadius: '100%',
        transform: 'scale(1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.3)',
        }
      }, direction === Direction.HORIZONTAL ? {
        top: 0,
        left: `${value * 100}%`,
        marginTop: -4,
        marginLeft: -8,
      } : {
        left: 0,
        bottom: `${value * 100}%`,
        marginBottom: -8,
        marginLeft: -4,
      }, style)}
    />
  )

class VolumeControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            direction: Direction.HORIZONTAL,
            value: 0,
            lastValueStart: 0,
            lastValueEnd: 0,
            lastIntent: 0,
            lastIntentStart: 0,
            lastIntentEndCount: 0,
            isEnabled: true
        }
        
    }

    

    render() {
        return(
            <Slider
                isEnabled={this.state.isEnabled}
                direction={this.state.direction}
                onChange={newValue => this.setState(() => ({ value: newValue }))}
                onChangeStart={startValue => this.setState(() => ({ lastValueStart: startValue }))}
                onChangeEnd={endValue => this.setState(() => ({ lastValueEnd: endValue }))}
                onIntent={intent => this.setState(() => ({ lastIntent: intent }))}
                onIntentStart={intent => this.setState(() => ({ lastIntentStart: intent }))}
                onIntentEnd={() => this.setState(() => ({ lastIntentEndCount: this.state.lastIntentEndCount + 1 }))}
                style={{
                    width: this.state.direction === Direction.HORIZONTAL ? 200 : 8,
                    height: this.state.direction === Direction.HORIZONTAL ? 8 : 130,
                    borderRadius: 4,
                    background: WHITE_SMOKE,
                    transition: this.state.direction === Direction.HORIZONTAL ? 'width 0.1s' : 'height 0.1s',
                    cursor: this.state.isEnabled === true ? 'pointer' : 'default',
                  }}
            >
                <SliderBar
                    direction={this.state.direction}
                    value={this.state.value}
                    style={{ background: this.state.isEnabled ? '#72d687' : '#878c88' }}
                />
                <SliderBar
                    direction={this.state.direction}
                    value={this.state.lastIntent}
                    style={{ background: 'rgba(0, 0, 0, 0.05)' }}
                />
                <SliderHandle
                    direction={this.state.direction}
                    value={this.state.value}
                    style={{ background: this.state.isEnabled ? '#72d687' : '#878c88' }}
                />
            </Slider>
        );
    }
}

export default VolumeControl;