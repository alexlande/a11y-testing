import React, { Component } from 'react';

import CloseIcon from './icons/close';

const labels = {
  altText: 'Alt text',
  buttonText: 'Button text',
  focusOutline: 'Focus outline',
  formLabels: 'Form labels',
  goodAltText: 'Meaningful alt text',
  keyboardElements: 'Keyboard accessible interactive elements',
  keyboardOnlyFocusOutline: 'Keyboard-only focus outline'
};

class Checkbox extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggle(this.props.option);
  }

  render() {
    const { checked, label } = this.props;

    return (
      <label className="flex pt2 pr3 pb2 pl3 bg-white black br-pill">
        <input onChange={this.toggle} checked={checked} type="checkbox" />

        <span className="ml3 dib b f6">{label}</span>
      </label>
    );
  }
}

const ControlPanel = ({
  options,
  toggleControlPanel,
  toggleOption,
  toggleAll
}) => (
  <div className="controls fixed top-0 right-0 bottom-0 pa4 bg-black white shadow-1 overflow-auto">
    <div className="flex items-center mb3">
      <h2 className="f6 ttu tracked flex-auto">Control Panel</h2>

      <button
        className="bg-transparent white"
        aria-label="Close"
        onClick={toggleControlPanel}
      >
        <CloseIcon />
      </button>
    </div>

    <div className="controlsGrid">
      <Checkbox
        checked={Object.keys(options).reduce((accum, optionKey) => {
          if (!options[optionKey]) {
            accum = false;
          }
          return accum;
        }, true)}
        label="All"
        toggle={toggleAll}
      />

      {Object.keys(labels).map(optionKey => (
        <Checkbox
          key={optionKey}
          option={optionKey}
          checked={options[optionKey]}
          label={labels[optionKey]}
          toggle={toggleOption}
        />
      ))}
    </div>
  </div>
);

export default ControlPanel;
