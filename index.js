const Reports = require('./src/Reports');
const Journeys = require('./src/Journeys');
const Contacts = require('./src/Campaigns');
const Campaigns = require('./src/Campaigns');
const AbTestCampaigns = require('./src/AbTestCampaigns');
const ProductAndRevenue = require('./src/ProductAndRevenue');
const RelationalTableRows = require('./src/RelationalTableRows');
const TransactionalCampaigns = require('./src/TransactionalCampaigns');
const OrderItemInput = require('./src/ResultTypes/OrderItemInput');

module.exports = 
{
  Maropost: {
    Api: {
      AbTestCampaigns,
      Campaigns,
      Contacts,
      Journeys,
      ProductAndRevenue,
      RelationalTableRows,
      Reports,
      TransactionalCampaigns,
      OrderItemInput
    }
  }
};
