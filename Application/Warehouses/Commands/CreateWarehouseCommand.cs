using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Warehouses.Commands
{
 public record CreateWarehouseCommand : IRequest<Warehouse>
    {
        public string Name { get; set; }
        public string? Description { get; set; }
    }

    public class CreateWarehouseCommandHandler : IRequestHandler<CreateWarehouseCommand, Warehouse>
    {
        private readonly IApplicationDbContext _context;

        public CreateWarehouseCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Warehouse> Handle(CreateWarehouseCommand request, CancellationToken cancellationToken)
        {
            var entity = new Warehouse
            {
                Name = request.Name,
                Description = request.Description,
              
            };

            entity = _context.Warehouses.Add(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }
}
