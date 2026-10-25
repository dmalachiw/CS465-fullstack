# CS-465 Full Stack Development 

## Travlr Getaways 

### Architecture 

While learning in this class we created the Travlr Getaways application. There were many different front ends that I used during this time. We used Express with Html javascript and handlebars templating to create our customers view of the website. Which would generate web pages on the server side and send to the client. We also created a single page application (SPA) using angular for our admins view of the site. The difference between the SPA and express website was you could manipulate your website without refreshing the page. Which allowed us to easily add and modify trips. We used Mongo DB as our database. MongoDB is a non SQL database that holds data as documents instead of tables. Since we were storing info about trips which consisted of JSON its made sense to use mongo db. It also allowed us to save trip information to our database through our api.

### Functionality 

JSON and JavaScript are similar but have their differences. Json will be used to hold data for our website. And Javascript will allow us to use functions on our website. We used json to travel our trip information through out API. So we can pull information from our MongoDB and show it on our website. During the duration of the class we made some changes to our code to better our application. By changing our HTML trip information to handlebars. Allowing us to have multiple trips on our page without writing the same code over and over. We were also able to create angular components that could be used throughout our admin website. Trips and Add/Edit Trip forms. Allowing us to organize our code and not repeat ourselves.

### Testing 

During this class we used Postman to help us test our API's and ensure our website was functioning properly. There are many ways you can test an API. Such as GET, POST, PUT, and DELETE. Using GET allowed us to view information about trips in our database. POST was able to create new trips. PUT was able to edit existing trips and DELETE removed trips from our database. By testing our endpoints we were able to gain more knowledge on how our front end and back end talk to one another. Testing became a bit more in depth when we implemented security into our application. We created a login feature that allows the user to be authenticated using JWT. Our tests would now have to be done with an authenticated user if we wanted to change something in our database. If we didn't authenticate our user we would not be able to change anything on our website. Its important to test your API's when your using authentication. Because you want your users to be able to see what information you have to offer and not be able to modify your website.

### Reflection 

I learned more about developing a full stack website during this class. I know a little about programming but I have never built a full website with a database. I learned about Express, Angular and MongoDB. As well as API's. I believe that by developing this website I became more knowledgeable on how to troubleshoot issues and figure out what may be going wrong in my code. As I work in the field of cyber defense knowing how a application is created and secured will be helpful to me. Knowing about authentication and databases can help me understand why some things are insecure. I can also use these skills to apply to jobs that may require me to know how to develop front end and back end applications. This class taught me a lot about developing applications and I am excited to learn more about coding.