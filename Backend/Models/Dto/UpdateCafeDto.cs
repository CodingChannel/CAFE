using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CAFE.Backend.DTOs
{
    public class UpdateCafeDto : CreateCafeDto
    {
        public Guid Id { get; set; } // UUID

    }
}
