# Problem 1
## Build a Table

We built plaintext tables in Chapter 6. HTML makes laying out tables quite a bit easier. An HTML table is built with the following tag structure:

```html
<table>
  <tr>
    <th>name</th>
    <th>height</th>
    <th>country</th>
  </tr>
  <tr>
    <td>Kilimanjaro</td>
    <td>5895</td>
    <td>Tanzania</td>
  </tr>
</table>
```

For each *row*, the ```<table>``` tag contains a ```<tr>``` tag. Inside of these ```<tr>``` tags, we can put cell elements: either heading cells (```<th>```) or regular cells (```<td>```).

The same source data that was used in Chapter 6 is again available in the MOUNTAINS variable in the sandbox. It can also be downloaded from the website.

Write a function ```buildTable``` that, given an array of objects that all have the same set of properties, builds up a DOM structure representing a table. The table should have a header row with the property names wrapped in ```<th>``` elements and should have one subsequent row per object in the array, with its property values in ```<td>``` elements.

The ```Object.keys``` function, which returns an array containing the property names that an object has, will probably be helpful here.

Once you have the basics working, right-align cells containing numbers by setting their ```style.textAlign``` property to ```"right"```.

```html
<style>
  /* Defines a cleaner look for tables */
  table  { border-collapse: collapse; }
  td, th { border: 1px solid black; padding: 3px 8px; }
  th     { text-align: left; }
</style>

<script>
  function buildTable(data) {
    // Your code here.
  }

  document.body.appendChild(buildTable(MOUNTAINS));
</script>
```


# Problem 2
## Elements by Tag Nmae

The ```getElementsByTagName``` method returns all child elements with a given tag name. Implement your own version of it as a regular nonmethod function that takes a node and a string (the tag name) as arguments and returns an array containing all descendant element nodes with the given tag name.

To find the tag name of an element, use its ```tagName``` property. But note that this will return the tag name in all uppercase. Use the ```toLowerCase``` or ```toUpperCase``` string method to compensate for this.

```html
<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>

<script>
  function byTagName(node, tagName) {
    // Your code here.
  }

  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  var para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>
```

# Problem 3
## The Cat's Hat

Extend the cat animation defined earlier so that both the cat and his hat (```<img src="img/hat.png">```) orbit at opposite sides of the ellipse.

Or make the hat circle around the cat. Or alter the animation in some other interesting way.

To make positioning multiple objects easier, it is probably a good idea to switch to absolute positioning. This means that ```top``` and ```left``` are counted relative to the top left of the document. To avoid using negative coordinates, you can simply add a fixed number of pixels to the position values.

```html
<img src="img/cat.png" id="cat" style="position: absolute">
<img src="img/hat.png" id="hat" style="position: absolute">

<script>
  var cat = document.querySelector("#cat");
  var hat = document.querySelector("#hat");
  // Your code here.
</script>
```
