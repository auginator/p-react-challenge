import './CampaignInfo.css'

import React from 'react'
import { connect } from 'react-redux'
import { getCampaignById, getSelectedCampaignId, getCampaignContributions, getCampaignContributionsTotal} from '../modules'

import DonateForm from './DonateForm'
import Contributions from './CampaignContributions'
import CampaignDetails from './CampaignDetails'

function CampaignInfo({ campaign, contributions, campaignContributionsTotal }) {
  return (
    <div className="CampaignInfo">
      <CampaignDetails campaign={campaign} campaignContributionsTotal={campaignContributionsTotal}/>
      <Contributions contributions={ contributions } />
      <DonateForm campaign={ campaign } />
    </div>
  )
}

const mapStateToProps = function(state) {
  const selectedCampaignId = getSelectedCampaignId(state)
  const campaign = getCampaignById(state, selectedCampaignId )
  const contributions = getCampaignContributions(state, selectedCampaignId)
  const campaignContributionsTotal = getCampaignContributionsTotal(state, selectedCampaignId)
  return { campaign, contributions, campaignContributionsTotal }
}

const mapDispatchToProps = {
  // selectCampaignById
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignInfo)
