
# Time Ledger GraphQL API

This is the backend for the Time Ledger application, a tool designed to help independent disability workers track their hours based on their clients and generate invoices to send to the respective party. The backend is built using Node.js, MongoDB, and GraphQL.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SumanRajSharma/time-ledger-graphql-api.git
   cd time-ledger-api

2. Install the dependencies:

     ```bash
     npm install

3. Set up environment variables (see [Environment Variables](#environment-variables)).

## Usage

1. Start the server:

   ```bash
   npm start

2. The server will run on \`http://localhost:4000\`.

## API Endpoints

The API has the following main types and endpoints:

- **User**
  - \`Query\`:
    - \`me\`: Get the current user
  - \`Mutation\`:
    - \`createUser(userInput: UserInput): User!\`
    - \`updateUser(update: UserUpdateInput!): User\`
    - \`login(email: String!, password: String!): AuthData\`
    - \`logout(token: String!): Boolean\`
    - \`requestPasswordReset(email: String!): Boolean\`
    - \`resetPassword(resetToken: String!, newPassword: String!): Boolean\`

- **Client**
  - \`Query\`:
    - \`getClients: [Client!]!\`
    - \`getClient(id: ID!): Client\`
  - \`Mutation\`:
    - \`createClient(name: String!, address: String!, participant_name: String!, participant_number: String!, care_type: [CareTypeInput!]!, rate: RateInput): Client\`
    - \`updateClient(id: ID!, name: String, address: String, participant_name: String, participant_number: String, care_type: [CareTypeInput!], rate: RateInput): Client\`
    - \`deleteClient(id: ID!): DeleteClientPayload!\`

- **Invoice**
  - \`Query\`:
    - \`getInvoice(id: ID!): Invoice\`
    - \`getInvoices: [Invoice!]!\`
  - \`Mutation\`:
    - \`createInvoice(input: CreateInvoiceInput!): Invoice\`
    - \`updateInvoice(id: ID!, input: UpdateInvoiceInput!): Invoice\`
    - \`updateInvoiceDay(id: ID!, dayName: String!, dayData: DayInput!): Invoice\`
    - \`deleteInvoice(id: ID!): Boolean\`

## Environment Variables

Create a \`.env\` file in the root directory of your project and add the following environment variables:

      ```env
      MONGO_DB=<your_mongo_db_connection_string>
      JWT_SECRET=<your_jwt_secret>

## Docker Setup

To build and run the project using Docker, follow these steps:

1. Build the Docker image:

   ```
   docker build -t time-ledger-api .


2. Run the Docker container:

   ```bash
   docker run -p 4000:4000 time-ledger-api


## Contributing

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature/your-feature\`).
3. Commit your changes (\`git commit -m 'Add some feature'\`).
4. Push to the branch (\`git push origin feature/your-feature\`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
