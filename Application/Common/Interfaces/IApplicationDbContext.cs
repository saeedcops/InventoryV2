using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Brand> Brands { get; }
        DbSet<Part> Parts { get; }
        DbSet<Customer> Customers { get; }
        DbSet<Engineer> Engineers { get; }
        DbSet<Item> Items { get; }
        DbSet<ItemType> ItemTypes { get; }
        DbSet<Order> Orders { get; }
        DbSet<SupplyOrder> SupplyOrders { get; }
        DbSet<Warehouse> Warehouses { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
