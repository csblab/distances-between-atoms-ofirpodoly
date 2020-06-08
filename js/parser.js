// Module to store parsing/reading code

// Downloads data from a website.
// Request is asynchronous: browser keeps waiting until all data is fetched
// and then it triggers the callback function
function downloadMolecule(code) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //
        // callback function here
        //
    }
  };
  let url = "https://files.rcsb.org/view/" + code + ".pdb";
  xhttp.open("GET", url, true);
  xhttp.send();
}
