
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CAFE.Backend.Models;
using CAFE.Backend.DTOs;


namespace CAFE.Backend.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeDto>> GetAllEmployeesAsync();
        Task<Employee?> GetEmployeeByIdAsync(string id);
        Task AddEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(Employee employee);
        Task<bool> DeleteEmployeeAsync(string id);
    }
}
