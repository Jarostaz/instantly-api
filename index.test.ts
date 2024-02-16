import instantly from './index';
import dotenv from 'dotenv';

// Load .env file wth INSTANTLY_API_KEY
dotenv.config();

it('should ping the instantly API', async () => {
  const result = await instantly.ping();
  const expected = {'workspace_name': 'Default Workspace'};

  expect(result).toEqual(expected);
});

it('should list campaigns', async () => {
  const result = await instantly.campaigns.list();
  const expected = [] as const;

  expect(result).toEqual(expected);
});

it('should get campaign name', async () => {
  const campaignId = process.env.CAMPAIGN_ID;
  if(!campaignId) {
    throw new Error('CAMPAIGN_ID environment variable is undefined');
  }
  const result = await instantly.campaigns.getName(campaignId as string);

  const expected = {
    'campaign_id': campaignId,
    'campaign_name': 'SMS for Creators',
  };

  expect(result).toEqual(expected);
});

it('should get campaign status', async () => {
  const campaignId = process.env.CAMPAIGN_ID;
  if(!campaignId) {
    throw new Error('CAMPAIGN_ID environment variable is undefined');
  }
  const result = await instantly.campaigns.getStatus(campaignId as string);

  const expected = {
    'campaign_id': campaignId,
    'status': 'completed',
  };

  expect(result).toEqual(expected);
});

it('should get campaign accounts', async () => {
  const campaignId = process.env.CAMPAIGN_ID;
  if(!campaignId) {
    throw new Error('CAMPAIGN_ID environment variable is undefined');
  }
  const result = await instantly.campaigns.getAccounts(campaignId as string);

  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
});

it('should get campaign summary', async () => {
  const campaignId = process.env.CAMPAIGN_ID;
  if(!campaignId) {
    throw new Error('CAMPAIGN_ID environment variable is undefined');
  }
  const result = await instantly.campaigns.getSummary(campaignId as string);

  expect(result).toBeDefined();
  expect(result.campaign_id).toBe(campaignId);
  expect(result.campaign_name).toBeDefined();
  expect(result.total_leads).toBeGreaterThan(0);
  expect(result.in_progress).toBeGreaterThanOrEqual(0);
  expect(result.skipped).toBeGreaterThanOrEqual(0);
  expect(result.contacted).toBeGreaterThanOrEqual(0);
  expect(result.not_yet_contacted).toBeGreaterThanOrEqual(0);
  expect(result.leads_who_read).toBeGreaterThanOrEqual(0);
  expect(result.leads_who_replied).toBeGreaterThanOrEqual(0);
  expect(result.bounced).toBeGreaterThanOrEqual(0);
  expect(result.unsubscribed).toBeGreaterThanOrEqual(0);
});