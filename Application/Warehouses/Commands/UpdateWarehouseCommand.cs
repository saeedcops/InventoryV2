using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Warehouses.Commands
{
   public record UpdateWarehouseCommand : IRequest<Warehouse>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
    }

    public class UpdateWarehouseCommandHandler : IRequestHandler<UpdateWarehouseCommand, Warehouse>
    {
        private readonly IApplicationDbContext _context;

        public UpdateWarehouseCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Warehouse> Handle(UpdateWarehouseCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.Warehouses.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No Warehouse with {request.Id}");

            entity.Name = request.Name != null ? request.Name : entity.Name;
            entity.Description = request.Description != null ? request.Description : entity.Description;
            _context.Warehouses.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }

}
