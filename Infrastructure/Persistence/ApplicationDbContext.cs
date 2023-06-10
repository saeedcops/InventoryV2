using Application.Common.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence.Interceptors;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>, IApplicationDbContext
    {

        private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor)
            : base(options)
        {
            _auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
        }

        public DbSet<Brand> Brands => Set<Brand>();
        public DbSet<Part> Parts => Set<Part>();

        public DbSet<Customer> Customers => Set<Customer>();

        public DbSet<Engineer> Engineers => Set<Engineer>();

        public DbSet<Item> Items => Set<Item>();


        public DbSet<Order> Orders => Set<Order>();


        public DbSet<Warehouse> Warehouses => Set<Warehouse>();

        public DbSet<PurchaseOrder> PurchaseOrders => Set<PurchaseOrder>();

        public DbSet<PurchaseOrderItem> PurchaseOrderItems => Set<PurchaseOrderItem>();

        public DbSet<PurchaseOrderPart> PurchaseOrderParts => Set<PurchaseOrderPart>();

        public DbSet<PurchasePart> PurchaseParts => Set<PurchasePart>();

        public DbSet<PurchaseItem> PurchaseItems => Set<PurchaseItem>();

        protected override void OnModelCreating(ModelBuilder builder)
        {


            builder.Entity<PurchaseItem>().HasOne(c => c.Brand).WithMany().OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Order>().HasOne(c => c.Customer).WithMany().OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Order>().HasOne(c => c.Engineer).WithMany().OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Item>().HasOne(c => c.Brand).WithMany().OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Item>().HasOne(c => c.Warehouse).WithMany().OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Part>().HasOne(c => c.Warehouse).WithMany().OnDelete(DeleteBehavior.NoAction);
            builder.Entity<PurchaseOrderPart>().HasOne(c => c.Part).WithMany().OnDelete(DeleteBehavior.NoAction);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {

            return await base.SaveChangesAsync(cancellationToken);
        }
    }

}
