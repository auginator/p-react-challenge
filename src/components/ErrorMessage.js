import React from 'react';

const ErrorMessage = ({ error }) => {
	// This is just a tidy little component for handling error messages
	// - Allows us to pass multiline messages

	return (
		!error ? '' : <div className="Donate-error">{error.split('\n').map((x, i) => {
			return (<div className="Donate-error-line" key={i}>{ x }</div>)
		}) }</div>
		);
}

export default ErrorMessage;