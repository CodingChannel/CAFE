using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace CAFE.Backend.DTOs
{
    public class UpdateEmployeeDto : CreateEmployeeDto
    {
        public string Id { get; set; }
    }
}
