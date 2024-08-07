using CAFE.Backend.DTOs;
using CAFE.Backend.Models;

public static class DtoExtensions
{
    public static Employee ToEmployee(this CreateEmployeeDto employeeDto)
    {
        return new Employee
        {
            Name = employeeDto.Name,
            EmailAddress = employeeDto.EmailAddress,
            PhoneNumber = employeeDto.PhoneNumber,
            StartDate = employeeDto.StartDate,
            Gender = employeeDto.Gender
        };
    }

    public static void UpdateEmployeeDetails(this Employee employee, UpdateEmployeeDto employeeDto)
    {
        employee.Name = employeeDto.Name;
        employee.EmailAddress = employeeDto.EmailAddress;
        employee.PhoneNumber = employeeDto.PhoneNumber;
        employee.Gender = employeeDto.Gender;
        employee.StartDate = employeeDto.StartDate;
    }
}
