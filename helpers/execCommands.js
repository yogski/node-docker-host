const simpleGit = require('simple-git');
const fs = require('fs');
const { exec } = require('child_process');
const os = require('os');
const path = require('path');

// Clone the repository, currenty only handle public repository
const cloneRepository = async (repoURL) => {
  try {
    // Move to the clone directory
    process.chdir(os.homedir());

    // Configure git with credentials if provided
    const git = simpleGit();
    await git.clone(repoURL);

    console.log(`Repository cloned successfully.`);
  } catch (err) {
    console.error('Error cloning repository:', err);
  }
}

const dockerizeExpress = async (project_name, entrypoint, port) =>{
	try {
		console.log("starting to dockerize...")
		// Step 1: Navigate to the project directory
		const projectDir = path.join(os.homedir(), project_name);
		process.chdir(projectDir);

		// Step 2: Create Dockerfile
		const dockerfileContent = `
      FROM node:${process.env.NODE_VERSION}
      WORKDIR /app/src
      COPY package*.json ./
      RUN npm install
      COPY ./src ./
      EXPOSE 3000
      CMD ["node", "${entrypoint}"]
		`;
		fs.writeFileSync(path.join(projectDir, 'Dockerfile'), dockerfileContent);

		// Step 3: Create .dockerignore
		const dockerignoreContent = `
			node_modules
			npm-debug.log
			Dockerfile
			.dockerignore
		`;
		fs.writeFileSync(path.join(projectDir, '.dockerignore'), dockerignoreContent);

		// Step 4: Build Docker image
		await execAsync(`docker build -t ${project_name} .`);
		console.log("docker build success");

		// Step 5: Run Docker container
		await execAsync(`docker run -p ${port}:3000 ${project_name}`);

		console.log(`Express.js application '${project_name}' Dockerized and running on port ${port}`);
	} catch (err) {
		console.error('Error Dockerizing Express.js application:', err);
	}
}

const execAsync = async (command) => {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			} else {
				resolve(stdout.trim());
			}
		});
	});
}

module.exports = {
	cloneRepository,
	dockerizeExpress,
}
