using Microsoft.AspNetCore.Mvc;
using CAFE.Backend.Models;
using CAFE.Backend.DTOs;
using CAFE.Backend.Services;
using System.Text.Json;
using System.Text.Json.Serialization;
namespace CAFE.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly ICafeService _cafeService;

        public EmployeesController(IEmployeeService employeeService, ICafeService cafeService)
        {
            _employeeService = employeeService;
            _cafeService = cafeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees([FromQuery] string? cafe)
        {
            var employees = await _employeeService.GetAllEmployeesAsync();

            if (!string.IsNullOrEmpty(cafe))
            {
                // Filter employees by cafe
                employees = employees.Where(e => e.Cafe.Name.Equals(cafe, StringComparison.OrdinalIgnoreCase)).ToList();
            }

            // Calculate days worked and sort employees by the number of days worked in descending order
            employees = employees.OrderByDescending(e => e.DaysWorked).ToList();
            var response = employees.Select(e => new
            {
                id = e.Id,
                name = e.Name,
                emailAddress = e.EmailAddress,
                gender = e.Gender,
                phoneNumber = e.PhoneNumber,
                daysWorked = e.DaysWorked,
                cafe = e.Cafe
            });

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(string id)
        {
            if (ModelState.IsValid)
            {
                var employee = await _employeeService.GetEmployeeByIdAsync(id);
                if (employee == null) return NotFound();
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDto employeeDto)
        {
            if (ModelState.IsValid)
            {
                var employee = employeeDto.ToEmployee();

                if (employeeDto.CafeId.HasValue)
                {
                    var cafe = await _cafeService.GetCafeByIdAsync(employeeDto.CafeId.Value);
                    if (cafe == null)
                    {
                        return NotFound("Cafe not found.");
                    }
                    employee.CafeId = cafe.Id;
                }

                await _employeeService.AddEmployeeAsync(employee);
                return CreatedAtAction(nameof(GetAllEmployees), new { id = employee.Id }, employee);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(string id, UpdateEmployeeDto employeeDto)
        {
            if (ModelState.IsValid)
            {
                if (employeeDto == null)
                {
                    return BadRequest("Invalid employee update request. Employee data is missing.");
                }

                if (!id.Equals(employeeDto.Id, StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest();
                }

                // Validate updated employee data (optional, can be done in DTO validation)
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)));
                }

                var employee = await _employeeService.GetEmployeeByIdAsync(id);
                if (employee == null)
                {
                    return NotFound();
                }

                employee.UpdateEmployeeDetails(employeeDto);

                if (employeeDto.CafeId.HasValue)
                {
                    var cafe = await _cafeService.GetCafeByIdAsync(employeeDto.CafeId.Value);
                    if (cafe == null)
                    {
                        return NotFound("Cafe not found.");
                    }
                    employee.CafeId = cafe.Id;
                }

                await _employeeService.UpdateEmployeeAsync(employee);
                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            if (ModelState.IsValid)
            {
                var success = await _employeeService.DeleteEmployeeAsync(id);
                if (success)
                {
                    // Employee deleted successfully
                    return NoContent();
                }
                else
                {
                    // Employee not found
                    return NotFound();
                }
            }
            return BadRequest(ModelState);
        }
    }
}
