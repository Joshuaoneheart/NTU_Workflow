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
  query ($id: String) {
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

const ALL_NOTIFY = gql`
  query ($id: ID!) {
    notification(userId: $id) {
      userId
      workflowId
      content
    }
  }
`;

const WORKFLOW_QUERY = gql`
  query ($id: ID) {
    workflow(userId: $id) {
      id
      document
      status
      date
    }
  }
`;

const FIND_WORKFLOW = gql`
  query ($id: ID) {
    workflow(workflowId: $id) {
      id
      document
      status
      date
      contents {
        file
        image
        text
      }
      approvalLine {
        staff
        status
      }
      comments
    }
  }
`;

const FIND_D_BY_W = gql`
  query ($id: ID) {
    workflow(workflowId: $id) {
      document
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
  query ($groups: String) {
    user(groups: $groups) {
      id
      name
    }
  }
`;

const ALL_GROUPS = gql`
  query {
    findGroups
  }
`;

const FIND_CHATBOX_BY_USER = gql`
  query ($name: String) {
    chatBox(name1: $name) {
      name
      messages {
        sender {
          id
          name
        }
        body
      }
    }
  }
`;

const FIND_CHATBOX_BY_USERS = gql`
  query ($name1: String, $name2: String) {
    chatBox(name1: $name1, name2: $name2) {
      name
      messages {
        sender {
          id
          name
        }
        body
      }
    }
  }
`;

export {
  SALT_QUERY,
  SIGN_IN,
  DOCUMENT_QUERY,
  WORKFLOW_QUERY,
  FIND_WORKFLOW,
  FIND_D_BY_W,
  ALL_DOCUMENTS,
  ALL_USERS,
  ALL_NOTIFY,
  ALL_GROUPS,
  FIND_USERS_BY_GROUP,
  FIND_CHATBOX_BY_USER,
  FIND_CHATBOX_BY_USERS,
};
