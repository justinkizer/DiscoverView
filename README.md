# **DiscoverView**

A mobile application built on React Native which accesses the Instagram API to display public photos that were taken near the current location of the user. This will give users a general overview of popular places to visit in the area as well as potential inspiration for photos.

## Minimum Viable Product and Functionality

 - Receives a user’s current location
 - Displays photos with location coordinates near user (ideally pulled from Instagram API)
 - Displays photo locations as pins on a google map (use google maps API here)
 - Built with React Native
 - Live demo web page
 - Live app-emulator web page

## Wireframes

![wireframes](docs/wireframes/Screens.png)

## Technologies and Technical Challenges

This app will be implemented using React Native, which will include Javascript, HTML, and CSS.

We will be dealing with primarily two external APIs -- Instagram and Google Maps. We will need to determine a user’s current location and pass those coordinates as a GET request from Instagram to GET all recent media from near that location. In order to use the Instagram API (even for finding public photos) a user will need to authenticate their Instagram account, so we will need to implement OAuth 2.0.

If this proves too difficult or not practical, we will use alternative photo service APIs (Panoramio and Flickr) to fetch photos.

## Group members and Work Breakdown

We are a two person group -- Justin Kizer and James Stack.

Justin’s primary responsibilities will be:
 - Researching and setting up React Native
 - Creating iOS/React Native screens
 - Implementing OAuth 2.0.

James’ primary responsibilities will be:
 - Learning the Instagram API (or other photo service APIs if necessary)
 - Learning the GoogleMaps API
 - Creating a function to use coordinates from photos received on Instagram to drop pins on a Google Map

## Implementation Timeline
Day 1:

- Justin: Begin React Native skeleton
- James: Gain familiarity with Instagram API and determine if we’ll need additional photo site APIs

Day 2:

- Justin: Finish React Native skeleton
- James: Get a handle on Google Maps API and how we can integrate it with Instagram API

Day 3 and Day 4:

- Justin: Ensure that the user has a current location
- Justin: Create the Live Demo webpage
- James: Ensure that photos display from near current location

Day 5 and Day 6:

- Justin: Style React Native App
- James: Ensure photo locations can be displayed on a map
- James: Create app-emulator web page
