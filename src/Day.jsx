import React, { Component } from 'react';

import hours from './hours';
import styles from './Day.css';

const ROUND_TO_NEAREST = 5;

function relativeY(e) {
  const { offsetTop, scrollTop } = e.target.parentNode.parentNode;
  const realY = e.pageY - offsetTop + scrollTop;
  return Math.floor(realY / ROUND_TO_NEAREST) * ROUND_TO_NEAREST;
}

export default class Day extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown(e) {
    const start = relativeY(e);
    this.setState({
      start,
      recording: true,
      end: start + ROUND_TO_NEAREST * 6,
    })
  }

  handleMouseMove(e) {
    if (!this.state.recording) {
      return;
    }
    const end = relativeY(e);
    this.setState({
      end: Math.max(this.state.start + ROUND_TO_NEAREST * 6, end),
    });
  }

  handleMouseUp(e) {
    this.setState({
      recording: false,
    });
  }

  render() {
    const {
      start,
      end,
    } = this.state;

    return (
      <div className={styles.component}>
        {hours.map((hour) => (
          <div
            key={hour}
            className={styles.hour}
          >
            <div className={styles.halfHour}/>
          </div>
        ))}

        {start > 0 && end > 0 && (
          <div
            className={styles.currentSelection}
            style={{
              top: start,
              height: end - start,
            }}
          >
          </div>
        )}
        <div
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          className={styles.mouseTarget}
        />
      </div>
    );
  }
}
