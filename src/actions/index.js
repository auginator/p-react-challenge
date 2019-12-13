import { ACTION_TYPES } from '../helpers'

export const selectCampaignById = campaignId => {
	return {
		type: ACTION_TYPES.MERGE_SESSION,
		payload: { selectedCampaignId: campaignId }
	}
}

export const addContribution = (amount, campaignId, message = null) => {
	return {
		type: ACTION_TYPES.ADD_CONTRIBUTION,
		payload: { amount, campaignId, message }
	}
}