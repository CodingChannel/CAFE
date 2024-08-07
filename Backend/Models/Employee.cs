using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CAFE.Backend.Models
{
    public class Employee
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } // Unique employee identifier

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }

        [Required]
        [RegularExpression(@"^[89]\d{7}$")] // Phone number starting with 8 or 9 and 8 digits long
        public string PhoneNumber { get; set; }

        [Required]
        public string Gender { get; set; } // Male or Female

        // Foreign key for the Cafe (nullable)
        public Guid? CafeId { get; set; }

        // Navigation property for the Cafe
        [ForeignKey("CafeId")]
        public Cafe? Cafe { get; set; }

        // Additional properties
        [Required]
        public DateTime StartDate { get; set; }

        [NotMapped]
        public int DaysWorked => (DateTime.UtcNow - StartDate).Days;
    }
}
