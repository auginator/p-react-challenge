import './ProgressBar.css'
import React from 'react'
import Numeral from 'numeral'

const clampProgressValues = (x) => {
	if (x < 0) {
		return 0
	} else if (x > 1) {
		return 1
	} else {
		return x
	}
}

function ProgressBar({ progress }) {
	const width = Numeral(clampProgressValues(progress)).format('0%')

	return <div className="ProgressBar">
		<div className="ProgressBar-progress" style={{ width }} />
	</div>
}

export default ProgressBar