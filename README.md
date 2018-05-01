
# Kodebuild

A kludge to use CodeBuild's buildspec.yml locally

```
Usage:
	./kodebuild

	<wait while stuff builds>
```

###Note:
- Assumes you have a buildspec.yml in your current folder

###Also Note:
- Use this with a Docker image that mimcs the CodeBuild environment.
- I hope to provide an example soon

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
