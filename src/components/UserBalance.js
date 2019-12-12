import React from 'react'
import { connect } from 'react-redux'
import { getSession } from '../modules'
import Numeral from 'numeral'
import './UserBalance.css'

const UserBalance = ({ balance }) => {
	return <div className="UserBalance">
		<div className="UserBalance-amount">{Numeral(balance).format('$0,0.00')}</div>
		<label>Available</label>
	</div>
}

const mapStateToProps = function (state) {
	const session = getSession(state)

	return {
		balance: session.user.balance
	}
}

export default connect(mapStateToProps)(UserBalance)