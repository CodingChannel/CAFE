using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using CAFE.Backend.Controllers;
using CAFE.Backend.Models;
using CAFE.Backend.DTOs;
using CAFE.Backend.Services;

namespace CAFE.Backend.Tests
{
    public class EmployeesControllerTests
    {
        private readonly Mock<IEmployeeService> _mockEmployeeService;
        private readonly Mock<ICafeService> _mockCafeService;
        private readonly EmployeesController _controller;

        public EmployeesControllerTests()
        {
            _mockEmployeeService = new Mock<IEmployeeService>();
            _mockCafeService = new Mock<ICafeService>();
            _controller = new EmployeesController(_mockEmployeeService.Object, _mockCafeService.Object);
        }

        [Fact]
        public async Task GetAllEmployees_ReturnsOkResult_WithListOfEmployees()
        {
            // Arrange
            var employees = new List<EmployeeDto>
            {
                new EmployeeDto { Id = "1", Name = "Employee 1", Cafe = new Cafe { Name = "Cafe 1" } },
                new EmployeeDto { Id = "2", Name = "Employee 2", Cafe = new Cafe { Name = "Cafe 2" } }
            };
            _mockEmployeeService.Setup(service => service.GetAllEmployeesAsync()).ReturnsAsync(employees);

            // Act
            var result = await _controller.GetAllEmployees(null);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnEmployees = Assert.IsAssignableFrom<IEnumerable<object>>(okResult.Value);
            Assert.Equal(2, returnEmployees.Count());
        }

        [Fact]
        public async Task GetEmployeeById_ReturnsNotFound_WhenEmployeeDoesNotExist()
        {
            // Arrange
            _mockEmployeeService.Setup(service => service.GetEmployeeByIdAsync(It.IsAny<string>())).ReturnsAsync((Employee)null);

            // Act
            var result = await _controller.GetEmployeeById("1");

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task CreateEmployee_ReturnsCreatedAtAction_WithCreatedEmployee()
        {
            // Arrange
            var employeeDto = new CreateEmployeeDto { Name = "New Employee", CafeId = Guid.NewGuid(), EmailAddress = "email@example.com", Gender = "Male", PhoneNumber = "123456789" };
            var employee = employeeDto.ToEmployee();
            employee.Id = "1";
            _mockEmployeeService.Setup(service => service.AddEmployeeAsync(It.IsAny<Employee>())).Callback<Employee>(e => e.Id = employee.Id).Returns(Task.CompletedTask);
            _mockCafeService.Setup(service => service.GetCafeByIdAsync(It.IsAny<Guid>())).ReturnsAsync(new CafeDto { Id = employeeDto.CafeId.Value });

            // Act
            var result = await _controller.CreateEmployee(employeeDto);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var returnEmployee = Assert.IsType<Employee>(createdAtActionResult.Value);
            Assert.Equal(employeeDto.Name, returnEmployee.Name);
            Assert.Equal(employeeDto.EmailAddress, returnEmployee.EmailAddress);
        }

        [Fact]
        public async Task UpdateEmployee_ReturnsNoContent_WhenUpdateIsSuccessful()
        {
            // Arrange
            var employeeDto = new UpdateEmployeeDto { Id = "1", Name = "Updated Employee", CafeId = Guid.NewGuid(), EmailAddress = "updated@example.com", Gender = "Male", PhoneNumber = "123456789" };
            var existingEmployee = new Employee { Id = "1", Name = "Existing Employee", Cafe = new Cafe { Id = employeeDto.CafeId.Value } };

            _mockEmployeeService.Setup(service => service.GetEmployeeByIdAsync(employeeDto.Id)).ReturnsAsync(existingEmployee);
            _mockEmployeeService.Setup(service => service.UpdateEmployeeAsync(It.IsAny<Employee>())).Returns(Task.CompletedTask);
            _mockCafeService.Setup(service => service.GetCafeByIdAsync(It.IsAny<Guid>())).ReturnsAsync(new CafeDto { Id = employeeDto.CafeId.Value });

            // Act
            var result = await _controller.UpdateEmployee(employeeDto.Id, employeeDto);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }


        [Fact]
        public async Task DeleteEmployee_ReturnsNoContent_WhenDeleteIsSuccessful()
        {
            // Arrange
            var employeeId = "1"; 
            _mockEmployeeService.Setup(service => service.DeleteEmployeeAsync(employeeId)).ReturnsAsync(true); // Simulate cafe found

            // Act
            var result = await _controller.DeleteEmployee(employeeId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteEmployee_ReturnsNotFound_WhenCafeDoesNotExist()
        {
            // Arrange
            var employeeId = "6";
            _mockEmployeeService.Setup(service => service.DeleteEmployeeAsync(employeeId)).ReturnsAsync(false); // Simulate Employee not found

            // Act
            var result = await _controller.DeleteEmployee(employeeId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
