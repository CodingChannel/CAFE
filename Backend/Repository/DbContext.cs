using Microsoft.EntityFrameworkCore;
using CAFE.Backend.Models;
using CAFE.Backend.DTOs;
using CAFE.Backend.Utility;
public class CafeEmployeeContext : DbContext
{
    public CafeEmployeeContext(DbContextOptions<CafeEmployeeContext> options)
      : base(options) { }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<Cafe> Cafes { get; set; }
 
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Cafe>()
            .HasMany(c => c.Employees)
            .WithOne(e => e.Cafe)
            .HasForeignKey(e => e.CafeId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired(false); // Marking the foreign key as optional
  
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<Employee>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.Id = await GenerateUniqueEmployeeIdAsync();
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }

    private async Task<string> GenerateUniqueEmployeeIdAsync()
    {
        string newId;
        do
        {
            newId = IdentifierGenerator.GenerateUniqueIdentifier();
        } while (await Employees.AnyAsync(e => e.Id == newId));

        return newId;
    }
}