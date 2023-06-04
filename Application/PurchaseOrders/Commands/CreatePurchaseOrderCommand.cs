using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace Application.PurchaseOrders.Commands
{
  public record CreatePurchaseOrderCommand : IRequest<int>
    {
        [Required]
        public string Name { get; set; }
        public byte[]? Document { get; set; }
        public List<OrderItem>? Items { get; set; }
        public List<OrderItem>? Parts { get; set; }
    }

    public class CreatePurchaseOrderCommandHandler : IRequestHandler<CreatePurchaseOrderCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreatePurchaseOrderCommandHandler(IApplicationDbContext context)
        {
           _context = context;
        }

        public async Task<int> Handle(CreatePurchaseOrderCommand request, CancellationToken cancellationToken)
        {
            var entity = new PurchaseOrder
            {
                Name = request.Name,
                Document = request.Document,

            };
            var items = new List<PurchaseOrderItem>();
            var Parts = new List<PurchaseOrderPart>();
            if (request.Items != null)
            {
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
                foreach (var serial in request.Parts)
                {
                    PurchaseOrderPart purchaseOrderItem = new PurchaseOrderPart();
                    purchaseOrderItem.Qty = serial.Count;
                    purchaseOrderItem.Part = await _context.PurchaseParts.FirstOrDefaultAsync(x => x.PartNumber.Equals(serial.PartNumber));
                    Parts.Add(purchaseOrderItem);
                }
                entity.Parts = Parts;
            }

            entity = _context.PurchaseOrders.Add(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
