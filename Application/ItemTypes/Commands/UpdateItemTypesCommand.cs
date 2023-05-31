using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ItemTypes.Commands
{
   public record UpdateItemTypesCommand : IRequest<ItemType>
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }

    public class UpdateItemTypesCommandHandler : IRequestHandler<UpdateItemTypesCommand, ItemType>
    {
        private readonly IApplicationDbContext _context;

        public UpdateItemTypesCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ItemType> Handle(UpdateItemTypesCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.ItemTypes.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No Brands with {request.Id}");

            entity.Name = request.Name != null ? request.Name : entity.Name;
            entity.Description = request.Description != null ? request.Description : entity.Description;

             _context.ItemTypes.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }

}
