<template>
  <div
    class="grid-y custom-greeting"
  >
    <div class="open-list-div">
      <phila-button
        class="button open-list-button"
        @click.native="$emit('view-list')"
        v-html="$t('app.viewList')"
      />
    </div>
    <h1 class="h2">
      About this finder
    </h1>
    <p>This tool can help you find free, in-person summer camps and programs for children and teens in Philadelphia. </p>
    <div>
      You can: 
      <ul>
        <li>Search for a program by address. </li>
        <li>Click on a map location for specific site information. </li>
        <li>Filter sites by grade level and registration status. </li>
      </ul>
    </div>
    <h2 class="h3">
      Who is eligible
    </h2>
    <p>Children and teens who live in Philadelphia can take part in free, in-person summer camps and programs. You must register youth for these programs in advance.  </p>
    <h2 class="h3">
      When programs occur
    </h2>
    <p>Program schedules vary by location. Click on a specific site on the map for details on start and end dates, as well as program days and times. </p>
    <h2 class="h3">
      How to register
    </h2>
    <p>Click on a program and use its contact information to begin the registration process.</p>
    <div class="custom-callout">
      <strong>Looking for more summer opportunities?</strong><br><p class="no-margin">
        Visit <a href="https://www.phila.gov/programs/playitsafephl/">phila.gov/PlayItSafePHL</a> to find free meals, virtual activities, jobs for teens, and more.
      </p>
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

  .custom-callout{
    border-style: solid;
    border-width: 1px;
    padding: 10px;
  }
</style>
