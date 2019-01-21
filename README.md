# Cloud Function Deployer


## Introduction

This is designed to facilitate the process of deploying Google Cloud Functions.  It exports a single function, `deploy`, which deploys a function.


## Prerequisites

To deploy cloud functions, you need to have the [Google Cloud CLI](https://cloud.google.com/sdk/) installed, configured to point to the Google Cloud project that you are deploying the functions to, and logged into an appropriate Google Account (i.e. one with permissions to deploy functions to the target project).

For more information, see the [Upmentoring Google Cloud Proof of Concept](https://github.com/leanjscom/upmentoring-gcloud-poc).


## Get started

To use this module, simply add it your project using `npm install --save`, and then `import` it into the relevant file, and use the `deploy` function where desired to deploy the function.

One way to use this, is to run the `deploy` function in response to command line arguments.  See the `examples` directory for an example.


## Example

```

const name = 'helloPubSub'
const config = {
	runtime: 'nodejs6',
	topic: 'new_booking'
}
const fn = ({ data:pubsubMessage }, callback) => {
	const name = pubsubMessage.data ? Buffer.from(pubsubMessage.data, 'base64').toString() : 'World';
	console.log(`Hello, ${name}!`);
	callback();
}
if (process.argv[2] === "deploy") {
	deploy(name, config, fn)
}
```

See also the full [Example use case](https://github.com/leanjscom/cloud-function-deployer/tree/master/examples/define-and-deploy)