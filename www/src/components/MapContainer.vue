<template>
  <v-container style="height: 100%"> 
    <v-snackbar
      v-model="snackbar"
      top
      right
      timeout="3000"
      color="primary"
      variant="tonal"
    >
      {{ alertMsg }}
    </v-snackbar>
    <v-row style="height: 100%">
      <v-col cols="10">
        <l-map style="height: 100%" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker
            v-for="(marker, index) in markers"
            :key="index"
            :lat-lng="marker.latLng"
            @click="openPopUp(marker.latLng)"
          >
            <l-popup>{{ locationAddress }}</l-popup>
          </l-marker>
        </l-map>
      </v-col>
      <v-col>
        <v-radio-group v-model="selectedLocationType">
          <v-radio
            label="Live Location"
            value="liveLocation"
            @click="updateMarkers('liveLocation')"
          ></v-radio>
          <v-radio
            label="Restaurants"
            value="restaurants"
            @click="updateMarkers('restaurants')"
          ></v-radio>
          <v-radio
            label="Hospital"
            value="hospital"
            @click="updateMarkers('hospital')"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { LMap, LTileLayer, LPopup, LMarker } from "vue2-leaflet";
import axios from "axios";

export default {
  components: {
    LMap,
    LTileLayer,
    LPopup,
    LMarker,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [12.971599, 77.594566],
      markers: [
        {
          latLng: [12.971599, 77.594566],
        },
        {
          latLng: [13.07, 77.800003],
        },
        {
          latLng: [12.29581, 76.639381],
        },
        {
          latLng: [13.009711, 76.102898],
        },
      ],
      locationAddress: "",
      selectedLocationType: "",
      alertMsg: "",
      snackbar: false,
    };
  },
  methods: {
    async openPopUp(latLng) {
      const [lat, lang] = latLng;
      let url = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lang}&key=2a3b0ce711474d4b8d7d52d9fc27b860`;
      let res = await axios.get(url);
      this.locationAddress = res.data.results[0].formatted;
    },
    restaurants() {
      return [
        {
          latLng: [12.9616, 77.5947],
        },
        {
          latLng: [12.9669, 77.6081],
        },
        {
          latLng: [13.2195, 79.103302],
        },
      ];
    },
    hospital() {
      return [
        {
          latLng: [12.8963, 77.598],
        },
        {
          latLng: [12.9199, 77.6653],
        },
        {
          latLng: [12.2956, 76.6557],
        },
      ];
    },
    updateMarkers(locationType) {
      if (locationType === "restaurants") {
        this.markers = this.restaurants();
      } else if (locationType === "hospital") {
        this.markers = this.hospital();
      } else {
        this.getLiveLocation();
      }
    },
    getLiveLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          this.updateLocation,
          this.showError
        );
      } else {
        this.alertMsg = "Geolocation is not available in your browser.";
        this.snackbar = true;
      }
    },
    updateLocation(position) {
      let location = [
        {
          latLng: [position.coords.latitude, position.coords.longitude],
        },
      ];
      this.markers = location;
      this.alertMsg = "Hey got your live location!";
      this.snackbar = true;
    },
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.alertMsg = "User denied the request for geolocation.";
          this.snackbar = true;
          break;
        case error.POSITION_UNAVAILABLE:
          this.alertMsg = "Location information is unavailable.";
          this.snackbar = true;
          break;
        case error.TIMEOUT:
          this.alertMsg = "The request to get user location timed out.";
          this.snackbar = true;
          break;
        case error.UNKNOWN_ERROR:
          this.alertMsg = "An unknown error occurred.";
          this.snackbar = true;
          break;
        default:
          this.alertMsg = "An unknown error occurred.";
          this.snackbar = true;
          break;
      }
    },
  },
};
</script>
