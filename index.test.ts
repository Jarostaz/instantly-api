import instantly from './index';
import dotenv from 'dotenv';
import type { InstantlyLead } from './index';

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
    'campaign_name': 'Test Campaign',
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
    'status': 'paused',
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

it('should add campaign leads', async () => {
  const campaignId = process.env.CAMPAIGN_ID;
  if(!campaignId) {
    throw new Error('CAMPAIGN_ID environment variable is undefined');
  }
 
  const leads: InstantlyLead[] = [
    {
      'email': 'test@gmail.com',
      'first_name': 'John',
      'last_name': 'Doe',
      'company_name': 'Doe Inc.',
      'personalization': 'love your work',
      'phone': '1234567890',
      'website': 'https://doe.com',
      'custom_variables': {
        'custom1': 'value1',
        'custom2': 'value2',
      },
    },
  ];

  const result = await instantly.leads.addToCampaign(campaignId as string, leads, {
    skipIfInWorkspace: true,
  });

  console.log(result);

  const expected = {
    status: 'success',
    total_sent: 1,
    in_blocklist: 0,
    already_in_workspace: 1,
  };

  expect(result).toBeDefined();
  expect(result.status).toBe(expected.status);
  expect(result.total_sent).toBe(expected.total_sent);
  expect(result.already_in_workspace).toBe(expected.already_in_workspace);
});

it('should list accounts', async () => {
  const result = await instantly.accounts.list();
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
});