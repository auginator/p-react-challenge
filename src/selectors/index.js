import { createSelector } from 'reselect'
import { getCampaigns, getCampaignContributionsTotal} from '../modules'

const aggregateContributionsById = state => campaignId => getCampaignContributionsTotal(state, campaignId)

export const getCampaignsWithTotals = createSelector(
	[getCampaigns, aggregateContributionsById],
	(campaigns, contributionsById) => {
		return campaigns.map(campaign => {
			campaign.totalRaised = contributionsById(campaign.id)
			return campaign
		})
	}
)

export const getCampaignsSorted = createSelector(
	[getCampaignsWithTotals],
	(campaigns) => {
		return campaigns.sort((a, b) => {
			return a.totalRaised > b.totalRaised ? -1 : a.totalRaised < b.totalRaised ? 1 : 0;
		})
	}
)

export const getCampaignMap = createSelector(
	[getCampaignsWithTotals],
	(campaigns) => {
		const campaignMap = new Map()

		campaigns.forEach(campaign => {
			campaignMap.set(campaign.id, campaign)
		})

		return campaignMap
	}
)