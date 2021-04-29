<template>
  <div>
    <div class="grid-x">
      <div
        v-if="address"
        class="small-12 grid-x detail"
      >
        <div class="small-4">
          <font-awesome-icon icon="map-marker-alt" />
        </div>
        <div class="small-20">
          {{ address }}<br>
          Philadelphia, PA {{ zipcode }}
        </div>
      </div>

      <div
        v-if="item.attributes.activity_type"
        class="small-12 grid-x detail"
      >
        <div>
          Activity Type: {{ item.attributes.activity_type }}
        </div>
      </div>

      <div
        v-if="item.attributes.partner_name"
        class="small-12 grid-x detail"
      >
        <div>
          Partner: {{ item.attributes.partner_name }}
        </div>
      </div>

      <div
        v-if="item.attributes.programming_type"
        class="small-12 grid-x detail"
      >
        <div>
          Programming Type: {{ item.attributes.programming_type }}
        </div>
      </div>

      <div
        v-if="item.attributes.registration_start_date"
        class="small-12 grid-x detail"
      >
        <div>
          Registration Start Date: {{ regStartDate }}
        </div>
      </div>

      <div
        v-if="item.attributes.registration_end_date"
        class="small-12 grid-x detail"
      >
        <div>
          Registration End Date: {{ regEndDate }}
        </div>
      </div>

      <div
        v-if="item.attributes.program_start_date"
        class="small-12 grid-x detail"
      >
        <div>
          Program Start Date: {{ progStartDate }}
        </div>
      </div>

      <div
        v-if="item.attributes.program_end_date"
        class="small-12 grid-x detail"
      >
        <div>
          Programming End Date: {{ progEndDate }}
        </div>
      </div>

    </div>

    <div class="columns is-mobile no-margins">
      <div class="column is-one-quarter is-paddingless">
        <div>Hours</div>
      </div>

      <div class="column is-paddingless">
        <div
          v-for="(day, index) of days"
          :key="index"
        >
          <div
            class="columns is-mobile no-margins"
          >
            <div class="table-column is-paddingless standard-width">
              {{ day.label }}
            </div>

            <div class="table-column is-paddingless">
              {{ day.value }}
            </div>
          </div>
          <hr
            v-if="day.label != lastDay"
            class="no-margins"
          >
        </div>
      </div>
    </div>

    <div class="cell medium-12">
      <div
        v-if="item.attributes.CATEGORY"
        class="grid-x detail"
      >
        <div class="small-2">
          <font-awesome-icon icon="hand-holding-heart" />
        </div>
        <div
          class="small-22"
          v-html="$t('sections.' + section + '.subsections[\'' + item.attributes.CATEGORY + '\'].name')"
        />
      </div>

      <div
        v-if="item.attributes.phone_number"
        class="grid-x detail"
      >
        <div class="small-2">
          <font-awesome-icon icon="phone" />
        </div>
        <div class="small-22">
          {{ item.attributes.phone_number }}
        </div>
      </div>
    </div>

    <!-- v-if="item.attributes.TEMPCLOSE !== null" -->
    <div
      v-if="item.attributes.TEMPCLOSE !== null && item.attributes.TEMPCLOSE >= currentUnixDate"
      class="grid-x temp-close-section"
    >
      <div class="card-exclamation-holder small-5">
        <font-awesome-icon
          icon="exclamation-triangle"
          class="fa-2x fa-icon-class"
        />
      </div>
      <div class="grid-y card-exclamation-details small-19">
        <div><b>{{ $t('change') }}:</b></div>
        <div>{{ $t('closure') }}: {{ transforms.toLocaleDateString.transform(item.attributes.TEMPCLOSE) }}</div>
      </div>
    </div>

  </div>
</template>

<script>

import transforms from '../general/transforms.js';
import { format } from 'date-fns';

export default {
  name: 'ExpandCollapseContent',
  components: {
  },
  props: {
    item: {
      type: Object,
      default: function(){
        return {};
      },
    },
  },
  computed: {
    currentUnixDate() {
      let currentYear = format(new Date(), 'yyyy');
      let currentMonth = format(new Date(), 'MM');
      let currentDay = format(new Date(), 'dd');
      let dateStart = new Date(currentYear, currentMonth-1, currentDay);
      return parseInt(format(dateStart, 'T'));
    },
    regStartDate() {
      return format(this.$props.item.attributes.registration_start_date, 'MMM dd');
    },
    regEndDate() {
      return format(this.$props.item.attributes.registration_end_date, 'MMM dd');
    },
    progStartDate() {
      return format(this.$props.item.attributes.program_start_date, 'MMM dd');
    },
    progEndDate() {
      return format(this.$props.item.attributes.program_end_date, 'MMM dd');
    },
    transforms() {
      return transforms;
    },
    address() {
      return this.$props.item.attributes.address;
    },
    activityType() {
      return this.$props.item.attributes.activity_type;
    },
    days() {
      let allDays = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ];
      let theFields = [];
      // let days = {};

      let item = this.item;
      let holidays = [];
      let exceptions = [];
      if (this.$config.holidays && this.$config.holidays.days) {
        holidays = this.$config.holidays.days;
      }
      if (this.$config.holidays && this.$config.holidays.exceptions) {
        exceptions = this.$config.holidays.exceptions;
      }

      for (let [ index, day ] of allDays.entries()) {
        let normallyOpen = item.attributes[day] != null;
        let holidayToday = holidays.includes(day);
        let yesterday = allDays[index-1];
        let normallyOpenYesterday = item.attributes[yesterday] != null;
        let holidayYesterday = holidays.includes(yesterday);
        let siteIsException = false;
        // let siteIsException = exceptions.includes(this.getSiteName(this.item));

        // if (this.item.attributes[day] != null){
        if ((normallyOpen || (!siteIsException && holidayYesterday && normallyOpenYesterday)) && (!holidayToday || siteIsException)) {

          let hours;
          if ((normallyOpen && !holidayToday) || (normallyOpen && siteIsException)) {
            hours = item.attributes[day];
          } else if (!normallyOpen && holidayYesterday) {
            hours = item.attributes[yesterday];
          }

          let dayObject = {
            label: day,
            labelType: 'i18n',
            value: hours,
            // valueType: 'i18n',
          };
          theFields.push(dayObject);
        }
      }
      return theFields;
    },
    lastDay() {
      return this.days[this.days.length - 1].label;
    },
    zipcode() {
      let value;
      if (this.$props.item.attributes.ZIP2) {
        value = this.$props.item.attributes.ZIP2;
      } else if (this.$props.item.attributes.ZIP_CODE) {
        value = this.$props.item.attributes.ZIP_CODE;
      }
      return value;
    },
  },
  methods: {
    parseAddress(address) {
      const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
      return formattedAddress;
    },
    getCategory(item) {
      let value;
      if (this.$config.categoryExceptions) {
        if (this.$config.categoryExceptions.condition(item)) {
          value = this.$config.categoryExceptions.value;
          // console.log('getCategory is running, item:', item, 'value:', value);
        } else {
          value = item.attributes.CATEGORY;
        }
      } else {
        value = item.attributes.CATEGORY;
      }
      return value;
    },
  },
};

</script>

<style lang="scss">

.table-column {
  display: inline-block;
}

.standard-width {
  width: 90px;
}

.location-item {
  position: relative;
  border-bottom: 1px solid black;
  height:100%;

  &:hover::after {
    color: white;
  }

  .temp-close-section {
    width: 100%;
  }

  .card-exclamation-holder {
    padding: 20px;
    background-color: #CC3000;
    text-align: center;
  }

  .fa-icon-class {
    color: white;
    text-align: center;
  }

  .card-exclamation-details {
    padding: 10px;
    background-color: #F5D6CC;
  }

  .location-title {
    cursor: pointer;
    padding: 1rem;
    margin-bottom: 0;
    &:hover{
      background: #2176d2;
      color: white;
    }
  }

  &::after{
    position: absolute;
    right:1rem;
    top: 0;
    content: '+';
    font-weight: 900;
    font-size:1.5rem;
    z-index: 100;
    color: color(dark-ben-franklin)
  }
  &.open{
    h2{
      color:white;
      background-color: color(ben-franklin-blue);
      font-weight: 900;
    }
    &::after{
      content: '-';
      color:white;
    }
  }
  .location-content{
    overflow: hidden;
    height:0;

    &.location-open{
      padding: 1rem;
      height: 100%;
      overflow: initial;
    }
  }
}
</style>
