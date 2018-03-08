import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'what-input';

import './example-app.css';
import 'tachyons/css/tachyons.css';

import Header from './header';
import User from './user';
import Heading from './heading';
import CroakBar from './croak-bar';
import Croak from './croak';
import Photos from './photos';
import Footer from './footer';
import Modal from './modal';
import Attribution from './attribution';
import ControlPanel from './control-panel';
import KeyVisualizer from './key-visualizer';
import { croaks, users } from './data';

const Card = ({ className, children }) => (
  <div className={`${className || ''} bg-white pa3 br1 depth-1`}>
    {children}
  </div>
);

class ExampleApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controlPanelOpen: false,
      currentModal: null,
      options: {
        altText: props.altText,
        buttonText: props.buttonText,
        focusOutline: props.focusOutline,
        formLabels: props.formLabels,
        goodAltText: props.goodAltText,
        keyboardElements: props.keyboardElements,
        keyboardOnlyFocusOutline: props.keyboardOnlyFocusOutline
      }
    };

    this.toggleControlPanel = this.toggleControlPanel.bind(this);
    this.toggleOption = this.toggleOption.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  toggleOption(option) {
    this.setState({
      options: Object.assign({}, this.state.options, {
        [option]: !this.state.options[option]
      })
    });
  }

  toggleAll() {
    const { options } = this.state;
    const allChecked = Object.keys(options).reduce((accum, optionKey) => {
      if (!options[optionKey]) {
        accum = false;
      }
      return accum;
    }, true);

    this.setState({
      options: Object.keys(options).reduce((accum, optionKey) => {
        accum[optionKey] = allChecked ? false : true;
        return accum;
      }, {})
    });
  }

  toggleControlPanel() {
    this.setState({
      controlPanelOpen: !this.state.controlPanelOpen
    });
  }

  openModal(content) {
    this.setState({
      currentModal: content
    });
  }

  closeModal() {
    this.setState({
      currentModal: null
    });
  }

  handleKeyDown(ev) {
    // Don't change slides on space key press
    if (ev.key === ' ') {
      ev.stopPropagation();
    }
  }

  render() {
    const { controlPanelOpen, currentModal, options } = this.state;
    const {
      altText,
      buttonText,
      focusOutline,
      formLabels,
      goodAltText,
      keyboardOnlyFocusOutline,
      keyboardElements
    } = options;
    const { showKeys } = this.props;

    let outlineClass = '';

    if (!focusOutline) {
      outlineClass = 'noOutline';
    } else if (keyboardOnlyFocusOutline) {
      outlineClass = 'keyboardOutline';
    }

    return (
      <div
        tabIndex="0"
        onKeyDown={this.handleKeyDown}
        className={`reset sans-serif bg-light-gray ${outlineClass}`}
      >
        <div aria-hidden={!!currentModal}>
          <Header formLabels={formLabels} />

          <main className="pt3 pr5 pl5 primaryGrid">
            <div>
              <Card className="mb3">
                <User
                  altText={altText}
                  goodAltText={goodAltText}
                  user={users.frogsworth}
                />
              </Card>

              <Card>
                <Photos
                  altText={altText}
                  goodAltText={goodAltText}
                  openModal={this.openModal}
                />
              </Card>
            </div>

            <div className="primaryGrid--center">
              <div className="bg-white br1 depth-1 mb3">
                <CroakBar formLabels={formLabels} />
              </div>

              <div className="bg-white br1 depth-1">
                <div className="pt3 pr3 pl3">
                  <Heading>Croaks</Heading>
                </div>

                {croaks.map((croak, i) => (
                  <Croak
                    key={i}
                    user={croak.user}
                    content={croak.text}
                    datetime={croak.datetime}
                    altText={altText}
                    buttonText={buttonText}
                    goodAltText={goodAltText}
                    keyboardElements={keyboardElements}
                  />
                ))}
              </div>
            </div>

            <div>
              <Card className="mb3">
                <Attribution />
              </Card>

              <Card>
                <Footer toggleControlPanel={this.toggleControlPanel} />
              </Card>
            </div>
          </main>
        </div>

        {showKeys ? <KeyVisualizer /> : null}

        {controlPanelOpen ? (
          <ControlPanel
            options={options}
            toggleControlPanel={this.toggleControlPanel}
            toggleOption={this.toggleOption}
            toggleAll={this.toggleAll}
          />
        ) : null}

        <Modal
          closeModal={this.closeModal}
          content={currentModal}
          altText={altText}
          buttonText={buttonText}
          goodAltText={goodAltText}
          keyboardElements={keyboardElements}
        />
      </div>
    );
  }
}

ExampleApp.propTypes = {
  altText: PropTypes.bool,
  buttonText: PropTypes.bool,
  focusOutline: PropTypes.bool,
  formLabels: PropTypes.bool,
  goodAltText: PropTypes.bool,
  keyboardElements: PropTypes.bool,
  keyboardOnlyFocusOutline: PropTypes.bool,
  showKeys: PropTypes.bool
};

ExampleApp.defaultProps = {
  altText: true,
  buttonText: true,
  focusOutline: true,
  formLabels: true,
  goodAltText: true,
  keyboardElements: true,
  keyboardOnlyFocusOutline: true,
  showKeys: false
};

export default ExampleApp;
