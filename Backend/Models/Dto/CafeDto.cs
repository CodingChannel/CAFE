using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CAFE.Backend.DTOs
{
    public class CafeDto : UpdateCafeDto
    {
        public int Employees { get; set; }

    }
}
