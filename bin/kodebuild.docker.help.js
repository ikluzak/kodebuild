//
// File:	kodebuild.docker.build.js
// Date:	05/02/2018
// Notes:	If you need to build the Docker image... do this


function build_instructions() {

	console.log("\n\n\n");
	console.log("To build:\n");
	console.log("\tgit clone https://github.com/ikluzak/aws-codebuild-docker-images.git");
	console.log("\tcd aws-codebuild-docker-images/ubuntu/nodejs/6.3.1");
	console.log("\tdocker build -t aws/kodebuild/nodejs:6.3.1 . ");
	console.log("\n\n");

}

module.exports = build_instructions;

