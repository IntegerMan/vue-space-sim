<template>
  <div id="app">
    <header>Header Content</header>
    <main>
      Main Content
      <router-view />
    </main>
    <aside role="navigation">Sidebar here</aside>
    <footer>Footer Controls Go Here</footer>
  </div>
</template>

<style lang="scss">
$bgColor: black;

$panelBgColor: #a1ffff;
$panelUrgentColor: #fdfd7b;
$panelSubtleColor: #498eed;
$panelInfoColor: #394ea9;
$panelTextColor: #f8fefb;

// Heads up display colors
$hudFriendlyColor: #5bab7a;
$hudUnknownColor: #fdfd7b;
$hudCivillianColor: #f8fefb;
$hudHostileColor: #fd4344;

// Margins
$m1: 0.5rem;
$m2: 1rem;

html {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  background-color: $bgColor;
  color: $panelTextColor;
}

#app {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  padding: $m1;

  display: grid;
  grid-template-areas:
    "header header"
    "sideNav main"
    "footer footer";

  row-gap: $m1;
  column-gap: $m1;

  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr;

  > aside {
    grid-area: sideNav;
    background-color: $panelBgColor;
    color: $panelInfoColor;
  }

  > header {
    grid-area: header;
    background-color: $panelSubtleColor;
  }

  > footer {
    grid-area: footer;
    background-color: $panelUrgentColor;
    color: $panelInfoColor;
  }

  > main {
    grid-area: main;
  }
}
</style>
