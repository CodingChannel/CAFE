using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CAFE.Backend.Models;
using CAFE.Backend.DTOs;
using CAFE.Backend.Repository;

namespace CAFE.Backend.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IRepository<Employee> _repository;

        public EmployeeService(IRepository<Employee> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EmployeeDto>> GetAllEmployeesAsync()
        {
            var employees = await _repository.GetAllWithIncludesAsync(entity => entity.Cafe);
            var employeeDtos = employees.Select(employee => new EmployeeDto
            {
                Id = employee.Id,
                Name = employee.Name,
                PhoneNumber = employee.PhoneNumber,
                EmailAddress = employee.EmailAddress,
                Gender = employee.Gender,
                StartDate = employee.StartDate,
                CafeId = employee.CafeId,
                Cafe =  employee.Cafe,
            });
            return employeeDtos;
        }

        public async Task<Employee?> GetEmployeeByIdAsync(string id)
        { 
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddEmployeeAsync(Employee employee)
        { 
            await _repository.InsertAsync(employee);
        }

        public async Task UpdateEmployeeAsync(Employee employee)
        { 
            await _repository.UpdateAsync(employee);
        }

        public async Task<bool> DeleteEmployeeAsync(string id)
        {
            var employee = await _repository.GetByIdAsync(id);
            if (employee == null)
            {
                return false; // Employee not found
            }

            await _repository.DeleteAsync(employee.Id);
            return true; // employee deleted successfully
        }
    }
}
