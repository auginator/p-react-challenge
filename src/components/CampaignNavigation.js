import React from 'react'
import { connect } from 'react-redux'
import { selectCampaignById, getSession, getCampaigns, getContributions, getCampaignContributionsTotal } from '../modules'

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
	const campaigns = getCampaigns(state)
	const contributions = getContributions(state)
	const sortedCampaigns = campaigns.map(campaign => {
		campaign.totalContributions = getCampaignContributionsTotal(state, campaign.id)
		return campaign
	}).sort((a,b) => {
		return a.totalContributions > b.totalContributions ? -1 : a.totalContributions < b.totalContributions ? 1 : 0;
	})
	return {
		campaigns: sortedCampaigns,
		selectedCampaignId,
		contributions
	}
}

const mapDispatchToProps = {
  selectCampaignById
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignNavigation)
