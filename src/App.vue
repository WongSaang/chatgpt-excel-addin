<template>
  <div id="app">
    <div class="content">
      <div class="content-header">
        <div class="padding">
          <h1>Welcome</h1>
        </div>
      </div>
      <div class="content-main">
        <div class="padding">
          <p>
            Choose the button below to set the color of the selected range to
            green.
          </p>
          <textarea
              v-model="prompt"
          ></textarea>
          <br />
          <button @click="runScript">Run</button>
          <br>
          Answer:
          <p>{{ answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAnswer } from './lib/api';
  export default {
    name: 'App',
    data() {
      return {
        prompt: '',
        answer: ''
      };
    },
    methods: {
      async runScript() {
        const message = await fetchAnswer(prompt)
        this.answer = message
        const script = message.match(/```javascript([\s\S]*?)```/)[1]
        console.log(script)
        if (!script) {
          return;
        }
        eval(script);
      }
    }
  };
</script>

<style>
  .content-header {
    background: #2a8dd4;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    overflow: hidden;
  }

  .content-main {
    background: #fff;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }

  .padding {
    padding: 15px;
  }
</style>