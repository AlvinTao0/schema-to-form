<script setup>
import { reactive, ref } from "vue";
const schema = {
  type: "object",
  order: ["enabled", "config"],
  properties: {
    enabled: {
      type: "switch",
      config: {
        onLabel: "This plugin is Enabled",
        offLabel: "This plugin is Disabled",
      },
    },
    config: {
      type: "object",
      order: [
        "day",
        "fault_tolerant",
        "header_name",
        "hide_client_headers",
        "hour",
        "minute",
        "month",
        "redis_database",
        "redis_host",
        "redis_password",
        "redis_port",
        "redis_server_name",
        "redis_ssl",
        "redis_ssl_verify",
        "redis_timeout",
        "redis_username",
        "second",
        "year"
      ],
      properties: {
        day: {
          type: "number",
          label: "Config.Day",
        },
        fault_tolerant: {
          type: "checkbox",
          config: {
            label: "Config.FaultTolerant",
          },
        },
        header_name: {
          type: "string",
          label: "Config.HeaderName",
        },
        hide_client_headers: {
          type: "checkbox",
          config: {
            label: "Config.HideClientHeaders",
          },
        },
        hour: {
          type: "number",
          label: "Config.Hour",
        },
        minute: {
          type: "number",
          label: "Config.Minute",
        },
        month: {
          type: "number",
          label: "Config.Month",
        },
        redis_database: {
          type: "number",
          label: "Config.RedisDatabase",
        },
        redis_host: {
          type: "string",
          label: "Config.RedisHost",
        },
        redis_password: {
          type: "string",
          label: "Config.RedisPassword",
        },
        redis_port: {
          type: "number",
          label: "Config.RedisPort",
        },
        redis_server_name: {
          type: "string",
          label: "Config.RedisServerName",
        },
        redis_ssl: {
          type: "checkbox",
          config: {
            label: "Config.RedisSsl",
          },
        },
        redis_ssl_verify: {
          type: "checkbox",
          config: {
            label: "Config.RedisSslVerify",
          },
        },
        redis_timeout: {
          type: "number",
          label: "Config.RedisTimeout",
        },
        redis_username: {
          type: "string",
          label: "Config.RedisUsername",
        },
        second: {
          type: "number",
          label: "Config.Second",
        },
        year: {
          type: "number",
          label: "Config.Year",
        },
      },
    },
  },
};
const model = ref({
  name: "rate-limiting",
});
const formRef = ref(null);

const submit = () => {
  console.log(formRef.value.submit());
};

let serverSideResult = ref({});
const serverSideTest = () => {
  fetch("/schemas/plugins/validate", {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(model.value),
  })
    .then((data) => {
      let result = data.json();
      result.then((res) => {
        serverSideResult.value = res;
        setTimeout(() => {
          serverSideResult.value = {};
        }, 3000);
      });
    })
    .catch((error) => {
      console.log("Request failed", error);
    });
};
</script>

<template>
  <h2 class="page-title">Install plugin: rate-limiting</h2>
  <Form v-model="model" :schema="schema" ref="formRef">
    <template #btn>
      <div class="k-button-wrap">
        <div class="alert-wrap" v-show="serverSideResult.message">
          <div class="alert" v-if="serverSideResult.code">
            {{ serverSideResult.message }}
          </div>
          <div class="alert success" v-else>{{ serverSideResult.message }}</div>
        </div>
        <button class="k-button primary" @click="submit">Create</button>
        <button class="k-button">Cancel</button>
        <button class="k-button primary" @click="serverSideTest">
          server-side validation
        </button>
      </div>
    </template>
  </Form>
</template>

<style scoped lang="less"></style>
