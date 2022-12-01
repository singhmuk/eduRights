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

const Series = `
a = [1, 7, 2]

myvar = pd.Series(a)
print(myvar)`.trim();

const dataFrames = `
data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}

df = pd.DataFrame(data)
df


df.loc[0]                                                                             #refer to the row index.
df = pd.DataFrame(data, index = ["day1", "day2", "day3"])                             #name your own indexes.
df.loc["day2"]                                                                        #refer to the named index:
`.trim();

const readJson = `
df = pd.read_json('data.json')

print(df.to_string()) 
`.trim();

const cleanData = `
df.dropna()                                                             //Remove rows that contain empty cells.
df.fillna(130, inplace = True)                                          //Replace NULL values with the number 130.
df["Calories"].fillna(130, inplace = True)                              //Replace Only For Specified Columns.

x = df["Calories"].mean()                                               //Find MEAN, and replace any empty values with it.
df["Calories"].fillna(x, inplace = True)
`.trim();

const wrongs = `
df['Date'] = pd.to_datetime(df['Date'])                                 //Convert to date.
df.dropna(subset=['Date'], inplace = True)                              //Remove rows with a NULL value in the "Date" column.
`.trim();

const fixings = `
for x in df.index:
  if df.loc[x, "Duration"] > 120:
    df.loc[x, "Duration"] = 120

    
df.drop_duplicates(inplace = True)                                      //Remove all duplicates.
`.trim();

const correlations = `
df.corr()                                                               //Relationship between the columns.
`.trim();

const Plotting = `
df.plot()
plt.show()                                                         


df.plot(kind = 'scatter', x = 'Duration', y = 'Calories')

df["Duration"].plot(kind = 'hist')
`.trim();

const data_ = `
import pandas as pd
X = music_data = pd.read_csv('music.csv')
X 
y = music_data['genre']
`.trim()

const preadicting = `
import pandas as pd 
from sklearn.tree import DecisionTreeClassifier

music_data = pd.read_csv('music.csv')
x = music_data.drop(columns=['genre'])
y = music_data['genre']

model = DecisionTreeClassifier()
model.fit(x, y)
music_data

predictions = model.predict([21, 1], [22, 0])
predictions
`.trim()

const dataFramesd = `
df = pd.read_csv("pandas.csv")
pd.read_csv("pandas.csv", skiprows=1)
pd.read_csv('pandas.csv', nrows=2)
pd.read_csv("pandas.csv", header=1)                                                       #skiprows and header are same
pd.read_csv("pandas.csv", na_values=["n.a.", "not available"])
pd.read_csv("pandas.csv", header=None, names = ["ticker","eps","revenue","people"])
pd.read_csv('pandas.csv',header=0, parse_dates=[0], index_col=0, squeeze=True)
pd.read_csv('pandas.csv',  na_values={'eps': ['not available'],'revenue': [-1],'people': ['not available','n.a.']})
    
    
df.to_csv("new.csv", index=False)                                                             #Write to CSV
df.to_csv("new.csv", columns=["tickers","price"], index=False)

pd.read_excel("stock_data.xlsx","Sheet1")                                                     #Read Excel
df.to_excel("new.xlsx", sheet_name="stocks", index=False, startrow=2, startcol=1)             #Write to Excel


df.to_string()                                                                                #Print the entire DataFrame.
df=pd.options.display.max_rows                                                                #Maximum returned rows
df=pd.options.display.max_rows = 9999                       #Increase max. number of rows to display the entire DataFrame

`.trim();

const sheets = `
df_stocks = pd.DataFrame({
    'tickers': ['GOOGL', 'WMT', 'MSFT'],
    'price': [845, 65, 64 ],
    'pe': [30.37, 14.26, 30.97],
    'eps': [27.82, 4.61, 2.12]
})

df_weather =  pd.DataFrame({
    'day': ['1/1/2017','1/2/2017','1/3/2017'],
    'temperature': [32,35,28],
    'event': ['Rain', 'Sunny', 'Snow']
})


with pd.ExcelWriter('stocks_weather.xlsx') as writer:
    df_stocks.to_excel(writer, sheet_name="stocks")
    df_weather.to_excel(writer, sheet_name="weather")
`.trim();

const interpolate = `
df.fillna(0)                                                                          #fillna
df.fillna(130, inplace = True)                                                        #Replace NULL values with the 130.
df["Calories"].fillna(130, inplace = True)                                            #Replace Only For Specified Columns.


new_df = df.fillna(method="ffill")                                                    #determine how to fill na values.
new_df = df.fillna(method="bfill")


#Use of axis
df.fillna(method="bfill", axis="columns")                                             # axis is either "index" or "columns"
df.fillna(method="ffill",limit=1)                                                     #limit parameter
df.interpolate()                                                                      #interpolate
df.interpolate(method="time")

df.dropna()                                                                           #dropna
df.drop_duplicates()


#Inserting Missing Dates
dt = pd.date_range("01-01-2017","01-11-2017")
idx = pd.DatetimeIndex(dt)
df.reindex(idx)


df.replace(-99999, value=np.NaN)                                                      #Handling Missing Data-replace method
df.replace(to_replace=[-99999,-88888], value=0)                                       #Replacing list with single value
df.replace({'temperature': -99999,'windspeed': -99999,'event': '0'}, np.nan)          #Replacing per column
          
new_df = df.replace({-99999: np.nan, 'no event': 'Sunny', })                          #Replacing by using mapping
df['area'][0] = 50                                                                    #Update data.

df=pd.Series([4.5, 7.2, -5.3, 3.6], index=['d', 'b', 'a', 'c'])                       #reindex

`.trim();

const windspeed = `
df.replace({'temperature': '[A-Za-z]', 'windspeed': '[a-z]'},'', regex=True) 


3Replacing list with another list
    df = pd.DataFrame({
    'score': ['exceptional','average', 'good', 'poor', 'average', 'exceptional'],
    'student': ['rob', 'maya', 'parthiv', 'tom', 'julian', 'erica']
  })

    df.replace(['poor', 'average', 'good', 'exceptional'], [1,2,3,4])
`.trim();

const groupby = `
    g.get_group('mumbai')
    g.max()
    g.min()
    g.mean()
    g.describe()
    g.size()
    g.count()
    g.plot()
`.trim();

const temperature = `
def grouper(df, idx, col):
    if 80 <= df[col].loc[idx] <= 90:
        return '80-90'
    elif 50 <= df[col].loc[idx] <= 60:
        return '50-60'
    else:
        return 'others'
        
g = df.groupby(lambda x: grouper(df, x, 'temperature'))
for key, d in g:
print("Group by Key: {}\n".format(key))
print(d)
`.trim();

const concatenation = `
india_weather = pd.DataFrame({
  "city": ["mumbai","delhi","banglore"],
  "temperature": [32,45,30],
  "humidity": [80, 60, 78]
})

df = pd.concat([india_weather, us_weather])


#Concatenation Using Index.
temperature_df = pd.DataFrame({
  "city": ["mumbai","delhi","banglore"],
  "temperature": [32,45,30],
}, index=[0,1,2])

pd.concat([temperature_df,windspeed_df],axis=1)


#Concatenate dataframe with series
s = pd.Series(["Humid","Dry","Rain"], name="event")
pd.concat([temperature_df,s],axis=1)
`.trim();

const ignore = `
pd.concat([india_weather, us_weather], ignore_index=True)


#pivot
df.pivot(index='city',columns='date')
df.pivot(index='city',columns='date',values="humidity")

f.pivot_table(index="city",columns="date", margins=True,aggfunc=np.sum)                                 #margins
df.pivot_table(index=pd.Grouper(freq='M',key='date'),columns='city')                                    #grouper


#Melt
pd.melt(df, id_vars=["day"], var_name='city', value_name='temperature')


#Reshape dataframe using stack/unstack
df = pd.read_excel("stocks.xlsx",header=[0,1])
df.stack()
df.stack(level=0)
df_stacked.unstack()


pd.read_excel("stocks_3_levels.xlsx",header=[0,1,2])                                      #3 levels of column headers
df2.stack(level=1)
`.trim();

const crosstab = `
pd.crosstab(df.Nationality,df.Handedness)
Margins: pd.crosstab(df.Sex,df.Handedness, margins=True)
Normalize: pd.crosstab(df.Sex, df.Handedness, normalize='index')
Aggfunc and Values: pd.crosstab(df.Sex, df.Handedness, values=df.Age, aggfunc=np.average)
`.trim();

const specifics = `
#Partial Date Index
df['2017-06-30']
df['2017-06'].Close.mean() 


#Date Range
df['2017-01-08':'2017-01-03']

df['Close'].resample('M').mean().head()                                                       #Resampling

#Finding missing dates from datetimeindex
daily_index = pd.date_range(start="6/1/2016",end="6/30/2016",freq='D')
daily_index.difference(df.index)


#generating DatetimeIndex with periods argument
pd.date_range('1/1/2011', periods=72, freq='H')
`.trim();

const mergeDataframes = `
df1 = pd.DataFrame({
  "city": ["new york","chicago","orlando"],
  "temperature": [21,14,35],
})

df2 = pd.DataFrame({
  "city": ["chicago","new york","orlando"],
  "humidity": [65,68,75],
})

df3 = pd.merge(df1, df2, on="city")

df3=pd.merge(df1,df2,on="city",how="outer",indicator=True)
df3= pd.merge(df1,df2,on="city",how="outer", suffixes=('_first','_second'))
`.trim();

const sqlalchemes = `
import pandas as pd
import sqlalchemy

engine = sqlalchemy.create_engine('mysql+pymysql://root:@localhost:3306/application')

df = pd.read_sql_table('customers',engine)

df = pd.read_sql_table('customers', engine, columns=["name"])       #Read only selected columns


#Join two tables and read them in a dataframe using read_sql_query
df = pd.read_sql_query("select id,name from customers",engine)      


query = '''
 SELECT customers.name, customers.phone_number, orders.name, orders.amount
 FROM customers INNER JOIN orders
 ON customers.id=orders.customer_id
'''
pd.read_sql(query,engine)                           #read_sql is a wrapper around read_sql_query and read_sql_table

df = pd.read_csv("customers.csv")                   #Write to mysql database using to_sql

df = pd.read_csv("customers.csv")

df.rename(columns={
    'Customer Name': 'name',
    'Customer Phone': 'phone_number'
}, inplace=True)



#to_sql has different parameters such as chunksize which allows to write data in chunks. Useful when size is huge
df.to_sql(
    name='customers', # database table name
    con=engine,
    if_exists='append',
    index=False                                                             
)                                   
`.trim();

const pandasMethods = `
df.shape
df.values
df.head(10)
df.describe()
df.memory_usage()
df.memory_usage(deep=True)
df.loc[1:3]
df.drop_duplicates()
df.count()
df.tail() 
df.info()
df.sort_index()
df.isna()                            #Returns a dataframe filled with boolean values with true indicating missing values.
df.isnull().sum()                    #Calculate the number of missing values in each column.
`.trim();

const pandasCopy = `
import numpy as np

series = pd.Series([1,2,np.nan,4])

series_2=series.copy(deep=True)
print(series_2)
`.trim();

const addRows = `
#Add rows
dict = {'Name':['Martha', 'Tim', 'Rob', 'Georgia'],
        'Maths':[87, 91, 97, 95],
        'Science':[83, 99, 84, 76]
       }
  
df = pd.DataFrame(dict)
  
df2 = {'Name': 'Amy', 'Maths': 89, 'Science': 93}
df = df.append(df2, ignore_index = True)
df

df.reset_index()



#add columns
data = {'Name':['Martha', 'Tim', 'Rob', 'Georgia'],
        'Maths':[87, 91, 97, 95],
        'Science':[83, 99, 84, 76]
       }

df = pd.DataFrame(data)

address = ['Delhi', 'Bangalore', 'Chennai', 'Patna']

df['Address'] = address
df



#Add An Index
data = pd.read_csv("areas.csv")
data.set_index("area", inplace = True)                                                      #Setting area as index column
data.head()
`.trim();


class Pandas extends Component {
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
              <h3>Pandas (Data analysis)</h3>
              <ul>
                <li>Provides functions to make working with structured or tabular data fast, easy, and expressive.</li>
                <li>Pandas allows us to analyze big data and make conclusions based on statistical theories.</li>
                <li>Primary objects is DataFrame and data.Series.</li>
                <li>Pandas find correlation between two/ more columns.</li>
                <li>Pandas is designed for working with tabular/ heterogeneous data.</li>
                <li>Pandas blends the high-performance, array-computing ideas of NumPy with the flexible data manipulation capabilities of spreadsheets and relational databases.</li>
                <li>Pandas has a special Categorical type for holding data that uses the integer-based categorical representation or encoding.</li>
              </ul>
              <br />

              <br />
              <ul>
                <li><b>Data Science/ Data Analytics: </b>Is a process of analyzing large set of data point to get answer on questions releted to that data set.</li>
                <br />

                <li><b>Data Munging/ Data Wrangling: </b>It's a Process of cleaning messy data.</li>
              </ul>
              <br />

              <h3>Dataframe</h3>
              Different ways of creating dataframe:
              <ul>
                <li>Using CSV</li>
                <li>Using excel</li>
                <li>From python dictionary</li>
                <li>From list of tuples</li>
                <li>From list of dictionaries</li>
              </ul>
              <br />

              <h3>What Are The Most Important Features Of The Pandas Library?</h3>
              <ul>
                <li>Data Alignment</li>
                <li>Merge and join</li>
                <li>Memory Efficient</li>
                <li>Time series</li>
                <li>Reshaping</li>
              </ul>
              <br />

              <h3>Explain Categorical Data in Pandas?</h3>
              <ul>
                <li>Categorical data refers to real-time data that can be repetitive for instance, data values under
                  categories such as country, gender, codes will always be repetitive.</li>
                <li>Categorical values also take only a limited and fixed number of possible values. </li>
                <li>Numerical operations cannot be performed on such data. All values of categorical data in pandas
                  are either in categories or np.nan.</li>
              </ul>
              <br />

              <b>Import file.</b>
              <br />

              <div style={titles}>
                <PrismCode
                  code={dataFramesd}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Methods:</b>
              <div style={titles}>
                <PrismCode
                  code={pandasMethods}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Write two dataframes to two separate sheets in excel</b>
              <div style={titles}>
                <PrismCode
                  code={sheets}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Handle Missing Data</h3>
              <div style={titles}>
                <PrismCode
                  code={interpolate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Data Structures: </b>2
              <ul>
                <li><b>Series: </b>Is a 1D array-like object containing a sequence of values and an associated array of data labels, called its index.</li>
                <br />
                <li><b>DataFrame: </b>A DataFrame represents a rectangular table of data and contains an ordered collection of columns, each of which can be
                  a different value type (numeric, string, boolean, etc.). DataFrame has both a row and column index.</li>
                <br />
                <li><b>Panel: </b>Is a 3-dimensional DS and includes items such as major_axis and minor_axis.</li>
              </ul>
              <br />

              <h3>Series</h3>
              <div style={titles}>
                <PrismCode
                  code={Series}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>DataFrames</h3>

              <div style={titles}>
                <PrismCode
                  code={dataFrames}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />

              <h3>How can we create copy of series in Pandas?</h3>
              copy() Make a deep copy, including a copy of the data and the indices. With deep=False neither the
              indices or the data are copied.
              <br />
              Note that when deep=True data is copied, actual python objects will not be copied
              recursively, only the reference to the object.
              <br />
              <div style={titles}>
                <PrismCode
                  code={pandasCopy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>How Will You Add An Index, Row, Or Column To A Dataframe In Pandas?</h3>
              <ul>
                <li><b>.loc (): </b>Is label based.</li>
                <li><b>.iloc (): </b>Integer based.</li>
                <li><b>.ix(): </b>Both label and integer based.</li>
                <br />
                <li>To add columns to the DataFrame, we can use .loc () or .iloc ().</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={addRows}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Pandas Read JSON</h3>
              <div style={titles}>
                <PrismCode
                  code={readJson}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Cleaning Empty Cells</h3>
              <div style={titles}>
                <PrismCode
                  code={cleanData}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Cleaning Data of Wrong Format</h3>
              <div style={titles}>
                <PrismCode
                  code={wrongs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Pandas - Fixing Wrong Data</h3>
              <div style={titles}>
                <PrismCode
                  code={fixings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Data Correlations</h3>
              The corr() method calculates the relationship between each column in our data set.
              <br />
              <br />
              <b>The number varies from -1 to 1.</b>
              <ul>
                <li>1 means that there is a 1 to 1 relationship (a perfect correlation), and for this data set, each
                  time a value went up in the first column, the other one went up as well.</li>
                <li>0.9 is also a good relationship, and if you increase one value, the other will probably increase as well.</li>
                <li>-0.9 would be just as good relationship as 0.9, but if you increase one value, the other will
                  probably go down.</li>
                <li>0.2 means NOT a good relationship, meaning that if one value goes up does not mean that the
                  other will.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={correlations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Plotting</h3>
              Uses the plot() method to create diagrams.
              <br />
              <br />
              Specify that you want a scatter plot with the kind argument:
              <br />
              kind = 'scatter'
              <br />
              A scatter plot needs an x- and a y-axis.
              <br />
              Will use "Duration" for the x-axis and "Calories" for the y-axis.
              <br />
              Include the x and y arguments like this:
              <br />
              x = 'Duration', y = 'Calories'
              <br />
              <br />

              <b>Histogram</b>
              <br />
              Use the kind argument to specify that you want a histogram:
              <br />
              <br />
              kind = 'hist'
              <br />
              A histogram needs only one column.
              <br />
              A histogram shows us the frequency of each interval, e.g. how many workouts lasted between 50 and 60 minutes?
              <br />
              Will use the "Duration" column to create the histogram.
              <br />

              <div style={titles}>
                <PrismCode
                  code={Plotting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>Preparing the Data</h3>
              <div style={titles}>
                <PrismCode
                  code={data_}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>Learning and Predicting</h3>
              <div style={titles}>
                <PrismCode
                  code={preadicting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Regex</h3>
              when windspeed is 6 mph, 7 mph etc. & temperature is 32 F, 28 F etc.
              <div style={titles}>
                <PrismCode
                  code={windspeed}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>SELECT * from weather_data GROUP BY city</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={groupby}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Group data using custom function</h3>
              Let's say you want to group your data using custom function. Here the requirement is to create three groups.
              <ul>
                <li>1.Days when temperature was between 80 and 90.</li>
                <li>2.Days when it was between 50 and 60.</li>
                <li>3.Days when it was anything else.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={temperature}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Basic Concatenation</h3>
              <div style={titles}>
                <PrismCode
                  code={concatenation}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Ignore Index</h3>
              <b>Pivot: </b>Allows to Transform/ reshape data.
              <br />
              Pivot table used tosummarize and aggregate data inside dataframe.
              <br />
              <br />
              <b>Melt:</b>Used to transform/ reshape data.
              <br />
              <div style={titles}>
                <PrismCode
                  code={ignore}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Crosstab</h3>
              <div style={titles}>
                <PrismCode
                  code={crosstab}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Time Series Analysis</h3>
              Time Series is a set of data points indexed in time order.
              <br />
              <br />
              <b>Benefits of DatetimeIndex:</b>
              <ul>
                <li>1.Partial Date Index: Select Specific Months Data.</li>
                <li>2.Select Date Range.</li>
              </ul>
              <br />
              <br />
              <b>Benefits of having DatetimeIndex:</b>
              <ul>
                <li>Generating DatetimeIndex with periods argument.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={specifics}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Merge DataFrame</h3>
              <div style={titles}>
                <PrismCode
                  code={mergeDataframes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>sqlalchemy</h3>
              <div style={titles}>
                <PrismCode
                  code={sqlalchemes}
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

export default (withStyles(styles)(Pandas));
