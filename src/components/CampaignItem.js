import React from 'react'
import ClassNames from 'classnames'

import ProgressBar from './ProgressBar'

function CampaignItem({ campaign, active, onClick }) {
	const className = ClassNames('Campaign', { active })
	const divProps = { className, onClick }

	return <div {...divProps}>
		<div className="Campaign-logo">
			<div className="Campaign-image" style={{ backgroundImage: `url('${campaign.image}')` }} />
		</div>
		<div className="Campaign-name">{campaign.name}</div>
		<div style={{ flex: 1 }} />
		<ProgressBar progress={campaign.totalRaised / campaign.goal} />
	</div>
}

export default CampaignItem