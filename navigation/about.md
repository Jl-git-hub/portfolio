---
layout: post
title: About
permalink: /about/
comments: true
---

## As a conversation Starter

Here are some places I have been to.

<comment>
Flags are made using Wikipedia images
</comment>

<style>
    /* Style looks pretty compact, 
       - grid-container and grid-item are referenced the code 
    */
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Dynamic columns */
        gap: 10px;
    }
    .grid-item {
        text-align: center;
    }
    .grid-item img {
        width: 100%;
        height: 100px; /* Fixed height for uniformity */
        object-fit: contain; /* Ensure the image fits within the fixed height */
    }
    .grid-item p {
        margin: 5px 0; /* Add some margin for spacing */
    }

    .image-gallery {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        gap: 10px;
        }

    .image-gallery img {
        max-height: 150px;
        object-fit: cover;
        border-radius: 5px;
    }
</style>

<!-- This grid_container class is used by CSS styling and the id is used by JavaScript connection -->
<div class="grid-container" id="grid_container">
    <!-- content will be added here by JavaScript -->
</div>

<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    var container = document.getElementById("grid_container"); // This container connects to the HTML div

    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    var http_source = "";
    var living_in_the_world = [
        {"flag": "https://t4.ftcdn.net/jpg/01/98/41/75/360_F_198417518_i3lLEPoFOEYtAWGeHtoFjRZWesAKruWP.jpg", "greeting": "Buenos días", "description": "Mexico - 57 years"},
        {"flag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjyEo1aHuh8Nw_OXNZObUY8kyVt7LSxkU4x8dRbO7FNmbgjB87Y74_XKQ&s=10", "greeting": "Hi", "description": "Canada - 61 years"},
        {"flag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOw4awcwSpqaa_raZWZ8Cg8q98wjJkFfukfVgq1xXqblNUE_J6zFc4aw&s=10", "greeting": "你好", "description": "China - 76 years"},
        {"flag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI-VPq0nr0RwOeTFjH2a4x-PFXWTt4cNkR_eHRb-F_Y49sxo1cuagM_RA&s=10", "greeting": "¡Asere, qué bolá", "description": "Cuba - 124 years"},
    ];

    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax

    // 3b. Build grid items inside of our container for each row of data
    for (const location of living_in_the_world) {
        // Create a "div" with "class grid-item" for each row
        var gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements
        // Add "img" HTML tag for the flag
        var img = document.createElement("img");
        img.src = http_source + location.flag; // concatenate the source and flag
        img.alt = location.flag + " Flag"; // add alt text for accessibility

        // Add "p" HTML tag for the description
        var description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Add "p" HTML tag for the greeting
        var greeting = document.createElement("p");
        greeting.textContent = location.greeting;  // extract the greeting

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(img);
        gridItem.appendChild(description);
        gridItem.appendChild(greeting);

        // Append the grid item DIV to the container DIV
        container.appendChild(gridItem);
    }
</script>

### Journey through Life

Here is what I did at those places

- I lived in Canada for 11 years and went to preschool and k-4th grade there at a charter school
- I went to China when I was around 6 to visit relatives
I went to Cuba and Mexico for vacations

### Culture, Family, and Fun

Everything for me, as for many others, revolves around family and faith.

- I'm half chinese and half Canto (also technically in China) 
- I've been going to church since I could walk and my family is quite active in our current church. I help with vbs and the little kids ministry every year
- For sports, I play badminton and I race karts. Hopefully I'll go to worlds this year.

<comment>
Gallery of Pics, scroll to the right for more ...
</comment>
<div class="image-gallery">
  <img src="{{site.baseurl}}/images/about/missionary.jpg" alt="Image 1">
  <img src="{{site.baseurl}}/images/about/john_tamara.jpg" alt="Image 2">
  <img src="{{site.baseurl}}/images/about/tamara_fam.jpg" alt="Image 3">
  <img src="{{site.baseurl}}/images/about/surf.jpg" alt="Image 4">
  <img src="{{site.baseurl}}/images/about/john_lora.jpg" alt="Image 5">
  <img src="{{site.baseurl}}/images/about/lora_fam.jpg" alt="Image 6">
  <img src="{{site.baseurl}}/images/about/lora_fam2.jpg" alt="Image 7">
  <img src="{{site.baseurl}}/images/about/pj_party.jpg" alt="Image 8">
  <img src="{{site.baseurl}}/images/about/trent_family.png" alt="Image 9">
  <img src="{{site.baseurl}}/images/about/claire.jpg" alt="Image 10">
  <img src="{{site.baseurl}}/images/about/grandkids.jpg" alt="Image 11">
  <img src="{{site.baseurl}}/images/about/farm.jpg" alt="Image 12">
</div>
