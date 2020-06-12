// // Module to store parsing/reading code


function displayOnPage(content) {
    let resultField = document.getElementById("result");
    resultField.innerText = content;
}

function downloadMolecule(code) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // callback function here
        let result = getAtomCoordinates(this.responseText);
        let infoResult = getAtomInfo(this.responseText);
        displayOnPage(result + "\n" + "\n" + infoResult);
        // displayOnPage("hello Ofir")
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

function getAtomCoordinates(pdbfile) {
  let array = pdbfile.split("\n");
  let tempArray = [];
  let xyzCoordinates = [[],[]];
  for (let counter=0; counter <= array.length; counter += 1) {
    if (typeof(array[counter]) != "undefined" 
    && array[counter].startsWith("ATOM") && !Number.isNaN(array[counter])) {
      tempArray.push(array[counter].slice(30, 38))
      tempArray.push(array[counter].slice(38, 46))
      tempArray.push(array[counter].slice(46, 54))
      xyzCoordinates.push(tempArray)
      // console.log(tempArray)
      tempArray = []
    }
  }
  return xyzCoordinates
}


function getAtomInfo(pdbfile) {
 
  let array = pdbfile.split("\n");
  var atom = {name: null, chain: null, resNum: null, resName: null}
  let finalAtomInfo = []
  
  for (let counter=0; counter <= array.length; counter += 1) {
    if (typeof(array[counter]) != "undefined" 
    && array[counter].startsWith("ATOM") && !Number.isNaN(array[counter])) {
      atom.name = array[counter].slice(13, 16)
      atom.chain = array[counter].slice(21, 23)
      atom.resNum = array[counter].slice(23, 26)
      atom.resName = array[counter].slice(18, 20)
      let polishedInfo = Object.values(atom)
      // console.log(polishedInfo)
      finalAtomInfo.push(polishedInfo);
      atom = {name: null, chain: null, resNum: null, resName: null}
    }
  }
  
  return finalAtomInfo
}













// for (let i = 0; i<= finalAtomInfo.length; i++) {
  //   if (typeof(finalAtomInfo[i]) != "undefined") {



  //     console.log(Object.values(finalAtomInfo[i]))
  //     // console.log(finalAtomInfo[i].name)
  // console.log(finalAtomInfo[i].chain)
  // console.log(finalAtomInfo[i].resNum)
  // console.log(finalAtomInfo[i].resName)
  //   }

  // }