// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js


// turn off console logging in production
const { hostname='' } = location;
if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
  console.log = console.info = console.debug = console.error = function () {};
}

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons/faHandHoldingHeart';
import { faHandshake } from '@fortawesome/free-solid-svg-icons/faHandshake';

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';

library.add(faExclamationTriangle, faHandHoldingHeart, faHandshake, faExternalLinkAlt);

// import pinboard
import pinboard from '@phila/pinboard/src/main.js';

// data-sources
import ocfData from './data-sources/ocf';
// var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/cityofphiladelphia/mapboard-default-base-config@6126861722cee9384694742363d1661e771493b9/config.js';

import customGreeting from './components/customGreeting.vue';
import expandCollapseContent from './components/ExpandCollapseContent.vue';
const customComps = {
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
};

import { format } from 'date-fns';

pinboard({
  // baseConfig: BASE_CONFIG_URL,
  app: {
    title: 'Summer programs',
    subtitle: 'Find in-person summer programs for children and teens',
    logoAlt: 'City of Philadelphia',
    type: 'ocfData',
  },
  customComps,
  header: {
    logo: true,
  },
  gtag: {
    category: 'rf-ocf',
  },
  comboSearch: {
    dropdown: [
      'address',
    ],
  },
  locationInfo: {
    siteName: function(item, transforms) {
      return item.attributes.site_name;
    },
  },
  // hiddenRefine: {
  //   Enabled: function(item) {
  //     return item.attributes.enabled_disabled === 'Enabled';
  //   },
  // },
  refine: {
    type: 'multipleFieldGroups',
    multipleFieldGroups: {
      openTo: {
        'elementary': {
          unique_key: 'openTo_elementary',
          i18n_key: 'openTo.elementary',
          value: function(item) {
            // console.log('item:', item);
            let value;
            if (item.attributes.elementary_school === "Yes") {
              value = true;
            } else {
              value = false;
            }
            return value;
          },
        },
        'middle': {
          unique_key: 'openTo_middle',
          i18n_key: 'openTo.middle',
          value: function(item) {
            // console.log('item:', item);
            let value;
            if (item.attributes.middle_school === "Yes") {
              value = true;
            } else {
              value = false;
            }
            return value;
          },
        },
        'high': {
          unique_key: 'openTo_high',
          i18n_key: 'openTo.high',
          value: function(item) {
            // console.log('item:', item);
            let value;
            if (item.attributes.high_school === "Yes") {
              value = true;
            } else {
              value = false;
            }
            return value;
          },
        },
      },
      regStatus: {
        'open': {
          unique_key: 'regStatus_open',
          i18n_key: 'regStatus.open',
          value: function(item) {
            let currentYear = format(new Date(), 'yyyy');
            let currentMonth = format(new Date(), 'MM');
            let currentDay = format(new Date(), 'dd');
            let dateStart = new Date(currentYear, currentMonth-1, currentDay);
            let currentUnixDate = parseInt(format(dateStart, 'T'));
            // console.log('item.attributes.registration_start_date:', item.attributes.registration_start_date, 'currentUnixDate:', currentUnixDate);
            return item.attributes.registration_start_date <= currentUnixDate && item.attributes.registration_end_date >= currentUnixDate;
          },
        },
        'upcoming': {
          unique_key: 'regStatus_upcoming',
          i18n_key: 'regStatus.upcoming',
          value: function(item) {
            let currentYear = format(new Date(), 'yyyy');
            let currentMonth = format(new Date(), 'MM');
            let currentDay = format(new Date(), 'dd');
            let dateStart = new Date(currentYear, currentMonth-1, currentDay);
            let currentUnixDate = parseInt(format(dateStart, 'T'));
            // console.log('item.attributes.registration_start_date:', item.attributes.registration_start_date, 'currentUnixDate:', currentUnixDate);
            return item.attributes.registration_start_date > currentUnixDate;
          },
        },
        'closed': {
          unique_key: 'regStatus_closed',
          i18n_key: 'regStatus.closed',
          value: function(item) {
            let currentYear = format(new Date(), 'yyyy');
            let currentMonth = format(new Date(), 'MM');
            let currentDay = format(new Date(), 'dd');
            let dateStart = new Date(currentYear, currentMonth-1, currentDay);
            let currentUnixDate = parseInt(format(dateStart, 'T'));
            // console.log('item.attributes.registration_start_date:', item.attributes.registration_start_date, 'currentUnixDate:', currentUnixDate);
            return item.attributes.registration_end_date < currentUnixDate;
          },
        },
      },
    },
  },
  dataSources: {
    ocfData,
  },
  router: {
    enabled: true,
  },
  geocoder: {
    url(input) {
      const inputEncoded = encodeURIComponent(input);
      return `//api.phila.gov/finder/v1/search/${inputEncoded}`;
    },
    params: {
      include_units: true,
    },
  },
  // projection: '3857',
  footer: {
    'aboutFinder': true,
    'HowToUse': false,
    'OtherLinks': {
      locations: {
        text: 'PlayItSafePHL',
        link: 'https://www.phila.gov/programs/playitsafephl/',
      },
    },
  },
  cyclomedia: {
    enabled: false,
    // measurementAllowed: false,
    // popoutAble: true,
    // recordingsUrl: 'https://atlas.cyclomedia.com/Recordings/wfs',
    // username: process.env.VUE_APP_CYCLOMEDIA_USERNAME,
    // password: process.env.VUE_APP_CYCLOMEDIA_PASSWORD,
    // apiKey: process.env.VUE_APP_CYCLOMEDIA_API_KEY,
  },
  markerType: 'circle-marker',
  circleMarkers:{
    // circleColors: {
    //   'Food Site': '#0F4D90',
    //   'Senior Meal Site': '#D67D00',
    //   'Student Meal Site': '#721817',
    //   'Outdoor Meal Site': '#506D0A',
    // },
    weight: 0,
    size: 16,
    mobileSize: 20,
  },
  map: {
    type: 'mapbox',
    // tiles: 'hosted',
    containerClass: 'map-container',
    defaultBasemap: 'pwd',
    center: [ -75.163471, 39.953338 ],
    zoom: 12,
    geocodeZoom: 15,
    imagery: {
      enabled: false,
    },
    basemaps: {
      pwd: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer',
        tiledLayers: [
          'cityBasemapLabels',
        ],
        type: 'featuremap',
        attribution: 'Parcels: Philadelphia Water',
      },
    },
    tiledLayers: {
      cityBasemapLabels: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer',
        zIndex: '3',
      },
    },
  },
  mbStyle: {
    version: 8,
    sources: {
      pwd: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
        ],
        type: 'raster',
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'pwd',
        type: 'raster',
        source: 'pwd',
      },
    ],
  },
  basemapSources: {
    pwd: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'pwd',
        type: 'raster',
      },
    },
    imagery2019: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2019_3in/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imagery2019',
        type: 'raster',
      },
    },
  },
  basemapLabelSources:{
    cityBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'cityBasemapLabels',
        type: 'raster',
      },
    },
    imageryBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imageryBasemapLabels',
        type: 'raster',
      },
    },
  },
  i18n: {
    header: 'i18nBanner',
    enabled: true,
    refinePanel: true,
    expandCollapseTitle: true,
    footer: true,
    data: {
      locale: 'en-US',
      messages: {
        'en-US': {
          language: 'English',
          app: {
            title: 'Summer programs',
            subtitle: 'Find in-person summer programs for children and teens',
            bannerAlert: 'Many sites are closed today. Check specific site details for more information.',
            noResults: 'No site was found within your search.',
          },
          viewAccessible: 'View accessible list of site locations',
          introPage: {
            p1: 'There are permanent and temporary testing sites throughout Philadelphia. <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">Find out who should get tested</a>.',
            section1Title: 'Find a pop-up testing event',
            p2: 'Pop-up events are hosted at temporary locations and are not shown on the map. <a href="https://www.phila.gov/the-latest/all-events/?category=Mobile%20testing%20sites%20for%20COVID-19" target="_blank">Check the calendar event for details</a>.',
            section2Title: 'Find a test site',
            p3: 'Use this finder to:',
            ol1: {
              li1: 'Locate a COVID-19 testing site in Philadelphia.',
              li2: 'Select the location on the map for details.',
              li3: 'Contact the provider before going for a test.',
            },
            p4: 'What to expect at a test site',
            p5: 'You won’t have to pay out-of-pocket to get a test. However, some sites may bill your insurance for a visit fee.',
            p6: 'At the site, you will be asked for identification and may also be asked for health insurance information. If you don’t have these, you can still get a test.',
            p7: 'Some sites may:',
            ul1: {
              li1: 'Limit testing to people who meet certain criteria.',
              li2: 'Require an appointment.',
              li3: 'Require a referral from your doctor.',
              li4: 'Ask you to stay in your car (for drive-thru sites).',
            },
            callout1: {
              p1: '<b>Questions?</b> Call your health care provider or see our FAQ about <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">getting tested in Philadelphia</a>.',
            },
          },
          languages: {
            languagesSpoken: 'Languages spoken:',
            english: 'English',
            spanish: 'Spanish',
            chinese: 'Chinese',
            french: 'French',
            arabic: 'Arabic',
            translationServices: 'Phone interpretation services:',
          },
          beforeYouGo: 'Before you go',
          checkSite: 'Check the specific site information. Hours are subject to change.',
          hoursVary: 'Hours and availability varies.',
          eligibility: 'Details',
          testingHours: 'Testing hours',
          daysOfOperation: 'Days of operation',
          Monday: 'Mon.',
          Tuesday: 'Tues.',
          Wednesday: 'Wed.',
          Thursday: 'Thurs.',
          Friday: 'Fri.',
          Saturday: 'Sat.',
          Sunday: 'Sun.',
          // access: 'Process',
          Yes: 'Yes',
          No: 'No',
          Unknown: 'Unknown',
          website: 'Website',
          regStatus: {
            category: 'Registration status',
            open: 'Open',
            upcoming: 'Upcoming',
            closed: 'Closed',
          },
          openTo: {
            category: 'Open to',
            elementary: 'Elementary school',
            middle: 'Middle school',
            high: 'High school',
          },
          process: {
            category: 'Process',
            dt: 'Drive-thru',
            wu: 'Walk-up',
            both: 'Drive-thru & walk-up',
          },
          symptomatic: {
            category: 'Must be symptomatic',
            null: '',
            symptom: 'Must be symptomatic',
            asymptom: 'Symptoms not required (but exposure might be)',
          },
          rapid: {
            category: 'Rapid testing',
            Yes: 'Offers rapid testing (call for details)',
          },
          refReq: {
            category: 'Referral required',
            null: '',
            yes: 'Referral required',
            no: 'No referral required',
          },
          patientAge: {
            category: 'Patient age',
            null: '',
            year14: '+14 years old',
            year18: '+18 years old',
            pedCare: 'Offers pediatric testing',
          },
          panelText:{
            p1: 'If you are unable to get a COVID-19 test through your health care provider, this tool can help you find a test within the City of Philadelphia.',
          },
          restrictions: {
            lowInc: 'This site is intended for low-income families and individuals.',
            year14: 'Must be 14 years or older.',
            year18: 'Must be 18 years or older.',
            netPat: 'A patient must be in the provider’s network to receive a test at this site.',
            medPrior: 'Priority will be given to health care workers and first responders at this site.',
            homeless: 'This site is intended for people experiencing homelessness.',
            telemed: 'A telemedicine visit is required before testing at this site.',
            onlineQuest: 'An online questionnaire must be completed before visiting this site.',
          },
          notes:{
            schedApp: 'Appointments are required for testing.',
            refReq: 'Referral required.',
            schedAppRefReq: 'Appointment and referral required.',
            noApp: 'No appointment necessary for testing.',
            testAll: 'Testing provided even if symptoms are not present.',
          },
          facilityType: {
            drugstore: 'Drugstore',
            fieldSite: 'Field Site',
            clinic: 'Clinic',
            hospital: 'Hospital',
            other: 'Other',
            phmcHC: 'PHMC health center',
            urgentCare: 'Urgent Care',
            cityHC: 'City health center',
            homelessServices: 'Homeless services',
          },
        },
      },
    },
  },
});
