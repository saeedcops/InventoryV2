using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.Commands
{
   public record UpdateOrderCommand : IRequest<Order>
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public int? EngineerId { get; set; }
        public int? OrderType { get; set; }
        public List<string>? OrderItemsPartNumber { get; set; }
        public List<string>? OrderPartsPartNumber { get; set; }
        public byte[]? Document { get; set; }
    }

    public class UpdateOrderCommandHandler : IRequestHandler<UpdateOrderCommand, Order>
    {
        private readonly IApplicationDbContext _context;

        public UpdateOrderCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Order> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
        {

            var entity = await _context.Orders.FirstOrDefaultAsync(b => b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No Brands with {request.Id}");

            var items = new List<Item>();
            var Parts = new List<Part>();
            if (request.OrderItemsPartNumber != null)
            {
                foreach (var serial in request.OrderItemsPartNumber)
                    items.Add(await _context.Items.FirstOrDefaultAsync(x => x.PartNumber.Equals(serial)));
                entity.OrderItems = items;
            }
            if (request.OrderPartsPartNumber != null)
            { 
                foreach (var serial in request.OrderPartsPartNumber)
                    Parts.Add(await _context.Parts.FirstOrDefaultAsync(x => x.PartNumber.Equals(serial)));

                entity.OrderParts = Parts;
            }
            entity.Document = request.Document != null ? request.Document : entity.Document;
            entity.OrderType = request.OrderType != null ? (OrderType) request.OrderType : entity.OrderType;
            entity.CustomerId = request.CustomerId != null ? (int)request.CustomerId : entity.CustomerId;
            entity.EngineerId = request.EngineerId != null ? (int)request.EngineerId : entity.EngineerId;
            
            _context.Orders.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }

}
