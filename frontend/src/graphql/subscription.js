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
export { MESSAGES_SUBSCRIPTION };
