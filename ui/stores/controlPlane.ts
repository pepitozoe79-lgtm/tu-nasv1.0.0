import { defineStore } from 'pinia'

export const useControlPlaneStore = defineStore('controlPlane', {
  state: () => ({
    nodes: [],
    apps: [],
    connected: false
  }),
  actions: {
    setConnected(status: boolean) {
      this.connected = status
    },
    updateNodes(nodes: any[]) {
      this.nodes = nodes
    },
    updateApps(apps: any[]) {
      this.apps = apps
    }
  }
})
