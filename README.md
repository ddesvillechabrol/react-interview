# Mobeye React Interview

Create a webapp stocking a retail store database of french videogames banner [Micromania](http://www.micromania.fr/magasins.html).
This webapp has to display all those stores in a map (usable with Chrome) and where user/visitor can select a bulk of stores directly in the map, then being able to download that selection as a CSV file.

- Recommended libraries (already in `package.json`)
   - [leaflet](https://leafletjs.com/examples/quick-start/)
   - [react-leaflet](https://react-leaflet.js.org/)

## Challenge:

 1. Use static store data from `fixtures/micromania.json` to display them on the map.
 2. Make them selectable to populate the `List` component which displays the selected stores.
 3. Make the list of selected stores exportable as a CSV file.
 4. **[Bonus]** Build a scrapper able to retrieve the micromania store list from the web. Preferred languages: Python, JS.
    - First method: scrap a static list of stores and add it in fixtures.
    - Second method (harder): The scrap is triggered when the client displays the web page and dynamically populates the state of the webapp.
 5. **[Bonus]** Plug a redux store to the application.

## Expectations

The main expectation is a functional application, design is up to you. Clean code and readability will be evaluated.



---

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).