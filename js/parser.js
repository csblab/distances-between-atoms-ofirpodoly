// // Module to store parsing/reading code


function displayOnPage(content) {
    let resultField = document.getElementById("result");
    resultField.innerText = content;
}

function downloadMolecule(code) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let result = getAtomInformation(this.responseText);
        // let infoResult = getAtomInfo(this.responseText);
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

function getAtomInformation(pdbfile) {
  let array = pdbfile.split("\n");
  let xyzCoordinates = [];
  

  var atom = {name: null, chain: null, resNum: null, resName: null}
  let finalAtomInfo = []

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
  function euclideanDistance(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) + (z1-z2)*(z1-z2))
}


function createMatrix(distanceParamater) {

  let matrix = [];

  for (i=0; i < xyzCoordinates.length; i++) {
    for (j=0; j < xyzCoordinates.length; j++) {
       distance_ij = euclideanDistance(xyzCoordinates[i][0], xyzCoordinates[i][1], xyzCoordinates[i][2], xyzCoordinates[j][0], xyzCoordinates[j][1], xyzCoordinates[j][2])
        if (distance_ij < distanceParamater) {
          matrix[i][j] = 1
        }

        else {
          matrix[i][j] = 0
        }
     // console.log("i=", i, "j=", j, "dist=", distance_ij);
     
    }
  }
return matrix
}


  
  return xyzCoordinates + finalAtomInfo + createMatrix(10)
}