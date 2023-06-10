using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IO;

namespace Application.PurchaseOrders.Commands
{
    [Authorize(Roles = "User")]
    public record UpdatePurchaseOrderCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[]? Document { get; set; }
        public List<OrderItem>? Items { get; set; }
        public List<OrderItem>? Parts { get; set; }
    }

    public class UpdatePurchaseOrderCommandHandler : IRequestHandler<UpdatePurchaseOrderCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePurchaseOrderCommandHandler(IApplicationDbContext context)
        {
           _context = context;
        }

        public async Task<int> Handle(UpdatePurchaseOrderCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.PurchaseOrders.FirstOrDefaultAsync(b => b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No PurchaseOrders with {request.Id}");

            entity.Name = request.Name != null ? request.Name : entity.Name;
            entity.Document = request.Document != null ? request.Document : entity.Document;

            if (request.Items != null)
            {
                var items = new List<PurchaseOrderItem>();
                foreach (var serial in request.Items)
                {
                    PurchaseOrderItem purchaseOrderItem = new PurchaseOrderItem();
                    purchaseOrderItem.Qty = serial.Count;
                    purchaseOrderItem.Item = await _context.PurchaseItems.FirstOrDefaultAsync(x => x.PartNumber.Equals(serial.PartNumber));
                    items.Add(purchaseOrderItem);
                }
                entity.Items = items;
            }
            if (request.Parts != null)
            {
                var Parts = new List<PurchaseOrderPart>();
                foreach (var serial in request.Parts)
                {
                    PurchaseOrderPart purchaseOrderItem = new PurchaseOrderPart();
                    purchaseOrderItem.Qty = serial.Count;
                    purchaseOrderItem.Part = await _context.PurchaseParts.FirstOrDefaultAsync(x => x.PartNumber.Equals(serial.PartNumber));
                    Parts.Add(purchaseOrderItem);
                }
                entity.Parts = Parts;
            }

           entity= _context.PurchaseOrders.Update(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
