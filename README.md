### `Fronend`
<br>This is a backend for [https://github.com/Amakachi/ProductStore-React-Js-].<br>

### `Heroku`
This application is hosted on heroku with url https://productstoreapp-backend.herokuapp.com/

### `GET all products`
GET https://productstoreapp-backend.herokuapp.com/api/collections/
<br> This endpoint gets all the list of products <br>

### `GET product by id`
GET https://productstoreapp-backend.herokuapp.com/api/collections/{product_id}
This endpoint list the products by id<br>

### `POST create new product`
POST https://productstoreapp-backend.herokuapp.com/api/collections/
<br>
Body<br>
{<br>
name: "string", <br>
description: "string", <br>
price: "string", <br>
category: "string", <br>
image: file<br>
}<br>
This endpoint creates a new product <br>

Developed with expressJS with Mongodb as the database<br>

To get started, install node on your machine.<br>
Clone this project.<br>
Install Mongodb on ur machine and the appropriate server.<br>
When this is done, start this node with
### `node index.js`
which will open [http://localhost:4000].<br>

This can be tested on Postman by checking the
the available routes in routes folder api.js<br>

