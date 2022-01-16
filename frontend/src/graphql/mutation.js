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
  mutation createWorkflow(
    $document: ID!
    $contents: inputContentPayload!
    $student: ID!
    $approvalLine: [approvalPayloadInput]!
  ) {
    createWorkflow(
      input: {
        documents: $document
        contents: $contents
        approvalLine: $approvalLine
        student: $student
      }
    ) {
      id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($from: String!, $to: String, $message: String!) {
    createMessage(from: $from, to: $to, message: $message) {
      body
      sender {
        id
        name
      }
    }
  }
`;
export { SIGN_UP, CREATE_WORKFLOW, UPLOAD_FILE, SEND_MESSAGE };
