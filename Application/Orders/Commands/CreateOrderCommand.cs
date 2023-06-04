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
        public List<OrderItem> Items { get; set; }
        public List<OrderItem> Parts { get; set; }
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
            if ((request.Items == null || request.Items.Count < 1) && (request.Parts == null || request.Parts.Count < 1))
            {
                throw new ValidationException(new List<ValidationFailure>
                {
                    new ValidationFailure
                    {
                        ErrorMessage="Order must contains at least one item or one part",
                        PropertyName="Detail"
                    }
                });
            }

            var items = new List<Item>();
            var parts = new List<Part>();

            if (request.Items != null && request.Items.Count > 0) { 
                foreach (var serial in request.Items)
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
                        ItemStatus status;
                        switch (request.OrderType)
                        {
                            case (int) OrderType.Borrow:
                                status = ItemStatus.Borrowed; break;
                            case (int)OrderType.Workshop:
                                status = ItemStatus.Workshop; break;
                            default:
                                status = ItemStatus.Sold;
                                break;
                        }
                        item.ItemStatus = status;
                        items.Add(item);
                        _context.Items.Update(item);
                    }

                }
            }


            if (request.Parts != null && request.Parts.Count > 0)
            {
                foreach (var serial in request.Parts)
                {
                    var count = _context.Parts
                        .Where(x => x.PartStatus == ItemStatus.stored && x.PartNumber.Equals(serial.PartNumber))
                        .Count();
                    if (serial.Count < 1)
                    {
                        throw new ValidationException(new List<ValidationFailure>
                            {
                                new ValidationFailure
                                {
                                    ErrorMessage="Order parts count must be greater than or equal one item",
                                    PropertyName="Detail"
                                }
                            });
                    }
                    if (count < serial.Count)
                    {
                        throw new NotFoundException($"The avalaible part of :{serial.PartNumber} is just {count}");
                    }

                    var itemsList = await _context.Parts
                       .Where(x => x.PartStatus == ItemStatus.stored && x.PartNumber.Equals(serial.PartNumber))
                       .Take(serial.Count).ToListAsync();

                    foreach (var item in itemsList)
                    {
                        item.EngneerId = request.EngineerId;
                        item.Engineer = _context.Engineers.FirstOrDefault(b => b.Id == request.EngineerId);
                        item.CustomerId = request.CustomerId;
                        ItemStatus status;
                        switch (request.OrderType)
                        {
                            case (int)OrderType.Borrow:
                                status = ItemStatus.Borrowed; break;
                            case (int)OrderType.Workshop:
                                status = ItemStatus.Workshop; break;
                            default:
                                status = ItemStatus.Sold;
                                break;
                        }
                        item.PartStatus = status;
                        parts.Add(item);
                        _context.Parts.Update(item);
                    }

                }
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
                OrderParts = parts
            };

            entity = _context.Orders.Add(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
