import React from 'react'
import Numeral from 'numeral'
import ProgressBar from './ProgressBar'

function CampaignDetails({ campaign }) {
	const { totalRaised } = campaign
	const progress = totalRaised / campaign.goal;

	return <div className="CampaignInfo-details">
        <div className="CampaignInfo-logo">
          <div className="Campaign-image" style={{backgroundImage: `url('${ campaign.image }')`}} />
        </div>
        <h3>{ campaign.name }</h3>
        <ProgressBar progress={ progress } />
        <div className="CampaignInfo-raised">{ Numeral(totalRaised).format('$0,0.00') } raised</div>
	</div>
}

export default CampaignDetails