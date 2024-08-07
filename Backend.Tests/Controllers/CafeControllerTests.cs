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
    public class CafesControllerTests
    {
        private readonly Mock<ICafeService> _mockCafeService;
        private readonly CafesController _controller;

        public CafesControllerTests()
        {
            _mockCafeService = new Mock<ICafeService>();
            _controller = new CafesController(_mockCafeService.Object);
        }

        [Fact]
        public async Task GetAllCafes_ReturnsOkResult_WithListOfCafes()
        {
            // Arrange
            var cafes = new List<CafeDto>
            {
                new CafeDto { Id = Guid.NewGuid(), Name = "Cafe 1", Location = "Location 1", Employees = 10 },
                new CafeDto { Id = Guid.NewGuid(), Name = "Cafe 2", Location = "Location 2", Employees = 5 }
            };
            _mockCafeService.Setup(service => service.GetAllCafesAsync()).ReturnsAsync(cafes);

            // Act
            var result = await _controller.GetAllCafes(null);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnCafes = Assert.IsAssignableFrom<IEnumerable<CafeDto>>(okResult.Value);
            Assert.Equal(2, returnCafes.Count());
        }

        [Fact]
        public async Task GetAllCafes_ReturnsFilteredAndSortedCafes_ByLocationAndEmployees()
        {
            // Arrange
            var cafes = new List<CafeDto>
            {
                new CafeDto { Id = Guid.NewGuid(), Name = "Cafe 1", Location = "New York", Employees = 10 },
                new CafeDto { Id = Guid.NewGuid(), Name = "Cafe 2", Location = "Los Angeles", Employees = 5 },
                new CafeDto { Id = Guid.NewGuid(), Name = "Cafe 3", Location = "New York", Employees = 8 }
            };
            _mockCafeService.Setup(service => service.GetAllCafesAsync()).ReturnsAsync(cafes);

            // Act
            var result = await _controller.GetAllCafes("New York");

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnCafes = Assert.IsAssignableFrom<IEnumerable<CafeDto>>(okResult.Value);
            Assert.Equal(2, returnCafes.Count());
            Assert.Equal("Cafe 1", returnCafes.First().Name);
            Assert.Equal("Cafe 3", returnCafes.Last().Name);
        }

        [Fact]
        public async Task GetCafeById_ReturnsNotFound_WhenCafeDoesNotExist()
        {
            // Arrange
            _mockCafeService.Setup(service => service.GetCafeByIdAsync(It.IsAny<Guid>())).ReturnsAsync((CafeDto)null);

            // Act
            var result = await _controller.GetCafeById(Guid.NewGuid());

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task GetCafeById_ReturnsOkResult_WithCafe()
        {
            // Arrange
            var cafe = new CafeDto { Id = Guid.NewGuid(), Name = "Cafe 1", Location = "Location 1", Employees = 10 };
            _mockCafeService.Setup(service => service.GetCafeByIdAsync(cafe.Id)).ReturnsAsync(cafe);

            // Act
            var result = await _controller.GetCafeById(cafe.Id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnCafe = Assert.IsType<CafeDto>(okResult.Value);
            Assert.Equal(cafe.Id, returnCafe.Id);
            Assert.Equal(cafe.Name, returnCafe.Name);
        }

        [Fact]
        public async Task CreateCafe_ReturnsCreatedAtAction_WithCreatedCafe()
        {
            // Arrange
            var cafeDto = new CreateCafeDto { Name = "New Cafe", Location = "Location 1", Description = "Description 1", Logo = "Logo 1" };
            var cafe = new Cafe { Id = Guid.NewGuid(), Name = cafeDto.Name, Location = cafeDto.Location, Description = cafeDto.Description, Logo = cafeDto.Logo };
            _mockCafeService.Setup(service => service.AddCafeAsync(It.IsAny<Cafe>())).Returns(Task.CompletedTask).Callback<Cafe>(c => c.Id = cafe.Id);

            // Act
            var result = await _controller.CreateCafe(cafeDto);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var returnCafe = Assert.IsType<Cafe>(createdAtActionResult.Value);
            Assert.Equal(cafeDto.Name, returnCafe.Name);
            Assert.Equal(cafeDto.Location, returnCafe.Location);
            Assert.Equal(cafeDto.Description, returnCafe.Description);
        }

        [Fact]
        public async Task UpdateCafe_ReturnsNoContent_WhenUpdateIsSuccessful()
        {
            // Arrange
            var cafeDto = new UpdateCafeDto { Id = Guid.NewGuid(), Name = "Updated Cafe", Location = "Location 1", Description = "Updated Description", Logo = "Updated Logo" };
            var existingCafe = new CafeDto { Id = cafeDto.Id, Name = "Existing Cafe", Location = "Location 2", Description = "Existing Description", Logo = "Existing Logo" };

            _mockCafeService.Setup(service => service.GetCafeByIdAsync(cafeDto.Id)).ReturnsAsync(existingCafe);
            _mockCafeService.Setup(service => service.UpdateCafeAsync(It.IsAny<UpdateCafeDto>())).ReturnsAsync((bool)true);

            // Act
            var result = await _controller.UpdateCafe(cafeDto.Id, cafeDto);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task UpdateCafe_ReturnsBadRequest_WhenIdsDoNotMatch()
        {
            // Arrange
            var cafeDto = new UpdateCafeDto { Id = Guid.NewGuid(), Name = "Updated Cafe", Location = "Location 1", Description = "Updated Description", Logo = "Updated Logo" };

            // Act
            var result = await _controller.UpdateCafe(Guid.NewGuid(), cafeDto);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task UpdateCafe_ReturnsNotFound_WhenCafeDoesNotExist()
        {
            // Arrange
            var cafeDto = new UpdateCafeDto { Id = Guid.NewGuid(), Name = "Updated Cafe", Location = "Location 1", Description = "Updated Description", Logo = "Updated Logo" };
            _mockCafeService.Setup(service => service.GetCafeByIdAsync(It.IsAny<Guid>())).ReturnsAsync((CafeDto)null);

            // Act
            var result = await _controller.UpdateCafe(cafeDto.Id, cafeDto);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteCafe_ReturnsNoContent_WhenDeleteIsSuccessful()
        {
            // Arrange
            var cafeId = Guid.NewGuid();
            _mockCafeService.Setup(service => service.DeleteCafeAsync(cafeId)).ReturnsAsync(true); // Simulate cafe found

            // Act
            var result = await _controller.DeleteCafe(cafeId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteCafe_ReturnsNotFound_WhenCafeDoesNotExist()
        {
            // Arrange
            var cafeId = Guid.NewGuid();
            _mockCafeService.Setup(service => service.DeleteCafeAsync(cafeId)).ReturnsAsync(false); // Simulate cafe not found

            // Act
            var result = await _controller.DeleteCafe(cafeId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
