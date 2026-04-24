const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

module.exports = {
  docker,
  listContainers: () => docker.listContainers({ all: true }),
  startContainer: (id) => docker.getContainer(id).start(),
  stopContainer: (id) => docker.getContainer(id).stop(),
  restartContainer: (id) => docker.getContainer(id).restart()
};
