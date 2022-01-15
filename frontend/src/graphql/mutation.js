import { gql } from "@apollo/client";
const SIGN_UP = gql`
  mutation createUser(
    $name: String!
    $id: ID!
    $department: String!
    $password: String!
    $email: String!
  ) {
    createUser(
      input: {
        name: $name
        id: $id
        department: $department
        role: "student"
        password: $password
        email: $email
      }
    ) {
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

const CREATE_WORKFLOW = gql`
  mutation createWorkflow($document: ID!, $contents: inputContentPayload!, $student: ID!, $approvalLine: [approvalPayloadInput]!){
    createWorkflow(input: {
      documents: $document
      contents: $contents
      approvalLine: $approvalLine
      student: $student
    }) {
      id
    }
  }
`;
export { SIGN_UP, CREATE_WORKFLOW };
