<template>
  <v-container style="height: 100%">
    <v-row style="height: 100%">
      <v-col cols="12">
        <l-map style="height: 100%" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-polygon
            v-for="(polygon, index) in polygons"
            :key="index"
            :lat-lngs="polygon.latlngs"
            :color="polygon.color"
          ></l-polygon>
        </l-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { LMap, LTileLayer, LPolygon } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LPolygon,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [12.971599, 77.594566],
      polygons: [
        {
          latlngs: [
            [12.971599, 77.594566],
            [12.29581, 76.639381],
            [13.009711, 76.102898],
          ],
          color: "green",
        },
        {
          latlngs: [
            [13.55, 78.5],
            [13.34749, 77.102173],
            [12.916517, 79.132500],
            [13.2195, 79.103302],
          ],
          color: "red",
        },
      ],
    };
  },
};
</script>
