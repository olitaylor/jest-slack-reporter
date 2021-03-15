# Jest Slack Reporter

Jest reporter that notifies a Slack channel via Incoming Webhook integration

## Set up

1. Set up a [Slack Incoming Webhook integration](https://my.slack.com/services/new/incoming-hebhook/)
2. Add the Webhook URL to your env variables 

```
WEBHOOK_URL=https://hooks.slack.com/services/X...X/X...X/X...X yarn test
```

3. Set `jest-slack-reporter-ulms` as the jest `testResultsProcessor` in `jest.config.js`

```
...
"jest": {
  "testResultsProcessor": "./node_modules/jest-slack-reporter-ulms"
},
...
