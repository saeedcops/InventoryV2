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

namespace Application.Engineers.Commands
{
   public record UpdateEngineersCommand : IRequest<Engineer>
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Title { get; set; }
        public string? Address { get; set; }
    }

    public class UpdateEngineersCommandHandler : IRequestHandler<UpdateEngineersCommand, Engineer>
    {
        private readonly IApplicationDbContext _context;

        public UpdateEngineersCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Engineer> Handle(UpdateEngineersCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.Engineers.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No Brands with {request.Id}");

            entity.Name = request.Name != null ? request.Name : entity.Name;
            entity.Phone = request.Phone != null ? request.Phone : entity.Phone;
            entity.Email = request.Email != null ? request.Email : entity.Email;
            entity.Address = request.Address != null ? request.Address : entity.Address;
            entity.Title = request.Title != null ? request.Title : entity.Title;

            _context.Engineers.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }

}
