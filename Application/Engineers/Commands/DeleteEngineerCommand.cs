using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Engineers.Commands
{
   public record DeleteEngineerCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeleteEngineerCommandHandler : IRequestHandler<DeleteEngineerCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public DeleteEngineerCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteEngineerCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.Engineers.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No Engineers with {request.Id}");

             _context.Engineers.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }

}
