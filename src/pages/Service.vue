<script setup>
import { reactive, ref } from "vue";
const schema = [
  {
    name: "name",
    label: "Name",
    type: "string",
    validator: {
      pattern: '^test$',
      one_of: ['test', 'test2', 'test3'],
      match_none: ['test4', 'test5'],
    }
  },
  {
    name: "protocol",
    label: "Protocol",
    type: "select",
    data: [
      { value: 'grpc', label: 'grpc' },
      { value: 'grpcs', label: 'grpcs' },
      { value: 'http', label: 'https' },
      { value: 'tcp', label: 'tcp' },
      { value: 'tls', label: 'tls' },
      { value: 'udp', label: 'udp' },
      { value: 'ws', label: 'ws' },
      { value: 'wss', label: 'wss' },
    ]
  },
  {
    name: "host",
    label: "Host",
    type: "string",
  },
  {
    name: "path",
    label: "Path",
    type: "string",
  },
  {
    name: "port",
    label: "Port",
    type: "number",
    validator: {
      integer: true,
      maximum: 65535,
      minimum: 0
    }
  },
  {
    name: "tags",
    label: "Tags",
    type: "string",
  },

  {
    name: "retries",
    label: "Retries",
    type: "number",
  },
  {
    name: "connect_timeout",
    label: "Connect Timeout",
    type: "number",
  },
  {
    name: "write_timeout",
    label: "Write Timeout",
    type: "number",
  },
  {
    name: "read_timeout",
    label: "Read Timeout",
    type: "number",
  },
  {
    name: "client_certificate",
    label: "Client Certificate",
    type: "string",
  },
];
const model = ref({})
const formRef = ref(null)

const submit = () => {
  console.log(formRef.value.submit());
}

let serverSideResult = ref({})
const serverSideTest = () => {
  fetch('/schemas/services/validate', {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(model.value)
  })
  .then((data) => {
    let result = data.json()
    result.then(res => {
      serverSideResult.value = res
      setTimeout(() => {
        serverSideResult.value = {}
      }, 3000)
    })
  })
  .catch((error) => {
    console.log('Request failed', error);
  });
}
</script>

<template>
  <h2 class="page-title">Create service</h2>
  <Form v-model="model" :schema="schema" ref="formRef">
    <template #btn>
      <div class="k-button-wrap">
        <div class="alert-wrap" v-show="serverSideResult.message">
          <div class="alert" v-if="serverSideResult.code">{{serverSideResult.message}}</div>
          <div class="alert success" v-else>{{serverSideResult.message}}</div>
        </div>
        <button class="k-button primary" @click="submit">Create</button>
        <button class="k-button">Cancel</button>
        <button class="k-button primary" @click="serverSideTest">server-side validation</button>
      </div>
    </template>
  </Form>
</template>

<style scoped lang="less">

</style>
