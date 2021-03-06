// Module to store parsing/reading code
import { createMatrix } from './connectivity.js';

function displayOnPage(content) {
    let resultField = document.getElementById("result");
    resultField.innerText = content;
}

function downloadMolecule(code, distanceThreshold) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        let result = combineElements(this.responseText, distanceThreshold);
        
        displayOnPage(result);
        
    }
  };

  let url = "https://files.rcsb.org/view/" + code + ".pdb";
  xhttp.open("GET", url, true);
  xhttp.send();
}

function run() {
    let inputbox = document.getElementById("input-text");
    let pdbcode = inputbox.value;
     let inputbox1 =  document.getElementById("distance-input");
  let distanceThreshold = inputbox1.value;
    downloadMolecule(pdbcode, distanceThreshold);
    
    
    //this is the code that takes the input from the box for distance parameter

   

}
  
  console.log("hello");


window.run = run;
// console.log("abcdfg");




function getAtomInformation(pdbfile) {
  let array = pdbfile.split("\n");
  let xyzCoordinates = [];
  

  var atom = {name: null, chain: null, resNum: null, resName: null}
  let finalAtomInfo = [];

  for (let counter=0; counter < array.length; counter += 1) {

    if (array[counter].startsWith("ATOM")) {
      let xCoordinate = Number(array[counter].slice(30, 38))
      
      let yCoordinate = Number(array[counter].slice(38, 46))
      
      let zCoordinate = Number(array[counter].slice(46, 54))
      
      atom.name = array[counter].slice(12, 16)
      atom.chain = array[counter].slice(21, 22)
      atom.resNum = array[counter].slice(22, 26)
      atom.resName = array[counter].slice(17, 20)

      finalAtomInfo.push(atom)
      
      atom = {name: null, chain: null, resNum: null, resName: null}


      if (!Number.isNaN(xCoordinate) && !Number.isNaN(yCoordinate) && !Number.isNaN(zCoordinate)) {
        xyzCoordinates.push([xCoordinate, yCoordinate, zCoordinate])
        
      }
      else {
        console.log("line " + counter + " does not contain coordinates")
      }
    }
  }


  
  return [xyzCoordinates, finalAtomInfo]
}



function combineElements (pdbInfo, distanceThreshold) {

  let infoList = getAtomInformation(pdbInfo);
  let cords = infoList[0];
  let atomDist = createMatrix(cords, distanceThreshold);
  
  let information = infoList[1];
  let finalData = [];
  let temporary = [];

  for (let i=0; i < information.length; i++) {
    temporary.push(information[i]);
    temporary.push(cords[i]);
    let onesNum = countOnes(atomDist[i]);
    temporary.push(onesNum);
    finalData.push(temporary);
    temporary = []
  }
  return finalData
}

function countOnes (array) {
  let sumOfOnes = 0;
  for (let i = 0; i < array.length; i++) {

    if (array[i] == 1) {
      sumOfOnes += 1
    }
  }
  return sumOfOnes
}

