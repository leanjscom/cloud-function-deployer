const { deploy } = require('cloud-function-deployer')
const { topics } = require('upmentoring-pub-sub-topics')

const configs = {}

const cloudfunction = (name, config, fn) => {
	exports[name] = fn
	configs[name] = config
}

/**
 * Background Cloud Function to be triggered by Pub/Sub.
 * This function is exported by index.js, and executed when
 * the trigger topic receives a message.
 *
 * NB based on the Node 6 example from Google Docs
 * https://cloud.google.com/functions/docs/calling/pubsub#functions_calling_pubsub-node6
 *
 * Node 8 is a slightly different API, but in Beta
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} callback The callback function.
 */
cloudfunction(
	'helloPubSub',
	{
		runtime: 'nodejs6',
		topic: 'new_booking'
	},
	({ data:pubsubMessage }, callback) => {
  		const name = pubsubMessage.data ? Buffer.from(pubsubMessage.data, 'base64').toString() : 'World';
  		console.log(`Hello, ${name}!`);
  		callback();
	}
)

const [action, arg] = process.argv.slice(2)

if (action) {
	switch (action) {
		case 'deploy':
			if (!arg) {
				throw new Error("Please specify a function to deploy")
			}
			if (!configs[arg]) {
				throw new Error(`Unknown function '${arg}'`)
			}
			deploy(arg, configs[arg], topics)
			break;
		default:
			throw new Error(`Unknown action '${action}'`)	
	}	
}




