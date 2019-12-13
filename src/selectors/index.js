import { DEFAULT_DATA } from '../helpers'

import { createSelector } from 'reselect'
import moment from 'moment'

// Session
export const getSession = state => {
	return state.app.session
}

// Contributions
export const getContributions = state => {
	return state.app.contributions
}

// Campaigns
export const getCampaigns = state => {
	return state.app.campaigns
}

export const getSelectedCampaignId = state => {
	return state.app.session.selectedCampaignId
}

export const getCampaignById = (state, campaignId) => {
	const campaigns = getCampaigns(state)

	return campaigns.find(campaign => campaign.id === campaignId)
}

export const getCampaignContributions = (state, campaignId) => {
	const contributions = getContributions(state)

	return contributions.reduce((array, contribution) => {
		if (contribution.campaignId !== campaignId) {
			return array
		}

		return [...array, contribution]
	}, []).map(contribution => {
		const user = getByUserId(state, contribution.userId)
		contribution.user = {
			name: [user.first_name, user.last_name].join(' '),
			image: user.image
		};

		return contribution
	}).sort((a, b) => moment(a.date).isBefore(b.date) ? 1 : -1);
}

export const getCampaignContributionsTotal = (state, campaignId) =>
	getCampaignContributions(state, campaignId)
		.reduce((total, { amount }) => {
			return (total + amount)
		}, 0)

// Users
export const getUsers = state => {
	return state.app.users
}

export const getByUserId = (state, userId) => {
	const users = getUsers(state);
	const u = users.find(user => user.id === userId)
	if (!u) {
		return DEFAULT_DATA('USER_INFO')
	}

	return u
}

const aggregateContributionsById = state => campaignId => getCampaignContributionsTotal(state, campaignId)

// Memoized Selectors
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