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
export { SIGN_UP };
