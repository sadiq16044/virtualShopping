"use strict";

const sdkKey = "6770dzywysk412bf3rtwugs2c"
// const modelSid = "mL9bDqKU1Qc";
const modelSid = "L6LxzEd8Dtx";
const params = `m=${modelSid}&hr=0&play=1&qs=1&log=0&applicationKey=${sdkKey}`;

var iframe = document.getElementById('showcase');


document.addEventListener("DOMContentLoaded", () => {
  iframe.setAttribute('src', `/bundle/showcase.html?${params}`);
  iframe.addEventListener('load', () => showcaseLoader(iframe));
});

async function showcaseLoader(iframe) {
  try {
    console.log("Inside showcaseLoader");
    iframe.contentWindow.MP_SDK.connect(iframe, sdkKey, '3.10')
      .then(loadedShowcaseHandler)
      .catch(e);
    // console.log(mpSdk);

  } catch (e) {
    console.error(
      "An error occurred"
    );
  }
}

async function hello() {
  console.log("triggered");
}

async function loadedShowcaseHandler(mpSdk) {
  console.log("Inside loadedShowcaseHandler");
  console.log("Fully Loaded")
  // console.log(mpSdk.Mattertag.data)

  let products;
  await $.ajax({ // asking for values
    method: 'POST',
    url: '/data-provider',
    dataType: 'json',
    data: {
      msg: "hi",
    }
  }).done(function (result) {
    products = result;
  });
  // console.log(products)


  mpSdk.Mattertag.data.subscribe({ // it will trigger when the tag added after 3D space loaded 
    onAdded: function (index, item, collection) {
      console.log('Tag added to the collection', index, item.label);

      let currentProduct;
      for (let i = 0; i < products.length; i++) {
        if (products[i].slug == item.label.toLowerCase()) {
          currentProduct = products[i];
        }
      }
      // console.log(currentProduct);

      let productName = item.label.toLowerCase();
      mpSdk.Mattertag.injectHTML(index, HtmlInject(index, currentProduct), {
      }).then(function (messenger) { // it will communicate with the injectHtml

        messenger.on(index, function (data) { // event occurs when the window.send is triggered
          console.log('data is ', data);
          addToCart(data);
        });
      });
      console.log('Tag added to the collection', index);
    },
    onRemoved: function (index, item, collection) {
      console.log('Tag removed from the collection', index, item, collection);
    },
    onUpdated: function (index, item, collection) {
      console.log('Tag updated in place in the collection', index, item, collection);
    }
  });

  // const tag_id = await mpSdk.Mattertag.add(
  //   {
  //     label: 'Test Tag',
  //     description: 'A cute little vacuum cleaner!',
  //     anchorPosition: { x: 1.39, y: 2.00, z: -0.122 },
  //     stemVector: { x: 0, y: 0, z: 0 },
  //     floorId: 0
  //   })
  // .then(function (mattertagId) {
  //   console.log('********************');
  //   console.log(mattertagId);
  //   // ...
  // })
  // .catch(function (error) {
  //   console.log(error);
  //   // ...
  // });
  // console.log(tag_id);
  // console.log('********************');

  var mattertagDesc = {
    label: 'Hello Mattertag',
    anchorPosition: { x: -0.9895009269530648, y: 0.8762161862606052, z: 0.9624178370593128 },
    stemVector: { x: 0, y: 0, z: 0 }
  };

  // mpSdk.Mattertag.add(mattertagDesc).then(function(mattertagId) {
  //   console.log("added matter port tag");
  //   console.log(mattertagId);
  //   // output: TODO
  // });

  // console.log('********************');
  var clicked = 0;
  var sadiqHTML = `
  <style> 
    button { 
      width: 100px; 
      height: 50px; 
    } 
    p {
        fontSize:20px;
        color: white;
    }
  </style> 
  <button id="btn1">Add to Cart</button> 
  <p id="output">No Clicks yet</p>

  <script> 
    var btn1 = document.getElementById("btn1"); 
    const output = document.getElementById("output");
    
    let clicks = 0;

    btn1.addEventListener("click", function () {
      btn1.innerHTML = \`Added to cart\`;
      window.send("button1Click", 1); 
    }); 
  </script>`;
  var laptopHTML = `
  <style> 
    button { 
      width: 100px; 
      height: 50px; 
    } 
    p {
        fontSize:20px;
        color: white;
    }
  </style> 
  <button id="btn1">Add to Cart</button> 
  <p id="output">No Clicks yet</p>

  <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
  <script> 
    var btn1 = document.getElementById("btn1"); 
    const output = document.getElementById("output");
    
    let clicks = 0;

    btn1.addEventListener("click", function () {
      btn1.innerHTML = \`Added to cart\`;
      window.send("addProduct", 2); 
    }); 
  </script>`;
  // mpSdk.Mattertag.injectHTML("8FC1KIrOhgO", sadiqHTML, {
  // }
  // ).then(function (messenger) {
  //   console.log('*********########**');
  //   console.log(messenger);
  //   console.log('********************');
  //   messenger.on("button1Click", function (buttonId) {
  //     const cartitems = document.getElementById("cart");

  //     console.log('clicked button1 with id:', buttonId);
  //     ++clicked;
  //     cartitems.innerHTML = `${clicked}`
  //     console.log("Total Clicks is ${clicked}", clicked);
  //   });
  // });

  // mpSdk.Mattertag.injectHTML("iKftApetBLk", laptopHTML, {

  // }
  // ).then(function (messenger) {
  //   messenger.on("addProduct", function (buttonId) {
  //     const cartitems = document.getElementById("cart");

  //     console.log('clicked button2 with id:', buttonId);
  //     ++clicked;
  //     cartitems.innerHTML = `${clicked}`
  //     console.log("Total Clicks is ${clicked}", clicked);
  //   });
  // });

  mpSdk.on(mpSdk.Mattertag.Event.CLICK,
    function (tagSid) {
      console.log("MatterTag is clicked ", tagSid);
    }
  );

  mpSdk.on(mpSdk.Mattertag.Event.HOVER,
    function (tagSid, item) {
      // console.log("MatterTag is Hover ", tagSid, item);
    }
  );

  // ...
}
function successCallback(message) { console.log("Message message"); }

function errorCallback(error) { console.error(error); }

function HtmlInject(tagSid, product) {
  return `
  <style> 
    button { 
      width: 100px; 
      height: 50px; 
    } 
    p {
        fontSize:20px;
        color: white;
    }
  </style> 
  <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
  <script>
  async function addCart(tagSid, product) {
    console.log("add this product to cart");
    window.send(tagSid, {
      tagSid: tagSid, 
      slug: product,
    });
  }
  </script>
  <div style="width: auto; height: auto; ">
    <img style="width: 100px; height: 100px;" src="/images/${product.slug}.png" alt="">
    <p style="width: auto; height: auto; font-size: 18px; left: 108px; top: 28px; position: absolute">${parseFloat(product.price).toFixed(2)} $</p>
    <button style="width: auto; height: 30px; top: 70px; position: absolute" id="${tagSid}" onclick="addCart(\'${tagSid}\',\'${product.slug}\')">Add to Cart</button>
  </div>
  `
}
// onclick="addCart(${tagSid})

async function addToCart(data) {
  console.log('inside addToCart')
  // console.log(data)


  $.ajax({ // asking for values
    method: 'GET',
    url: '/login/status/yes',
    dataType: 'json',
  }).then((result) => {
    if (result.status) {
      $.ajax({ // asking for values
        method: 'POST',
        url: '/cart/add',
        dataType: 'json',
        data: data
      }).then((result) => {
        if (result.newProduct) {
          console.log("Add in cart");
          console.log('Before: ' + $('#cart').text());
          let tempLength = parseInt($('#cart').text()) + 1;
          $('#cart').text(tempLength.toString());
          $('#cart-header').text(tempLength.toString());
          console.log('After: ' + $('#cart').text());
        } else {
          console.log("Don't add in cart");
        }

        snackBar("Added to cart", "green");
        $("#drawr").load(window.location.href + " #drawr");
      });
    } else {
      snackBar("Log in to add products", "red");
      $("#drawr").load(window.location.href + " #drawr");
    }
  });
}

function snackBar(msg, color) {
  let x = document.getElementById("snackbar");
  $("#snackbar").css("background-color", color);
  $("#snackbar").text(msg); // snackbar text
  // x.innerHTML = msg // snackbar text
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}