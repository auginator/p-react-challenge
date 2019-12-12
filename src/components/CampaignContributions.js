import './CampaignContributions.css'
import React from 'react'
import Numeral from 'numeral'
import Moment from 'moment'

function renderContribution(contribution, index) {
	const {
		user,
		amount,
		date
	} = contribution

	return <div className="ContributionInfo" key={index}>
		<div className="ContributionInfo-avatar" role="img" aria-label={`${(user.name || 'Unknown')}'s Profile Image`} style={{ backgroundImage: `url(${user.image || 'https://static.pinkaloo.com/static/img/profile.png'})` }} />
		<div className="ContributionInfo-user">
			<strong>{user.name}</strong>
			<div>{Numeral(amount).format('$0,0.00')} donated</div>
			<div className="ContributionInfo-date">{Moment(date).format('MMM DD, YYYY')}</div>
		</div>
	</div>
}

function Contributions({ contributions }) {
	return (
		<div className="CampaignInfo-contributions">
			{contributions.map(renderContribution)}
		</div>
	)
}

export default Contributions