using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.PurchaseOrders.Commands
{
   public record DeletePurchaseOrderCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeletePurchaseOrderCommandHandler : IRequestHandler<DeletePurchaseOrderCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public DeletePurchaseOrderCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeletePurchaseOrderCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.PurchaseOrders.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No PurchaseOrders with {request.Id}");

             _context.PurchaseOrders.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }

}
