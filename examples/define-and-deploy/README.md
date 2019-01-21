# Define and deploy

## Introduction

This shows how you could use the 'deploy' function to deploy a cloud function based on command line arguments


## Prerequisites

To try this out, you need to have the [Google Cloud CLI](https://cloud.google.com/sdk/) installed, configured to point to the Google Cloud project that you are deploying the functions to, and logged into an appropriate Google Account (i.e. one with permissions to deploy functions to the target project).

For more information, see the [Upmentoring Google Cloud Proof of Concept](https://github.com/leanjscom/upmentoring-gcloud-poc).


## Explanations

### index.js

This file is where the bulk of the code is.

It defines a cloud function, and will deploy it if run as a CLI script with the appropriate arguments.

The key things to notice about it are:

- Each cloud function meant for deployment to Google Cloud must be exported from index.js.  In this example, this is done inside the `cloudfunction` function, which accepts the following arguments
  1.  the name of the export
  2.  the configuration of the cloud function
  3.  the function itself.

- The actual deployment is done, late in the file, by the `deploy` function

### package.json

There are two important things to notice about the package.json file:

1.  The two 'file' dependencies, `cloud-function-deployer`, and `upmentoring-pub-sub-topics`, which are included in their entirety, in gzipped format, rather than using a github or npm package name which would be more usual.  The reason for this is that Google Cloud Functions are unable to pull in dependencies from private repositories, such as these two, and so any dependencies in private repositories have to be uploaded in their entirety.
2.  The `build` script, which generates the packaged private dependencies described above, and adds them to the list of dependencies in `package.json`
3.  The `deploy` script, which adds a neat (and consistent over time) interface to the deployment procedure in `index.js`.
