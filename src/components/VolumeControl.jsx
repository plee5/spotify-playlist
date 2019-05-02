import React from 'react';
import { Direction, Slider } from 'react-player-controls';
import { ReactComponent as SoundOn } from '../icons/sound_on.svg';
import { ReactComponent as SoundOff } from '../icons/sound_mute.svg';

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
        this.changeVolume = this.changeVolume.bind(this);

        this.state = {
            direction: Direction.HORIZONTAL,
            value: 1,
            lastValueStart: 0,
            lastValueEnd: 0,
            lastIntent: 0,
            lastIntentStart: 0,
            lastIntentEndCount: 0,
            isEnabled: true
        }
        
    }

    async changeVolume(newValue) {
        await this.props.spotify.setVolume(newValue * 100, {
            device_id: this.props.device
        });
        this.setState(() => ({
             value: newValue 
            }));
    }

    render() {
        const {
            direction,
            value,
            lastValueStart,
            lastValueEnd,
            lastIntent,
            lastIntentStart,
            lastIntentEndCount,
            isEnabled,
        } = this.state
        return(
            <div>
            {(value == 0) ? (
                <SoundOff />
            ) : (
                <SoundOn />
            )}
            <Slider
                isEnabled={isEnabled}
                direction={direction}
                onChange={newValue => this.changeVolume(newValue)}
                onChangeStart={startValue => this.setState(() => ({ lastValueStart: startValue }))}
                onChangeEnd={endValue => this.setState(() => ({ lastValueEnd: endValue }))}
                onIntent={intent => this.setState(() => ({ lastIntent: intent }))}
                onIntentStart={intent => this.setState(() => ({ lastIntentStart: intent }))}
                onIntentEnd={() => this.setState(() => ({ lastIntentEndCount: lastIntentEndCount + 1 }))}
                style={{
                    width: direction === Direction.HORIZONTAL ? 200 : 8,
                    height: direction === Direction.HORIZONTAL ? 8 : 130,
                    borderRadius: 4,
                    background: WHITE_SMOKE,
                    transition: direction === Direction.HORIZONTAL ? 'width 0.1s' : 'height 0.1s',
                    cursor: isEnabled === true ? 'pointer' : 'default',
                  }}
            >
                <SliderBar
                    direction={direction}
                    value={value}
                    style={{ background: isEnabled ? '#72d687' : '#878c88' }}
                />
                <SliderBar
                    direction={direction}
                    value={lastIntent}
                    style={{ background: 'rgba(0, 0, 0, 0.05)' }}
                />
                <SliderHandle
                    direction={direction}
                    value={value}
                    style={{ background: isEnabled ? '#72d687' : '#878c88' }}
                />
            </Slider>
            </div>
        );
    }
}

export default VolumeControl;