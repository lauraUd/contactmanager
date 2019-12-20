import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Header = props => {

    const { branding } = props;
    return (
        <nav className="navbar text-light bg-dark mb-3 py-0">
            <div className="container">
                <a href="/" className="navbar-brand">{branding}</a>
                <div>
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                                <i className="fas fa-home"></i>
                            </Link>
                            <Link to="/contact/add" className="nav-link">
                                Add
                                <i className="fas fa-plus"></i>
                            </Link>
                            <Link to="/about" className="nav-link">
                                About
                                <i className="fas fa-question"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
Header.defaultProps = {
    branding: 'My App'
};
Header.propTypes = {
    branding: PropTypes.string.isRequired
};

export default Header;