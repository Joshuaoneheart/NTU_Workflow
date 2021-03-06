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
        document: $document
        contents: $contents
        approvalLine: $approvalLine
        student: $student
      }
    ) {
      id
    }
  }
`;

const CREATE_DOCUMENT = gql`
  mutation createDocument(
    $title: String!
    $body: String!
    $fields: [inputField!]!
    $passBy: [String!]!
  ) {
    createDocument(
      input: { title: $title, body: $body, fields: $fields, passBy: $passBy }
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

const UPLOAD_TEXT = gql`
  mutation uploadTEXT($text: String!) {
    uploadTEXT(input: $text)
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

const DECLINE_WORKFLOW = gql`
  mutation decline($id: ID!) {
    updateWorkflow(status: DECLINE, workflowId: $id)
  }
`;

const APPROVE_WORKFLOW = gql`
  mutation approve($id: ID!, $userId: ID!) {
    updateWorkflow(status: ACCEPT, workflowId: $id, staffId: $userId)
  }
`;

export {
  SIGN_UP,
  CREATE_WORKFLOW,
  APPROVE_WORKFLOW,
  UPLOAD_FILE,
  UPLOAD_TEXT,
  SEND_MESSAGE,
  DECLINE_WORKFLOW,
  CREATE_DOCUMENT,
};
