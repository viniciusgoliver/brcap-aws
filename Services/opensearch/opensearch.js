const AWS = require("aws-sdk");
const elasticsearch = require("elasticsearch");

class OpenSearchService {
  constructor(region, domain) {
    AWS.config.update({ region: region });

    this.elasticClient = elasticsearch.Client({
      hosts: [domain],
      log: "error",
      version: "7.10",
    });
  }

  create = async (index, type, body) => {
    try {
      const data = await this.elasticClient.index({
        index,
        type,
        body,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (index, type, id) => {
    try {
      const data = await this.elasticClient.search({
        index,
        type,
        body: {
          query: {
            match: { _id: id },
          },
        },
      });
      const returnData = JSON.parse(JSON.stringify(data.hits.hits[0]._source));
      console.log(returnData);
      return returnData;
    } catch (error) {
      console.log(error);
    }
  };

  getFilter = async (index, type, filter) => {
    try {
      const data = await this.elasticClient.search({
        index,
        type,
        body: filter,
      });
      const returnData = JSON.parse(JSON.stringify(data.hits.hits[0]._source));
      console.log(returnData);
      return returnData;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = OpenSearchService;
