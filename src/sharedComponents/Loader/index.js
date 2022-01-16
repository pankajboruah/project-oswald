import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function Loader({ loading }) {
	return loading ? (
		<div className="spinner_loaderContainer">
			<div className="spinner_backdrop" />
			<div className="spinner_container">
				<svg className="spinner" viewBox="0 0 50 50">
					<circle
						className="spinner_path"
						cx="25"
						cy="25"
						r="20"
						fill="none"
						strokeWidth="5"
					/>
				</svg>
			</div>
		</div>
	) : null;
}

Loader.propTypes = {
	loading: PropTypes.bool,
};

Loader.defaultProps = {
	loading: false,
};
export default Loader;
