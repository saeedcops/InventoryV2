using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace Application.SupplyOrders.Commands
{
  public record CreateSupplyOrderCommand : IRequest<SupplyOrder>
    {
        public string Name { get; set; }
        public List<string>? OrderItemsPartNumber { get; set; }
        public List<string>? OrderPartsPartNumber { get; set; }
        public byte[]? Document { get; set; }
    }

    public class CreateSupplyOrderCommandHandler : IRequestHandler<CreateSupplyOrderCommand, SupplyOrder>
    {
        private readonly IApplicationDbContext _context;

        public CreateSupplyOrderCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SupplyOrder> Handle(CreateSupplyOrderCommand request, CancellationToken cancellationToken)
        {
            var entity = new SupplyOrder
            {
                Name = request.Name,
                Document = request.Document,

            };
            var items = new List<Item>();
            var Parts = new List<Part>();
            if (request.OrderItemsPartNumber != null)
            {
                foreach (var serial in request.OrderItemsPartNumber)
                    items.Add(await _context.Items.FirstOrDefaultAsync(x => x.PartNumber.Equals(serial)));
                entity.SupplyOrderItems = items;
            }
            if (request.OrderPartsPartNumber != null)
            {
                foreach (var serial in request.OrderPartsPartNumber)
                    Parts.Add(await _context.Parts.FirstOrDefaultAsync(x => x.PartNumber.Equals(serial)));

                entity.SupplyOrderParts = Parts;
            }

            entity = _context.SupplyOrders.Add(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }
}
