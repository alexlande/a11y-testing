import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './key-visualizer.css';

const Keypress = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={3000} classNames="keypress">
    {children}
  </CSSTransition>
);

const keyNames = {
  ArrowUp: 'Up',
  ArrowDown: 'Down',
  ArrowRight: 'Right',
  ArrowLeft: 'Left',
  ' ': 'Space'
};
const type = 'sans-serif b f2';
const skin = 'bg-near-black white br3 depth-2';
const layout = 'flex justify-center items-center mt3';

const KeyBox = ({ keyName, i }) => (
  <div className={`keyBox ${type} ${skin} ${layout}`}>
    {keyNames[keyName] || keyName}
  </div>
);

class KeyVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      activeKeys: []
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleWindowBlur = this.handleWindowBlur.bind(this);
    this.keyIndex = 0;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleWindowBlur);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('blur', this.handleWindowBlur);
  }

  handleWindowBlur(ev) {
    this.setState({
      activeKeys: []
    });
  }

  handleKeyDown({ key }) {
    const { activeKeys } = this.state;

    if (key === 'Dead') {
      return;
    }

    this.setState({
      activeKeys: activeKeys.concat({
        name: key,
        index: this.keyIndex
      })
    });

    this.keyIndex++;
  }

  handleKeyUp({ key }) {
    this.setState({
      activeKeys: this.state.activeKeys.filter(
        activeKey => key !== activeKey.name
      )
    });
  }

  render() {
    const { activeKeys } = this.state;

    return (
      <div className="fixed right-0 bottom-0 pa4 keyVisualizer">
        <TransitionGroup className="flex flex-column flex-column-reverse justify-center">
          {activeKeys.map(key => (
            <Keypress key={key.index}>
              <KeyBox keyName={key.name} />
            </Keypress>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default KeyVisualizer;
