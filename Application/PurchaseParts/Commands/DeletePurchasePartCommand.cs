using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.PurchaseParts.Commands
{
   public record DeletePurchasePartCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeletePurchasePartCommandHandler : IRequestHandler<DeletePurchasePartCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public DeletePurchasePartCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeletePurchasePartCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.PurchaseParts.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No PurchaseParts with {request.Id}");

             _context.PurchaseParts.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }

}
