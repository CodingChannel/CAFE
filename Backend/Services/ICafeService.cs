namespace CAFE.Backend.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CAFE.Backend.Models;
    using CAFE.Backend.DTOs;

    public interface ICafeService
    {
        Task<IEnumerable<CafeDto>> GetAllCafesAsync();
        Task<CafeDto?> GetCafeByIdAsync(Guid id);
        Task AddCafeAsync(Cafe Cafe);
        Task<bool> UpdateCafeAsync(UpdateCafeDto cafeDto);
        Task<bool> DeleteCafeAsync(Guid id);
    }
}
