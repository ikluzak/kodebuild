//
// File:	kodebuild.docker.js
// Date:	05-02-2018
// Notes:	Start the Docker environment... 

const { exec } = require('child_process');

const DEFAULT_KODEBUILD_IMAGE = 'ikluzak/kodebuild-nodejs:6.3.1';

//
// May want to pass in AWS env variables
//var cmd = `docker run --rm -it -e AWS_REGION=${AWS_REGION} -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY} -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_KEY} --mount type=bind,source="$(pwd)",target=/codebuild --entrypoint sh ${DEFAULT_KODEBUILD_IMAGE} kodebuild`;

var cmd = `docker run --rm -t --mount type=bind,source="$(pwd)",target=/codebuild ${DEFAULT_KODEBUILD_IMAGE}`;

//
// Attempt to use exec()
function kodebuild_docker_exec() {

   console.log(`kodebuild[DOCKER][${process.pid}]:starting docker...`);

    var o = exec(cmd, (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
	} //else {
		//console.log(stdout, stderr);
	//}
    });

    o.stdout.on('data', function(data) {
        //console.log(data); 
	process.stdout.write(data);
    });

    o.stderr.on('data', function(data) {
	process.stderr.write(data);
    });
}

// Experimenting with spawn() ...
function kodebuild_docker_spawn() {

    try {
	var o = spawn('sh', ['-c', cmd]);

	console.log("About to execute: " + cmd);

	o.stdout.on('data', function (data) {
	  console.log('stdout: ' + data.toString());
	});

	o.stderr.on('data', function (data) {
	  console.log('stderr: ' + data.toString());
	});

	o.on('exit', function (code) {
	  console.log('child process exited with code ' + code.toString());
	});
    } catch (e) {
	console.log(e);
    }
}

module.exports = kodebuild_docker_exec;
