import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

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

const reading = `
import csv

filename = "aapl.csv"

fields = []                                                       # initializing the titles and rows list
rows = []

with open(filename, 'r') as csvfile:                              # reading csv file
    csvreader = csv.reader(csvfile)                               # creating a csv reader object
    fields = next(csvreader)                                      # extracting field names through first row
    
    for row in csvreader:                                         # extracting each data row one by one
        rows.append(row)

    print("Total no. of rows: %d" % (csvreader.line_num))         # get total number of rows


print('Field names are:' + ', '.join(field for field in fields))                          

print('First 5 rows are:')
for row in rows[:5]:
    for col in row:                                                                     # parsing each column of a row
        print("%10s" % col),
`.trim();

const writing = `
import csv


fields = ['Name', 'Branch', 'Year', 'CGPA']                            

rows = [['Nikhil', 'COE', '2', '9.0'],                                  # data rows of csv file
        ['Sanchit', 'COE', '2', '9.1'],
        ['Aditya', 'IT', '2', '9.3'],
        ['Sagar', 'SE', '1', '9.5'],
        ['Prateek', 'MCE', '3', '7.8'],
        ['Sahil', 'EP', '2', '9.1']]

filename = "university_records.csv"                                     # name of csv file

with open(filename, 'w') as csvfile:                                    
    csvwriter = csv.writer(csvfile)                                     # creating a csv writer object
    csvwriter.writerow(fields)                                          # writing the fields
    csvwriter.writerows(rows)                                           # writing the data rows
    `.trim();

const dictionary = `
import csv


mydict = [{'branch': 'COE', 'cgpa': '9.0', 'name': 'Nikhil', 'year': '2'},        # my data rows as dictionary objects
          {'branch': 'COE', 'cgpa': '9.1', 'name': 'Sanchit', 'year': '2'},
          {'branch': 'IT', 'cgpa': '9.3', 'name': 'Aditya', 'year': '2'},
          {'branch': 'SE', 'cgpa': '9.5', 'name': 'Sagar', 'year': '1'},
          {'branch': 'MCE', 'cgpa': '7.8', 'name': 'Prateek', 'year': '3'},
          {'branch': 'EP', 'cgpa': '9.1', 'name': 'Sahil', 'year': '2'}]

fields = ['name', 'branch', 'year', 'cgpa']

filename = "university_records.csv"

with open(filename, 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fields)
    writer.writeheader()                                                            # writing headers (field names)
    writer.writerows(mydict)                                                        # writing data rows
    `.trim();

const searchings = `
    def binary_search(arr, low, high, x):
        if high >= low:                                                                    
            mid = (high + low) // 2
            
            if arr[mid] == x:                                                # If element is present at the middle itself
                return mid
            elif arr[mid] > x:
                return binary_search(arr, low, mid - 1, x)
            else:
                return binary_search(arr, mid + 1, high, x)
        else:                                                                       # Element is not present in the array
            return -1
    
            
    # Test array
    arr = [ 2, 3, 4, 10, 40 ]
    x = 10
    
    result = binary_search(arr, 0, len(arr)-1, x)
    if result != -1:
        print("Element is present at index", str(result))
    else:
        print("Element is not present in array") `.trim();

const quickSort = `
    def partition(arr,low,high):
        i = ( low-1 )                                                                         # index of smaller element
        pivot = arr[high]                                                                     # pivot
    
        for j in range(low , high):
            if   arr[j] <= pivot:
                i = i+1
                arr[i],arr[j] = arr[j],arr[i]
    
        arr[i+1],arr[high] = arr[high],arr[i+1]
        return ( i+1 )
    
    
    def quickSort(arr,low,high):                                  # Function to do Quick sort.
        if low < high:
            pi = partition(arr,low,high)                          # pi is partitioning index, arr[p] is now at right place
                                                            # Separately sort elements before partition and after partition
            quickSort(arr, low, pi-1)
            quickSort(arr, pi+1, high)
    
    arr = [10, 7, 8, 9, 1, 5]
    n = len(arr)
    quickSort(arr,0,n-1)
    print ("Sorted array is:")
    for i in range(n):
        print ("%d" %arr[i]), `.trim();

class CsvPython extends Component {
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
              <h3>1. Reading a CSV file</h3>
              <div style={titles}>
                <PrismCode
                  code={reading}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Writing to a CSV file</h3>
              <div style={titles}>
                <PrismCode
                  code={writing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Writing a dictionary to a CSV file</h3>
              <div style={titles}>
                <PrismCode
                  code={dictionary}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Searching</h3>
              <div style={titles}>
                <PrismCode
                  code={searchings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>QuickSort</h3>
              <b>The main function that implements QuickSort </b>
              <ul>
                <li><b>arr[] :</b>Array to be sorted.</li>
                <li><b>low :</b>Starting index.</li>
                <li><b>high :</b>Ending index.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={quickSort}
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

export default (withStyles(styles)(CsvPython));
