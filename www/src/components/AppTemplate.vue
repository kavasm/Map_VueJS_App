<template>
  <v-app>
    <v-app-bar app fixed clipped-left style="z-index: 150" elevate-on-scroll
      ><v-app-bar-title><h2 class="accent--text">My Maps</h2></v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app clipped style="z-index: 145" fixed color="variant">
      <v-list dense>
        <v-list-item
          link
          v-for="(item, index) in navigationItems"
          :key="index"
          :to="item.route"
        >
          <v-list-item-icon class="d-flex align-center">
            <v-icon size="24">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>{{ item.text }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main><router-view></router-view></v-main>
  </v-app>
</template>

<script>
export default {
  name: "AppTemplate",
  data() {
    return {
      navigationItems: [
        { text: "Map", route: "/", icon: "mdi-map-marker-multiple" },
        { text: "Polygon Map", route: "/polygon-map", icon: "mdi-map" },
        // Add more items as needed
      ],
    };
  },
};
</script>
