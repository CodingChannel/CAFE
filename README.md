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

#Swagger Documentation available on [http:](http://localhost:5005/swagger/index.html)
![image](https://github.com/user-attachments/assets/c468a304-e316-4f87-9b70-9c4e8f121f3a)

##UI - Sample Pages:
#Cafes / Home Page
![image](https://github.com/user-attachments/assets/b139a4f9-a56a-4042-9f05-29d72ad87dac)

#Employees
![image](https://github.com/user-attachments/assets/b551379d-811c-4aaa-a54a-8056ee0df081)

#Add / Edit Employee
![image](https://github.com/user-attachments/assets/4cacfd9a-4c31-4de1-a4a6-0658cf9f5da4)

#Add / Edit Cafe
![image](https://github.com/user-attachments/assets/28c6e676-bfa4-45c3-9c07-ad318eacac3b)

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