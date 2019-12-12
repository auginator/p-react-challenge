import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addContribution } from '../modules'

const DonateForm = ({ campaign, addContribution }) => {
	const [amount, setAmount] = useState('')
	const [message, setMessage] = useState('')
	const [error, setError] = useState(null)

	const amountInputProps = {
    className: 'Donate-amount',
    type: 'number',
		value: amount,
		placeholder: 'Amount',
		onChange: ({ target: { value } }) => setAmount(value)
	}

	const messageInputProps = {
		className: 'Donate-message',
		value: message,
		placeholder: 'Message',
		onChange: ({ target: { value } }) => setMessage(value)
	}

  const donateClickHandler = (event) => {
    setError(null)
    try {
      addContribution(amount, campaign.id)
    } catch (error) {
      setError(error.message)
    }
  }

	const buttonProps = {
		className: 'Donate-button',
		onClick: donateClickHandler
	}

	const errorMessage = error && (
		<div className="Donate-error">{ error }</div>
	)

	return <div className="CampaignInfo-donate">
		<h2>Donate to { campaign.name }</h2>
		<input { ...amountInputProps } />
		<input { ...messageInputProps } />
		{ errorMessage }
		<button { ...buttonProps }>Donate</button>
	</div>
}

const mapStateToProps = function (state) {
  return {}
}

const mapDispatchToProps = {
  addContribution
}

export default connect(mapStateToProps, mapDispatchToProps)(DonateForm)