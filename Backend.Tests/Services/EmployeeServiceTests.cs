using System;
using System.Linq.Expressions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using Xunit;
using CAFE.Backend.Models;
using CAFE.Backend.DTOs;
using CAFE.Backend.Repository;
using CAFE.Backend.Services;

public class EmployeeServiceTests
{
    private readonly Mock<IRepository<Employee>> _mockRepository;
    private readonly EmployeeService _employeeService;

    public EmployeeServiceTests()
    {
        _mockRepository = new Mock<IRepository<Employee>>();
        _employeeService = new EmployeeService(_mockRepository.Object);
    }

    [Fact]
    public async Task GetAllEmployeesAsync_ShouldReturnEmployeesWithCafe()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee
            {
                Id = "1",
                Name = "John Doe",
                PhoneNumber = "912345678",
                EmailAddress = "john.doe@example.com",
                Gender = "Male",
                StartDate = DateTime.UtcNow,
                CafeId = Guid.NewGuid(),
                Cafe = new Cafe
                {
                    Id = Guid.NewGuid(),
                    Name = "Cafe1"
                }
            },
            new Employee
            {
                Id = "2",
                Name = "Jane Smith",
                PhoneNumber = "812345678",
                EmailAddress = "jane.smith@example.com",
                Gender = "Female",
                StartDate = DateTime.UtcNow,
                CafeId = Guid.NewGuid(),
                Cafe = new Cafe
                {
                    Id = Guid.NewGuid(),
                    Name = "Cafe2"
                }
            }
        };

        _mockRepository.Setup(repo => repo.GetAllWithIncludesAsync(It.IsAny<Expression<Func<Employee, object>>>()))
            .ReturnsAsync(employees);

        // Act
        var result = await _employeeService.GetAllEmployeesAsync();

        // Assert
        var employeeDtos = result.ToList();
        Assert.Equal(2, employeeDtos.Count);
        Assert.Equal("John Doe", employeeDtos[0].Name);
        Assert.Equal("Jane Smith", employeeDtos[1].Name);
        Assert.NotNull(employeeDtos[0].Cafe);
        Assert.NotNull(employeeDtos[1].Cafe);
    }

    [Fact]
    public async Task GetEmployeeByIdAsync_ShouldReturnEmployee()
    {
        // Arrange
        var employeeId = "1";
        var employee = new Employee
        {
            Id = employeeId,
            Name = "John Doe"
        };

        _mockRepository.Setup(repo => repo.GetByIdAsync(employeeId)).ReturnsAsync(employee);

        // Act
        var result = await _employeeService.GetEmployeeByIdAsync(employeeId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(employeeId, result.Id);
    }

    [Fact]
    public async Task AddEmployeeAsync_ShouldCallInsertAsync()
    {
        // Arrange
        var employee = new Employee
        {
            Id = "1",
            Name = "John Doe"
        };

        // Act
        await _employeeService.AddEmployeeAsync(employee);

        // Assert
        _mockRepository.Verify(repo => repo.InsertAsync(employee), Times.Once);
    }

    [Fact]
    public async Task UpdateEmployeeAsync_ShouldCallUpdateAsync()
    {
        // Arrange
        var employee = new Employee
        {
            Id = "1",
            Name = "John Doe"
        };

        // Act
        await _employeeService.UpdateEmployeeAsync(employee);

        // Assert
        _mockRepository.Verify(repo => repo.UpdateAsync(employee), Times.Once);
    }

    [Fact]
    public async Task DeleteEmployeeAsync_ShouldCallDeleteAsync()
    {
        // Arrange
        var employeeId = "1";
        var employee = new Employee
        {
            Id = employeeId,
            Name = "John Doe"
        };

        _mockRepository.Setup(repo => repo.GetByIdAsync(employeeId)).ReturnsAsync(employee);
        // Act
        var result = await _employeeService.DeleteEmployeeAsync(employeeId);

        // Assert
        Assert.True(result);
    }
}
