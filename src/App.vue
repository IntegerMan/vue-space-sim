<template>
  <div id="app">
    <header>
      Header Content
    </header>
    <main>
      Main Content
      <router-view/>
    </main>
    <aside role="navigation">
      Sidebar here
    </aside>
    <footer>
      Footer Controls Go Here
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: grid;
  grid-template-areas:
    'header header'
    'sideNav main'
    'footer fooer';
  grid-template-rows: 'auto 1fr auto'

  > aside {
    grid-area: 'sideNav'
  }

  > header {
    grid-area: 'header'
  }

  > footer {
    grid-area: 'footer'
  }
}

</style>
