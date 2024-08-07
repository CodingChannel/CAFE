using Microsoft.AspNetCore.Mvc;
using CAFE.Backend.Models;
using CAFE.Backend.DTOs;
using CAFE.Backend.Services;

namespace CAFE.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CafesController : ControllerBase
    {
        private readonly ICafeService _cafeService;

        public CafesController(ICafeService cafeService)
        {
            _cafeService = cafeService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllCafes([FromQuery] string? location)
        {
            var cafes = await _cafeService.GetAllCafesAsync();

            if (!string.IsNullOrEmpty(location))
            {
                // Filter cafes by location
                cafes = cafes.Where(c => c.Location.Equals(location, StringComparison.OrdinalIgnoreCase)).ToList();
            }

            // Sort cafes by the number of employees in descending order
            cafes = cafes.OrderByDescending(c => c.Employees).ToList();

            return Ok(cafes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCafeById(Guid id)
        {
            var cafe = await _cafeService.GetCafeByIdAsync(id);
            if (cafe == null) return NotFound();
            return Ok(cafe);
        }


        [HttpPost]
        public async Task<IActionResult> CreateCafe([FromBody] CreateCafeDto cafeDto)
        {
            if (ModelState.IsValid)
            {
                var cafe = new Cafe
                {
                    Name = cafeDto.Name,
                    Location = cafeDto.Location,
                    Description = cafeDto.Description,
                    Logo = cafeDto.Logo
                };
                await _cafeService.AddCafeAsync(cafe);
                return CreatedAtAction(nameof(GetCafeById), new { id = cafe.Id }, cafe);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCafe(Guid id, UpdateCafeDto cafeDto)
        {
            if (ModelState.IsValid)
            {
                if (cafeDto == null)
                {
                    return BadRequest("Invalid cafe update request. Cafe data is missing.");
                }

                if (!id.Equals(cafeDto.Id)) return BadRequest();

                // Validate updated cafe data (optional, can be done in DTO validation)
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)));
                }

                var success = await _cafeService.UpdateCafeAsync(cafeDto);
                if (!success) return NotFound();

                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCafe(Guid id)
        {
            if (ModelState.IsValid)
            {
                var success = await _cafeService.DeleteCafeAsync(id);
                if (success)
                {
                    // Cafe deleted successfully
                    return NoContent();
                }
                else
                {
                    // Cafe not found
                    return NotFound();
                }
            }

            return BadRequest(ModelState);
        }
    }
}
