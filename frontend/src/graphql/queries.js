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

const DOCUMENT_QUERY = gql`
  query ($id: ID!) {
    document(id: $id) {
      id
      title
      body
      fields {
        fieldType
        name
      }
      passBy
    }
  }
`;

const ALL_DOCUMENTS = gql`
  query {
    document {
      id
      title
    }
  }
`;

const ALL_USERS = gql`
  query {
    user {
      id
      name
    }
  }
`;

const FIND_USERS_BY_GROUP = gql`
  query ($group: String!) {
    user(group: $group) {
      id
      name
    }
  }
`;

const ALL_GROUPS = gql`
  query {
    findGroups
  }
`

export { SALT_QUERY, SIGN_IN, DOCUMENT_QUERY, ALL_DOCUMENTS, ALL_USERS, ALL_GROUPS, FIND_USERS_BY_GROUP };
