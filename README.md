# 1. Choice of packages

## 1). NextJS
a. What's the purpose/importance of the package?
- NextJS have many features that can be useful for your web development project.

b. What are the benefits & drawbacks associated with that choice?

<b>Benefits</b>
 - built-in SSR support, with create-react-app / plain react, it's a little bit tricky to implement SSR, with NextJS we can simply use 'getServerSideProps' to use SSR.
 - Easier routing, NextJS makes it easier for routing our component, in create-react-app, we have to install third party library to use routing in our project, in NextJS the routing is simply depending on file and folder inside '/pages' folder, and with 'Link' component, you can easily move around pages.
 - SEO support, with it's built in SSR and 'Head' component, it's easier to add SEO related tags in the header of the page. with create-react-app, you have to use third party library to do that.
 - Dynamic Imports, NextJS have built-in 'dynamic' component to make it easier to do dynamic imports, that have benefit of code splitting our component that can boost our page loads.

<b>Drawbacks</b>
 - NextJs is still a new thing and not that many people using it, so if you have a problem, it will little bit harder to find a solution.

c. What are the assumptions underlying that choice?
- Even though it's still new, but NextJS provides many features that can be very useful for our project, and the number of people and company using it is growing day by day.

## 2). Bootstrap
a. What's the purpose/importance of the package?
- The purpose of bootstrap on this project is to use bootstrap's components such as Modal, Alert.

b. What are the benefits & drawbacks associated with that choice?

<b>Benefits</b>
 - it makes the development of the project faster since we can use provided components rather than built it by our own, so it will save our time.
 - Providing many components.

<b>Drawbacks</b>
 - the provided components little bit hard to customize
 - sometimes if you want to make a component you have to becareful with naming class, since bootstrap have their own class names for their components as well, so you have to be cautios that the class names not collided or same with the bootstrap, if that happen, your component will have bootstrap component's styling on it, for people that don't know about this it will be confusing.

c. What are the assumptions underlying that choice?
- Bootstrap is well known UI Framework and widely used by many frontend developer in the world so the community is large, so that if we have a problem, it will be easier to find a solution for it.
- Bootstrap is easy to use in React, the configuration to use Bootstrap on React project is pretty simple.
- Bootstrap have good documentation.

## 3). Sass
a. What's the purpose/importance of the package?
- The purpose of using Sass in this project is to make it easier to style a component

b. What are the benefits & drawbacks associated with that choice?

<b>Benefits</b>
 - You can make variables of styling, so that if you need same style you can just add the variable name to use the same style.
 - Nested rules, with Sass, you can nest your styling syntax so you can specifically style a component inside the parent component.
 - @import rule can modularize your stylesheet file rather than do it in one big stylesheet file.

<b>Drawbacks</b>
 - You must know about Saas to use it, it will be dificult for a person that dont know about sass to continue the project, unless they try to read the documentation about Sass first.

c. What are the assumptions underlying that choice?
- Sass will make it simple for you to style your components with it's feature rather than using conventional css 


# 2. Potential Improvement

- If given more time, i would like to improve the web UI with responsive design.
- Improving load performance.

# 3. Production consideration

- This project don't need any extra steps to deploy, everything is straight forward.

# 4. Assumptions

a. Any assumptions you have made when you designed the data model and API
schema?

- The API data is not that complex, so it makes showing the data to the page easier.

b. Any other assumptions and opinions you have taken throughout the assessments?

- The API response when error happens should be more descriptive.

  let's say when we sent wrong booking data, the API should tell specifically which data is invalid, or when the booking time is not valid because it's more than doctor's availability, the API response should tell that rather than just giving message "invalid booking".