# API E-commerce Project - Project Setup

Welcome to the API E-commerce project! This API provides functionality for an e-commerce platform built to facilitate online shopping experiences. The project aims to follow best practices and maintainable code by implementing SOLID principles and emphasizing code quality.

## Prerequisites

Before getting started, make sure you have the following tools and services in place:

- Node.js
- NPM
- PostgreSQL

## Installation

1. Clone this repository to your local environment.
2. Navigate to the project directory using your terminal.
3. Run the command `npm install` to install all required dependencies.

## Configuration

1. Create a `.env` file based on the `.env.example` template, and provide necessary environment variables.

## PostgreSQL Setup

1. Configure your database `npm run db:create`

## Running Tests

Quality assurance is integral to this project. To run the test suite, execute the following command:

```bash
npm run test:all
npm run test:unit
npm run test:integration

```

## Running in Development Mode

During development, you can take advantage of the development mode with automatic restarts. Use the following command to run the project in development mode:

```bash
npm run dev
```

## Contribution

Contributions are encouraged and welcome! Whether it's bug fixes, enhancements, or new features, feel free to submit pull requests.

---

By focusing on code quality, adherence to TDD, DDD, and SOLID principles, we aim to deliver a reliable and scalable API for seamless web-based chat experiences. Thank you for being a part of this project!