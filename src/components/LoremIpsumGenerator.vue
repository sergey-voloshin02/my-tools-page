<template>
  <div class="lorem-ipsum-generator">
    <h2>Lorem Ipsum Generator</h2>

    <div class="slider-group">
      <nuxt-input
        type="range"
        min="1"
        max="50"
        v-model="paragraphs"
        @input="generateLoremIpsum"
      />
      <label>Paragraphs: {{ paragraphs }}</label>
    </div>

    <div class="slider-group">
      <nuxt-slider
        v-model="sentencesRange"
        :min="1"
        :max="50"
        @input="generateLoremIpsum"
        range
      />
      <label>Sentences per paragraph: {{ sentencesRange[0] }}-{{ sentencesRange[1] }}</label>
    </div>

    <div class="slider-group">
      <nuxt-slider
        v-model="wordsRange"
        :min="1"
        :max="50"
        @input="generateLoremIpsum"
        range
      />
      <label>Words per sentence: {{ wordsRange[0] }}-{{ wordsRange[1] }}</label>
    </div>

    <div class="switch-group">
      <nuxt-switch
        v-model="startWithLoremIpsum"
        @change="generateLoremIpsum"
      />
      <label>Start with "Lorem ipsum"?</label>
    </div>

    <div class="switch-group">
      <nuxt-switch
        v-model="asHTML"
        @change="generateLoremIpsum"
      />
      <label>As HTML?</label>
    </div>

    <nuxt-textarea v-model="loremText" readonly />

    <div class="buttons">
      <nuxt-button @click="copyText">Copy</nuxt-button>
      <nuxt-button @click="generateLoremIpsum">Refresh</nuxt-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { NuxtInput, NuxtSlider, NuxtSwitch, NuxtTextarea, NuxtButton } from '@nuxt/ui';

const paragraphs = ref(1);
const sentencesRange = ref([4, 8]);
const wordsRange = ref([10, 15]);
const startWithLoremIpsum = ref(true);
const asHTML = ref(false);
const loremText = ref('');

// Watchers for updating the text whenever ranges change
watch([sentencesRange, wordsRange], () => {
  generateLoremIpsum();
});

const generateLoremIpsum = () => {
  let lorem = startWithLoremIpsum.value ? 'Lorem ipsum dolor sit amet. ' : '';
  const text = [];

  for (let p = 0; p < paragraphs.value; p++) {
    const paragraph = [];
    const sentencesCount = randomInRange(sentencesRange.value[0], sentencesRange.value[1]);

    for (let s = 0; s < sentencesCount; s++) {
      const wordsCount = randomInRange(wordsRange.value[0], wordsRange.value[1]);
      const sentence = Array(wordsCount).fill(null).map(() => generateWord()).join(' ');
      paragraph.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
    }

    if (lorem) {
      text.push(lorem + paragraph.join(' '));
      lorem = ''; // сбрасываем, чтобы "Lorem ipsum" добавился только один раз
    } else {
      text.push(paragraph.join(' '));
    }
  }

  loremText.value = asHTML.value
    ? `<p>${text.join('</p><p>')}</p>`
    : text.join('\n\n');
};

const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateWord = () => {
  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet',
    'consectetur', 'adipiscing', 'elit', 'sed',
    'do', 'eiusmod', 'tempor', 'incididunt', 'ut',
    'labore', 'et', 'dolore', 'magna', 'aliqua',
    'enim', 'ad', 'minim', 'veniam',
  ];
  return words[Math.floor(Math.random() * words.length)];
};

const copyText = () => {
  navigator.clipboard.writeText(loremText.value);
  alert('Text copied to clipboard!');
};
</script>

<style scoped>
.lorem-ipsum-generator {
  width: 650px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
}

.slider-group,
.switch-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.slider-group label,
.switch-group label {
  margin-left: 10px;
}

.nuxt-textarea {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  gap: 10px;
}
</style>
