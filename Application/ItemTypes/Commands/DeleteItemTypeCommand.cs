using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.ItemTypes.Commands
{
   public record DeleteItemTypeCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeleteItemTypeCommandHandler : IRequestHandler<DeleteItemTypeCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public DeleteItemTypeCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteItemTypeCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.ItemTypes.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No ItemTypes with {request.Id}");

             _context.ItemTypes.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }

}
