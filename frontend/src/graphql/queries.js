import { gql } from "@apollo/client";

const SALT_QUERY = gql`
  query {
    salt
  }
`;

const SIGN_IN = gql`
  query ($name: String!, $password: String!) {
    validateUser(data: { name: $name, password: $password })
  }
`;

const CHECK_USER = gql`
  query ($name: String!) {
    checkUser(data: $name)
  }
`;
export { SALT_QUERY, SIGN_IN };
