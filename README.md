# Rockinhood

Rockinhood recreates the vision of the famous Robinhood app allowing people to start investing in stocks breaking free from comission fees.

Visit the live site here.

# Key Features

-   Users can sign up or use a demo account. 
-   Users can add stocks to their watchlist and buy them directly from the dashboard.
-   Users review the change of their portfolio prices through the interaction of the graph which include the price changes from the last 30 days. 
- Users can see the graphical behavior of different stocks prices.


# Technology Used

-   Express
-   Sequelize
-   Node.js
-   Postgres
-   D3js
-   Bcryptjs
-   Pug

# Dates in JS

After fetching the historical data from the Yahoo finance API we faced an issue with the array of objects we were getting back.

    const data = [{"date":"2020-04-21T13:30:00.000Z",  "value": 2328.1201171875}]

 Even though the format was being received as a value in ISO format it was not instanciated as a date object recognizable by  JavaScript. This caused us trouble when plotting the graph since the value recieved was not a number capable of creating the graph line in the X axis.
The following snippet shows how we solved this issue by mapping over the array of objects and creating an date instance fro each value of date:

    const moddedData = data.map((element) => { 
	    element.date  =  new Date(element.date);
	    return element
	    });
