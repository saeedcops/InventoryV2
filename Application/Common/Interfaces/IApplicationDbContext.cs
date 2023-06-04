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
        DbSet<Order> Orders { get; }
        DbSet<PurchaseOrder> PurchaseOrders { get; }
        DbSet<PurchasePart> PurchaseParts { get; }
        DbSet<PurchaseItem> PurchaseItems { get; }
        DbSet<PurchaseOrderItem> PurchaseOrderItems { get; }
        DbSet<PurchaseOrderPart> PurchaseOrderParts { get; }
        DbSet<Warehouse> Warehouses { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
