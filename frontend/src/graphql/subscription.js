import { gql } from "@apollo/client";

const MESSAGES_SUBSCRIPTION = gql`
  subscription ($from: String!, $to: String!) {
    message(from: $from, to: $to) {
      mutation
      message {
        sender {
          name
        }
        body
      }
    }
  }
`;

const NOTIFS_SUBSCRIPTION = gql`
  subscription ($id: ID!) {
    Notification(id: $id) {
      userId
      workflowId
      content
    }
  }
`;

export { MESSAGES_SUBSCRIPTION, NOTIFS_SUBSCRIPTION };
