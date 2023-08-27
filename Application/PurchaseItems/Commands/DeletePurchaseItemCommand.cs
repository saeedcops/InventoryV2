using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.PurchaseItems.Commands
{
   public record DeletePurchaseItemCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeletePurchaseItemCommandHandler : IRequestHandler<DeletePurchaseItemCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public DeletePurchaseItemCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeletePurchaseItemCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.PurchaseItems.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No PurchaseItems with {request.Id}");

             _context.PurchaseItems.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }

}
