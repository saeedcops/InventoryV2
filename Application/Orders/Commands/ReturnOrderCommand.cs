using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
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

  public record ReturnOrderCommand : IRequest<bool>
    {
        public int OrderId { get; set; }
    }

    public class ReturnOrderCommandHandler : IRequestHandler<ReturnOrderCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public ReturnOrderCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(ReturnOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _context.Orders.Include(o=>o.OrderItems).FirstOrDefaultAsync(o => o.Id == request.OrderId && o.OrderStatus != OrderStatus.Returned);
            if (order == null)
                throw new NotFoundException($"Order with Id {request.OrderId} Not found or it's already on store");
            if (order.OrderItems != null)
                foreach (var item in order.OrderItems)
                {

                    item.EngneerId = null;
                    item.Engineer = null;
                    item.CustomerId = null;
                    item.ItemStatus =  ItemStatus.stored;
               
                    _context.Items.Update(item);
                }

            if (order.OrderParts != null)
                foreach (var item in order.OrderParts)
                {

                    item.EngneerId = null;
                    item.Engineer = null;
                    item.CustomerId = null;
                    item.PartStatus = ItemStatus.stored;
                    _context.Parts.Update(item);
                }
            
            order.OrderStatus = OrderStatus.Returned;
            _context.Orders.Update(order);

            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
