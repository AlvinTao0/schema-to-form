<script setup>
import { reactive, ref } from "vue";
const schema = {
  type: "object",
  order: [
    "service",
    "name",
    "protocols",
    "https_redirect_status_code",
    "tags",
    "snis",
    "hosts",
    "methods",
    "strip_path",
    "preserve_host",
    "request_buffering",
    "response_buffering"
  ],
  properties: {
    service: {
      type: "object",
      order: ['id'],
      properties: {
        id: {
          label: "Service",
          type: "select",
          data: [
            { value: "13dff4fc-e072-4b0f-9b26-51b200693f59", label: "service name, id 13dff4fc-e072-4b0f-9b26-51b200693f59" },
            { value: "13dff4fc-e072-4b0f-9b26-51b200693f58", label: "service name, id 13dff4fc-e072-4b0f-9b26-51b200693f58" },
            { value: "13dff4fc-e072-4b0f-9b26-51b200693f57", label: "service name, id 13dff4fc-e072-4b0f-9b26-51b200693f57" },
          ],
        }
      }
    },
    name: {
      label: "Name",
      type: "string",
    },
    protocols: {
      type: "array",
      split: ', ',
      items: {
        type: 'select',
        label: 'Protocols',
        data: [
          { value: "grpc", label: "grpc" },
          { value: "grpcs", label: "grpcs" },
          { value: "grpc, grpcs", label: "grpc, grpcs" },
          { value: "http", label: "http" },
          { value: "https", label: "https" },
          { value: "http, https", label: "http, https" },
          { value: "tcp", label: "tcp" },
          { value: "tls", label: "tls" },
          { value: "tcp, tls", label: "tcp, tls" },
          { value: "udp", label: "udp" },
          { value: "ws", label: "ws" },
          { value: "wss", label: "wss" },
          { value: "ws, wss", label: "ws, wss" },
        ],
      }
    },
    https_redirect_status_code: {
      label: "HTTPS Redirect Status Code",
      type: "select",
      data: [
        { value: 426, label: 426 },
        { value: 301, label: 301 },
        { value: 302, label: 302 },
        { value: 307, label: 307 },
        { value: 308, label: 308 },
      ]
    },
    tags: {
      type: "array",
      split: ', ',
      items: {
        type: 'string',
        label: 'Tags',
      }
    },
    snis: {
      type: "array",
      split: ', ',
      items: {
        type: 'string',
        label: 'SNI(s)',
      }
    },
    hosts: {
      type: "array",
      split: ', ',
      items: {
        type: 'string',
        label: 'Host(s)',
      }
    },
    methods: {
      type: "array",
      split: ', ',
      items: {
        type: 'string',
        label: 'Method(s)',
      }
    },
    strip_path: {
      type: 'checkbox',
      config: {
        label: 'Strip Path'
      }
    },
    preserve_host: {
      type: 'checkbox',
      config: {
        label: 'Preserve Host '
      }
    },
    request_buffering: {
      type: 'checkbox',
      config: {
        label: 'Request Buffering'
      }
    },
    response_buffering: {
      type: 'checkbox',
      config: {
        label: 'Response Buffering'
      }
    },
    regex_priority: {
      type: 'number',
      label: 'Regex Priority'
    },
    path_handling: {
      type: 'select',
      label: 'Path Handling',
      data: [
        { type: 'v0', label: 'v0' },
        { type: 'v1', label: 'v1' },
      ]
    }
  },
};
const model = ref({});
const formRef = ref(null);

const submit = () => {
  console.log(formRef.value.submit());
};

let serverSideResult = ref({});
const serverSideTest = () => {
  fetch("/schemas/routes/validate", {
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
  <h2 class="page-title">Create route</h2>
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
