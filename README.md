# Visory

This project is for [Visory engineering challenge.](https://github.com/VisoryPlatform/engineering-challenge?tab=readme-ov-file) It a small application built 
in Angular to fetch events from TicketMaster discovery API.

In this application, it's possible to filter by Country, city, start and end date. The cities are based on the country selected 
[(thanks to Countriesnow API).](https://countriesnow.space/)

The results from the query are shown in a table, with pagination.

It's possible to check event details.

To run it, use Angular CLI or Docker:

### Docker
```docker build -t angular-app .```

```docker run -p 4300:4200 angular-app```

Then navigate to http://localhost:8080/

### Angular CLI
```ng serve```

Then navigate to http://localhost:4200/

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
