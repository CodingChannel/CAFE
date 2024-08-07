using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CAFE.Backend.DTOs;
using CAFE.Backend.Models;

namespace CAFE.Backend.DTOs
{
    public class EmployeeDto : UpdateEmployeeDto
    {
        public Cafe? Cafe { get; set; }

        public int DaysWorked => (DateTime.UtcNow - StartDate).Days;
    }
}
