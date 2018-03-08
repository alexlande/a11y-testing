import React from 'react';

const CroakBar = ({ formLabels }) => (
  <div className="flex pa3">
    <label className="db w-100">
      {formLabels ? <span className="a11yText">Croak text</span> : null}

      <input
        placeholder="What’s your existence like?"
        className="input-reset bg-near-white bt bb bl b--black-10 br2 br--left pa2 w-100"
      />
    </label>
    <button className="bg-dark-red bg-animate hover-bg-red white bn br2 br--right b f6 ph3">
      Submit
    </button>
  </div>
);

export default CroakBar;
