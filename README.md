# react_frontend_latest_work_jikim

As of 1/17/2019

This is a sample of my code/contribution for a web app where I built out a sign up form using

- React
- Redux
- material-ui
- axios

Things to note:
- I have extended material-ui's components for customized behavior.
- I created my own custom form validations so that error messages are checked for and provided in real time for each field.
- The form validation also works to enable the submit button once every required field has been validated true.
- Input fields have been customized for modularity.

How to navigate the files:
1. Containers > SignUpForm.js
   - This is the main component this code base is centered around
   - This component makes use of redux to gain access to / store the next advertiser's information to make available to all other components
2. Components >
      CustomInputField.js
      - This is a custom component built by extending Material-Ui's TextField component
      validateFields.js
      - This is a custom function that is applied to all the input fields for dynamic/real time form validation
      createAdvertiserPostObject.js
      - This is a function that is used to map the input fields into an object that will properly work with an acceptable backend model
3. Actions > advertiserActions.js
   - These are some of the advertiser actions that allow interaction with the backend api
