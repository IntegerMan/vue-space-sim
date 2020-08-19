# vue-space-sim

By Matt Eland (@IntegerMan)

## Description

This project is a hobby project attempting to create some form of a light science fiction game in Vue.js

## Tasks

### Situation Display

-   [x] Render Grid Lines
-   [x] Render a Ship Component
-   [x] Render a Hostile Component
-   [x] Render Ship Components Based on Data
-   [x] Indicate Heading on Ship Components
-   [x] Indicate Name or Designation Under Ship Components
-   [x] Render icons based on the ship type
-   [ ] Render sensor range
-   [ ] Render weapon range
-   [ ] Render past positioning
-   [ ] Render predicted future position
-   [x] Render desired heading
-   [x] Render desired throttle
-   [x] Render current throttle as a magnitude
-   [ ] Render asteroids
-   [ ] Render nebulae
-   [ ] Render stations
-   [x] Render nav markers
-   [x] Render jump points
-   [x] Grid lines should be relative to the system, not the player
-   [x] Allow different views to have different zoom settings
-   [ ] Zoom in and out of the map
-   [x] Center zoomed views on the player's ship
-   [x] Option to not center on the player

### Simulation

-   [x] Add a playback speed component
-   [x] When not paused, the playback speed component should periodically cause the simulation to advance
-   [x] Simulating should cause ships to move around
-   [ ] AI Ships should flee from projectiles when appropriate
-   [ ] AI Ships should pursue prey when appropriate
-   [/] AI Ships should navigate towards their nav point when not in combat

### Combat

-   [ ] Allow the player to fire weapons
-   [ ] Allow the player to toggle weapon auto-fire
-   [ ] Allow the player to set a target
-   [ ] Allow the player to toggle auto-targeting

### Sensors

-   [ ] Allow the player to select a contact
-   [ ] Display details on contact
-   [ ] Allow the player to categorize the contact
-   [ ] Allow the player to see known categorizations of other vessels
-   [ ] Allow the player to see ship's current sensor emissions

### Flight Ops

-   [ ] Allow managing available launch slots
-   [ ] Track individual ships in the system by their status
-   [ ] Create flight tasks and assign them to individual vessels
-   [ ] Alter orders of existing flights

### Engineering

-   [ ] Display ship systems
-   [ ] Allow viewing and setting power levels
-   [ ] Allow prioritizing damage control activities

### Navigation

-   [ ] Allow the player to initiate a jump
-   [x] Allow the player to set a heading
-   [x] Allow the player to set a velocity
-   [x] Simulation causes the ship to move
-   [x] Ship has turning radius and will move towards set heading
-   [x] Ship has acceleration / deceleration speed and will move towards set speed

### Collaboration

-   [ ] Introduce a Web API
-   [ ] Recreate simulation logic in F#
-   [ ] Add in SignalR Communications
-   [ ] Allow multiple instances on one machine

## Factions

### The Expedition

Established first outpost for scientific survey. Interested in westward expansion.

Favors a capital ship mentality with high end ships that are highly modular and make their presence known.

### The Expanse

The old world expanding into the new. Directly opposed with The Expedition, and in favor of raw resource exploitation of the new world.

### Refuge

A gathering of military forces who have formed their own state and just want isolation. Hyper-focused on military discipline and technology while becoming self-sufficient.

Favors an active defense strategy with rigorous patrols and active sensors and layers of defense.

Military technology is built around expendable munitions.

## Training Missions

## Mission 1: Helm Training

## Mission 2: Combat

## Mission 3: Navigation & Sensors

## Mission 4: Flight Operations

## Mission 5: Engineering

## Mission 6: End-to-end Training

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
