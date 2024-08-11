## Cafe Manager


# Setup :

1. Clone the repository
2. Open the project in Visual Studio
3. Run a bash file

```
   bash start.sh
```

4. Open the browser and go to http://localhost:3000
5. You will see a table for cafes & Employees


=======

##TODO:

#E2E: Implement End to end test cases with Cypress / other tools 
#SonarQube: Integrate in pipeline to improve code quality & fix any missing tests.



# Backend.Tests

Run the dotnet tests with following commands
These steps must be added to CI/CD's pipeline as `Tests`

```
    cd Backend.Tests
    dotnet test
```

#frontend tests:

```
 cd frontend
 npm i
 npm run test  
```
