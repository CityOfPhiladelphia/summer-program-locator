<template>
  <div
    class="grid-y custom-greeting"
  >
    <div class="exclamation-holder">
      <font-awesome-icon
        icon="exclamation-triangle"
        class="fa-3x fa-icon-class"
      />
      <div
        class="grid-y exclamation-details small-19 medium-20"
      >
        <div><b>Before you go:</b></div>
        <div>Check the specific site information. Hours are subject to change.</div>
      </div>
    </div>

    <div class="open-list-div">
      <phila-button
        class="button open-list-button"
        @click.native="$emit('view-list')"
        v-html="$t('app.viewList')"
      />
    </div>
    <h1>About this finder</h1>
    <p>This tool can help you find free, in-person summer camps and programs for children and teens in Philadelphia. </p>
    <div>
      You can: 
      <ul>
        <li>Search for a program by address. </li>
        <li>Click on a map location for specific site information. </li>
        <li>Filter sites by grade level and registration status. </li>
      </ul>
    </div>
  </div>
</template>

<script>

import PhilaButton from '@phila/pinboard/src/components/PhilaButton.vue';

export default {
  name: 'CustomGreeting',
  components: {
    PhilaButton,
  },
};

</script>

<style scoped>

  .open-list-div {
    margin: 0 auto;
  }

  .open-list-button {
    margin-top: 6px;
    margin-bottom: 14px;
    width: 200px;
  }

  .custom-greeting {
    padding: 12px;
  }

  .exclamation-holder {
    display: flex;
    align-items: center;
    margin-top: 6px;
    margin-bottom: 14px;
  }

  .fa-icon-class {
    margin: 0 auto;
    display: block;
  }

  .exclamation-details {
    margin-left: 14px;
    font-size: 15px;
  }

  .mb-panel-topics-greeting {
    padding-top: 20px;
  }

  .greeting {
    font-size: 20px;
    color: #444;
    padding: 14px;
  }

  .greeting-error {
    border-left-color: #ff0000;
  }

  .custom-section {
    margin-left: 8px;
    margin-top: 4px;
  }

  .custom-ul {
    margin-left: 4rem;
    font-size: 14px;
  }

  /*medium*/
  @media screen and (min-width: 750px) {
    .mb-panel-topics-greeting {
      /*make this scroll on medium screens*/
      /*REVIEW this is a little hacky. the 120px shouldn't be hard-coded.*/
      height: calc(100vh - 120px);
      overflow: auto;
    }
  }
</style>
