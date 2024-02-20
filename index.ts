export type InstantlyLead = {
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  personalization?: string;
  phone?: string;
  website?: string;
  custom_variables?: Record<string, string>;
};

const getApiKey = () => {

  const apiKey = process.env.INSTANTLY_API_KEY;

  if(!apiKey) {
    throw new Error('INSTANTLY_API_KEY environment variable is undefined');
  }

  return apiKey;
};

const ping = async () => {
  // fetch 
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  } as RequestInit;

  const API_KEY = getApiKey();

  const response = await fetch(`https://api.instantly.ai/api/v1/authenticate?api_key=${API_KEY}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('Instantly error:', error));

  return response;
};

const listCampaigns = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  } as RequestInit;

  const API_KEY = getApiKey();

  const res = await fetch(`https://api.instantly.ai/api/v1/campaign/list?api_key=${API_KEY}&skip=0&limit=0`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return res;
};

const getCampaignName = async (campaignId: string) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  } as RequestInit;

  const API_KEY = getApiKey();

  const res = await fetch(`https://api.instantly.ai/api/v1/campaign/get/name?api_key=${API_KEY}&campaign_id=${campaignId}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return res;

};

const getCampaignStatus = async (campaignId: string) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  } as RequestInit;

  const API_KEY = getApiKey();

  const res = await fetch(`https://api.instantly.ai/api/v1/campaign/get/status?api_key=${API_KEY}&campaign_id=${campaignId}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return res;

};

const getCampaignAccounts = async (campaignId: string) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  } as RequestInit;

  const API_KEY = getApiKey();

  const res = await fetch(`https://api.instantly.ai/api/v1/campaign/get/accounts?api_key=${API_KEY}&campaign_id=${campaignId}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return res;

};

const getCampaignSummary = async (campaignId: string) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  } as RequestInit;

  const API_KEY = getApiKey();

  const res = await fetch(`https://api.instantly.ai/api/v1/analytics/campaign/summary?api_key=${API_KEY}&campaign_id=${campaignId}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return res;

};

const addLeadsToCampaign = async (campaignId: string, leads: InstantlyLead[], options: {
  skipIfInWorkspace?: boolean;
}) => {

  if(!campaignId) {
    throw new Error('campaignId is undefined');
  }

  if(!Array.isArray(leads)) {
    throw new Error('leads is not an array');
  }

  if(leads.length === 0) {
    throw new Error('leads is empty');
  }

  const API_KEY = getApiKey();

  const raw = JSON.stringify({
    api_key: API_KEY,
    campaign_id: campaignId,
    skip_if_in_workspace: options.skipIfInWorkspace ?? false,
    leads
  });
  
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
  } as RequestInit;
  
  const res = await fetch('https://api.instantly.ai/api/v1/lead/add', requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return res;

};

const instantly = {
  ping,
  campaigns: {
    list: listCampaigns,
    getName: getCampaignName,
    getStatus: getCampaignStatus,
    getAccounts: getCampaignAccounts,
    getSummary: getCampaignSummary
  },
  leads: {
    addToCampaign: addLeadsToCampaign
  }
};

export default instantly;