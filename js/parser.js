// Module to store parsing/reading code
import { createMatrix } from './connectivity.js';

function displayOnPage(content) {
    let resultField = document.getElementById("result");
    resultField.innerText = content;
}

function downloadMolecule(code) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // let result = getAtomInformation(this.responseText);
        // let distMatrix = createMatrix(result[0], d);
        // let finalEverything = [result, distMatrix]
        let result = combineElements();
        // displayOnPage(finalEverything);
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
    downloadMolecule(pdbcode);
    
    
    
    

}

//this is the code that takes the input from the box for distance parameter
let inputbox1 =  document.getElementById("distance-input");
let d = inputbox1.value;

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



function combineElements () {

  let infoList = getAtomInformation(this.responseText);
  let atomDist = createMatrix(cords, d);
  let cords = infoList[0];
  let information = infoList[1];
  let bigArray = [];
  let temporary = [];

  for (let i=0; i < information.length; i++) {
    temporary.push(information[i]);
    temporary.push(cords[i]);
    let onesNum = countOnes(atomDist[i]);
    temporary.push(onesNum);
    bigArray.push(temporary);
    temporary = []
  }
  return bigArray
}

function countOnes (array) {
  let sums = 0;
  for (let i = 0; i < array.length; i++) {

    if (array[i] == 1) {
      sums += 1
    }
  }
  return sums
}

