using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Brands.Commands
{
   public record DeleteBrandCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeleteBrandCommandHandler : IRequestHandler<DeleteBrandCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public DeleteBrandCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteBrandCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.Brands.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No Brands with {request.Id}");

             _context.Brands.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }

}
