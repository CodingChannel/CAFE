
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CAFE.Backend.Models;
using CAFE.Backend.DTOs;
using CAFE.Backend.Repository;
using Microsoft.EntityFrameworkCore;
namespace CAFE.Backend.Services
{
    public class LocationService : ILocationService
    {
        private readonly CafeEmployeeContext _context;

        public LocationService(CafeEmployeeContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<string>> GetDistinctLocationsAsync()
        {
            return await _context.Cafes.AsNoTracking()
                .Select(c => c.Location)
                .Distinct()
                .ToListAsync();
        }
    }
}