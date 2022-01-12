import { gql } from "@apollo/client";

const SALT_QUERY = gql`
  query {
    salt
  }
`;

const SIGN_IN = gql`
  query ($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      name
      id
      department
      groups
      role
      password
      email
    }
  }
`;

export { SALT_QUERY, SIGN_IN };
