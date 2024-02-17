# Instantly API Package

This package provides a convenient way to access the Instantly.ai API. 

## Installation

To install the package, you can use the following command in your terminal:

```shell
npm install instantly-api
```

## Configuration

Make sure the `INSTANTLY_API_KEY` env variable is defined in your environment to authenticate requests.

## Import

```javascript
import instantly from 'instantly-api';
```

## Available Functions
# Ping
Ping the instantly API to verify connectivity and authentication.

```javascript
const result = await instantly.ping();
```
