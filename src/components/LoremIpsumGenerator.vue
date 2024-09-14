<template>
    <div class="lorem-ipsum-generator">
      <h2>Lorem Ipsum Generator</h2>
  
      <div class="slider-group">
        <label>Paragraphs: {{ paragraphs }}</label>
        <vue3-range-slider 
          v-model="paragraphsRange" 
          :min="1" 
          :max="50" 
          @update="updateParagraphsRange"
          :tooltips="true" 
          :showTooltip="true"
          range
        />
      </div>
  
      <div class="slider-group">
        <label>Sentences per paragraph: {{ sentencesRange[0] }}-{{ sentencesRange[1] }}</label>
        <vue3-range-slider 
          v-model="sentencesRange" 
          :min="1" 
          :max="50" 
          @update="updateSentencesRange"
          :tooltips="true" 
          :showTooltip="true"
          range
        />
      </div>
  
      <div class="slider-group">
        <label>Words per sentence: {{ wordsRange[0] }}-{{ wordsRange[1] }}</label>
        <vue3-range-slider 
          v-model="wordsRange" 
          :min="1" 
          :max="50" 
          @update="updateWordsRange"
          :tooltips="true" 
          :showTooltip="true"
          range
        />
      </div>
  
      <div class="switch-group">
        <label>
          Start with "Lorem ipsum"?
          <vue3-switch v-model="startWithLoremIpsum" />
        </label>
      </div>
  
      <div class="switch-group">
        <label>
          As HTML?
          <vue3-switch v-model="asHTML" />
        </label>
      </div>
  
      <textarea v-model="loremText" readonly></textarea>
  
      <div class="buttons">
        <button @click="copyText">Copy</button>
        <button @click="generateLoremIpsum">Refresh</button>
      </div>
    </div>
  </template>
  
  <script>
  import Vue3RangeSlider from '@vueform/slider';
  import Vue3Switch from 'vue-toggles'; // Пакет для переключателей
//   import { VueToggles } from "vue-toggles";

  
  export default {
    components: { 
      Vue3RangeSlider,
      Vue3Switch 
    },
    data() {
      return {
        paragraphsRange: [1, 1],
        sentencesRange: [4, 8], // Два значения для диапазона предложений
        wordsRange: [10, 15], // Два значения для диапазона слов
        startWithLoremIpsum: true,
        asHTML: false,
        loremText: ''
      };
    },
    computed: {
      paragraphs() {
        return this.paragraphsRange[0];
      }
    },
    mounted() {
      this.generateLoremIpsum();
    },
    methods: {
      updateParagraphsRange() {
        this.generateLoremIpsum();
      },
      updateSentencesRange() {
        this.generateLoremIpsum();
      },
      updateWordsRange() {
        this.generateLoremIpsum();
      },
      generateLoremIpsum() {
        let lorem = this.startWithLoremIpsum ? 'Lorem ipsum dolor sit amet. ' : '';
        const text = [];
  
        for (let p = 0; p < this.paragraphs; p++) {
          const paragraph = [];
          const sentencesCount = this.randomInRange(
            this.sentencesRange[0],
            this.sentencesRange[1]
          );
  
          for (let s = 0; s < sentencesCount; s++) {
            const wordsCount = this.randomInRange(
              this.wordsRange[0],
              this.wordsRange[1]
            );
            const sentence = Array(wordsCount)
              .fill(null)
              .map(() => this.generateWord())
              .join(' ');
            paragraph.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
          }
  
          if (lorem) {
            text.push(lorem + paragraph.join(' '));
            lorem = ''; // сбрасываем, чтобы "Lorem ipsum" добавился только один раз
          } else {
            text.push(paragraph.join(' '));
          }
        }
  
        this.loremText = this.asHTML
          ? `<p>${text.join('</p><p>')}</p>`
          : text.join('\n\n');
      },
      randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      generateWord() {
        const words = [
          'lorem', 'ipsum', 'dolor', 'sit', 'amet',
          'consectetur', 'adipiscing', 'elit', 'sed',
          'do', 'eiusmod', 'tempor', 'incididunt', 'ut',
          'labore', 'et', 'dolore', 'magna', 'aliqua',
          'enim', 'ad', 'minim', 'veniam',
        ];
        return words[Math.floor(Math.random() * words.length)];
      },
      copyText() {
        navigator.clipboard.writeText(this.loremText);
        alert('Text copied to clipboard!');
      }
    }
  };
  </script>
  
  <style scoped>
  @import '@vueform/slider/themes/default.css';
  
  .lorem-ipsum-generator {
    width: 650px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 10px;
  }
  
  .slider-group,
  .switch-group {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  
  .slider-group label,
  .switch-group label {
    margin-right: 20px;
  }
  
  textarea {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
  }
  </style>
  