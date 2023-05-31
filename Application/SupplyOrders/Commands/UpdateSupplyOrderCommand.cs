using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SupplyOrders.Commands
{
   public record UpdateSupplyOrdersCommand : IRequest<SupplyOrder>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string>? OrderItemsPartNumber { get; set; }
        public List<string>? OrderPartsPartNumber { get; set; }

        public byte[]? Document { get; set; }
    }

    public class UpdateSupplyOrdersCommandHandler : IRequestHandler<UpdateSupplyOrdersCommand, SupplyOrder>
    {
        private readonly IApplicationDbContext _context;

        public UpdateSupplyOrdersCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SupplyOrder> Handle(UpdateSupplyOrdersCommand request, CancellationToken cancellationToken)
        {

            var entity = await _context.SupplyOrders.FirstOrDefaultAsync(b => b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No SupplyOrder with {request.Id}");

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

            entity.Name = request.Name != null ? request.Name : entity.Name;
            entity.Document = request.Document != null ? request.Document : entity.Document;
            
             _context.SupplyOrders.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }

}
