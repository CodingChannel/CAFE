using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace CAFE.Backend.DTOs
{
    public class CreateEmployeeDto
    {
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public DateTime StartDate { get; set; }
        public Guid? CafeId { get; set; }
    }
}
