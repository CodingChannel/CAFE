using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CAFE.Backend.Models;
using CAFE.Backend.DTOs;
using CAFE.Backend.Repository;

namespace CAFE.Backend.Services
{
    public class CafeService : ICafeService
    {
        private readonly IRepository<Cafe> _repository;

        public CafeService(IRepository<Cafe> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CafeDto>> GetAllCafesAsync()
        {

            // Call the repository method with the navigation properties to include
            var cafes = await _repository.GetAllWithIncludesAsync(entity => entity.Employees);

            // Create and return DTOs with the total number of employees
            var cafeDtos = cafes.Select(cafe => new CafeDto
            {
                Id = cafe.Id,
                Name = cafe.Name,
                Description = cafe.Description,
                Logo = cafe.Logo,
                Location = cafe.Location,
                Employees = cafe.Employees.Count // Get the number of employees
            });

            return cafeDtos;
        }


        public async Task<CafeDto?> GetCafeByIdAsync(Guid id)
        {
            var cafe = await _repository.GetByIdAsync(id);

            if (cafe == null)
            {
                return null;
            }
            return new CafeDto
            {
                Id = cafe.Id,
                Name = cafe.Name,
                Description = cafe.Description,
                Logo = cafe.Logo,
                Location = cafe.Location,
                Employees = cafe.Employees?.Count ?? 0  // Get the number of employees
            };
        }

        public async Task AddCafeAsync(Cafe Cafe)
        {
            await _repository.InsertAsync(Cafe);
        }

        public async Task<bool> UpdateCafeAsync(UpdateCafeDto cafeDto)
        {
            var cafe = await _repository.GetByIdAsync(cafeDto.Id);
            if (cafe == null) return false;

            cafe.Name = cafeDto.Name;
            cafe.Location = cafeDto.Location;
            cafe.Description = cafeDto.Description;
            cafe.Logo = cafeDto.Logo;
            await _repository.UpdateAsync(cafe);
            return true;
        }

        public async Task<bool> DeleteCafeAsync(Guid id)
        {
            var cafe = await _repository.GetByIdAsync(id);
            if (cafe == null)
            {
                return false; // Cafe not found
            }

            await _repository.DeleteAsync(cafe.Id);
            return true; // Cafe deleted successfully
        }
    }
}
