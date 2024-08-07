using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CAFE.Backend.DTOs;
using System.Text.Json.Serialization;

namespace CAFE.Backend.Models
{
    public class Cafe : CreateCafeDto
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } // UUID

        [JsonIgnore]
        public ICollection<Employee>? Employees { get; set; }
    }
}
