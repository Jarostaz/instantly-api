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

const instantly = {
  ping,
  campaigns: {
    list: listCampaigns,
    getName: getCampaignName,
    getStatus: getCampaignStatus,
    getAccounts: getCampaignAccounts,
    getSummary: getCampaignSummary
  }
};

export default instantly;