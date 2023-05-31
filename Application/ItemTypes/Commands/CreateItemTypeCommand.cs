using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.ItemTypes.Commands
{

   public record CreateItemTypeCommand : IRequest<ItemType>
    {
        public string Name { get; set; }
        public string? Description { get; set; }
    }

    public class CreateItemTypeCommandHandler : IRequestHandler<CreateItemTypeCommand, ItemType>
    {
        private readonly IApplicationDbContext _context;

        public CreateItemTypeCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ItemType> Handle(CreateItemTypeCommand request, CancellationToken cancellationToken)
        {
            var entity = new ItemType
            {
                Name = request.Name,
                Description = request.Description,
            };

            entity = _context.ItemTypes.Add(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }

}
