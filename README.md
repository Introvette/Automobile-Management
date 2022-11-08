# CarCar

Team:

* Yvette Rosario - Service
* Jeff Jiang - Sales



## Design:

We are creating a program that will be used by a car dealership for taking inventories of cars, servicing Cars, and the selling of cars. There are the three bounded contexts in our project: Inventory, Sales, and Services
Each of those bounded contexts' will be represented by a seperate microservice. They will all be connected via the automobile value object, that links back with the automobile model in the inventory. The sales and services microservice's will both poll for data from inventory to create context.

## Inventory microservice:

Need front end that can do these things :
-Show a list of manufacturers
-Create a new manufacturer (form)
-Show a list of vehicle models
-Create a vehicle model page (form)
-Show a list of automobiles in inventory
-Create an automobile in inventory (form)

## Service microservice:

create models for:
technician
Service
automobileVO- to get info on cars
poller: need automobileVO to get data from inventory
views:
Frontend:

service list : list of appointments currently in the system


service history : list of services on a specific vin


create service appointment (form)


create a technician (form)


## Sales microservice:

create models for:
Employee
Customer
SalesRecord
AutomobileVO
poller: need automobileVO to get data from inventory
views:
Frontend:


Sales Record List page that lists all sales in system


Sales person(based on employee number) history page


Create a sales person (employee) (form)


Create a sales record (form)


Create a customer (form)
