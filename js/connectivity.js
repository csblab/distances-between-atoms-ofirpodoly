// should define the matrix M from the coordinates.


function euclideanDistance(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) + (z1-z2)*(z1-z2))
}


export function createMatrix(xyzCoordinates, distanceParamater) {

  let matrix = [];

  for (let i=0; i < xyzCoordinates.length; i++) {
    let atomRow = [];
    for (let j=0; j < xyzCoordinates.length; j++) {
       let distance_ij = euclideanDistance(xyzCoordinates[i][0], xyzCoordinates[i][1], xyzCoordinates[i][2], xyzCoordinates[j][0], xyzCoordinates[j][1], xyzCoordinates[j][2])
        if (distance_ij <= distanceParamater) {
          atomRow.push(1)
        }

        else {
          atomRow.push(0)
        }
     // console.log("i=", i, "j=", j, "dist=", distance_ij);
     
    }
    matrix.push(atomRow);
  }
return matrix
}

