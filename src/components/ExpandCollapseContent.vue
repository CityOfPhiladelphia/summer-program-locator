<template>
  <div>
    <div class="grid-x">
      <div
        v-if="item.attributes.partner_name"
        class="small-12 detail"
      >
        <div class="grid-x">
          <div class="small-3 cell bottom-spacer">
            <font-awesome-icon
              icon="handshake"
              fixed-width
            />
          </div>
          <div class="small-21 cell bottom-spacer">
            <a :href="item.attributes.website">{{ item.attributes.partner_name }}</a>
          </div>
        </div>
        <div class="grid-x">
          <div class="small-3 cell bottom-spacer">
            <font-awesome-icon
              icon="map-marker-alt"
              fixed-width
            />
          </div>
          <div class="small-21 cell bottom-spacer">
            {{ address }}<br>
            Philadelphia, PA {{ zipcode }}
          </div>
        </div>
      </div>
      <div
        v-if="item.attributes.programming_type"
        class="small-11 detail"
      >
        <div><b>Contact information</b></div>

        <div class="grid-x">
          <div class="small-3 cell bottom-spacer">
            <font-awesome-icon
              icon="user"
              fixed-width
            />
          </div>
          <div class="small-21 cell bottom-spacer">
            {{ item.attributes.primary_contact }}
          </div>
        </div>
        <div class="grid-x">
          <div class="small-3 cell bottom-spacer">
            <font-awesome-icon
              icon="phone"
              fixed-width
            />
          </div>
          <div class="small-21 cell bottom-spacer">
            {{ item.attributes.contact_phone_number }}
          </div>
        </div>
        <div class="grid-x">
          <div class="small-3 cell bottom-spacer">
            <font-awesome-icon
              icon="envelope"
              fixed-width
            />
          </div>
          <div class="small-21 cell bottom-spacer">
            <a :href="item.attributes.contact_email_address">{{ item.attributes.contact_email_address }}</a>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div
      v-if="item.attributes.registration_start_date"
      class="cell small-24 detail"
    >
      <div class="grid-x">
        <div class="cell medium-6 bottom-spacer">
          Register
        </div>
        <div class="cell medium-7">
          {{ regStartDate }} - {{ regEndDate }}
        </div>
        <div class="medium-11">
          <div
            v-if="regLabel === 'open'"
            class="open label"
          >
            Registration open 
          </div>
          <div
            v-if="regLabel === 'upcoming'"
            class="upcoming label"
          >
            Registration upcoming 
          </div>
          <div
            v-if="regLabel === 'closed'"
            class="closed label"
          >
            Registration closed 
          </div>
        </div>
      </div>
      <hr>

      <div
        v-if="item.attributes.program_start_date"
        class="small-24 detail"
      >
        <div class="grid-x">
          <div class="cell medium-6 bottom-spacer">
            Open to
          </div>
          <div class="cell medium-6 bottom-spacer">
            {{ schoolType }}
          </div>
        </div>


        <div class="grid-x">
          <div class="cell medium-6 ">
            Program dates
          </div>
          <div class="cell medium-8">
            <div class="bottom-spacer">
              {{ progStartDate }} - {{ progEndDate }}
            </div>
            <div
              v-for="(day, index) of days"
              :key="index"
            >
              <div
                class="cell is-mobile no-margins"
              >
                <div class="table-column is-paddingless standard-width is-captialized">
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
      </div>
    </div>

    <div class="cell medium-12">
      <div
        v-if="item.attributes.CATEGORY"
        class="grid-x detail"
      >
        <div class="cell small-2">
          <font-awesome-icon icon="hand-holding-heart" />
        </div>
        <div
          class="cell small-22"
          v-html="$t('sections.' + section + '.subsections[\'' + item.attributes.CATEGORY + '\'].name')"
        />
      </div>

      <div
        v-if="item.attributes.phone_number"
        class="grid-x detail"
      >
        <div class="cell small-2">
          <font-awesome-icon icon="phone" />
        </div>
        <div class="cell small-22">
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
      return format(this.$props.item.attributes.registration_start_date, 'MMMM dd');
    },
    regLabel(){

      // let allReg = ['upcoming', 'open', 'closed'];
      // let item = this.item;
      // let theFields = [];
      // let niceName = '';
      
      //for (let [ index, type ] of allReg.entries()) {

      if ( this.item.attributes.registration_start_date >= this.currentUnixDate ){
        return "upcoming";
      }else if (this.item.attributes.registration_start_date <= this.currentUnixDate && this.$props.item.attributes.registration_end_date >= this.currentUnixDate){
        return  "open";
      }else if (this.item.attributes.registration_end_date >= this.currentUnixDate  ){
        return "closed";
      }
      //TODO FIX THIS WHOLE THING
      return '';
      

      // let regObject = {
      //     label: type,
      //     labelType: 'i18n',
      //     value: niceName,
      //   };
      //   theFields.push(regObject);
      // }
      // return theFields;
    },
    regEndDate() {
      return format(this.$props.item.attributes.registration_end_date, 'MMMM dd, yyyy');
    },
    progStartDate() {
      return format(this.$props.item.attributes.program_start_date, 'MMMM dd');
    },
    progEndDate() {
      return format(this.$props.item.attributes.program_end_date, 'MMMM dd, yyyy');
    },
    transforms() {
      return transforms;
    },
    address() {
      return this.$props.item.attributes.address;
    },
    schoolType(){
      if ( this.$props.item.attributes.school_type === 'middle_school' ) {
        return 'Middle school students';
      }else if (this.$props.item.attributes.school_type === 'high_school'){
        return 'High school students';
      }
      return 'Elementary school students';
      
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
          
          if (item.attributes[day] != 'Closed') {
            let dayObject = {
              label: day,
              labelType: 'i18n',
              value: hours,
              // valueType: 'i18n',
            };
            theFields.push(dayObject);
          }
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Open+Sans&display=swap');
.label {
  padding: 3px 10px;
  text-transform: uppercase;
  font-weight:600;
  width: auto;
  display: inline;
  font-family: 'Montserrat', sans-serif;
  &.open{
    background-color: #C5F1B7;
  }
  &.closed{
    background-color: #F7D2D1;
  }
  &.upcoming{
    background-color: #FDF0AB;
  }
}

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
.is-captialized{
  text-transform: capitalize;
}

.bottom-spacer{
  margin-bottom: 1rem;
}
.no-margins{
  margin: 0;
}
</style>
