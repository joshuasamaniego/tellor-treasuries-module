import { gql } from "@apollo/client";

export const GET_TREASURY_EVENTS = gql`
  query {
    treasuryIssuedEntities(orderBy: treasuryId, orderDirection: asc) {
      id
      treasuryId
      maxAmount
      rate
      dateStarted
      purchasedAmount
      duration
      endVoteCount
      endVoteCountRecorded
      totalLocked
    }
    treasuryPaidEntities(orderBy: timestamp, orderDirection: desc) {
      id
      investor
      amountPaid
      totalLocked
      timestamp
      dateStarted
      maxAmount
      rate
      purchasedAmount
      duration
      endVoteCount
      endVoteCountRecorded
    }
    treasuryPurchasedEntities(orderBy: timestamp, orderDirection: desc) {
      id
      investor
      amountBought
      totalLocked
      timestamp
      dateStarted
      maxAmount
      rate
      purchasedAmount
      duration
      endVoteCount
      endVoteCountRecorded
    }
  }
`;
