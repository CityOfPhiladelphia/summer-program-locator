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

library.add(faExclamationTriangle, faHandHoldingHeart, faHandshake);

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

pinboard({
  // baseConfig: BASE_CONFIG_URL,
  app: {
    title: 'Summer programs',
    subtitle: 'Find free, in-person summer programs for children and teens',
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
  hiddenRefine: {
    Enabled: function(item) {
      return item.attributes.enabled_disabled === 'Enabled';
    },
  },
  // refine: {
  //   type: 'multipleFieldGroups',
  //   patientAge: {
  //     'High school': {
  //       unique_key: 'high_school',
  //       // i18n_key: 'patientAge.year18',
  //       value: function(item) {
  //         return item.attributes.school_type === 'high_school';
  //       },
  //     },
  //     'Middle school': {
  //       unique_key: 'middle_school',
  //       // i18n_key: 'patientAge.year14',
  //       value: function(item) {
  //         return item.attributes.school_type === 'middle_school';
  //       },
  //     },
  //     'Grade school': {
  //       unique_key: 'elementary_school',
  //       // i18n_key: 'patientAge.pedCare',
  //       value: function(item) {
  //         return item.attributes.school_type === 'elementary_school';
  //       },
  //     },
  //   },
  // },
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
  projection: '3857',
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
});
