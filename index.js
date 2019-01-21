const shell = require('shelljs')


const validateForShell = value => {
	const rgxSafeShellArg = /^[a-zA-Z0-9]+$/
	return rgxSafeShellArg.test(value)
}

const validate = (name, config, topics) => {
	const { runtime = 'nodejs6', topic } = config

	const validationErrors = [
		...(!topic?["No topic specified"]:[]),
		...(!topics[topic]?["Unknown topic"]:[]),
		...(!validateForShell(name)?["Unsafe function name"]:[]),
		...(!validateForShell(runtime)?["Unsafe nodejs runtime"]:[]),
		...(!validateForShell(topics[topic])?["Unsafe Google-side name of pubsub topic"]:[]),
	]

	return validationErrors
}

const getDeployCommand = (name, config, topics) => {
	const { runtime = 'nodejs6', topic } = config
	return `gcloud functions deploy ${name} --runtime ${runtime} --trigger-topic ${topics[topic]}`
}

exports.deploy = (name, config, topics) => {

	const validationErrors = validate(name, config, topics)
	if (validationErrors.length) {
		throw new Error(`Invalid config: ${JSON.stringify(validationErrors)}`)
	}

	shell.exec(getDeployCommand(name, config, topics))
}




