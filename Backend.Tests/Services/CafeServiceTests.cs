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

public class CafeServiceTests
{
    private readonly Mock<IRepository<Cafe>> _mockRepository;
    private readonly CafeService _cafeService;

    public CafeServiceTests()
    {
        _mockRepository = new Mock<IRepository<Cafe>>();
        _cafeService = new CafeService(_mockRepository.Object);
    }

    [Fact]
    public async Task GetAllCafesAsync_ShouldReturnCafesWithEmployeeCount()
    {
        // Arrange
        var cafes = new List<Cafe>
        {
            new Cafe
            {
                Id = Guid.NewGuid(),
                Name = "Cafe1",
                Description = "Description1",
                Logo = "Logo1",
                Location = "Location1",
                Employees = new List<Employee>
                {
                    new Employee(),
                    new Employee()
                }
            },
            new Cafe
            {
                Id = Guid.NewGuid(),
                Name = "Cafe2",
                Description = "Description2",
                Logo = "Logo2",
                Location = "Location2",
                Employees = new List<Employee>()
            }
        };

        _mockRepository.Setup(repo => repo.GetAllWithIncludesAsync(It.IsAny<Expression<Func<Cafe, object>>>())).ReturnsAsync(cafes);

        // Act
        var result = await _cafeService.GetAllCafesAsync();

        // Assert
        var cafeDtos = result.ToList();
        Assert.Equal(2, cafeDtos.Count);
        Assert.Equal(2, cafeDtos[0].Employees);
        Assert.Equal(0, cafeDtos[1].Employees);
    }

    [Fact]
    public async Task GetCafeByIdAsync_ShouldReturnCafe()
    {
        // Arrange
        var cafeId = Guid.NewGuid();
        var cafe = new Cafe
        {
            Id = cafeId,
            Name = "Cafe1",
            Description = "Cafe1",
            Logo = "Logo",
            Location = "Location",
            Employees = new List<Employee> { new Employee(), new Employee() }
        };

        _mockRepository.Setup(repo => repo.GetByIdAsync(cafeId)).ReturnsAsync((Cafe)cafe);

        // Act
        var result = await _cafeService.GetCafeByIdAsync(cafeId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(cafe.Id, result.Id);
        Assert.Equal(cafe.Description, result.Description);
        Assert.Equal(cafe.Logo, result.Logo);
        Assert.Equal(cafe.Location, result.Location);
        Assert.Equal(result.Employees, 2);
    }

    [Fact]
    public async Task AddCafeAsync_ShouldCallInsertAsync()
    {
        // Arrange
        var cafe = new Cafe
        {
            Id = Guid.NewGuid(),
            Name = "Cafe1"
        };

        // Act
        await _cafeService.AddCafeAsync(cafe);

        // Assert
        _mockRepository.Verify(repo => repo.InsertAsync(cafe), Times.Once);
    }

    [Fact]
    public async Task UpdateCafeAsync_ShouldCallUpdateAsync()
    {
        // Arrange
        var cafe = new Cafe
        {
            Id = Guid.NewGuid(),
            Name = "Cafe1"
        };
        var cafeDto = new UpdateCafeDto
        {
            Id = cafe.Id,
            Name = "Test",
        };

        _mockRepository.Setup(repo => repo.GetByIdAsync(cafe.Id)).ReturnsAsync(cafe);

        // Act
        await _cafeService.UpdateCafeAsync(cafeDto);

        // Assert
        _mockRepository.Verify(repo => repo.UpdateAsync(cafe), Times.Once);
    }

    [Fact]
    public async Task DeleteCafeAsync_ReturnsFalse_WhenRepositoryReturnsNull()
    {
        // Arrange
        var cafeId = Guid.NewGuid();

        _mockRepository.Setup(repo => repo.GetByIdAsync(cafeId)).ReturnsAsync((Cafe)null);
        var cafeService = new CafeService(_mockRepository.Object);

        // Act
        var result = await cafeService.DeleteCafeAsync(cafeId);

        // Assert
        Assert.False(result);
    }


}
