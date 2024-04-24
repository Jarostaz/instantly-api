Powered by [RealGreatDevs](https://realgreatdevs.com)

# Instantly API Package

This package provides a convenient way to access the Instantly.ai API. 

# Installation

To install the package, you can use the following command in your terminal:

```shell
npm install instantly-api
```

# Configuration

Make sure the `INSTANTLY_API_KEY` env variable is defined in your environment to authenticate requests.

# Import

```javascript
import instantly from 'instantly-api';
```

# Available Functions
## Ping
Ping the instantly API to verify connectivity and authentication.

```javascript
const result = await instantly.ping();
```

## Campaigns
### List Campaigns
Retrieve a list of all campaigns.
**NOTE: Currently this is bugged in instantly itself so always returns an empty array. Once they fix it this will work.**

```javascript
const result = await instantly.campaigns.list();
```

### Get Campaign Name
Get the name of a specific campaign by its ID.

```javascript
const campaignId = '00000000-0000-0000-0000-000000000000';
const result = await instantly.campaigns.getName(campaignId);
```

### Get Campaign Status
Fetch the status of a specific campaign.

```javascript
const campaignId = '00000000-0000-0000-0000-000000000000';
const result = await instantly.campaigns.getStatus(campaignId);
```

### Get Campaign Accounts
Retrieve accounts associated with a specific campaign.

```javascript
const campaignId = '00000000-0000-0000-0000-000000000000';
const result = await instantly.campaigns.getAccounts(campaignId);
```

### Get Campaign Summary
Provide a summary of a specific campaign, including lead statuses.

```javascript
const campaignId = '00000000-0000-0000-0000-000000000000';
const result = await instantly.campaigns.getSummary(campaignId);
```

## Leads
### Add Campaign Leads
Add leads to a specific campaign, with an option to skip if already in the workspace.

```javascript
const campaignId = '00000000-0000-0000-0000-000000000000';

const leads = [[
    {
      "email": "john@abc.com",
      "first_name": "John",
      "last_name": "Doe",
      "company_name": "Instantly",
      "personalization": "Loved your latest post",
      "phone": "123456789",
      "website": "instantly.ai",
      "custom_variables": {
        "favorite_restaurant": "Mi Cancun",
        "language": "English"
      }
    }
];

const options = {
  skipIfInWorkspace: true 
};

const result = await instantly.leads.addToCampaign(campaignId, leads, options);
```

## Types
### InstantlyLead
Defines the structure for a lead object.

```javascript
import type { InstantlyLead } from 'instantly-api';
```
