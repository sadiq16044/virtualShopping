"use strict";

const sdkKey = "6770dzywysk412bf3rtwugs2c"
const modelSid = "mL9bDqKU1Qc";
const params = `m=${modelSid}&hr=0&play=1&qs=1&log=0&applicationKey=${sdkKey}`;

var iframe = document.getElementById('showcase');


document.addEventListener("DOMContentLoaded", () => {
    iframe.setAttribute('src', `/bundle/showcase.html?${params}`);
    iframe.addEventListener('load', () => showcaseLoader(iframe));
});

async function showcaseLoader(iframe) {
    try{
        iframe.contentWindow.MP_SDK.connect(iframe, sdkKey, '3.10')
            .then(loadedShowcaseHandler)
            .catch(e);
        console.log("Hello World");
        console.log(mpSdk);
            
    } catch(e){
        console.error(
            "An error occured"
        );  
    }
}

async function loadedShowcaseHandler(mpSdk){
    console.log("Fulllyyyy LOaded")

    const tag_id = await mpSdk.Mattertag.add(
        {label: 'Test Tag',
        description: 'A cute little vacuum cleaner!',
        anchorPosition: { x: 1.39, y: 2.00, z: -0.122 },
        stemVector: { x: 0, y: 0, z: 0 }
    }

    )
    .then(function(mattertagId) {
        console.log(mattertagId);
        // ...
    })
    .catch(function(error) {
        console.log(error);
        // ...
    });
var clicked =0;
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

  <script> 
    var btn1 = document.getElementById("btn1"); 
    const output = document.getElementById("output");
    
    let clicks = 0;

    btn1.addEventListener("click", function () {
      btn1.innerHTML = \`Added to cart\`;
      window.send("button2Click", 2); 
    }); 
  </script>`;
  mpSdk.Mattertag.injectHTML("8FC1KIrOhgO", sadiqHTML,{
    
}
    ).then(function (messenger) {
        messenger.on("button1Click", function (buttonId) {
            const cartitems = document.getElementById("cart");
            
          console.log('clicked button1 with id:', buttonId);
          ++clicked;
          cartitems.innerHTML =`${clicked}`
          console.log("Total Clicks is ${clicked}",clicked);
        });
      });

      mpSdk.Mattertag.injectHTML("iKftApetBLk", laptopHTML,{
    
    }
        ).then(function (messenger) {
            messenger.on("button2Click", function (buttonId) {
                const cartitems = document.getElementById("cart");
                
              console.log('clicked button2 with id:', buttonId);
              ++clicked;
              cartitems.innerHTML =`${clicked}`
              console.log("Total Clicks is ${clicked}",clicked);
            });
          });

    mpSdk.on(mpSdk.Mattertag.Event.CLICK,
        function (tagSid) {
            console.log("MatterTag Label is");
            console.log(mpSdk.Mattertag.data[0])
            console.log('Mattertag ' + tagSid + ' was selected');
            // mpSdk.Mattertag.editBillboard("iKftApetBLk" , {
            //     label: 'This is a new title',
            //     description: 'This image was set dynamically by the Showcase sdk',
            //     media:{
            //         type: mpSdk.Mattertag.MediaType.VIDEO,
            //         src: 'https://www.youtube.com/watch?v=9tFJa_POIi0',
            //     },
            //   });
        }
    );
    
   
    // ...
}
function successCallback(message) { console.log("Message message"); }

function errorCallback(error) { console.error(error); }
