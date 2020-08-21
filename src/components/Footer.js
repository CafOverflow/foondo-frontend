import React, { Component } from 'react';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="footer">
        <div id="disclaimer">
          <FontAwesomeIcon icon={faHeart} id="iconHeart" />
          {new Date().getFullYear()}
          &nbsp;- brewed by
          <span className="caffeine"> CaffeineOverflow </span>
        </div>
        <div id="footer-cons">
          <a label="github" href="https://github.com/CafOverflow" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
        </div>
      </footer>
    );
  }
}

export default Footer;
