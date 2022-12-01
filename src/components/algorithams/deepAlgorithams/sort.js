import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import Sort1 from '../../../assets/sort_1.png';
import Sort2 from '../../../assets/sort_2.png';
import Insertion from '../../../assets/insertion_sort.png';
import Selection from '../../../assets/selection_short.png';
import Bubble from '../../../assets/bubble_short.png';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 500,
}

const styles = theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: "center"
  }
})


const SortAlgo = `function quick_Sort(origArray) {
	if (origArray.length <= 1) { 
		return origArray;
	} else {

		var left = [];
		var right = [];
		var newArray = [];
		var pivot = origArray.pop();
		var length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i] <= pivot) {
				left.push(origArray[i]);
			} else {
				right.push(origArray[i]);
			}
		}

		return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
	}
}

var myArray = [3, 0, 2, 5, -1, 4, 1 ];

console.log("Original array: " + myArray);
var sortedArray = quick_Sort(myArray);
console.log("Sorted array: " + sortedArray);`.trim()

const mergeSort = `
function merge_sort(left_part,right_part) 
{
	var i = 0;
	var j = 0;
	var results = [];

	while (i < left_part.length || j < right_part.length) {
		if (i === left_part.length) {
			results.push(right_part[j]);
			j++;
		} 
      else if (j === right_part.length || left_part[i] <= right_part[j]) {
			results.push(left_part[i]);
			i++;
		} else {
			results.push(right_part[j]);
			j++;
		}
	}
	return results;
}

console.log(merge_sort([1,3,4], [3,7,9]));`.trim()

const heapSort = `
var array_length;
/* to create MAX  array */  
function heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max])     {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}

function heapSort(input) {
    
    array_length = input.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        heap_root(input, i);
      }

    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        array_length--;
      
      
        heap_root(input, 0);
    }
}

var arr = [3, 0, 2, 5, -1, 4, 1];
heapSort(arr);
console.log(arr);`.trim()

const insertion = `
const insertion_Sort = (nums) => {
  for (let i = 1; i < nums.length; i++) {
    let j = i - 1
    let temp = nums[i]
    while (j >= 0 && nums[j] > temp) {
      nums[j + 1] = nums[j]
      j--
    }
    nums[j+1] = temp
  }
  return nums
}
console.log(insertion_Sort([3, 0, 2, 5, -1, 4, 1]));
console.log(insertion_Sort([2,6,5,12,-1,3,8,7,1,-4,0,23,1,-55,20,37,54,210,-23]));`.trim()

const selectionSort = `
function Selection_Sort(arr, compare_Function) {

  function compare(a, b) {
   return a - b;
   } 
  var min = 0;
  var index = 0;
  var temp = 0;

 //{Function} compare_Function Compare function
  compare_Function = compare_Function || compare;

  for (var i = 0; i < arr.length; i += 1) {
    index = i;
    min = arr[i];

    for (var j = i + 1; j < arr.length; j += 1) {
      if (compare_Function(min, arr[j]) > 0) {
        min = arr[j];
        index = j;
      }
    }

    temp = arr[i];
    arr[i] = min;
    arr[index] = temp;
  }

  //return sorted arr
  return arr;
}

console.log(Selection_Sort([3, 0, 2, 5, -1, 4, 1], function(a, b) { return a - b; })); 
console.log(Selection_Sort([3, 0, 2, 5, -1, 4, 1], function(a, b) { return b - a; }));`.trim()

const bubbleSort = `
function swap(arr, first_Index, second_Index){
  var temp = arr[first_Index];
  arr[first_Index] = arr[second_Index];
  arr[second_Index] = temp;
}

function bubble_Sort(arr){

  var len = arr.length,
      i, j, stop;

  for (i=0; i < len; i++){
      for (j=0, stop=len-i; j < stop; j++){
          if (arr[j] > arr[j+1]){
              swap(arr, j, j+1);
          }
      }
  }

  return arr;
}
console.log(bubble_Sort([3, 0, 2, 5, -1, 4, 1]));`.trim()



class Sort extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4><Sidebar /></h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>Write a JavaScript program to sort a list of elements using Quick sort.</h3>
              <i>Quick sort is a comparison sort, meaning that it can sort items of any type for
                which a "less-than" relation is defined.</i>
              <br />
              <img src={Sort1} alt="" className="responsive" style={redesign} />
              <img src={Sort2} alt="" className="responsive" style={redesign} />
              <br />
              <div style={titles}>
                <PrismCode
                  code={SortAlgo}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h2>Write a JavaScript program to sort a list of elements using Merge sort.</h2>
              <i>Merge sort is an O (n log n) comparison-based sorting algorithm.
                <br />
                Divide the unsorted list into n sublists, each containing 1 element.
                <br />
                Repeatedly merge sublists to produce new sorted sublists until there is only 1 sublist
                remaining. This will be the sorted list
              </i>
              <div style={titles}>
                <PrismCode
                  code={mergeSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>Write a JavaScript program to sort a list of elements using Heap sort.</h3>
              Worst-case O(n log n) runtime
              <div style={titles}>
                <PrismCode
                  code={heapSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>Write a JavaScript program to sort a list of elements using Insertion sort.</h3>
              <div style={titles}>
                <img src={Insertion} alt="" className="responsive" />
                <PrismCode
                  code={insertion}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>Write a JavaScript program to sort a list of elements using the Selection sort.</h3>
              <i>The selection sort improves on the bubble sort by making only one exchange for
                every pass through the list</i>
              <div style={titles}>
                <img src={Selection} alt="" className="responsive" style={redesign} />
                <PrismCode
                  code={selectionSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>Write a JavaScript program to sort a list of elements using Bubble sort.</h3>
              <i>It is a simple sorting algorithm that repeatedly steps through the list to be sorted,
                compares each pair of adjacent items and swaps them if they are in the wrong order</i>
              <div style={titles}>
                <img src={Bubble} alt="" className="responsive" />
                <PrismCode
                  code={bubbleSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Sort));
