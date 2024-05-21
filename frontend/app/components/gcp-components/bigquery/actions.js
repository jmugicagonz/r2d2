"use server"

import { getGCPCredentials } from "/app/api/credentials" 
const {BigQuery} = require('@google-cloud/bigquery');

export async function bq(query) {
  
  const credentials= await getGCPCredentials();
  const bigquery = new BigQuery({credentials});
  const options = {
    // Specify a job configuration to set optional job resource properties.
    configuration: {
      query: {
        query: query,
        useLegacySql: false,
      },
      labels: {'example-label': 'example-value'},
    },
  };

  // Run the query as a job
  const response = await bigquery.createJob(options);
  const job = response[0];

  console.log(`Job ${job.id} started.`);
  // Wait for the query to finish
  const queryResults = await job.getQueryResults({
    maxResults: 100000
  });
  
  const jobResponse=queryResults[2]
  const [rows] = queryResults
  return ({jobResponse, rows})
};

