<template>
  <div>
    <v-card
        color="grey-lighten-3"
        class="main-wrapper rounded-0"
    >
      <v-container>
        <v-card>
          <v-card-text>
            <v-text-field
                v-show="showApiKey"
                v-model="editingApiKey"
                label="API Key"
                variant="outlined"
                clearable
            ></v-text-field>
            <v-btn
                v-show="!showApiKey"
                variant="outlined"
                block
                color="primary"
                @click="showApiKey = true"
            >Set API Key</v-btn>
            <v-btn
                v-show="showApiKey"
                variant="outlined"
                block
                color="primary"
                @click="saveApiKey"
            >Save API Key</v-btn>
          </v-card-text>
        </v-card>
        <v-card class="mt-3">
          <v-card-text>
            <v-textarea
                v-model="prompt"
                placeholder="You say, I do."
                variant="outlined"
                outlined
                clearable
                hide-details
            ></v-textarea>
          </v-card-text>
        </v-card>
        <div class="mt-3">
          <v-btn
              color="primary"
              block
              @click="runScript"
              :loading="loading"
          >Run</v-btn>
        </div>
        <v-card
            class="mt-3"
            :loading="loading"
            v-show="answer || loading"
        >
          <v-card-title>Answer</v-card-title>
          <v-card-text>{{ answer }}</v-card-text>
        </v-card>
      </v-container>
    </v-card>

    <v-snackbar
        v-model="snackbar"
        :timeout="snackbarTimeout"
        location="top center"
    >
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn
            variant="text"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { fetchAnswer } from './lib/api'

const prompt = ref('')
const answer = ref('')
const apiKey = ref('')
const editingApiKey = ref('')
const showApiKey = ref(false)
const snackbar = ref(false)
const snackbarTimeout = ref(5000)
const snackbarText = ref('')
const loading = ref(false)

const showSnackbar = (text) => {
  snackbar.value = true
  snackbarText.value = text
}

const saveApiKey = () => {
  localStorage.setItem('apiKey', editingApiKey.value)
  apiKey.value = editingApiKey.value
  showApiKey.value = false
}

onMounted( () => {
  const key = localStorage.getItem('apiKey')
  if (key) {
    apiKey.value = key
    editingApiKey.value = key
  }
})

const runScript = async () => {
  if (!apiKey.value) {
    showSnackbar('Please set up the API Key first')
    return
  }

  answer.value = ''
  loading.value = true
  try {
    const message = await fetchAnswer(prompt.value, apiKey.value)
    console.log(message)
    const script = message.match(/```javascript([\s\S]*?)```/)[1]
    if (!script) {
      return;
    }
    eval(script);
    answer.value = message
  } catch (e) {
    console.log(e)
    answer.value = 'Sorry, your command was not executed successfully. You can try again.'
  }
  loading.value = false

}
</script>

<style>
  .main-wrapper {
  }
</style>