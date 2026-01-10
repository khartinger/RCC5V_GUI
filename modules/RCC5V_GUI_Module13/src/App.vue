<!-- ----App.vue--------------------------------- 2023-01-01 -->
<template>
  <div id="nav">
    <router-link to="/">MainView</router-link> |
    <router-link to="/about">About</router-link>
    &nbsp; &nbsp; &nbsp;
    <span v-if="isConnected">
      <text class="fontOK">Connected to {{ getConnectUrl }}</text>
    </span>
    <span v-if="!isConnected && !isConnecting">
      <text class="fontNOK"> Not connected! &nbsp;</text>
      <button @click="reconnect()">Reconnect</button>
    </span>
    <span v-if=isConnecting>
      <text class="fontNOK"> Is connecting... &nbsp;</text>
      &nbsp; <button @click="cancel()">Cancel</button>
    </span>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ciMqttClientInstance } from '@/services/CiMqttClientInstance'

export default defineComponent({
  name: 'Home',
  components: {
  },
  computed: {
    isConnected: function (): boolean {
      return ciMqttClientInstance.mqttState.connected
    },
    isConnecting: function (): boolean {
      if (ciMqttClientInstance.mqttState.iConnMqttState === 2) return true
      return false
    },
    isSubscribed: function (): boolean {
      return ciMqttClientInstance.mqttSubscription.subscribed
    },
    getMqttState: function (): string {
      return ciMqttClientInstance.sConnMqttState()
    },
    getConnectUrl: function (): string {
      return ciMqttClientInstance.connectUrl()
    },
  },
  methods: {
    reconnect: async function (): Promise<void> {
      await ciMqttClientInstance.reconnectBroker()
    },
    end: async function (): Promise<void> {
      await ciMqttClientInstance.disconnect()
    },
    cancel: async function (): Promise<void> {
      await ciMqttClientInstance.disconnect()
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 3px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
