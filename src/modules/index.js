import sampleData from './mock_data'
import { ACTION_TYPES } from '../helpers'
import moment from 'moment'
import Numeral from 'numeral'
const initialState = { ...sampleData }

//- Redux
export const app = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case ACTION_TYPES.MERGE_SESSION: {
			const session = { ...state.session, ...payload }

			return { ...state, session }
		}

		case ACTION_TYPES.ADD_CONTRIBUTION: {

			const { contributions, session } = state
			const { selectedCampaignId, user } = session
			const { message } = payload
			const amount = parseFloat(payload.amount)

			// Make sure that the amount is valid before we do anything
			if (amount > user.balance) throw new Error(`Whoa, big spender!\nThat is more than your ${Numeral(user.balance).format('$0,0.00')} balance!`)
			if (amount <= 0) throw new Error(`Please choose an amount greater than 0 to donate`)

			contributions.push({
				id: (contributions.length + 1),
				amount,
				campaignId: selectedCampaignId,
				date: moment().format(), //"2019-08-15T03:00:00.000Z",
				userId: user.id,
				message
			})

			session.user.balance = session.user.balance - amount

			return { ...state, contributions, session }
		}

		default: {
			return state
		}
	}
}