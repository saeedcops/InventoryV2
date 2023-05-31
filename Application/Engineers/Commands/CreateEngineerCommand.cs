using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Engineers.Commands
{
    public record CreateEngineerCommand : IRequest<Engineer>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string? Title { get; set; }
        public string? Address { get; set; }
    }

    public class CreateEngineerCommandHandler : IRequestHandler<CreateEngineerCommand, Engineer>
    {
        private readonly IApplicationDbContext _context;

        public CreateEngineerCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Engineer> Handle(CreateEngineerCommand request, CancellationToken cancellationToken)
        {
            var entity = new Engineer
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Address = request.Address,
                Title = request.Title
            };

            entity = _context.Engineers.Add(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }
}
