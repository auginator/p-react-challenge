import sampleData from './mock_data'
import { DEFAULT_DATA } from '../helpers'
import moment from 'moment'
import Numeral from 'numeral'
const initialState = { ...sampleData }

export const MERGE_SESSION = 'app/MERGE_SESSION'
export const ADD_CONTRIBUTION = 'app/ADD_CONTRIBUTION'

//- Redux
export const app = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case MERGE_SESSION: {
			const session = { ...state.session, ...payload }

			return { ...state, session }
		}

    case ADD_CONTRIBUTION: {

      const amount = parseFloat(payload.amount)

      // Make sure that the amount is valid before we do anything
      if (amount > state.session.user.balance) throw new Error(`Whoa, big spender!\nThat is more than your ${Numeral(state.session.user.balance).format('$0,0.00')} balance!`)
      if (amount <= 0) throw new Error(`Please choose an amount greater than 0 to donate`)

      const { contributions, session } = state;
      const { selectedCampaignId, user } = session

      contributions.push({
        id: (contributions.length + 1),
        amount,
        campaignId: selectedCampaignId,
        date: moment().format(), //"2019-08-15T03:00:00.000Z",
        userId: user.id
      })

      session.user.balance = session.user.balance - payload.amount

      return { ...state, contributions, session }
		}

		default: {
			return state
		}
	}
}

//- Actions

export const selectCampaignById = campaignId => {
	return {
		type: MERGE_SESSION,
		payload: { selectedCampaignId: campaignId }
	}
}

export const addContribution = (amount, campaignId) => {
  return {
    type: ADD_CONTRIBUTION,
    payload: { amount, campaignId }
  }
}

//- Selectors

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