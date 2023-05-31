using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using Domain.Enum;
using FluentValidation.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.Commands
{

  public record CreateOrderCommand : IRequest<int>
    {
        public int CustomerId { get; set; }
        public int EngineerId { get; set; }
        public int OrderType { get; set; }
        public List<OrderItem> OrderItemsPartNumber { get; set; }
        public byte[]? Document { get; set; }
    }

    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateOrderCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var items = new List<Item>();
            if (request.OrderItemsPartNumber != null || request.OrderItemsPartNumber.Count < 1) { 
                foreach (var serial in request.OrderItemsPartNumber)
                {

                    var count = _context.Items
                        .Where(x => x.ItemStatus == ItemStatus.stored && x.PartNumber.Equals(serial.PartNumber))
                        .Count();
                    if (serial.Count < 1)
                    {
                        throw new ValidationException(new List<ValidationFailure>
                            {
                                new ValidationFailure
                                {
                                    ErrorMessage="Order items count must be greater than or equal one item",
                                    PropertyName="Detail"
                                }
                            });
                    }
                    if (count < serial.Count)
                    {
                        throw new NotFoundException($"The avalaible item of :{serial.PartNumber} is just {count}");
                    }

                    var itemsList = await _context.Items
                       .Where(x => x.ItemStatus == ItemStatus.stored && x.PartNumber.Equals(serial.PartNumber))
                       .Take(serial.Count).ToListAsync();

                    foreach (var item in itemsList)
                    {
                        item.EngneerId = request.EngineerId;
                        item.Engineer = _context.Engineers.FirstOrDefault(b => b.Id == request.EngineerId);
                        item.CustomerId = request.CustomerId;
                        item.ItemStatus = request.OrderType == 0 ? ItemStatus.Sold : ItemStatus.Borrowed;
                        items.Add(item);
                    }

                }
            }else{
                throw new ValidationException(new List<ValidationFailure>
                {
                    new ValidationFailure
                    {
                        ErrorMessage="Order must contains at least one item",
                        PropertyName="Detail"
                    }
                });
            }


            var entity = new Order
            {
                Customer = _context.Customers.FirstOrDefault(b => b.Id == request.CustomerId),
                CustomerId = request.CustomerId,
                Engineer = _context.Engineers.FirstOrDefault(b => b.Id == request.EngineerId),
                EngineerId = request.EngineerId,
                OrderType =(OrderType) request.OrderType,
                Document = request.Document,
                OrderItems = items,
            };

            entity = _context.Orders.Add(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
