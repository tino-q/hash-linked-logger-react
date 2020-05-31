# Hash Linked Logger 

Forked from [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate)

&nbsp;
**Keep your log history immutable!**

<img alt="App" src="./banner.png">

&nbsp;
## Getting Started

### Installing

Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm).  
Nvm approach is preferred.

Install dependencies by running `npm i`.

By default [the backend](https://github.com/martinqueija/hash-linked-logger-typescript) uses *http://localhost:8080* as the base url so HASH_LINKED_LOGGER_URL is already defaulted to that value for ease of use.

If you plan on changing the default port the backend runs on you can set the environment variable in a file named `.env` at the root directory (`dotenv` pacakge loads this file)

.env file contents: ```HASH_LINKED_LOGGER_URL=back_end_url```


To start the app by default (development) run:  
`npm start`

### Building

To build the application run `npm run build`

## About

This project was written and is maintained by [Martin Queija](https://github.com/martinqueija).

## License

This project is licensed under the MIT License.

&nbsp;