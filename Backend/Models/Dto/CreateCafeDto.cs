using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace CAFE.Backend.DTOs
{
    public class CreateCafeDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Logo { get; set; }
        public string Location { get; set; }
    }
}
