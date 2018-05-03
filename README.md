
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
- You will need to build the Docker image that I have included in ./nodejs/6.3.1 based on 
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
// TO-DO: return a status code here or something
// TO-DO: copy to S3... 
// TO-DO: make sure all the phases are here
// TO-DO: maybe fail the build early if any one section fails
```
