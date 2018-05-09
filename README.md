
[![Known Vulnerabilities](https://snyk.io/test/github/ikluzak/kodebuild/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ikluzak/kodebuild?targetFile=package.json)
[![npm version](https://badge.fury.io/js/kodebuild.svg)](https://badge.fury.io/js/kodebuild)

# Kodebuild

A kludge to use CodeBuild's buildspec.yml locally

```
Usage:
	./kodebuild

	<wait while stuff builds>
```

###prerequisites:
- Assumes you have a buildspec.yml in your current folder
- Must have Docker installed
- For now, you will need to build the Docker image that I have included in ./nodejs/6.3.1 based on 
  the AWS CodeBuild Docker image.

```
Extended Usage:
	./kodebuild			- Launches the Docker container with kodebuild inside
	./kodebuild help		- Shows the Docker build instructions
```

Contact me:
- email: ivan@allthethin.gs
- web:   https://allthethin.gs

###TO-DO's
```
// TO-DO: add-in a bunch of default CodeBuild environmental variables
// TO-DO: copy artifacts to S3... 
// TO-DO: better artifact section support
// TO-DO: make sure all the phases are here
// TO-DO: maybe fail the build early if any one section fails
// TO-DO: create config capability to define your own default docker image easily
// TO-DO: parameter-store  not supported at this time
// TO-DO: cache section not supported at this time
```
