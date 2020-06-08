# Distance between Atoms
In this assignment, you will write code to calculate distances between atoms
in a molecular structure and produce a connectivity matrix M.

The matrix M is square, with dimensions NxN (rows, columns), where N is the
number of atoms in the molecule. Each cell of the matrix represents the 
connectivity between two atoms, i and j, which can either be 1 (connected) or
0 (not connected).

Your code should take as an input a URL to a molecular structure in PDB format.

In terms of organization, write your code in three separate modules:
- `js/parser.js` should have a function to read the molecular data.
- `js/distance.js` should have code to calculate distances between atoms.
- `js/connectivity.js` should define the matrix M from the coordinates.


