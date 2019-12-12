import React from 'react'
import { connect } from 'react-redux'
import { selectCampaignById, getSession, getContributions } from '../modules'
import { getCampaignsSorted } from '../selectors'

import CampaignItem from './CampaignItem'

function CampaignNavigation({ campaigns, selectedCampaignId, selectCampaignById }) {
  // Generate component click handler for campaignId
  const campaignClickHandler = campaignId => event =>
    selectCampaignById(campaignId, event)

  const renderCampaignItem = campaign => {
    const { id } = campaign

    const key = `campaign-${ id }`
    const active = (id === selectedCampaignId)
    const onClick = campaignClickHandler(id)

    const itemProps = {
      key, active, campaign, onClick
    }

    return <CampaignItem { ...itemProps } />
  }

  return (
    <div className="Campaigns-wrapper">
      <div className="Campaigns">
      { campaigns.map(renderCampaignItem) }
      </div>
    </div>
  )
}

const mapStateToProps = function(state) {
	const { selectedCampaignId } = getSession(state)

	return {
		selectedCampaignId,
		campaigns: getCampaignsSorted(state),
		contributions: getContributions(state)
	}
}

const mapDispatchToProps = {
  selectCampaignById
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignNavigation)
