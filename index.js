const readPkg = require('read-pkg');
const request = require('request');

module.exports = testResults => {
  const packagedData = readPkg.sync(process.cwd());
  const config = packagedData.jestSlackReporter || {};

  const webhookUrl = config.webhookUrl;
  if (!webhookUrl) {
    throw new Error("Please add a slack webhookUrl field under jestSlackReporter on your package.json");
  }

  const testData = testResults.testResults;

  let failedTests = [];

  testData.filter(function(item) {
      item.testResults.filter(function(test) {
        return test.status !== 'passed' ? failedTests.push({
          "color": "#ff0000",
          "title": test.fullName,
          "fields": [
              {
                  "value": 'Failed',
                  "short": false
              }
          ],
        }) : null;
      });
  });

  const errText = `
    *${testResults.numFailedTests}* ${testResults.numFailedTests > 1 ? 'tests have' : 'test has'} failed. Please take a look. 
  `;

  const passingText = `All *${testResults.numTotalTests}* tests have passed :thumbsup:`;

  const text = testResults.numFailedTests > 0 ? errText : passingText;

  const options = {
    uri: webhookUrl,
    method: 'POST',
    json: { 
      'text': text,
      'attachments': failedTests.length > 0 ? failedTests : [{ "color": "#00ff00", "title": 'No Errors',}]
    },
    mrkdwn: true,
  };

  request(options);

  return testResults;
};