// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".

//figma.showUI(__html__);
figma.showUI(__html__, { height: 300 });

  //create the JSON of problematic words and why 
  var words = '{ "master" :"racist","peanut gallery":"racist","transvestite":"transphobic", "killing": "inappropriate"}'

  var wordData = JSON.parse(words);
  
  var badNodes = []; 
  var index = 0 ; 

  figma.ui.onmessage = msg => {
      //if the refresh button is clicked
      if (msg.type === "refresh") {
          //figma.showUI(ui2);
          badNodes = []; 
          const pg = figma.currentPage.selection;
          const bbies = figma.currentPage.findAll(node => node.type === "TEXT")
          for (const node of bbies) {
              var str = node.characters.toLowerCase();
              if (undefined != wordData[str]){
                  //console.log(wordData[str]);
                  badNodes.push(node);
              }
          }
          if( badNodes.length >0 )
            figma.ui.postMessage(badNodes[0].characters +"," +wordData[badNodes[0].characters]+"," + 1 +"," +(badNodes.length) );
          //console.log(badNodes);
      }
  
      //if the find next button is clicked 
      if (msg.type === "find-next") {
          if( index+1 < badNodes.length)
          {
              index +=1;
          }
          else 
            index =0;
        if(badNodes.length >0) 
          figma.ui.postMessage(badNodes[index].characters +"," +wordData[badNodes[index].characters] +"," +(index+1) +"," +(badNodes.length));
      }
  };