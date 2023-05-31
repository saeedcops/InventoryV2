using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Brands.Commands
{
   public record CreateBrandCommand : IRequest<Brand>
    {
        public string Name { get; set; }
        public string? Description { get; set; }
    }

    public class CreateBrandCommandHandler : IRequestHandler<CreateBrandCommand, Brand>
    {
        private readonly IApplicationDbContext _context;

        public CreateBrandCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Brand> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
        {
            var entity = new Brand
            {
                Name = request.Name,
                Description = request.Description,
            };

           entity= _context.Brands.Add(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }

}
