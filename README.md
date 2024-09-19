
## Overview

A frontend web application for [maniiifest](https://github.com/jptmoore/maniiifest) deployed at [maniiifest.onrender.com](https://maniiifest.onrender.com).

## Getting Started

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/presentation-typechecker.git
    cd presentation-typechecker
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

To start the application, run the following command:

```sh
npm start
```

This will start the server and make the application accessible at `http://localhost:10000`.

### Endpoints

- **Root Endpoint**: Serves the HTML form for JSON input.
    ```sh
    GET /
    ```

- **Pretty Print Endpoint**: Handles form submissions to validate and pretty-print JSON data.
    ```sh
    POST /pretty-print
    ```

- **Version Endpoint**: Retrieves the current version of the maniiifest application from the [`package.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fjohn%2Fgit%2Fpresentation-typechecker%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22906b95f9-5119-4c7c-8a27-dd4531937625%22%5D "/home/john/git/presentation-typechecker/package.json") file.
    ```sh
    GET /version
    ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

