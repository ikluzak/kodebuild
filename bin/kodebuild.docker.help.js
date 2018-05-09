//
// File:	kodebuild.docker.build.js
// Date:	05/02/2018
// Notes:	If you need to build the Docker image... do this


function build_instructions() {

	console.log("\n\n\n");
	console.log("To build the Docker image:\n");
	console.log("\tgit clone https://github.com/ikluzak/aws-codebuild-docker-images.git");
	console.log("\tcd aws-codebuild-docker-images/ubuntu/nodejs/6.3.1");
	console.log("\tdocker build -t ikluzak/kodebuild-nodejs:6.3.1 . ");
	console.log("\n\n");
	console.log("Then just run kodebuild in your project directory with buildspec.yml\n");
}

module.exports = build_instructions;

