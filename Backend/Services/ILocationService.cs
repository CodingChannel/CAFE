namespace CAFE.Backend.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CAFE.Backend.Models;
    using CAFE.Backend.DTOs;

    public interface ILocationService
    {
        Task<IEnumerable<string>> GetDistinctLocationsAsync();
    }
}
