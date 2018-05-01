#!/usr/bin/env node
//
// File:	kodebuild.js
// Author:	Ivan Kluzak
// Date:	05/01/2018
// Notes:	An attempt at loading your buildspec.yml and building your project locally
//		use with Docker... I don't see why I should create one to build there and
//		then not be able to use it locally.   This attempts to bridge that gap or
//		at least kludge that gap.
// Note:
//		It's a little bit of a mess, but this is first draft.. 
//
const YAML 	= require('yamljs');
const { exec } 	= require('child_process');
const fs	= require('fs');

//
// The Buildspec file we will try to load and process
const BUILDSPEC = 'buildspec.yml';

if (!fs.existsSync(BUILDSPEC)) {
	console.error(`${BUILDSPEC} does not exist`);
	process.exit();
}

//
// Load the buildspec file:
const bs = YAML.load(BUILDSPEC);

//console.log(JSON.stringify(bs, null, 2));

// Simplistic sanity check
if (typeof bs.version !== 'undefined') {
	if (bs.version !== 0.2) {
		console.log("unsupported version.  Looking for 0.2");
	}
}

//
// Define the environment variables for scripts
const ENV = bs.env.variables;
// TO-DO: add-in a bunch of default CodeBuild environmental variables
//
console.log(`kodebuild[ENV]: ${JSON.stringify(bs.env.variables)}`);

//
// Execute a single command:
function spawn(a, callback) {

	exec(a, {
		  env: ENV
		}, (error, stdout, stderr) => {
		  if (error) {
		    console.error(`exec error: ${error}`);
		    callback(error);
		  } else {
		    callback(null, stdout, stderr);
        	  }
		});
}

// 
// Execute the commands:
function runCommands(node, section, idx, callback) {

        if (Array.isArray(node.commands)) {
	    if (idx < node.commands.length) {

		console.log(`kodebuild[${section}]: ${node.commands[idx]}`);

		// Spawn the actual comand finally
                spawn(node.commands[idx], function (err, stdout, stderr) {

                        if (err) {
                                return callback(err);
                        } else {
				process.stdout.write(stdout);
				process.stderr.write(stderr);
                        }

			runCommands(node, section, idx+1, callback);
                });

            } else {
		// end of the array
            	// TO-DO: return a status code here or something
            	callback(null);
	    }
        } else {
                // Empty section, just return
                callback(null);
        }
}

//
// Deal with artifacts:
function artifactUpload(a, idx, callback) {

/*
 * for example:
 "artifacts": {
    "files": [
      "artifacts-dir/package.tar.gz"
    ]
*/
	if (idx < a.files.length) {
	    if (fs.existsSync(a.files[idx])) {

		// TO-DO: copy to S3... 
		console.log(`TO-DO: upload ${a.files[idx]}`);

		artifactUpload(a, idx+1, callback);
	    } else {
		callback(new Error(`BUILD_FAILED: missing artifact '${a.files[idx]}'`));
	    }
	} else {
		console.log("kodebuid: upload complete");
		callback(null);
	}
}


//
// Process each of the phases if they exist: 
// TO-DO: make sure all the phases are here
// TO-DO: maybe fail the build early if any one section fails
//
runCommands(bs.phases.install, "INSTALL", 0, function (err, res) {

	runCommands(bs.phases.pre_build, "PRE_BUILD", 0, function (pre_err, pre_res) {

		runCommands(bs.phases.build, "BUILD", 0, function (b_err, b_res) {

			artifactUpload(bs.artifacts, 0, function (a_err, a_res) {

				if (a_err) {
					console.log(`kodebuild: ${a_err}`);
				} 
				console.log("kodebuild: done!");
			});
		});
	});
});

